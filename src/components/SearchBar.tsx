import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, onSubmit, placeholder }: SearchBarProps) {
  return (
    <div style={styles.searchBar}>
      <button onClick={onSubmit} style={styles.searchButton}>Search</button>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        placeholder={placeholder || "검색어를 입력하세요"}
        style={styles.searchInput}
      />
      {value && (
        <button onClick={() => onChange("")} style={styles.clearButton}>Clear</button>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  searchBar: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    border: "1px solid #e5e7eb",
    padding: 10,
    borderRadius: 14, // 검색창만 둥글게 유지
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  searchButton: {
    padding: "10px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: 0,
    background: "#ffffff",
    cursor: "pointer",
    transition: "all .2s ease",
  },
  searchInput: {
    flex: 1,
    height: 40,
    padding: "0 12px",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    outline: "none",
  },
  clearButton: {
    padding: "8px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: 0,
    background: "#fff",
    cursor: "pointer",
    fontSize: 12,
    transition: "all .2s ease",
  },
};
