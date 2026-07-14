"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#fafbfd",
          color: "#1a2433",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <svg
            viewBox="0 0 64 64"
            style={{ width: 48, height: 48, color: "#b83230" }}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="32" cy="32" r="24" />
            <path d="M32 20v16" />
            <circle cx="32" cy="44" r="1.5" fill="currentColor" stroke="none" />
          </svg>
          <h1 style={{ fontSize: 28, fontWeight: 700, marginTop: 16 }}>
            Something went wrong
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#5a6b82",
              maxWidth: 400,
              margin: "12px auto 0",
              lineHeight: 1.6,
            }}
          >
            We hit an unexpected problem. You can try again or visit our
            homepage.
          </p>
          <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                background: "#0057b8",
                color: "#fff",
                border: "none",
                borderRadius: 999,
                padding: "10px 24px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                background: "transparent",
                color: "#0057b8",
                border: "1px solid #d6e6f7",
                borderRadius: 999,
                padding: "10px 24px",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Back to Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
