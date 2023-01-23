/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "default": '#111b21',
        "panel": "#202c33",
        "system-msg": "#182229",
        "incoming-msg": '#202c33',
        "outgoing-msg": '#005c4b',
        "meta-msg": '#ffffff99',
        "primary-msg": '#e9edef',
        "input": '#2a3942',
        "placeholder": '#8696a0',
        "gpt-msg": '#06cf9c',
      }
    },
  },
  plugins: [],
}
