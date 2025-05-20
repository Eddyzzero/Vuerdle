import plugin from "tailwindcss/plugin";

export default plugin(function ({ addComponents, theme }) {
  const customComponents = {
    ".btn-primary": {
      backgroundColor: theme("colors.primary"),
      color: theme("colors.white"),
      padding: `${theme("spacing.2")} ${theme("spacing.4")}`,
      borderRadius: theme("borderRadius.md"),
      "&:hover": {
        backgroundColor: theme("colors.blue.600"),
      },
      ".dark &": {
        backgroundColor: theme("colors.primary-dark"),
        "&:hover": {
          backgroundColor: theme("colors.blue.800"),
        },
      },
    },
    ".card": {
      backgroundColor: theme("colors.white"),
      borderRadius: theme("borderRadius.lg"),
      padding: theme("spacing.6"),
      boxShadow: theme("boxShadow.md"),
      ".dark &": {
        backgroundColor: theme("colors.gray.800"),
        borderColor: theme("colors.gray.700"),
      },
    },
  };

  addComponents(customComponents);
});
