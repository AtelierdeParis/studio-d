import { createMuiTheme } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";
import deepOrange from "@material-ui/core/colors/deepOrange";

const customTheme = createMuiTheme({
  typography: {
    fontFamily: "Quicksand, sans-serif",
  },
  palette: {
    primary: {
      main: cyan[900],
    },
    secondary: {
      main: deepOrange[900],
    },
  },
  overrides: {},
});

export default customTheme;
