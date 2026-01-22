import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Transparencia - Votar Importa"
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
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1f2937 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1f2937 0%, transparent 50%)",
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
            height: "100%",
            padding: "60px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "#374151",
              padding: "8px 20px",
              borderRadius: "50px",
              marginBottom: "24px",
            }}
          >
            <span style={{ fontSize: "18px" }}>⚖️</span>
            <span style={{ color: "#ffffff", fontSize: "18px", fontWeight: 600 }}>
              Plataforma Neutral
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: "16px",
              letterSpacing: "-2px",
              textAlign: "center",
            }}
          >
            Transparencia
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "28px",
              color: "#94a3b8",
              marginBottom: "48px",
              textAlign: "center",
            }}
          >
            Como funciona esta plataforma
          </div>

          {/* Three principles */}
          <div
            style={{
              display: "flex",
              gap: "24px",
            }}
          >
            {[
              { icon: "📄", label: "Fuentes Oficiales", desc: "Datos del TSE" },
              { icon: "🤖", label: "IA Transparente", desc: "Codigo abierto" },
              { icon: "⚖️", label: "100% Neutral", desc: "Sin sesgos" },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "16px",
                  padding: "24px 32px",
                  gap: "12px",
                }}
              >
                <span style={{ fontSize: "32px" }}>{item.icon}</span>
                <span style={{ color: "#ffffff", fontSize: "18px", fontWeight: 600 }}>
                  {item.label}
                </span>
                <span style={{ color: "#64748b", fontSize: "14px" }}>
                  {item.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom info */}
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#64748b",
              fontSize: "18px",
            }}
          >
            <span>🗳️</span>
            <span>votarimporta.cr</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
