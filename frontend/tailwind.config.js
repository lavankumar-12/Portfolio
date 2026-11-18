/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#FFFFFF',
          secondary: '#F8FAFC',
          surface: '#FFF1F2',
          accent: '#E11D48',
          accentSecondary: '#FF5E2B',
          cyan: '#0891B2',
          heading: '#0F172A',
          body: '#475569',
          border: '#E2E8F0',
        },
        dark: {
          bg: '#07070C',
          secondary: '#0C0D14',
          card: '#11121B',
          surface: '#1A1320',
          accent: '#FF2E63',
          accentSecondary: '#FF5E2B',
          cyan: '#22D3EE',
          heading: '#FFFFFF',
          body: '#94A3B8',
          border: '#1F2130',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'light-card': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'light-hover': '0 12px 30px -4px rgba(225, 29, 72, 0.14), 0 4px 12px -2px rgba(0, 0, 0, 0.06)',
        'dark-card': '0 8px 30px -4px rgba(0, 0, 0, 0.75)',
        'dark-hover': '0 14px 36px -4px rgba(0, 0, 0, 0.9), 0 0 22px rgba(255, 46, 99, 0.16)',
        'glow-coral': '0 0 26px rgba(255, 46, 99, 0.4)',
        'glow-cyan': '0 0 22px rgba(34, 211, 238, 0.25)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'codestorm-gradient': 'linear-gradient(90deg, #FF2E63 0%, #FF4D4D 50%, #FF5E2B 100%)',
      },
    },
  },
  plugins: [],
}
