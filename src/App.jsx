import { Fragment } from "react"
import { CssBaseline, ThemeProvider } from "@mui/material"
//*init
import "./aos/aosinit"
import "./gsap/GSAPinit"
import { theme } from "./mui/MUIinit"
//*pages
import Main from "./pages/main"
//*css
import '../node_modules/aos/dist/aos.css';
//*sass files
import "./sass/shared/pageinit.scss"
import "./sass/shared/fonts.scss"




function App() {

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main/>
      </ThemeProvider>
    </Fragment>
  )
}

export default App
