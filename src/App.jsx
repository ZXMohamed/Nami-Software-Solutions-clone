import { Fragment } from "react"
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import AOS from "aos";
//*components
import Navbar from "./componants/navbar"
import Home from "./componants/Home";
import Services from "./componants/services"
import Socialbtns from "./componants/floatsocialbuttons";
//*css
import '../node_modules/aos/dist/aos.css';
import 'swiper/css';
//*sass files
import "./sass/main.scss"
import "./sass/socialbuttons.scss"
import "./sass/float.scss"
import "./sass/sectionheader.scss"
import "./sass/infocard.scss"
import "./sass/statisricsbox.scss"
import "./sass/Servicebadge.scss"
import "./sass/requestform.scss"


AOS.init({ once: true, offset: 65 });

const theme = createTheme({
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
    },//$color theme
  },
});

function App() {


  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Home />
        <Services/>
        <Socialbtns/>
      </ThemeProvider>
    </Fragment>
  )
}

export default App
