import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        'float-up': {
          '0%': { 
            transform: 'translateY(0) translateZ(-1px) scale(1)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateY(-100px) translateZ(-1px) scale(0.5)',
            opacity: '0'
          }
        }
      },
      animation: {
        'float-up': 'float-up 1.5s ease-out forwards'
      }
    },
  },
  plugins: [],
} satisfies Config;