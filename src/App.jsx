//*react
import { Fragment } from "react"
//*router
import { BrowserRouter, Route, Routes } from "react-router"
//*mui
import { CssBaseline, ThemeProvider } from "@mui/material"
//*init
import "./aos/aosinit"
import "./gsap/GSAPinit"
import { theme } from "./mui/MUIinit"
//*pages
import ProjectDetails from "./pages/projectdetails"
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
        <BrowserRouter>
          <Routes>
            <Route index path="/:language?/project-details/:id" element={ <ProjectDetails /> } />
            <Route path="*" element={ <h1>NOT FOUND !</h1> } /> {/*//!not found*/}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Fragment>
  )
}

export default App
