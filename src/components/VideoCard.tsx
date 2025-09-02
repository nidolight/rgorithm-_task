import React from "react";
import type { Item } from "../types/video";
import { formatDate, formatNumber } from "../utils/format";


export default function VideoCard({ item }: { item: Item }) {
return (
<a href={item.link || "#"} target="_blank" rel="noreferrer" style={styles.card}>
<div style={styles.thumbWrap}>
<img src={item.thumb} alt={item.title} style={styles.thumbImg} loading="lazy" />
{/* 썸네일: 우하단 재생시간만 */}
<div style={{ ...styles.badge, ...styles.badgeBottomRight }}>{item.length}</div>
</div>
<div style={styles.cardBody}>
{/* 제목 */}
<div style={styles.title} title={item.title}>{item.title}</div>
{/* 제목 아래: (좌) 카테고리 + 수정일자 / (우) 조회수 */}
<div style={styles.infoRow}>
<div style={styles.infoLeft}>
<span style={styles.categoryPill}>{item.category}</span>
<span style={styles.updatedText}>{formatDate(item.updated_at)}</span>
</div>
<div style={styles.infoRight}>👁 {formatNumber(item.view)}</div>
</div>
</div>
</a>
);
}


const styles: Record<string, React.CSSProperties> = {
card: {
display: "block",
border: "1px solid #eef0f4",
overflow: "hidden",
textDecoration: "none",
color: "inherit",
background: "#fff",
boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
transition: "transform .18s ease, box-shadow .18s ease",
},
thumbWrap: { position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#f3f4f6", overflow: "hidden" },
thumbImg: { width: "100%", height: "100%", objectFit: "cover", transform: "scale(1)", transition: "transform .25s ease" },
badge: { position: "absolute", padding: "2px 5px", fontSize: 12, color: "#fff",background: "rgba(53, 51, 51, 0.92)", border: "1px solid rgba(0,0,0,0.06)", backdropFilter: "blur(4px)", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
badgeBottomRight: { right: 10, bottom: 10, textAlign: "right" },
cardBody: { padding: 12 },
title: { fontWeight: 700, fontSize: 15, lineHeight: 1.35, maxHeight: 42, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as any, marginBottom: 8 },
infoRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 },
infoLeft: { display: "flex", alignItems: "center", gap: 8, color: "#374151", fontSize: 12 },
infoRight: { fontSize: 12, color: "#4b5563", whiteSpace: "nowrap" },
categoryPill: { display: "inline-block", fontSize: 12, color: "#fff", background: "#6d9af3ff", border: "1px solid #e5e7eb", padding: "3px 8px"},
updatedText: { fontSize: 12, color: "#6b7280" },
};