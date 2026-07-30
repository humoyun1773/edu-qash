/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Body — Inter (Notion, Linear, Vercel)
        sans:    ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        // Display / Headings — Syne (bold, geometric)
        display: ['Syne', 'Inter', 'sans-serif'],
        // Mono — JetBrains Mono (badges, code)
        mono:    ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.025em',
      },
    },
  },
  plugins: [],
}
