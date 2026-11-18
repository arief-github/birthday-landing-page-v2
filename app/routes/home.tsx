import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Route } from "./+types/home";
import { card } from "~/data/card";
import { slides } from "~/data/slides";
import { Curtain } from "~/components/Curtain";
import { Envelope } from "~/components/Envelope";
import { Carousel } from "~/components/Carousel";
import { Confetti } from "~/components/Confetti";
import { useHydrated } from "~/hooks/useHydrated";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

type Phase = "envelope" | "opening" | "card";

const OPEN_DURATION_MS = 1300; // samakan dengan durasi animasi amplop di app.css
const CONFETTI_MS = 6000;

export function meta({}: Route.MetaArgs) {
  const title = `Selamat Ulang Tahun, ${card.to}! 🎂`;
  const description = `Kartu ucapan ulang tahun dari ${card.from}. Buka amplopnya!`;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
  ];
}

/**
 * Dengan `ssr: false` + `prerender`, loader ini dijalankan SEKALI saat build.
 * Data langsung tertanam di HTML statis. Kalau nanti slide ingin diambil dari
 * JSON/CMS, cukup ganti isi loader ini — komponen tidak perlu berubah.
 */
export async function loader() {
  return { card, slides };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { card, slides } = loaderData;
  const [phase, setPhase] = useState<Phase>("envelope");
  const [confetti, setConfetti] = useState(0); // key → bisa diulang
  const [playing, setPlaying] = useState(false);
  const [returned, setReturned] = useState(false); // amplop muncul tanpa jeda tirai saat kartu ditutup
  const audioRef = useRef<HTMLAudioElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hydrated = useHydrated();
  const reducedMotion = usePrefersReducedMotion();

  // Jika halaman dibuka langsung dengan #kartu / #slide-n, sinkronkan state JS dengan CSS :target.
  useEffect(() => {
    if (/^#(kartu|slide-\d+)$/.test(window.location.hash)) setPhase("card");
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };

  const playMusic = () => {
    const audio = audioRef.current;
    if (!audio || !card.music) return;
    // play() HARUS dipanggil langsung di dalam event klik (aturan autoplay browser).
    audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const openEnvelope = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // JS aktif → kita yang mengatur animasi, bukan lompatan #kartu
    if (phase !== "envelope") return;
    playMusic();
    const reveal = () => {
      setPhase("card");
      if (!reducedMotion) {
        setConfetti((n) => n + 1);
        later(() => setConfetti(0), CONFETTI_MS);
      }
    };
    if (reducedMotion) return reveal();
    setPhase("opening");
    later(reveal, OPEN_DURATION_MS);
  };

  const closeCard = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setPhase("envelope");
    setReturned(true);
    setConfetti(0);
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
    document.querySelector(".carousel__track")?.scrollTo({ left: 0 });
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <main className="scene" data-phase={phase} data-returned={returned || undefined}>
      <h1 className="sr-only">Kartu ucapan ulang tahun untuk {card.to}</h1>
      <div className="sky" aria-hidden="true" />

      <Envelope to={card.to} from={card.from} opening={phase === "opening"} onOpen={openEnvelope} />

      <section id="kartu" className="card-stage" aria-label="Isi kartu ucapan">
        <div className="card">
          <Carousel slides={slides} />
          <footer className="card__footer">
            <a href="#" className="card__close" onClick={closeCard}>
              ↺ Tutup kartu
            </a>
            <span className="card__sign">— {card.from}</span>
            {hydrated && card.music && (
              <button
                type="button"
                className="card__music"
                onClick={toggleMusic}
                aria-pressed={playing}
                aria-label={playing ? "Matikan musik" : "Putar musik"}
              >
                {playing ? "♫" : "♪̸"}
              </button>
            )}
          </footer>
          {/* Tanpa JS: tampil sebagai pemutar audio native. Dengan JS: disembunyikan & dikontrol tombol ♫. */}
          {card.music && (
            <audio
              ref={audioRef}
              src={card.music}
              loop
              preload="none"
              controls={!hydrated}
              className={hydrated ? "sr-only" : "card__audio"}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
            />
          )}
        </div>
      </section>

      {confetti > 0 && <Confetti key={confetti} />}
      <Curtain to={card.to} line={card.coverLine} />
    </main>
  );
}
