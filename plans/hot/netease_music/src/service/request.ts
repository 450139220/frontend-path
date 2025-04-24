const baseUrl = import.meta.env.VITE_BASE_URL;

export async function request(url: string, options?: RequestInit) {
  const res = await fetch(baseUrl + url, options);
  if (!res.ok) {
    throw new Error(`request error: ${res.status}`);
  }
  return res.json();
}
