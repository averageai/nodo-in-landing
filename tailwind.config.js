/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-up': 'fadeUp 1s ease-out forwards',
        'vanish-in': 'vanishIn 0.7s cubic-bezier(0.4,0,0.2,1) forwards',
        'glow-green': 'glowGreen 0.06s steps(2, end) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        vanishIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        glowGreen: {
          '0%, 100%': { boxShadow: '0 0 32px 8px #71F14F' },
          '50%': { boxShadow: '0 0 0 0 #71F14F' },
        },
      },
    },
  },
  plugins: [],
}
