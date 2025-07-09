import { Fragment } from "react"
import { createTheme, CssBaseline, Icon, ThemeProvider } from "@mui/material"
//*init
import "./aos/AOSinit"
import "./gsap/GSAPinit"
import { theme } from "./mui/MUIinit"
//*components
import NavBar from "./componants/navbar"
import Home from "./componants/home";
import FloatSocialButtons from "./componants/floatsocialbuttons";
import Navbar from "./componants/navbar"
import Home from "./componants/Home";
import Socialbtns from "./componants/floatsocialbuttons";
import Ourproducts from "./componants/ourproducts";
//*css
import '../node_modules/aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css';
//*sass files
import "./sass/shared/pageinit.scss"
import "./sass/pages/main.scss"
import "./sass/shared/socialbuttons.scss"
import "./sass/shared/floatsocialbuttons.scss"
import "./sass/shared/sectionheader.scss"
import "./sass/shared/infocard.scss"
import "./sass/shared/statisticsbox.scss"
import "./sass/shared/servicebadge.scss"
import "./sass/shared/requestform.scss"
import "./sass/shared/requestbutton.scss"
import "./sass/shared/downloadbutton.scss"


import "./sass/main.scss"
import "./sass/socialbuttons.scss"
import "./sass/float.scss"
import "./sass/sectionheader.scss"
import "./sass/infocard.scss"
import "./sass/statisricsbox.scss"
import "./sass/Servicebadge.scss"


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
        <NavBar />
        <Home />
        <FloatSocialButtons />
        <Ourproducts/>
        <Socialbtns />
      </ThemeProvider>
    </Fragment>
  )
}

export default App
