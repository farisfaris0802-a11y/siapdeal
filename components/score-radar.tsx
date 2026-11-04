interface RadarPoint {
  key: string;
  label: string;
  shortLabel?: string;
  score: number;
}

function polarPoint(index: number, total: number, radius: number, cx: number, cy: number) {
  const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
  };
}

function polygonPoints(
  values: { x: number; y: number }[]
) {
  return values.map((point) => `${point.x},${point.y}`).join(" ");
}

export function ScoreRadar({
  data,
  size = 360,
}: {
  data: RadarPoint[];
  size?: number;
}) {
  const width = 440;
  const height = Math.round(size * 0.86);
  const cx = width / 2;
  const cy = height / 2 + 4;
  const radius = Math.min(width, height) * 0.31;
  const total = Math.max(data.length, 3);
  const levels = [20, 40, 60, 80, 100];

  const gridPolygons = levels.map((level) => {
    const points = Array.from({ length: total }).map((_, index) =>
      polarPoint(index, total, (radius * level) / 100, cx, cy)
    );
    return { level, points: polygonPoints(points) };
  });

  const valuePoints = data.map((point, index) =>
    polarPoint(index, total, (radius * Math.max(0, Math.min(100, point.score))) / 100, cx, cy)
  );

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Radar chart skor lima aspek negosiasi"
    >
      <defs>
        <linearGradient id="radar-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#047857" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {gridPolygons.map((grid) => (
        <polygon
          key={grid.level}
          points={grid.points}
          fill={grid.level === 100 ? "#FFFFFF" : "none"}
          stroke="#D9D3C4"
          strokeWidth={grid.level === 100 ? 1.2 : 0.8}
          strokeDasharray={grid.level === 100 ? undefined : "3 4"}
        />
      ))}

      {data.map((_, index) => {
        const point = polarPoint(index, total, radius, cx, cy);
        return (
          <line
            key={index}
            x1={cx}
            y1={cy}
            x2={point.x}
            y2={point.y}
            stroke="#E3DDCF"
            strokeWidth="0.8"
          />
        );
      })}

      <polygon
        points={polygonPoints(valuePoints)}
        fill="url(#radar-fill)"
        stroke="#047857"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {valuePoints.map((point, index) => (
        <g key={data[index].key}>
          <circle cx={point.x} cy={point.y} r="7" fill="#047857" opacity="0.12" />
          <circle
            cx={point.x}
            cy={point.y}
            r="3.6"
            fill="#FFFFFF"
            stroke="#047857"
            strokeWidth="2"
          >
            <title>{`${data[index].label}: ${data[index].score}/100`}</title>
          </circle>
          <text
            x={point.x}
            y={point.y - 11}
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="700"
            fill="#0B2B22"
          >
            {data[index].score}
          </text>
        </g>
      ))}

      {data.map((point, index) => {
        const outer = polarPoint(index, total, radius + 34, cx, cy);
        const anchor =
          Math.abs(outer.x - cx) < 12 ? "middle" : outer.x > cx ? "start" : "end";
        const label = point.shortLabel ?? point.label;

        return (
          <text
            key={`label-${point.key}`}
            x={outer.x}
            y={outer.y + (outer.y < cy ? -2 : 8)}
            textAnchor={anchor}
            fill="#0B2B22"
            fontSize="10.5"
            fontWeight="600"
          >
            <title>{point.label}</title>
            {label.length > 18 ? `${label.slice(0, 17)}…` : label}
          </text>
        );
      })}

      <text x={cx} y={height - 3} textAnchor="middle" fontSize="8.5" fill="#8A958F">
        Skor 0–100 · rubrik tetap
      </text>
    </svg>
  );
}
