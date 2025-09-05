/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Letrum Agency Brand Colors
        primary: {
          50: '#e6faf7',
          100: '#b3f0e6',
          200: '#80e6d4',
          300: '#4ddcc3',
          400: '#1abc9c', // Primary Turquoise
          500: '#16a085',
          600: '#13876b',
          700: '#0f6d52',
          800: '#0c5438',
          900: '#083a1f',
          950: '#042010',
          DEFAULT: '#1ABC9C',
          foreground: '#ffffff',
        },
        secondary: {
          50: '#fdf8f1',
          100: '#faecd7',
          200: '#f7e0bd',
          300: '#f5d4a3',
          400: '#FAD7A0', // Sand Beige
          500: '#f2c889',
          600: '#eab972',
          700: '#e2aa5b',
          800: '#da9b44',
          900: '#d28c2d',
          950: '#bb7d26',
          DEFAULT: '#FAD7A0',
          foreground: '#2c2c2c',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: '0' },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: '0' },
        },
        "fade-in": {
          "0%": { opacity: '0', transform: "translateY(20px)" },
          "100%": { opacity: '1', transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: '0', transform: "translateX(100px)" },
          "100%": { opacity: '1', transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require('@tailwindcss/line-clamp')],
}