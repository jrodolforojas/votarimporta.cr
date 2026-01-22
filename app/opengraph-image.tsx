import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Votar Importa - Elecciones Costa Rica 2026"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1e3a5f 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1e3a5f 0%, transparent 50%)",
        }}
      >
        {/* Costa Rica flag stripe accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            display: "flex",
          }}
        >
          <div style={{ flex: 1, backgroundColor: "#002b7f" }} />
          <div style={{ flex: 1, backgroundColor: "#ffffff" }} />
          <div style={{ flex: 2, backgroundColor: "#ce1126" }} />
          <div style={{ flex: 1, backgroundColor: "#ffffff" }} />
          <div style={{ flex: 1, backgroundColor: "#002b7f" }} />
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px",
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              backgroundColor: "#ffffff",
              borderRadius: "20px",
              marginBottom: "32px",
              fontSize: "48px",
            }}
          >
            🗳️
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "16px",
              letterSpacing: "-2px",
            }}
          >
            Votar Importa
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "32px",
              color: "#94a3b8",
              marginBottom: "40px",
            }}
          >
            Elecciones Costa Rica 2026
          </div>

          {/* Tagline */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              backgroundColor: "rgba(255,255,255,0.1)",
              padding: "16px 32px",
              borderRadius: "50px",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div style={{ fontSize: "24px", color: "#ffffff" }}>
              Tu voto decide el futuro
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            display: "flex",
            alignItems: "center",
            gap: "24px",
            color: "#64748b",
            fontSize: "18px",
          }}
        >
          <span>Compara candidatos</span>
          <span style={{ color: "#334155" }}>•</span>
          <span>Explora propuestas</span>
          <span style={{ color: "#334155" }}>•</span>
          <span>Decide informado</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
