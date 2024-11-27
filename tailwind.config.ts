import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        success: {
          light: "#ECFDF5",
          DEFAULT: "#34D399",
          dark: "#059669",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      //....
      keyframes: {
        "success-check": {
          "0%": {
            strokeDashoffset: "60",
            opacity: "0",
          },
          "100%": {
            strokeDashoffset: "0",
            opacity: "1",
          },
        },
        "success-circle": {
          "0%": {
            strokeDasharray: "0,157",
            opacity: "0",
          },
          "100%": {
            strokeDasharray: "157,157",
            opacity: "1",
          },
        },
        "fade-up": {
          "0%": {
            transform: "translateY(20px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "success-check":
          "success-check 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "success-circle":
          "success-circle 1s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        "fade-up": "fade-up 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
        float: "float 3s ease-in-out infinite",
      },
      //...
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
