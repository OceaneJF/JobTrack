/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,jsx}',
        './components/**/*.{js,jsx}',
        './app/**/*.{js,jsx}',
        './src/**/*.{js,jsx}',
    ],
    plugins: [
        require("daisyui"),
        require("tailwindcss-animate"),
        require('flowbite/plugin')
    ],
}