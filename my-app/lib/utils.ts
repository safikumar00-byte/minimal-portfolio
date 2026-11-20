export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}
