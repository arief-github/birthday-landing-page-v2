import { useState } from "react";
import { Mascot } from "./Mascot";

/**
 * Tirai pembuka. Animasi "turun" 100% CSS (lihat .curtain di app.css),
 * jadi tetap berjalan tanpa JavaScript. Dengan JS, tirai bisa diketuk untuk dilewati.
 */
export function Curtain({ to, line }: { to: string; line: string }) {
  const [skipped, setSkipped] = useState(false);
  return (
    <div
      className="curtain"
      data-skipped={skipped || undefined}
      onClick={() => setSkipped(true)}
      aria-hidden="true"
    >
      <div className="curtain__inner">
        <Mascot className="curtain__mascot" />
        <p className="curtain__line">{line}</p>
        <p className="curtain__to">untuk {to}</p>
      </div>
      <span className="curtain__fringe" />
    </div>
  );
}
