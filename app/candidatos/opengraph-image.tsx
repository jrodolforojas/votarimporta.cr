import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Candidatos Presidenciales - Elecciones Costa Rica 2026"
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
            <span style={{ fontSize: "18px" }}>👥</span>
            <span style={{ color: "#ffffff", fontSize: "18px", fontWeight: 600 }}>
              Elecciones 2026
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
            Candidatos Presidenciales
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
            Conoce a quienes aspiran a la presidencia
          </div>

          {/* Candidate avatars placeholder */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "-16px",
            }}
          >
            {["#187047", "#ce1126", "#1e40af", "#f59e0b", "#7c3aed", "#ec4899"].map(
              (color, i) => (
                <div
                  key={i}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    backgroundColor: color,
                    border: "3px solid #0a0a0a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: i > 0 ? "-16px" : "0",
                  }}
                >
                  <span style={{ fontSize: "24px", color: "#ffffff", fontWeight: 700 }}>
                    {["AR", "CD", "FA", "EF", "JA", "+4"][i]}
                  </span>
                </div>
              )
            )}
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
