/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Red stays as the main brand colour
        primary: {
          DEFAULT: '#C8102E',
          dark:    '#9E0C24',
          light:   '#E13350',
        },
        secondary: {
          DEFAULT: '#1E3A8A',
          dark:    '#152a63',
          light:   '#2E4FAE',
        },
        // Gold as the accent / highlight colour
        accent: {
          DEFAULT: '#B8860B',   // dark goldenrod — rich gold
          light:   '#FFD700',   // pure gold for glows/hovers
          dark:    '#8B6508',
        },
        gold: {
          DEFAULT: '#B8860B',
          light:   '#FFD700',
          pale:    '#FFF8DC',   // cornsilk — very light gold tint
          dark:    '#8B6508',
        },
        surface: {
          DEFAULT:  '#FFFDF7',  // warm white with gold tint
          card:     '#FFFFFF',
          dark:     '#0F172A',
          darkcard: '#161F32',
        },
        ink: {
          DEFAULT: '#111827',
          soft:    '#4B5563',
          invert:  '#E5E7EB',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Source Sans 3"', '"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        // Red-to-gold gradient for decorative rules
        'rule-fade':      'linear-gradient(90deg, #C8102E 0%, #C8102E 40%, transparent 100%)',
        'gold-shimmer':   'linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #B8860B 100%)',
        'red-gold-gradient': 'linear-gradient(90deg, #C8102E, #B8860B)',
      },
      boxShadow: {
        gold: '0 0 0 2px #B8860B40',
        'gold-lg': '0 4px 24px #B8860B30',
      },
      animation: {
        marquee:         'marquee 28s linear infinite',
        'pulse-dot':     'pulse-dot 1.4s ease-in-out infinite',
        'topbar-scroll': 'topbar-scroll 18s linear infinite',
        'gold-pulse':    'gold-pulse 2s ease-in-out infinite',
        'ticker':        'ticker 35s linear infinite',
        'ticker-scan':   'ticker-scan 4s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%':      { opacity: 0.4, transform: 'scale(0.85)' },
        },
        'topbar-scroll': {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'gold-pulse': {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.6 },
        },
        'ticker': {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        'ticker-scan': {
          '0%':        { backgroundPosition: '-100% 0' },
          '100%':      { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
