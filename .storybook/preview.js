import "../src/index.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "centered",
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: "#fbfbfb",
      },
    ],
  },
};

export const decorators = [
  (Story) => {
    return (
      <body className="light">
        <Story />
      </body>
    );
  },
];
