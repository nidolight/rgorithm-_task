import React, { useMemo } from "react";

interface PaginationProps {
  current: number;
  last: number;
  onPageChange: (p: number) => void;
  disabled?: boolean; // ⬅️ 추가
}

export default function Pagination({ current, last, onPageChange, disabled = false }: PaginationProps) {
  const pages = useMemo(() => {
    const out: Array<number | "…"> = [];
    const add = (n: number) => out.push(Math.min(Math.max(1, n), last));
    if (last <= 7) {
      for (let i = 1; i <= last; i++) out.push(i);
      return out;
    }
    out.push(1);
    const left = Math.max(2, current - 1);
    const right = Math.min(last - 1, current + 1);
    if (left > 2) out.push("…");
    for (let i = left; i <= right; i++) add(i);
    if (right < last - 1) out.push("…");
    out.push(last);
    return out;
  }, [current, last]);

  const isFirst = current <= 1;
  const isLast = current >= last;

  return (
    <div style={styles.paginationWrap} aria-disabled={disabled || undefined}>
      <button
        style={{ ...styles.pageBtn, ...(disabled ? styles.pageBtnDisabled : undefined) }}
        disabled={disabled || isFirst}
        onClick={() => onPageChange(1)}
      >
        « First
      </button>

      <button
        style={{ ...styles.pageBtn, ...(disabled ? styles.pageBtnDisabled : undefined) }}
        disabled={disabled || isFirst}
        onClick={() => onPageChange(current - 1)}
      >
        ‹ Prev
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`e-${i}`} style={styles.ellipsis}>…</span>
        ) : (
          <button
            key={p}
            style={{
              ...styles.pageBtn,
              ...(p === current ? styles.pageBtnActive : undefined),
              ...(disabled ? styles.pageBtnDisabled : undefined),
            }}
            disabled={disabled}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        style={{ ...styles.pageBtn, ...(disabled ? styles.pageBtnDisabled : undefined) }}
        disabled={disabled || isLast}
        onClick={() => onPageChange(current + 1)}
      >
        Next ›
      </button>

      <button
        style={{ ...styles.pageBtn, ...(disabled ? styles.pageBtnDisabled : undefined) }}
        disabled={disabled || isLast}
        onClick={() => onPageChange(last)}
      >
        Last »
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  paginationWrap: { display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 18 },
  pageBtn: {
    padding: "8px 12px",
    border: "1px solid #fff",
    borderRadius: 10,
    background: "#fff",
    cursor: "pointer",
    fontSize: 13,
    transition: "all .18s ease",
  },
  pageBtnActive: { background: "#fff", fontWeight: 1000 },
  pageBtnDisabled: { opacity: 0.5, cursor: "not-allowed", filter: "grayscale(0.2)" },
  ellipsis: { padding: "0 6px", color: "#6b7280ff" },
};
