import React from "react";

export default function PaginationComp({ page, setPage, totalPages }) {
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);

  for (let p = start; p <= end; p++) pages.push(p);

  const buttonStyle = (active = false) => ({
    borderRadius: "50%",
    width: 36,
    height: 36,
    margin: "0 2px",
    border: "1px solid #dee2e6",
    backgroundColor: active ? "orange" : "white",
    color: active ? "white" : "black",
    cursor: "pointer",
  });

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        style={buttonStyle()}
      >
        «
      </button>
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        style={buttonStyle()}
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          style={buttonStyle(p === page)}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        style={buttonStyle()}
      >
        ›
      </button>
      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
        style={buttonStyle()}
      >
        »
      </button>
    </div>
  );
}
