/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C8102E',
          dark: '#9E0C24',
          light: '#E13350'
        },
        secondary: {
          DEFAULT: '#1E3A8A',
          dark: '#152a63',
          light: '#2E4FAE'
        },
        accent: {
          DEFAULT: '#F59E0B',
          dark: '#C77D06'
        },
        surface: {
          DEFAULT: '#F8FAFC',
          card: '#FFFFFF',
          dark: '#0F172A',
          darkcard: '#161F32'
        },
        ink: {
          DEFAULT: '#111827',
          soft: '#4B5563',
          invert: '#E5E7EB'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Source Sans 3"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
      },
      backgroundImage: {
        'rule-fade': 'linear-gradient(90deg, #C8102E 0%, #C8102E 40%, transparent 100%)'
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'pulse-dot': 'pulse-dot 1.4s ease-in-out infinite',
        'topbar-scroll': 'topbar-scroll 18s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.333%)' }
        },
        'pulse-dot': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.4, transform: 'scale(0.85)' }
        },
        'topbar-scroll': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' }
        },
      }
    }
  },
  plugins: []
}
