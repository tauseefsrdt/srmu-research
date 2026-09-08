/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'deep-teal': '#1c5d5f',
        'pine-shadow': '#0e4749',
        'sage': '#65b8a2',
        'lake-teal': '#2a7779',
        'forest-floor': '#156152',
        'ink-navy': '#16325a',
        'dusty-rose': '#d6aec1',
        'mint-mist': '#a2cbcd',
        'sea-foam': '#cae1e2',
        'paper-white': '#f2f8f7',
        'card-mint': '#e4f0f1',
        'blush-sand': '#f2e8e2',
        'charcoal-navy': '#283338',
        'slate-body': '#63717e',
        'illustration-ink': '#231e21',
      },
      fontFamily: {
        serif: ['Source Serif 4', 'Georgia', 'ui-serif', 'serif'],
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'btn': '48px',
        'nav': '88px',
        'tag': '100px',
        'card': '12px',
        'pill': '1000px',
      },
      maxWidth: {
        'page': '1200px',
      }
    },
  },
  plugins: [],
}
