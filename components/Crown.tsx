export function Crown({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden="true" fill="currentColor">
      <circle cx="32" cy="4" r="3" />
      <circle cx="6" cy="10" r="2.6" />
      <circle cx="58" cy="10" r="2.6" />
      <path d="M6 12 L16 26 L24 10 L32 26 L40 10 L48 26 L58 12 L54 32 H10 Z" />
      <rect x="10" y="34" width="44" height="4" rx="2" />
    </svg>
  );
}
