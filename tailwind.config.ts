import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight-blue': '#030637',
        'dark-purple': '#3C0753',
        'purple': '#720455',
        'dark-pink': '#910A67',
        'gray-main': '#ABABAB'
      }
    },
  },
  plugins: [],
};
export default config;
