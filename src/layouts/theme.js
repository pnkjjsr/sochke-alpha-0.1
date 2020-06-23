import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
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
    fontFamily: "Lato, Roboto, Helvetica, Arial, sans-serif",
    fontSize: "16",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontWeightBold: 900,
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
        "@font-face": "Lato",
      },
    },
  },
});

export default theme;
