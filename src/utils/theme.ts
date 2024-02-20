/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */
import { createTheme } from "@mui/material/styles";

interface CustomTheme {

    customTypography: {
      InterRegular: string,
      InterMedium: string,
      InterSemiBold: string,
      InterBold: string,
    },

    customPalette: {

        // Palette de Colores
        primary: string;
        background: string;
        white: string;
        black: string;
        // Palette de Colores

        // Componentes

        pageLinks: {
          text: string;
        };

        NavBar : {
          background: string;
          links: {
            selected: string;
            unselected: string;
          };
        };

        TextBox : {
          text: string;
        };

        SearchBox : {
          header: {
            backgroundColor: string;
            borderColor: string;
            filter: {
              text: string;
              border: string;
              arrow: string;
              background: string;
            };
            search: {
              text: string;
              border: string;
              background: string;
            };
          };
          subHeader: {
            backgroundColor: string;
            borderColor: string;
            text: string;
          };
          body: {
            backgroundColor: string;
            borderColor: string;
            text: string;
          };
          footer: {
            backgroundColor: string;
            borderColor: string;
            text: string;
          };
        };

        Modal : {
          background: string;
          modal: {
            background: string;
            border: string;
            title: string;
            subtitle:string;
            input: {
              title: string;
              placeholder: string;
              border: string;
              background: string;
              arrow: string;
            };
            button: {
              border: string;
              background: string;
              text: string;
            };
          };
        };

        StateTag: {
          label: {
            text: string;
          };
          tag: {
            active: {
              background: string;
              circle: string;
              circleBorder: string;
            };
            pending: {
              background: string;
              circle: string;
              circleBorder: string;
            };
            inactive: {
              background: string;
              circle: string;
              circleBorder: string;
            };
          };
        };

        // Componentes

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
        
        pageLinks: {
          fontSize: string;
          fontWeight: number | string;
        };

        NavBar : {
          links: {
            selected: {
              fontSize: string;
              fontWeight: number | string;
            };
            unselected: {
              fontSize: string;
              fontWeight: number | string;
            };
          };
        };

        TextBox : {
          title: {
            fontSize: string;
            fontWeight: number | string;
          };
          description: {
            fontSize: string;
            fontWeight: number | string;
          };
      };

      SearchBox : {
        header: {
          filter: {
            fontSize: string;
            fontWeight: number | string;
          };
          option: {
            fontSize: string;
            fontWeight: number | string;
          };
          search: {
            fontSize: string;
            fontWeight: number | string;
          };
        };
        subHeader: {
          fontSize: string;
          fontWeight: number | string;
        };
        body: {
          fontSize: string;
          fontWeight: number | string;
        };
        footer: {
          fontSize: string;
          fontWeight: number | string;
        };
      };

      Modal : {
        title: {
          fontSize: string;
          fontWeight: number | string;
        };
        subtitle: {
          fontSize: string;
          fontWeight: number | string;
        };
        input: {
          title: {
            fontSize: string;
            fontWeight: number | string;
          };
          placeholder: {
            fontSize: string;
            fontWeight: number | string;
          };
        };
        button: {
          fontSize: string;
          fontWeight: number | string;
        };
      };
      

      Login : {
        label: {
          fontSize: string;
          fontWeight: number | string;
        };
        button: {
          fontSize: string;
          fontWeight: number | string;
        };
      };

      StateTag : {
        label: {
          fontSize: string;
          fontWeight: number | string;
        };
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
        fontFamily: "Inter-Regular",
    },

    // Custom font
    customTypography: {
      InterRegular: "Inter-Regular",
      InterMedium: "Inter-Medium",
      InterSemiBold: "Inter-SemiBold",
      InterBold: "Inter-Bold",
    },

    customPalette: {
        // Palette of Colors
        primary: "#F7B200",
        background: "#F4F5F5",
        white: "#FFFFFF",
        black: "#000000",
        // Palette of Colors

        // Componentes

        pageLinks: {
          text: "#1E1E31",
        },

        NavBar : {
          background: "#F4F5F5",
          links: {
            selected: "#1E1E31",
            unselected: "#515164",
          },
        },

        TextBox : {
          text: "#1E1E31",
        },

        SearchBox : {
          header: {
            backgroundColor: "#F4F4F5",
            borderColor: "#E2E2E5",
            filter: {
              text: "#000000",
              border: "#E2E2E5",
              arrow: "#AEAEB8",
              background: "#FFFFFF",
            },
            search: {
              text: "#AEAEB8",
              border: "#AEAEB8",
              background: "#FFFFFF",
            },
          },
          subHeader: {
            backgroundColor: "#F4F4F5",
            borderColor: "#E2E2E5",
            text: "#261E35",
          },
          body: {
            backgroundColor: "#FFFFFF",
            borderColor: "#E2E2E5",
            text: "#000000",
          },
          footer: {
            backgroundColor: "#F4F4F5",
            borderColor: "#E2E2E5",
            text: "#000000",
          },
        },

        Modal : {
          background: "rgba(217, 217, 217, 0.5)",
          modal: {
            background: "#F4F4F5",
            border: "rgba(0, 0, 0, 0.2)",
            title: "#000000",
            subtitle: "#AEAEB8",
            input: {
              title: "rgba(0, 0, 0, 0.7)",
              placeholder: "#AEAEB8",
              border: "rgba(0, 0, 0, 0.2)",
              background: "#FBFBFB",
              arrow: "#AEAEB8",
            },
            button: {
              border: "#F7B200",
              background: "#F7B200",
              text: "#FFFFFF",
            },
          },
        },

        
        StateTag: {
          label: {
            text: "#000000",
          },
          tag: {
            active: {
              background: "#C9F1F5",
              circle: "#39B5BE",
              circleBorder: "#FFFFFF",
            },
            pending: {
              background: "#FAE9AE",
              circle: "#BEA139",
              circleBorder: "#FFFFFF",
            },
            inactive: {
              background: "#F5C9C9",
              circle: "#BE3939",
              circleBorder: "#FFFFFF",
            },
          },
        },

        // Componentes
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
      
      pageLinks: {
        fontSize: "14px",
        fontWeight: 400,
      },

      NavBar : {
        links: {
          selected: {
            fontSize: "15px",
            fontWeight: 500,
          },
          unselected: {
            fontSize: "15px",
            fontWeight: 400,
          },
        },
      },

      TextBox : {
        title: {
          fontSize: "16px",
          fontWeight: 500,
        },
        description: {
          fontSize: "12px",
          fontWeight: 400,
        },
      },

      SearchBox : {
        header: {
          filter: {
            fontSize: "13px",
            fontWeight: 500,
          },
          option: {
            fontSize: "10px",
            fontWeight: 500,
          },
          search: {
            fontSize: "13px",
            fontWeight: 400,
          },
        },
        subHeader: {
          fontSize: "13px",
          fontWeight: 500,
        },
        body: {
          fontSize: "15px",
          fontWeight: 500,
        },
        footer: {
          fontSize: "10px",
          fontWeight: 500,
        },
      },

      Modal : {
        title: {
          fontSize: "20px",
          fontWeight: 400,
        },
        subtitle: {
          fontSize: "10px",
          fontWeight: 400,
        },
        input: {
          title: {
            fontSize: "10px",
            fontWeight: 400,
          },
          placeholder: {
            fontSize: "13px",
            fontWeight: 400,
          },
        },
        button: {
          fontSize: "14px",
          fontWeight: 400,
        },
      },

      StateTag : {
        label: {
          fontSize: "10px",
          fontWeight: 400,
        },
      },

      Login : {
        label: {
          fontSize: "10px",
          fontWeight: 400,
        },
        button: {
          fontSize: "12px",
          fontWeight: 400,
        },
      },

    },
    components: {
        MuiCssBaseline: {
            styleOverrides: `
        html {
          scroll-behavior: smooth;
        }
        @font-face {
          font-family: 'Inter-Regular';
          src: url('/fonts/Inter-Regular.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Inter-Bold';
          src: url('/fonts/Inter-Bold.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Inter-Medium';
          src: url('/fonts/Inter-Medium.ttf') format('truetype');
          font-display: swap;
        }
        @font-face {
          font-family: 'Inter-SemiBold';
          src: url('/fonts/Inter-SemiBold.ttf') format('truetype');
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
