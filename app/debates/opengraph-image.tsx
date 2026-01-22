import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Agenda de Debates - Elecciones Costa Rica 2026"
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
                backgroundColor: "#1e40af",
                padding: "8px 16px",
                borderRadius: "50px",
                marginBottom: "24px",
              }}
            >
              <span style={{ fontSize: "16px" }}>📺</span>
              <span style={{ color: "#ffffff", fontSize: "16px", fontWeight: 600 }}>
                Cobertura Oficial 2026
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
              Agenda de Debates
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: "24px",
                color: "#94a3b8",
                marginBottom: "32px",
              }}
            >
              Sigue la cobertura oficial de los debates presidenciales
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

          {/* Right side - Visual elements */}
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
            {/* Debate timeline dots */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "24px",
                padding: "32px 40px",
              }}
            >
              {[
                { date: "9 Ene", label: "TSE", color: "#3b82f6" },
                { date: "13 Ene", label: "Canal 15", color: "#8b5cf6" },
                { date: "20 Ene", label: "Repretel", color: "#f59e0b" },
                { date: "27 Ene", label: "Teletica", color: "#10b981" },
              ].map((debate, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      borderRadius: "50%",
                      backgroundColor: debate.color,
                    }}
                  />
                  <div style={{ color: "#94a3b8", fontSize: "18px", width: "80px" }}>
                    {debate.date}
                  </div>
                  <div style={{ color: "#ffffff", fontSize: "18px", fontWeight: 600 }}>
                    {debate.label}
                  </div>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#64748b",
                  fontSize: "16px",
                  marginTop: "8px",
                }}
              >
                <span>+5 debates mas</span>
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
