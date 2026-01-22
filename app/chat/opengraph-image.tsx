import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Chat con IA - Elecciones Costa Rica 2026"
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
            "radial-gradient(circle at 25% 25%, #0e7490 0%, transparent 50%), radial-gradient(circle at 75% 75%, #0e7490 0%, transparent 50%)",
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
            flexDirection: "row",
            height: "100%",
            padding: "60px",
            gap: "60px",
          }}
        >
          {/* Left side - Text content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
            }}
          >
            {/* Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#0891b2",
                padding: "8px 16px",
                borderRadius: "50px",
                marginBottom: "24px",
              }}
            >
              <span style={{ fontSize: "16px" }}>✨</span>
              <span style={{ color: "#ffffff", fontSize: "16px", fontWeight: 600 }}>
                Asistente IA
              </span>
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: "56px",
                fontWeight: 800,
                color: "#ffffff",
                marginBottom: "16px",
                letterSpacing: "-1px",
                lineHeight: 1.1,
              }}
            >
              Chat con IA
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: "24px",
                color: "#94a3b8",
                marginBottom: "32px",
              }}
            >
              Pregunta sobre candidatos y propuestas
            </div>

            {/* Site branding */}
            <div
              style={{
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

          {/* Right side - Chat visual */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              gap: "16px",
            }}
          >
            {/* Chat bubbles */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              {/* User message */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#0891b2",
                    padding: "16px 20px",
                    borderRadius: "20px 20px 4px 20px",
                    color: "#ffffff",
                    fontSize: "16px",
                    maxWidth: "280px",
                  }}
                >
                  Cual es el plan de educacion?
                </div>
              </div>

              {/* AI message */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    padding: "16px 20px",
                    borderRadius: "20px 20px 20px 4px",
                    color: "#ffffff",
                    fontSize: "16px",
                    maxWidth: "300px",
                  }}
                >
                  Segun el plan de gobierno...
                </div>
              </div>

              {/* Suggested questions */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginTop: "8px",
                }}
              >
                {["Seguridad", "Empleo", "Salud"].map((q, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: "rgba(8, 145, 178, 0.2)",
                      border: "1px solid rgba(8, 145, 178, 0.4)",
                      padding: "8px 16px",
                      borderRadius: "50px",
                      color: "#22d3ee",
                      fontSize: "14px",
                    }}
                  >
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
