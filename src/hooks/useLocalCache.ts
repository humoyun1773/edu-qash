/**
 * useLocalCache — Hook ma'lumotlarini localStorage ga saqlash uchun util.
 * API dan real ma'lumot kelmasa, local cache dan yuklaydi.
 * Ma'lumot o'zgarganda cache ni yangilaydi.
 */

export function getCached<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`eduqash_cache_${key}`);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setCached<T>(key: string, data: T): void {
  try {
    localStorage.setItem(`eduqash_cache_${key}`, JSON.stringify(data));
  } catch {}
}

export function removeCached(key: string): void {
  try {
    localStorage.removeItem(`eduqash_cache_${key}`);
  } catch {}
}
