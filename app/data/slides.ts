/**
 * ✏️  UBAH DI SINI — isi carousel kartu ucapan.
 *
 * - Tambah/hapus/urutkan slide cukup dengan mengedit array di bawah.
 * - Taruh file gambar/video di /public/slides lalu rujuk dengan path "/slides/nama-file".
 * - `alt` WAJIB diisi untuk gambar (aksesibilitas & tampil bila gambar gagal dimuat).
 * - `tone` mengatur warna latar slide.
 */
export type SlideMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

export type SlideTone = "rose" | "gold" | "sky" | "mint" | "lilac";

export interface Slide {
  id: string;
  title: string;
  text: string;
  media?: SlideMedia;
  tone?: SlideTone;
}

export const slides: Slide[] = [
  {
    id: "selamat",
    title: "Selamat Ulang Tahun Ade! 🎉",
    text: "Hari ini dunia merayakan satu hal penting: kehadiranmu. Terima kasih sudah jadi dirimu sendiri dan kuat.",
    media: { type: "image", src: "/slides/cake.svg", alt: "Ilustrasi kue ulang tahun dengan lilin menyala" },
    tone: "rose",
  },
  {
    id: "kenangan",
    title: "Untuk semua kenangan",
    text: "Tawa, cerita larut malam, dan petualangan kecil kita — semuanya tersimpan rapi di sini.",
    media: { type: "image", src: "/slides/balloons.svg", alt: "Ilustrasi balon warna-warni melayang" },
    tone: "sky",
  },
  {
    id: "doa",
    title: "Doa terbaik",
    text: "Semoga sehat selalu, rezeki lancar, dan setiap langkahmu tahun ini terasa ringan.",
    media: { type: "image", src: "/slides/stars.svg", alt: "Ilustrasi langit malam penuh bintang" },
    tone: "lilac",
  },
  {
    id: "hadiah",
    title: "Satu hadiah kecil",
    text: "Bukan barang, tapi doa lagi: semoga tercapai impian ke jepang.",
    media: { type: "image", src: "/slides/gift.svg", alt: "Ilustrasi kotak hadiah dengan pita" },
    tone: "gold",
  },
  {
    id: "penutup",
    title: "Have a wonderful day!",
    text: "Nikmati harimu sepenuhnya. Kamu pantas mendapatkan semua kebahagiaan ini.",
    tone: "mint",
  },
];
