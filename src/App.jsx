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
import {About,Our} from "./componants/about";
import Socialbtns from "./componants/socialbtns";
import Contactbtns from "./componants/contactbtns";
//*css
import '../node_modules/aos/dist/aos.css';
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
import "./sass/float.scss"

AOS.init({ once:true,offset: 65 });

const theme = createTheme({
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
        <About />
        <Our/>
        <Socialbtns />
        <Contactbtns />
      </ThemeProvider>
    </Fragment>
  )
}

export default App
