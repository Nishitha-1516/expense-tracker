/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6', // Blue-500
                secondary: '#1D4ED8', // Blue-700
                light: '#EFF6FF', // Blue-50
                dark: '#1E293B', // Slate-800
            },
        },
    },
    plugins: [],
}