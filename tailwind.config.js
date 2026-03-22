/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'hud-bg':        '#0a0c0a',
        'hud-panel':     '#0d100d',
        'hud-bezel':     '#1a2a1a',
        'hud-green':     '#00FF41',
        'hud-green-dim': '#39FF14',
        'hud-cyan':      '#00FFFF',
        'hud-cyan-dim':  '#00E5FF',
        'hud-amber':     '#FFB300',
        'hud-amber-dim': '#FF8C00',
        'hud-red':       '#FF1744',
        'hud-red-dim':   '#FF0000',
      },
      fontFamily: {
        mono: ['"Share Tech Mono"', '"Courier New"', 'monospace'],
      },
      backgroundImage: {
        'grid-hud': `
          linear-gradient(rgba(0,255,65,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,65,0.04) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid-40': '40px 40px',
      },
      animation: {
        'blink':       'blink 1.2s ease-in-out infinite',
        'crt-flicker': 'crt-flicker 8s linear infinite',
        'beam-slide':  'beam-slide 6s cubic-bezier(0.4,0,0.2,1) infinite',
        'beam-drop':   'beam-drop 5s cubic-bezier(0.4,0,0.2,1) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.2' },
        },
        'crt-flicker': {
          '0%':   { opacity: '1' },
          '92%':  { opacity: '1' },
          '93%':  { opacity: '0.85' },
          '94%':  { opacity: '1' },
          '96%':  { opacity: '0.9' },
          '97%':  { opacity: '1' },
          '100%': { opacity: '1' },
        },
        'beam-slide': {
          '0%':   { transform: 'translateX(-100%)', opacity: '0' },
          '10%':  { opacity: '0.7' },
          '90%':  { opacity: '0.7' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        'beam-drop': {
          '0%':   { transform: 'translateY(-100%)', opacity: '0' },
          '10%':  { opacity: '0.6' },
          '90%':  { opacity: '0.6' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};