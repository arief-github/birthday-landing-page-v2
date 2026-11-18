# Kartu Ucapan Ulang Tahun — React Router v7

Satu halaman, responsive, prerender statis, **progressive enhancement**.

## Jalankan
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # hasil: build/client (HTML statis + aset)
npm run preview    # cek hasil build di http://localhost:4173
npm run typecheck
```

## Ubah isi (tanpa menyentuh komponen)
| Apa | Di mana |
|---|---|
| Nama penerima, pengirim, teks tirai, musik | `app/data/card.ts` |
| Slide carousel (judul, teks, gambar/video, warna) | `app/data/slides.ts` |
| File gambar/video slide | `public/slides/` → rujuk sebagai `/slides/nama-file.jpg` |
| Musik latar | `public/audio/` (default: rekaman music box "Happy Birthday" — melodi domain publik) |
| Maskot | `app/components/Mascot.tsx` (SVG orisinal, ganti bebas) |

Contoh slide video:
```ts
{ id: "video", title: "Pesan video", text: "…", media: { type: "video", src: "/slides/pesan.mp4", poster: "/slides/pesan.jpg", alt: "Video ucapan" }, tone: "sky" }
```
Tips gambar: rasio 4:3, lebar ±1200px, format WebP/JPEG < 300 KB.

## Alur & progressive enhancement
| Tahap | Tanpa JavaScript | Dengan JavaScript |
|---|---|---|
| 1. Tirai turun | Animasi CSS otomatis | Sama + bisa diketuk untuk dilewati |
| 2. Amplop muncul | Animasi CSS | Sama |
| 3. Klik amplop | `<a href="#kartu">` → CSS `:target` menampilkan kartu | Animasi flap terbuka, surat naik, confetti, musik diputar |
| 4. Carousel | Swipe native (scroll-snap) + link `#slide-n` | Scroll halus, indikator aktif, keyboard ← → Home End, screen reader |
| Musik | Pemutar `<audio controls>` native | Tombol ♫ / mute |

Juga menghormati `prefers-reduced-motion` (tanpa animasi & confetti).

## Deploy (hosting statis)
Upload/arahkan ke folder **`build/client`**.
- **Vercel / Netlify / Cloudflare Pages**: build command `npm run build`, output `build/client`.
- **GitHub Pages di sub-path** (mis. `user.github.io/kartu/`): set `basename: "/kartu/"` di `react-router.config.ts` dan `base: "/kartu/"` di `vite.config.ts`, lalu ganti path aset di `app/data/*.ts` agar diawali `/kartu/`.

## Struktur
```
app/
  routes/home.tsx        # state machine: envelope → opening → card
  components/            # Curtain, Envelope, Carousel, Confetti, Mascot
  hooks/                 # useHydrated, usePrefersReducedMotion
  data/                  # card.ts, slides.ts  ← edit di sini
  app.css                # semua animasi & layout responsive
react-router.config.ts   # ssr: false + prerender ["/"]
```
