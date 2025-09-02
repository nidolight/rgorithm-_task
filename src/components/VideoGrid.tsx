import React from "react";
import type { Item } from "../types/video";
import VideoCard from "./VideoCard";


export default function VideoGrid({ items }: { items: Item[] }) {
return (
<div style={styles.grid}>
{items.map((it) => (
<VideoCard key={it.id} item={it} />
))}
</div>
);
}


const styles: Record<string, React.CSSProperties> = {
grid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 },
};