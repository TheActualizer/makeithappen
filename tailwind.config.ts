import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        // Perfect fourth type scale (1.333)
        'xs': ['0.75rem', { lineHeight: '1rem' }],           // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],       // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],          // 16px
        'lg': ['1.333rem', { lineHeight: '1.75rem' }],       // 21.328px
        'xl': ['1.777rem', { lineHeight: '2.25rem' }],       // 28.43px
        '2xl': ['2.369rem', { lineHeight: '2.75rem' }],      // 37.897px
        '3xl': ['3.157rem', { lineHeight: '3.25rem' }],      // 50.517px
        '4xl': ['4.209rem', { lineHeight: '4rem' }],         // 67.339px
        '5xl': ['5.61rem', { lineHeight: '1' }],             // 89.749px
      },
      spacing: {
        'text-spacing': '0.0125em',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6D28D9",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#06B6D4",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#0F172A",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
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
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;