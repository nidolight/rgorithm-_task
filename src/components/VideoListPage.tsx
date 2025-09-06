import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "./SearchBar";
import VideoGrid from "./VideoGrid";
import Pagination from "./Pagination";
import type { Item } from "../types/video";
import type { ApiResponse } from "../types/api";
import { fetchVideoList } from "../api/client";

export default function VideoListPage() {
const [keyword, setKeyword] = useState<string>("");
const [query, setQuery] = useState<string>(""); // 제출된 검색어
const [page, setPage] = useState<number>(1);


// 서버 데이터
const [items, setItems] = useState<Item[]>([]);
const [lastPage, setLastPage] = useState<number>(1);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);


// 데이터 가져오기 (page, query 변경 시)
useEffect(() => {
const controller = new AbortController();
async function run() {
setLoading(true);
setError(null);
try {
const json: ApiResponse = await fetchVideoList(page, query || undefined, controller.signal);
setItems(json.data || []);
// 서버가 보낸 페이지 기준으로 동기화 (안전)
setPage(json.current_page || 1);
setLastPage(json.last_page || 1);
} catch (e: any) {
if (e.name !== "AbortError") setError(e.message || "불러오기 실패");
} finally {
setLoading(false);
}
}
run();
return () => controller.abort();
}, [page, query]);

const onSubmit = () => {
setPage(1);
setQuery(keyword.trim());
};


const shouldShowInitialSkeleton =
  !error && !query && items.length === 0; // ✅ 초기 진입(검색 전) 빈 결과면 스켈레톤

const content = useMemo(() => {
  if (loading || shouldShowInitialSkeleton) {
    return <VideoGrid items={[]} loading skeletonCount={9} />;
  }
  if (error) {
    return (
      <div style={styles.state}>
        <div style={{ color: "#b91c1c" }}>불러오는 중 오류가 발생했습니다: {error}</div>
        <button style={styles.retryBtn} onClick={() => setPage((p) => p)}>Retry</button>
      </div>
    );
  }
  if (!items.length) {
    // ✅ 이제부터는 "검색 후"에만 빈 상태 노출 (query가 있을 때)
    return (
      <div style={styles.empty}>
        <div style={{ fontSize: 40 }}>🔎</div>
        <div>검색 결과가 없습니다{query ? `: "${query}"` : ""}.</div>
      </div>
    );
  }
  return <VideoGrid items={items} />;
}, [loading, error, items, query, shouldShowInitialSkeleton]);

return (
<div style={styles.container}>
<header style={styles.header}>
<h1 style={styles.heading}>알고리즘코리아 React 과제</h1>
<SearchBar value={keyword} onChange={setKeyword} onSubmit={onSubmit} placeholder="제목 검색" />
{query && <div style={styles.searchHint}>검색어: <b>{query}</b></div>}
</header>


{content}


<Pagination current={page} last={lastPage} onPageChange={setPage} disabled={loading} />


<footer style={styles.footerInfo}>
current_page: <code>{page}</code> / last_page: <code>{lastPage}</code>
</footer>
</div>
);
}

const styles: Record<string, React.CSSProperties> = {
container: { maxWidth: 1120, margin: "0 auto", padding: 20, background: "linear-gradient(180deg, #fafafa 0%, #ffffff 60%)" },
header: { display: "grid", gap: 14, marginBottom: 14 },
heading: { fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: 0.2 },
searchHint: { color: "#6b7280", fontSize: 12 },
empty: { display: "grid", placeItems: "center", gap: 10, minHeight: 240, border: "1px dashed #d1d5db", borderRadius: 16, color: "#6b7280", background: "#ffffff" },
footerInfo: { textAlign: "center", color: "#9ca3af", fontSize: 12, marginTop: 14 },
state: { display: "grid", placeItems: "center", gap: 10, minHeight: 160, color: "#6b7280" },
retryBtn: { border: "1px solid #d1d5db", borderRadius: 8, padding: "6px 10px", background: "#fff", cursor: "pointer" },
};

