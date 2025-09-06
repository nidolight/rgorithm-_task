import React from "react";
import type { Item } from "../types/video";
import VideoCard from "./VideoCard";
import SkeletonVideoCard from "./SkeletonVideoCard";

export default function VideoGrid({
  items,
  loading = false,
  skeletonCount = 9, // 3열 기준 3행
}: {
  items: Item[];
  loading?: boolean;
  skeletonCount?: number;
}) {
  return (
    <div style={styles.grid}>
      {loading
        ? Array.from({ length: skeletonCount }).map((_, i) => <SkeletonVideoCard key={`sk-${i}`} />)
        : items.map((it) => <VideoCard key={it.id} item={it} />)}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  grid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 },
};
