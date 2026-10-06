/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#6D28D9',     // Primary violet
          dark: '#4C1D95',        // Dark violet
          bright: '#7C3AED',      // Bright violet
          soft: '#EDE9FE',        // Soft violet
          lightest: '#F5F3FF',    // Very light violet
          surface: '#FFFFFF',     // White
          border: '#DDD6FE',      // Subtle violet border
          text: '#0F0A1C',        // Near-black dark violet text
          muted: '#6B7280',       // Muted text
          darkbg: '#0F0A1C',      // Deep violet dark surface
          card: '#FFFFFF',
          sidebar: '#160B29',     // Dark violet admin sidebar
          sidebartop: '#20103B',
          adminhover: '#29184B',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'violet-sm': '0 2px 8px -1px rgba(109, 40, 217, 0.08)',
        'violet-md': '0 8px 24px -4px rgba(109, 40, 217, 0.12)',
        'violet-lg': '0 16px 36px -6px rgba(109, 40, 217, 0.18)',
        'violet-glow': '0 0 30px rgba(124, 58, 237, 0.35)',
      },
      backgroundImage: {
        'radial-violet': 'radial-gradient(circle at 50% 0%, rgba(124, 58, 237, 0.15) 0%, rgba(245, 243, 255, 0) 70%)',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(109, 40, 217, 0.25), rgba(255, 255, 255, 0))',
        'grid-pattern': 'linear-gradient(to right, rgba(109, 40, 217, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(109, 40, 217, 0.05) 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
}
