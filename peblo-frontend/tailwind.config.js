/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#111111',
          50:  '#1c1c1c',
          100: '#181818',
          200: '#141414',
          300: '#111111',
        },
        panel: {
          DEFAULT: '#1a1a1a',
          hover: '#212121',
          border: '#2a2a2a',
        },
        primary: {
          DEFAULT: '#6366f1',
          hover:   '#4f46e5',
          light:   '#818cf8',
          muted:   '#6366f120',
        },
        accent: '#10b981',
        warn:   '#f59e0b',
        danger: '#ef4444',
        muted:  '#6b7280',
        subtle: '#4b5563',
        ink: {
          DEFAULT: '#e5e7eb',
          muted:   '#9ca3af',
          subtle:  '#6b7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
