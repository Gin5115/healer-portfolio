/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // We will toggle the 'light' class manually
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                sidebar: 'var(--bg-sidebar)',
                content: 'var(--bg-content)',
                card: 'var(--bg-card)',
                'text-main': 'var(--text-main)',
                'text-muted': 'var(--text-muted)',
                'border-color': 'var(--border-color)', // Use this for borders!
                primary: '#1c5cf2', // Constant blue
            }
        }
    },
    plugins: [],
}
