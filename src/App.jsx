//*react
import { Fragment } from "react"
//*mui
import { CssBaseline, ThemeProvider } from "@mui/material"
//*init
import "./aos/aosinit"
import "./gsap/GSAPinit"
import { theme } from "./mui/MUIinit"
//*pages
import Service from "./pages/service"
//*css
import '../node_modules/aos/dist/aos.css';
// import 'swiper/css';//!use when needed
//*sass files
import "./sass/shared/pageinit.scss"
import "./sass/shared/fonts.scss"




function App() {

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Service/>
      </ThemeProvider>
    </Fragment>
  )
}

export default App
