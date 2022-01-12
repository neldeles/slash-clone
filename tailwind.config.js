module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--color-bg-primary)",
        secondary: "var(--color-bg-secondary)",
      },
      textColor: {
        accent: "var(--color-text-accent)",
        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
      },
      colors: {
        "element-primary": "var(--color-element-primary)",
        "element-primary-hover": "var(--color-element-primary-hover)",
        "element-secondary": "var(--color-element-secondary)",
        "element-secondary-hover": "var(--color-element-secondary-hover)",
        "element-secondary-active": "var(--color-element-secondary-active)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
