import { Fragment } from "react"
import { CssBaseline, ThemeProvider } from "@mui/material"
//*init
import "./aos/aosinit"
import "./gsap/GSAPinit"
import { theme } from "./mui/MUIinit"
//*components
import NavBar from "./componants/navbar"
import Home from "./componants/home";
import FloatSocialButtons from "./componants/floatsocialbuttons";
//*css
import '../node_modules/aos/dist/aos.css';
import 'swiper/css';//!use when needed
//*sass files
import "./sass/shared/pageinit.scss"
import "./sass/shared/fonts.scss"
//!set main in main page comp
import "./sass/pages/main.scss"



function App() {

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Home />
        <FloatSocialButtons />
      </ThemeProvider>
    </Fragment>
  )
}

export default App
