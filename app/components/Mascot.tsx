/** Maskot orisinal: "Kiko", kucing berpita dengan topi pesta. Ganti bebas. */
export function Mascot({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 220"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {/* topi pesta */}
      <g transform="rotate(-12 100 40)">
        <path d="M100 2 L128 70 H72 Z" fill="#ff6b9a" />
        <path d="M89 28 L111 28 L116 40 L84 40 Z M80 52 L120 52 L124 62 L76 62 Z" fill="#ffd166" />
        <circle cx="100" cy="4" r="9" fill="#7bdff2" />
      </g>
      {/* telinga */}
      <path d="M38 78 L52 30 L84 66 Z" fill="#f4a259" />
      <path d="M162 78 L148 30 L116 66 Z" fill="#f4a259" />
      <path d="M48 70 L55 46 L72 64 Z M152 70 L145 46 L128 64 Z" fill="#ffc9b9" />
      {/* kepala */}
      <ellipse cx="100" cy="122" rx="74" ry="66" fill="#f4a259" />
      <ellipse cx="100" cy="140" rx="46" ry="34" fill="#fff4e6" />
      {/* mata */}
      <ellipse cx="72" cy="112" rx="8" ry="11" fill="#2b1640" />
      <ellipse cx="128" cy="112" rx="8" ry="11" fill="#2b1640" />
      <circle cx="75" cy="107" r="3" fill="#fff" />
      <circle cx="131" cy="107" r="3" fill="#fff" />
      {/* pipi */}
      <ellipse cx="56" cy="136" rx="11" ry="7" fill="#ff8fab" opacity=".7" />
      <ellipse cx="144" cy="136" rx="11" ry="7" fill="#ff8fab" opacity=".7" />
      {/* hidung & mulut */}
      <path d="M94 128 H106 L100 135 Z" fill="#e85d75" />
      <path d="M100 135 Q100 146 88 146 M100 135 Q100 146 112 146" stroke="#2b1640" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* kumis */}
      <path d="M40 128 H64 M42 140 L64 136 M160 128 H136 M158 140 L136 136" stroke="#2b1640" strokeWidth="2.5" strokeLinecap="round" />
      {/* pita */}
      <path d="M70 186 L100 196 L70 210 Z M130 186 L100 196 L130 210 Z" fill="#7b5cff" />
      <circle cx="100" cy="196" r="8" fill="#a48bff" />
    </svg>
  );
}
