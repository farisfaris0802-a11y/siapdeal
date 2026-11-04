"use client";

import { useFormStatus } from "react-dom";
import { Gavel, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<typeof Button>;

export function JudgeLoginButton({
  label = "Quick Demo Login as Judge",
  pendingLabel = "Menyiapkan ruang juri…",
  variant = "default",
  size = "lg",
  className,
  icon = "gavel",
}: {
  label?: string;
  pendingLabel?: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
  icon?: "gavel" | "sparkles";
}) {
  const { pending } = useFormStatus();
  const Icon = icon === "sparkles" ? Sparkles : Gavel;

  return (
    <Button
      type="submit"
      size={size}
      variant={variant}
      disabled={pending}
      className={cn("group", className)}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        <>
          <Icon className="h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}
