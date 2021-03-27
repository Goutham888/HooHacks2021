import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
// from -- Color Hunt Palette 100864
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
    h1: {
      fontFamily: "Spectral", // Change a specific variant
      fontWeight: 800,
      color: "#fffdfb",
    },
    h2: {
      fontFamily: "Spectral", // Change a specific variant
      fontSize: 32,
      lineHeight: 1.5,
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
      fontWeight: 500,
    },
  },
});

export default theme;
