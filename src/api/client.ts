const API_PATH = "/api/tada/list";

export async function fetchVideoList(page: number, keyword?: string, signal?: AbortSignal) {
  const url = new URL(API_PATH, window.location.origin);
  url.searchParams.set("page", String(page));
  if (keyword) url.searchParams.set("keyword", keyword);

  const res = await fetch(url.toString(), { headers: { Accept: "application/json" }, signal });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.json();
}