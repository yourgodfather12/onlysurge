import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        'space-grotesk': ['var(--font-space-grotesk)'],
        'orbitron': ['var(--font-orbitron)'],
      },
      colors: {
        primary: {
          pink: '#FF1B6B',
          purple: '#9D4EDD',
          blue: '#45CAFF',
        },
        neon: {
          pink: '#FF1B6B',
          purple: '#B026FF',
          blue: '#45CAFF',
        },
        accent: {
          yellow: '#FFD700',
        },
        dark: {
          DEFAULT: '#0A0A0F',
          light: '#1A1A2F',
          lighter: '#2A2A4F',
        },
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
        'particle-float': 'particle-float 10s ease-in-out infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '50%': {
            opacity: '.8',
            transform: 'scale(1.05)',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%': {
            'box-shadow': '0 0 5px rgba(255, 27, 107, 0.5), 0 0 10px rgba(255, 27, 107, 0.3)',
          },
          '100%': {
            'box-shadow': '0 0 20px rgba(255, 27, 107, 0.8), 0 0 30px rgba(255, 27, 107, 0.6)',
          },
        },
        'particle-float': {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0deg)',
          },
          '25%': {
            transform: 'translate(10px, -10px) rotate(90deg)',
          },
          '50%': {
            transform: 'translate(0, -20px) rotate(180deg)',
          },
          '75%': {
            transform: 'translate(-10px, -10px) rotate(270deg)',
          },
        },
      },
      boxShadow: {
        'neon-pink': '0 0 5px theme(colors.neon.pink), 0 0 20px theme(colors.neon.pink)',
        'neon-purple': '0 0 5px theme(colors.neon.purple), 0 0 20px theme(colors.neon.purple)',
        'neon-blue': '0 0 5px theme(colors.neon.blue), 0 0 20px theme(colors.neon.blue)',
      },
    },
  },
  plugins: [],
}

export default config
