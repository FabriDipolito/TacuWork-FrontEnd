/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { createTheme } from "@mui/material/styles";

interface CustomTheme {

    customTypography: {
      CaustenRegular: "Causten-Regular",
    },

    customPalette: {

        // Palette of Colors
        white: string;
        black: string;
        header: string;
        buttonDefault: string;
        buttonHover: string;
        buttonDelete: string;
        buttonAdvice: string;
        buttonCreate: string;
        buttonSubmit: string;
        // Palette of Colors

    };

    customSizes: {

        button: {
          fontSize: string;
          fontWeight: number | string;
          lineHeight: string;
        };

        buttonUsers: {
          fontSize: string;
          fontWeight: number | string;
          lineHeight: string;
        };

        title: {
          fontSize: string;
          fontWeight: number | string;
          lineHeight: string;
        };

    };
}

// allow configuration using `createTheme`
declare module "@mui/material/styles" {
    interface Theme extends CustomTheme {}

    // allow configuration using `createTheme`
    interface ThemeOptions extends CustomTheme {}
}
const theme = createTheme({
    // Fonts

    // Default font
    typography: {
        fontFamily: "Causten-SemiBold",
    },

    // Custom font
    customTypography: {
      CaustenRegular: "Causten-Regular",
    },

    customPalette: {
        // Palette of Colors
        white: "#FFFFFF",
        black: "#000000",
        header: "#b3b3b3",
        buttonDefault: "#895c93",
        buttonHover: "#49426d",
        buttonDelete: "#e84745",
        buttonAdvice: "#e9ca74",
        buttonCreate: "#fc9a99",
        buttonSubmit: "#72cfb9",
        // Palette of Colors
    },
    customSizes: {

      button: {
        fontSize: "18px",
        fontWeight: 500,
        lineHeight: "16px",
      },

      buttonUsers: {
        fontSize: "15px",
        fontWeight: 400,
        lineHeight: "16px",
      },

      title: {
        fontSize: "22px",
        fontWeight: 600,
        lineHeight: "16px",
      },

    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        html {
          scroll-behavior: smooth;
        }
        @font-face {
          font-family: 'Causten-Regular';
          src: url('/fonts/Causten-Regular.otf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Causten-SemiBold';
          src: url('/fonts/Causten-SemiBold.otf') format('truetype');
          font-display: swap;
        }
        body {
          background-color: #FFFFFF
        }
      `,
        },
    },
});

export default theme;
