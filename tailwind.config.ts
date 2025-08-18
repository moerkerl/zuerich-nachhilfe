import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zürich Nachhilfe Brand Colors (violett/blau)
        primary: {
          DEFAULT: '#6366f1', // Indigo-500
          50: '#eef2ff',
          100: '#e0e7ff', 
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4338ca', // Primary hover
          700: '#3730a3',
          800: '#312e81',
          900: '#1e1b4b',
        },
        secondary: {
          DEFAULT: '#8b5cf6', // Violet-500
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        background: {
          DEFAULT: '#f8fafc', // Slate-50
          muted: '#f1f5f9', // Slate-100
        },
        text: {
          DEFAULT: '#1e293b', // Slate-800
          muted: '#64748b', // Slate-500
          light: '#94a3b8', // Slate-400
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;