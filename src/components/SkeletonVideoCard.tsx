// src/components/SkeletonVideoCard.tsx
import React from "react";

export default function SkeletonVideoCard() {
  return (
    <div style={styles.card} aria-hidden="true">
      <div style={{ ...styles.thumbWrap, ...styles.shimmer }} />
      <div style={styles.cardBody}>
        <div style={{ ...styles.line, width: "90%" }} />
        <div style={{ ...styles.line, width: "70%", marginTop: 6 }} />

        <div style={styles.infoRow}>
          <span style={{ ...styles.pill, ...styles.shimmer }} />
          <span style={{ ...styles.dot, ...styles.shimmer }} />
          <span style={{ ...styles.view, ...styles.shimmer }} />
        </div>
      </div>

      <style>
        {`@keyframes skeletonShimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }`}
      </style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    display: "block",
    border: "1px solid #eef0f4",
    overflow: "hidden",
    background: "#fff",
    boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
    borderRadius: 12,
  },
  thumbWrap: {
    width: "100%",
    aspectRatio: "16 / 9",
    background: "#f3f4f6",
  },
  cardBody: { padding: 12 },
  line: {
    height: 12,
    borderRadius: 6,
    background: "#eef1f5",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 12,
  },
  pill: {
    width: 64,
    height: 20,
    borderRadius: 999,
    background: "#eef1f5",
  },
  dot: {
    width: 80,
    height: 14,
    borderRadius: 6,
    background: "#eef1f5",
    marginLeft: 4,
  },
  view: {
    marginLeft: "auto",
    width: 54,
    height: 14,
    borderRadius: 6,
    background: "#eef1f5",
  },
  shimmer: {
    backgroundImage:
      "linear-gradient(90deg, #eef1f5 0%, #f6f7f9 50%, #eef1f5 100%)",
    backgroundSize: "200% 100%",
    animation: "skeletonShimmer 1.2s ease-in-out infinite",
  },
};
