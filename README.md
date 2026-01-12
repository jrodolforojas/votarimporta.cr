<p align="center">
  <img src="public/icon.svg" alt="Votar Importa Logo" width="80" height="80">
</p>

<h1 align="center">🇨🇷 Votar Importa</h1>

<p align="center">
  <strong>Plataforma de información electoral para las elecciones presidenciales de Costa Rica 2026</strong>
</p>

<p align="center">
  <a href="https://votarimporta.cr">🌐 Visitar sitio</a> •
  <a href="#características">✨ Características</a> •
  <a href="#contribuir">🤝 Contribuir</a> •
  <a href="#licencia">📄 Licencia</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind">
  <img src="https://img.shields.io/badge/Open%20Source-❤️-red?style=flat-square" alt="Open Source">
</p>

---

## 🎯 Nuestra Visión

**Votar Importa** nació de una preocupación real: el abstencionismo electoral en Costa Rica, especialmente entre los jóvenes. Creemos que una democracia fuerte necesita ciudadanos informados.

Nuestra misión es simple: **hacer que la información sobre los candidatos presidenciales sea accesible, clara y neutral**.

No apoyamos a ningún partido. No emitimos opiniones. Solo presentamos los hechos para que **vos** tomes la mejor decisión.

### 🌟 Principios

| Principio             | Descripción                                                                 |
| --------------------- | --------------------------------------------------------------------------- |
| ⚖️ **Neutralidad**    | Tratamos a todos los candidatos por igual. Sin favoritismos.                |
| 📊 **Transparencia**  | Nuestras fuentes son los planes de gobierno oficiales. Todo es verificable. |
| 🇨🇷 **Democracia**     | Queremos fortalecer la participación ciudadana en Costa Rica.               |
| 🔓 **Código Abierto** | Todo nuestro código es público y auditable.                                 |

---

## ✨ Características

- **📋 Perfiles de candidatos** — Información detallada de cada candidato presidencial
- **💡 Propuestas por área** — Explora las propuestas organizadas por temas (educación, seguridad, economía, etc.)
- **⚔️ Comparador** — Compara las propuestas de dos candidatos lado a lado
- **🤖 Chat con IA** — Pregúntale a la IA sobre las propuestas de cualquier candidato (basado solo en sus planes de gobierno)
- **📝 Quiz político** — Descubre qué candidato se alinea más con tus valores

---

## 👥 Quiénes Somos

Somos dos costarricenses comprometidos con la democracia:

<table>
  <tr>
    <td align="center" width="50%">
      <img src="https://github.com/jrodolforojas.png" width="100" height="100" style="border-radius: 50%;" alt="Rodolfo Rojas"><br>
      <strong>Rodolfo Rojas</strong><br>
      <em>Software Engineer & Founder</em><br><br>
      +5 años de experiencia en desarrollo de software. CEO & Founder de Carpil.<br><br>
      <a href="https://github.com/jrodolforojas">GitHub</a> •
      <a href="https://www.linkedin.com/in/jrodolforojas/">LinkedIn</a>
    </td>
    <td align="center" width="50%">
      <img src="https://media.licdn.com/dms/image/v2/D4E03AQFY_tXD13_UhA/profile-displayphoto-shrink_800_800/B4EZaDerm9H0Ag-/0/1745962580770?e=1769644800&v=beta&t=ZJjyJ2Rr7nIYuQzYq78c0qlIj60V7FH_uF6tv9ouWCM" width="100" height="100" style="border-radius: 50%;" alt="Fabián Fonseca"><br>
      <strong>Fabián Fonseca</strong><br>
      <em>Politólogo y Economista</em><br><br>
      Comprometido con el fortalecimiento de la democracia costarricense. Interesado en el acceso a la información, la reducción de la brecha de información política y el fomento de la participación ciudadana informada.<br><br>
      <a href="https://www.linkedin.com/in/fabianfonsecar/">LinkedIn</a>
    </td>
  </tr>
</table>

---

## 🔓 Código Abierto

Este proyecto es **100% código abierto**. Creemos en la transparencia total.

### ¿Por qué código abierto?

1. **Auditabilidad** — Cualquiera puede verificar que no hay sesgos en el código
2. **Confianza** — La transparencia genera confianza en la plataforma
3. **Colaboración** — La comunidad puede contribuir y mejorar el proyecto
4. **Educación** — Otros pueden aprender y replicar para sus propios países

### 📂 Estructura del proyecto

```
votacr2026/
├── app/                    # Páginas de Next.js (App Router)
│   ├── candidatos/         # Páginas de candidatos
│   ├── chat/               # Chat con IA
│   ├── comparar/           # Comparador de candidatos
│   ├── quiz/               # Quiz político
│   └── api/                # API routes
├── components/             # Componentes reutilizables
├── data/                   # Datos de candidatos y propuestas
│   ├── candidatos/         # Información de cada candidato
│   └── propuestas/         # Propuestas por candidato
├── lib/                    # Utilidades y configuración
├── ai/                     # Prompts y outputs de IA
│   ├── prompts/            # Prompts utilizados
│   └── plan-gobierno/      # Resúmenes de planes de gobierno
└── public/                 # Assets públicos
```

---

## 🚀 Correr Localmente

### Requisitos previos

- Node.js 18+
- pnpm (recomendado) o npm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/jrodolforojas/votacr2026.git
cd votacr2026

# Instalar dependencias
pnpm install

# Variables de entorno (para el chat con IA)
cp .env.example .env.local
# Agregar tu OPENAI_API_KEY en .env.local

# Correr en desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Este es un proyecto de la comunidad para la comunidad.

### Cómo contribuir

1. **Fork** el repositorio
2. Crea una **branch** para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. **Commit** tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. **Push** a la branch (`git push origin feature/nueva-funcionalidad`)
5. Abre un **Pull Request**

### Ideas para contribuir

- 🐛 Reportar bugs
- 💡 Sugerir nuevas funcionalidades
- 📝 Mejorar la documentación
- 🎨 Mejorar el diseño/UX
- ♿ Mejorar la accesibilidad
- 🌐 Traducciones

---

## 🛠️ Stack Tecnológico

| Tecnología                                    | Uso                             |
| --------------------------------------------- | ------------------------------- |
| [Next.js 16](https://nextjs.org/)             | Framework de React              |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático                 |
| [Tailwind CSS 4](https://tailwindcss.com/)    | Estilos                         |
| [shadcn/ui](https://ui.shadcn.com/)           | Componentes UI                  |
| [Vercel AI SDK](https://sdk.vercel.ai/)       | Integración con IA              |
| [OpenAI](https://openai.com/)                 | Modelo de lenguaje para el chat |
| [Vercel](https://vercel.com/)                 | Hosting                         |

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver el archivo [LICENSE](LICENSE) para más detalles.

Esto significa que puedes:

- ✅ Usar el código comercialmente
- ✅ Modificar el código
- ✅ Distribuir el código
- ✅ Usar el código de forma privada

---

## 📞 Contacto

¿Preguntas? ¿Sugerencias? ¿Quieres colaborar?

- 🎤 Fabián: [@fabianfonsecar1](mailto:fabianfonsecar1@gmail.com)
- 🤖 Rodolfo: [@jrodolforojas](https://www.instagram.com/jrodolforojas/)
- 💬 Issues: [GitHub Issues](https://github.com/jrodolforojas/votacr2026/issues)

---

<p align="center">
  Hecho con ❤️ en Costa Rica 🇨🇷
</p>

<p align="center">
  <strong>Tu voto importa. Informate. Decidí.</strong>
</p>
