/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'blue-400': '#EEEEF5',
      'blue-500': '#D2D9FC',
      'blue-600': '#768BFC',
      'blue-700': '#3249BD',
      'blue-800': '#151835',
      'gray-400': '#B8B8B8',
      'gray-500': '#898989',
      'gray-600': '#818181',
      'gray-700': '#6F6F6F',
      'gray-800': '#595959',
    },
    extend: {
      gridTemplateColumns: {
        'content': '1fr minmax(660px, 3fr) 1fr',
      }
    },
  },
  plugins: [],
}

