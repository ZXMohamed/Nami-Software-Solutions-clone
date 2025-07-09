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
import OurProducts from "./componants/ourproducts";
//*css
import '../node_modules/aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css';
//*sass files
import "./sass/shared/productcard.scss"
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


function App() {

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Home />
        <FloatSocialButtons />
        <OurProducts/>
      </ThemeProvider>
    </Fragment>
  )
}

export default App
