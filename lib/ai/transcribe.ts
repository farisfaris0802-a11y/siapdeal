const PRIMARY_MODEL = "gemini-3.5-transcribe";
const FALLBACK_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
];
const PROMPT =
  "Transkripsikan audio ini secara verbatim dalam Bahasa Indonesia. Kembalikan hanya teks transkrip tanpa penjelasan, tanpa tanda kutip, dan tanpa label.";

type TranscriptionResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
        audioTranscription?: { text?: string };
      }>;
    };
  }>;
  error?: { message?: string; status?: string };
};

async function requestTranscription(
  model: string,
  key: string,
  base64Audio: string,
  mimeType: string
) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: PROMPT },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: base64Audio,
                },
              },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(15_000),
    }
  );

  const payload = (await response.json().catch(() => null)) as
    | TranscriptionResponse
    | null;

  if (!response.ok) {
    throw new Error(
      payload?.error?.message || `Transcription request failed (${response.status}).`
    );
  }

  const text = payload?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? part.audioTranscription?.text ?? "")
    .join("")
    .trim();

  if (!text) {
    console.warn("[transcribe] no transcript", {
      model,
      mimeType,
      bytes: base64Audio.length,
    });
    throw new Error("Tidak ada transkrip yang dihasilkan.");
  }

  return text;
}

export async function transcribeAudio({
  bytes,
  mimeType,
}: {
  bytes: Buffer;
  mimeType: string;
}) {
  const key =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ?? process.env.GEMINI_API_KEY;

  if (!key) {
    throw new Error("API key Google AI belum diatur.");
  }

  const base64Audio = bytes.toString("base64");
  const configuredModel = process.env.AI_TRANSCRIBE_MODEL;
  const models = [
    ...(configuredModel ? [configuredModel] : []),
    PRIMARY_MODEL,
    ...FALLBACK_MODELS,
  ].filter((model, index, all) => all.indexOf(model) === index);

  let lastError: unknown = null;

  for (const model of models) {
    try {
      return await requestTranscription(model, key, base64Audio, mimeType);
    } catch (error) {
      lastError = error;
      console.warn("[transcribe] model failed", {
        model,
        message: error instanceof Error ? error.message : error,
      });
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Gagal memproses transkripsi suara.");
}
