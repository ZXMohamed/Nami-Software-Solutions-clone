import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {main: "#009f6f", contrastText: '#fff'},
    secondary: { main: "#ffffff", contrastText: '#009f6f' },
    third: { main: "#e1e1e1", contrastText: '#000000' },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      xxs: 500,
      xxxs:600,
      sm: 769,
      md: 992,
      lg: 1320,
      xl: 1536,
    },
  },
});