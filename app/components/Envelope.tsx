import type { MouseEvent } from "react";
import { Mascot } from "./Mascot";

interface EnvelopeProps {
  to: string;
  from: string;
  opening: boolean;
  onOpen: (e: MouseEvent<HTMLAnchorElement>) => void;
}

/**
 * Amplop adalah <a href="#kartu">:
 * - Tanpa JS  → browser lompat ke #kartu, CSS :target menampilkan kartu.
 * - Dengan JS → onOpen() mencegah lompatan dan menjalankan animasi buka amplop.
 */
export function Envelope({ to, from, opening, onOpen }: EnvelopeProps) {
  return (
    <div className="envelope-wrap">
      <a
        href="#kartu"
        className="envelope"
        data-opening={opening || undefined}
        onClick={onOpen}
        aria-label={`Buka kartu ucapan untuk ${to}`}
      >
        <span className="envelope__back" />
        <span className="envelope__letter">
          <Mascot className="envelope__mascot" />
        </span>
        <span className="envelope__pocket" />
        <span className="envelope__flap" />
        <span className="envelope__seal" aria-hidden="true">♥</span>
        <span className="envelope__label">
          {to}
          <small className="envelope__from">dari {from}</small>
        </span>
      </a>
      <p className="envelope__hint">Ketuk amplop untuk membuka</p>
    </div>
  );
}
