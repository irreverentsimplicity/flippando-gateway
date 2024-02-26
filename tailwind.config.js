/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{css,js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'chakra-ui-purple': {
          500: '#805AD5', // Chakra UI default
          900: '#322659', // Chakra UI default
        },
      },
    },
  },
  plugins: [],
};
