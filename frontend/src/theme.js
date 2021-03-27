import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0881a3",
    },
    secondary: {
      main: "#ffd6a4",
    },
    error: {
      main: "#fde9df",
    },
    background: {
      default: "#fffdfb",
    },
  },
  typography: {
    h2: {
      fontFamily: "Spectral", // Change a specific variant
    },
    h6: {
      fontFamily: "Karla",
      fontWeight: 600,
    },
    h7: {
      fontFamily: "Karla",
      fontWeight: 600,
      fontSize: 16,
    },
    body1: {
      fontFamily: "Karla",
      fontWeight: 400,
    },
  },
});

export default theme;
