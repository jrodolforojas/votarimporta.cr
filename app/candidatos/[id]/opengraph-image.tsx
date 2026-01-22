import { ImageResponse } from "next/og"
import { candidatos } from "@/data/candidatos"

export const alt = "Candidato Presidencial - Elecciones Costa Rica 2026"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export async function generateStaticParams() {
  return candidatos.map((candidato) => ({
    id: candidato.id,
  }))
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const candidato = candidatos.find((c) => c.id === id)

  if (!candidato) {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0a0a0a",
            color: "#ffffff",
            fontSize: "48px",
          }}
        >
          Candidato no encontrado
        </div>
      ),
      { ...size }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0a0a0a",
          backgroundImage: `linear-gradient(135deg, ${candidato.color}22 0%, transparent 50%), radial-gradient(circle at 75% 75%, ${candidato.color}33 0%, transparent 50%)`,
        }}
      >
        {/* Top accent with party color */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: candidato.color,
          }}
        />

        {/* Main content - two column layout */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            padding: "60px",
            gap: "48px",
          }}
        >
          {/* Left side - Photo placeholder */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "280px",
                height: "280px",
                borderRadius: "24px",
                backgroundColor: candidato.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `4px solid ${candidato.color}`,
                boxShadow: `0 20px 60px ${candidato.color}44`,
              }}
            >
              {/* If we had the image, we'd use it here */}
              <span
                style={{
                  fontSize: "120px",
                  color: "#ffffff",
                  fontWeight: 800,
                }}
              >
                {candidato.nombre
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")}
              </span>
            </div>
          </div>

          {/* Right side - Info */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
            }}
          >
            {/* Party badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: candidato.color,
                padding: "8px 16px",
                borderRadius: "50px",
                marginBottom: "20px",
              }}
            >
              <span style={{ color: "#ffffff", fontSize: "16px", fontWeight: 600 }}>
                {candidato.partidoSiglas}
              </span>
            </div>

            {/* Name */}
            <div
              style={{
                fontSize: "56px",
                fontWeight: 800,
                color: "#ffffff",
                marginBottom: "12px",
                letterSpacing: "-1px",
                lineHeight: 1.1,
              }}
            >
              {candidato.nombre}
            </div>

            {/* Party full name */}
            <div
              style={{
                fontSize: "24px",
                color: "#94a3b8",
                marginBottom: "24px",
              }}
            >
              {candidato.partido}
            </div>

            {/* Details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "#94a3b8",
                  fontSize: "18px",
                }}
              >
                <span
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    padding: "6px 12px",
                    borderRadius: "8px",
                  }}
                >
                  {candidato.posicionPolitica}
                </span>
                <span
                  style={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    padding: "6px 12px",
                    borderRadius: "8px",
                  }}
                >
                  {candidato.ideologia}
                </span>
              </div>
            </div>

            {/* Site branding */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#64748b",
                fontSize: "16px",
                marginTop: "32px",
              }}
            >
              <span>🗳️</span>
              <span>votarimporta.cr/candidatos/{candidato.id}</span>
            </div>
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "48px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#475569",
            fontSize: "16px",
          }}
        >
          <span>Elecciones Costa Rica 2026</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
