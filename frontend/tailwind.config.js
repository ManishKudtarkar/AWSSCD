/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Newspaper paper tones
        paper: {
          DEFAULT: '#f4f1e8',
          light: '#faf8f1',
          dark: '#e8e3d5',
          aged: '#ded7c4',
        },
        ink: {
          DEFAULT: '#161412',
          soft: '#2a2723',
          faded: '#5b564d',
        },
        // Accent — used sparingly
        aws: {
          orange: '#26538B',
          blue: '#232f3e',
          smile: '#26538B',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        headline: ['Oswald', 'Impact', 'sans-serif'],
        body: ['"Source Serif 4"', 'Georgia', 'serif'],
        type: ['"Special Elite"', 'Courier', 'monospace'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      backgroundImage: {
        'paper-grain':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        press: '4px 4px 0 0 #161412',
        'press-sm': '2px 2px 0 0 #161412',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
      },
    },
  },
  plugins: [],
}
