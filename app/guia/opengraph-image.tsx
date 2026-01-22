import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Guia para Votar - Elecciones Costa Rica 2026"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

// Election date: February 1, 2026
const ELECTION_DATE = new Date("2026-02-01T06:00:00-06:00")

function getDaysUntilElection(): number {
  const now = new Date()
  const diff = ELECTION_DATE.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export default async function Image() {
  const days = getDaysUntilElection()
  const isToday = days === 0
  const isPast = days < 0
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

        {/* Main content - two column layout */}
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
              <span style={{ fontSize: "16px" }}>📖</span>
              <span style={{ color: "#ffffff", fontSize: "16px", fontWeight: 600 }}>
                Guia Oficial 2026
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
              Todo para votar
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: "24px",
                color: "#94a3b8",
                marginBottom: "32px",
              }}
            >
              Tu manual de bolsillo en 2 minutos
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
              gap: "20px",
            }}
          >
            {/* Countdown badge */}
            {!isPast && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: isToday ? "#059669" : "#f59e0b",
                  padding: "12px 24px",
                  borderRadius: "50px",
                  marginBottom: "16px",
                }}
              >
                <span style={{ fontSize: "20px" }}>⏱️</span>
                <span style={{ color: "#ffffff", fontSize: "24px", fontWeight: 700 }}>
                  {isToday ? "HOY ES EL DIA" : `Faltan ${days} dias`}
                </span>
              </div>
            )}

            {/* Date card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "24px",
                padding: "32px 48px",
              }}
            >
              <div style={{ fontSize: "20px", color: "#94a3b8", marginBottom: "8px" }}>
                Domingo
              </div>
              <div
                style={{
                  fontSize: "72px",
                  fontWeight: 800,
                  color: "#3b82f6",
                  lineHeight: 1,
                }}
              >
                1
              </div>
              <div style={{ fontSize: "32px", color: "#ffffff", fontWeight: 600 }}>
                Febrero
              </div>
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#94a3b8",
                  fontSize: "18px",
                }}
              >
                <span>🕕</span>
                <span>6:00 a.m. - 6:00 p.m.</span>
              </div>
            </div>

            {/* Checklist items */}
            <div
              style={{
                display: "flex",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  borderRadius: "50px",
                  padding: "12px 20px",
                  color: "#10b981",
                  fontSize: "16px",
                }}
              >
                <span>✓</span>
                <span>Cedula</span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "rgba(59, 130, 246, 0.2)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "50px",
                  padding: "12px 20px",
                  color: "#3b82f6",
                  fontSize: "16px",
                }}
              >
                <span>📍</span>
                <span>TSE</span>
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
