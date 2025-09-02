export function formatNumber(n: number): string {
try {
return new Intl.NumberFormat().format(n);
} catch {
return String(n);
}
}


export function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d); // e.g., 21 Jun 2022
  } catch {
    return iso;
  }
}