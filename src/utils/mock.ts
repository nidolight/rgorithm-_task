import type { Item } from "../types/video";


export function makeMockVideos(n: number): Item[] {
const cats = ["Tutorial", "Review", "Vlog", "Music", "Tech", "Game"] as const;
const out: Item[] = [];
for (let i = 1; i <= n; i++) {
const category = cats[i % cats.length];
out.push({
id: i,
title: `샘플 영상 제목 ${i}`,
category,
length: randomLength(),
thumb: `https://picsum.photos/seed/video-${i}/800/450`,
uid: `uid-${i}`,
link: "#",
view: Math.floor(Math.random() * 1_000_000),
isDeleted: 0,
created_by: 1,
created_at: new Date().toISOString(),
updated_at: new Date(Date.now() - Math.random() * 1000 * 3600 * 24 * 180).toISOString(),
});
}
return out;
}


function randomLength(): string {
const m = 1 + Math.floor(Math.random() * 59);
const s = Math.floor(Math.random() * 60);
return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}