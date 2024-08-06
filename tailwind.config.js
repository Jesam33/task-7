/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "todo-black": "#222222",
        "todo-light-black": "#333333",
        "todo-purple": "#8A2BE2",
        "todo-red": "#DB1414",
        "todo-green": "#14DB34",
      }
    },
  },
  plugins: [],
};
