// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Scans everything inside `src`
    "./src/components.{js,jsx,ts,tsx}", // Specifically scans `components`
    "./index.html", // Include index.html if needed
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D3748', // Dark Gray
        secondary: '#4A90E2', // Blue
        accent: '#F39C12', // Yellow accent
        background: '#F9FAFB', // Light Gray
        darkBackground: '#1A202C', // Dark background color for dark mode
        darkText: '#E2E8F0', // Light text color for dark mode
        button: '#FF5733', // Button Color
      },
    },
  },
  plugins: [],
};
