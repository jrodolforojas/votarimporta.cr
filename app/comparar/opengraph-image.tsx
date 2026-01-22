import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Compara Candidatos - Elecciones Costa Rica 2026"
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
            "radial-gradient(circle at 25% 25%, #4c1d95 0%, transparent 50%), radial-gradient(circle at 75% 75%, #4c1d95 0%, transparent 50%)",
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
              backgroundColor: "#7c3aed",
              padding: "8px 20px",
              borderRadius: "50px",
              marginBottom: "24px",
            }}
          >
            <span style={{ fontSize: "18px" }}>⚔️</span>
            <span style={{ color: "#ffffff", fontSize: "18px", fontWeight: 600 }}>
              Herramienta de Comparacion
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
            Compara Candidatos
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
            Lado a lado - Propuestas y posiciones
          </div>

          {/* VS Visual */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "32px",
            }}
          >
            {/* Left candidate placeholder */}
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#187047",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "4px solid rgba(255,255,255,0.2)",
              }}
            >
              <span style={{ fontSize: "48px", color: "#ffffff", fontWeight: 700 }}>
                A
              </span>
            </div>

            {/* VS Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#7c3aed",
                border: "4px solid rgba(255,255,255,0.3)",
              }}
            >
              <span style={{ fontSize: "32px", color: "#ffffff", fontWeight: 800 }}>
                VS
              </span>
            </div>

            {/* Right candidate placeholder */}
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#ce1126",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "4px solid rgba(255,255,255,0.2)",
              }}
            >
              <span style={{ fontSize: "48px", color: "#ffffff", fontWeight: 700 }}>
                B
              </span>
            </div>
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
