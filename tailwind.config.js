/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
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
        quantum: {
          dark: "#001833",
          darker: "#000C1A",
          blue: "#1EAEDB",
          cyan: "#0FF4F4",
          accent: "#33C3F0",
          glow: "#00F0FF",
          purple: "#6c3ce9",
          "light-purple": "#a78bfa",
          "bright-purple": "#9f7aea",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pulse-glow": {
          "0%": {
            opacity: "0.8",
            filter: "brightness(1) blur(2px)",
            boxShadow:
              "0 0 15px 5px rgba(0, 240, 255, 0.7), 0 0 30px 15px rgba(0, 240, 255, 0.5), 0 0 45px 25px rgba(0, 240, 255, 0.3)",
          },
          "50%": {
            opacity: "0.6",
            filter: "brightness(1.5) blur(4px)",
            boxShadow:
              "0 0 20px 8px rgba(0, 240, 255, 0.8), 0 0 40px 20px rgba(0, 240, 255, 0.6), 0 0 60px 30px rgba(0, 240, 255, 0.4)",
          },
          "100%": {
            opacity: "0.8",
            filter: "brightness(1) blur(2px)",
            boxShadow:
              "0 0 15px 5px rgba(0, 240, 255, 0.7), 0 0 30px 15px rgba(0, 240, 255, 0.5), 0 0 45px 25px rgba(0, 240, 255, 0.3)",
          },
        },
        float: {
          "0%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "circuit-flow": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "quantum-wave": {
          "0%": { transform: "scale(0.8)", opacity: "0.2" },
          "50%": { transform: "scale(1.2)", opacity: "1" },
          "100%": { transform: "scale(0.8)", opacity: "0.2" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-glow": "pulse-glow 2.5s infinite ease-in-out",
        float: "float 6s infinite ease-in-out",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "circuit-flow": "circuit-flow 3s linear forwards",
        "quantum-wave": "quantum-wave 1.5s infinite ease-in-out",
        spin: "spin 1s linear infinite",
      },
      fontFamily: {
        quantum: ["Orbitron", "sans-serif"],
        tech: ["Exo 2", "sans-serif"],
      },
      backgroundImage: {
        quantumCircuit:
          "linear-gradient(to right, rgba(30, 174, 219, 0.1), rgba(0, 240, 255, 0.05))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
