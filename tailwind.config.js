/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#E30613',
                    dark: '#C00000',
                },
                text: {
                    main: '#333333',
                    sub: '#888888',
                    footer: '#7B7979',
                    secondary: '#666666',
                },
                gray: {
                    bg: '#F5F5F5',
                    'bg-hover': '#F9F9F9',
                    border: '#EEEEEE',
                    'border-dark': '#DDDDDD',
                    icon: '#555555',
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
