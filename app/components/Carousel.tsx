import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import type { Slide } from "~/data/slides";
import { usePrefersReducedMotion } from "~/hooks/usePrefersReducedMotion";

const slideId = (i: number) => `slide-${i + 1}`;

/**
 * Carousel berbasis CSS scroll-snap.
 *
 * Tanpa JS : swipe/scroll native + link anchor (#slide-n) untuk tombol ‹ › dan titik.
 * Dengan JS: link yang sama di-intercept → scroll halus, indikator aktif,
 *            navigasi keyboard (← →), dan pengumuman screen reader.
 */
export function Carousel({ slides }: { slides: Slide[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(total - 1, index));
      track.scrollTo({ left: clamped * track.clientWidth, behavior: reducedMotion ? "auto" : "smooth" });
    },
    [total, reducedMotion],
  );

  // Sinkronkan indikator aktif dengan posisi scroll (swipe, trackpad, tombol — semuanya).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setActive(Math.round(track.scrollLeft / Math.max(1, track.clientWidth)));
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Intercept link anchor: JS ada → scroll halus tanpa mengubah URL / melompat halaman.
  const handleNav = (index: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    goTo(index);
  };

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
    if (e.key === "Home") { e.preventDefault(); goTo(0); }
    if (e.key === "End") { e.preventDefault(); goTo(total - 1); }
  };

  return (
    <div className="carousel" role="region" aria-roledescription="carousel" aria-label="Kartu ucapan">
      <div
        ref={trackRef}
        className="carousel__track"
        tabIndex={0}
        onKeyDown={handleKey}
        aria-label="Geser untuk melihat ucapan berikutnya"
      >
        {slides.map((slide, i) => (
          <article
            key={slide.id}
            id={slideId(i)}
            className={`slide tone-${slide.tone ?? "rose"}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} dari ${total}`}
          >
            {slide.media && (
              <figure className="slide__media">
                {slide.media.type === "image" ? (
                  <img
                    src={slide.media.src}
                    alt={slide.media.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    draggable={false}
                  />
                ) : (
                  <video
                    src={slide.media.src}
                    poster={slide.media.poster}
                    aria-label={slide.media.alt}
                    controls
                    playsInline
                    preload="metadata"
                  />
                )}
              </figure>
            )}
            <div className={slide.media ? "slide__body" : "slide__body slide__body--solo"}>
              <h2 className="slide__title">{slide.title}</h2>
              <p className="slide__text">{slide.text}</p>
            </div>

            {/* Navigasi per-slide: berfungsi penuh tanpa JS */}
            {i > 0 && (
              <a className="slide__nav slide__nav--prev" href={`#${slideId(i - 1)}`} onClick={handleNav(i - 1)} aria-label="Slide sebelumnya">
                ‹
              </a>
            )}
            {i < total - 1 && (
              <a className="slide__nav slide__nav--next" href={`#${slideId(i + 1)}`} onClick={handleNav(i + 1)} aria-label="Slide berikutnya">
                ›
              </a>
            )}
          </article>
        ))}
      </div>

      <nav className="carousel__dots" aria-label="Pilih slide">
        {slides.map((slide, i) => (
          <a
            key={slide.id}
            href={`#${slideId(i)}`}
            onClick={handleNav(i)}
            className="carousel__dot"
            aria-current={i === active ? "true" : undefined}
            aria-label={`Ke slide ${i + 1}`}
          />
        ))}
      </nav>

      <p className="sr-only" aria-live="polite">
        Slide {active + 1} dari {total}: {slides[active]?.title}
      </p>
    </div>
  );
}
