import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Temas Clave 2026 - Elecciones Costa Rica"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  const topics = [
    { label: "Costo de Vida", color: "#10b981", icon: "📈" },
    { label: "Seguridad", color: "#3b82f6", icon: "🛡️" },
    { label: "Salud", color: "#ec4899", icon: "💊" },
    { label: "Transporte", color: "#f59e0b", icon: "🚌" },
    { label: "Empleo", color: "#8b5cf6", icon: "💼" },
    { label: "Educacion", color: "#06b6d4", icon: "🎓" },
    { label: "Ambiente", color: "#22c55e", icon: "🌿" },
  ]

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
              backgroundColor: "#f97316",
              padding: "8px 20px",
              borderRadius: "50px",
              marginBottom: "24px",
            }}
          >
            <span style={{ fontSize: "18px" }}>🔥</span>
            <span style={{ color: "#ffffff", fontSize: "18px", fontWeight: 600 }}>
              Temas Clave 2026
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
              textAlign: "center",
            }}
          >
            Los 7 temas que importan
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            Compara las propuestas de cada candidato
          </div>

          {/* Topic pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
              maxWidth: "800px",
            }}
          >
            {topics.map((topic, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: `${topic.color}22`,
                  border: `2px solid ${topic.color}`,
                  padding: "10px 20px",
                  borderRadius: "50px",
                }}
              >
                <span style={{ fontSize: "18px" }}>{topic.icon}</span>
                <span style={{ color: topic.color, fontSize: "16px", fontWeight: 600 }}>
                  {topic.label}
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
