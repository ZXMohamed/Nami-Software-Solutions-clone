import { Fragment } from "react"
import { createTheme, CssBaseline, Icon, ThemeProvider } from "@mui/material"
//*init
import "./aos/AOSinit"
import "./gsap/GSAPinit"
import { theme } from "./mui/MUIinit"
//*components
import Home from "./componants/Home";
import About from "./componants/about";
import ContactButtons from "./componants/contactbuttons";
import SocialButtons from "./componants/socialbuttons"
import NavBar from "./componants/navbar"
import FloatSocialButtons from "./componants/floatsocialbuttons";
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
import "./sass/shared/contactbuttons.scss"



function App() {

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Home />
        <About/>
        <ContactButtons />
        <FloatSocialButtons />
      </ThemeProvider>
    </Fragment>
  )
}

export default App
