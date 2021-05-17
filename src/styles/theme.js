import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#868BCF",
      main: "#000088",
    },
    secondary: {
      main: "#5fbe40",
    },
    error: {
      main: "#c00",
    },
    warning: {
      main: "#ef873d",
    },
    info: {
      main: "#09c",
    },
    success: {
      main: "#5fbe40",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: "Lato, Tahoma, Geneva, Verdana, sans-serif",
    fontSize: 16,
    fontWeightThin: 100,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
    fontDisplay: "swap",
  },
  breakpoints: {
    values: {
      xs: 321,
      sm: 568,
      md: 768,
      lg: 992,
      xl: 1200,
      ss: 1410,
      ms: 1660,
      ls: 1920,
    },
  },
  shape: {
    borderRadius: 3,
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          color: "#26264c",
        },
      },
    },
    MuiButton: {
      root: {
        // padding: "10px"
      },

      label: {
        fontWeight: 400,
        textTransform: "capitalize",

      },
    },
    MuiTextField: {
      root: {
        borderRadius: "3px",
        backgroundColor: "#fff",
      }
    },
    MuiFormLabel: {
      root: {
        color: "#595959",
        fontSize: "16px"
      }
    },
    MuiFilledInput: {
      underline: {
        "&:after": {
          borderBottom: "1px solid #000088"
        }
      }
    },
    MuiInputBase: {
      input: {
        fontSize: "16px"
      }
    },
    MuiLinearProgress: {
      root: {
        height: "1px",
        overflow: "initial"
      },
      bar: {
        top: "-3px",
        height: "7px",
        borderRadius: "3px"
      }
    }
  },
});

export default theme;
