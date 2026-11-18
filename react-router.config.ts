import type { Config } from "@react-router/dev/config";

export default {
  // Hosting statis: tidak ada server runtime.
  // HTML untuk "/" dirender saat build (prerender), lalu di-hydrate di browser.
  // Hasilnya: konten & alur inti tetap jalan walau JavaScript mati/lambat.
  ssr: false,
  prerender: ["/"],
} satisfies Config;
