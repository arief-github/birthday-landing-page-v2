import { useState, type CSSProperties } from "react";

const COLORS = ["#ff6b9a", "#ffd166", "#7bdff2", "#a48bff", "#06d6a0", "#ff9f1c"];

interface Piece {
  id: number;
  style: CSSProperties;
  round: boolean;
}

function makePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    round: Math.random() > 0.6,
    style: {
      "--x": `${Math.random() * 100}vw`,
      "--drift": `${(Math.random() - 0.5) * 30}vw`,
      "--spin": `${(Math.random() - 0.5) * 1440}deg`,
      "--dur": `${2.6 + Math.random() * 2.2}s`,
      "--delay": `${Math.random() * 0.6}s`,
      "--size": `${6 + Math.random() * 8}px`,
      "--color": COLORS[id % COLORS.length],
    } as CSSProperties,
  }));
}

/** Confetti murni CSS (tanpa library). Hanya di-mount setelah interaksi, jadi aman dari hydration mismatch. */
export function Confetti({ count = 90 }: { count?: number }) {
  const [pieces] = useState(() => makePieces(count));
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <i key={p.id} className={p.round ? "confetti__piece is-round" : "confetti__piece"} style={p.style} />
      ))}
    </div>
  );
}
