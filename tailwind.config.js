/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                background: 'var(--bg-background)',
                sidebar: 'var(--bg-sidebar)',
                card: 'var(--bg-card)',
                'card-hover': 'var(--bg-card-hover)',
                'text-main': 'var(--text-main)',
                'text-muted': 'var(--text-muted)',
                'border-color': 'var(--border-color)',
                primary: 'var(--color-accent)',
            },
            backdropBlur: {
                xs: '2px',
            }
        }
    },
    plugins: [],
}
