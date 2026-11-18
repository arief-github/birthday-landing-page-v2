import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * false saat prerender & render awal (HTML statis), true setelah JS aktif di browser.
 * Dipakai untuk menampilkan kontrol yang HANYA berguna jika ada JavaScript
 * (mis. tombol musik), sehingga pengguna tanpa JS tidak melihat tombol yang mati.
 */
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
