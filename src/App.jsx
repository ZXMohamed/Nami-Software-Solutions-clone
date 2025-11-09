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
import Main from "./pages/main"
import Service from "./pages/service"
import Products from "./pages/products"
import ProductDetails from "./pages/productdetails"
import NotFoundPage from "./pages/notFound"
import Blogs from "./pages/blogs"
import Marketing from "./pages/marketing"
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
            <Route index path="/:language?/" element={ <Main/> } />
            <Route index path="/:language?/service-details/:slug?/:id" element={ <Service/> } />
            <Route index path="/:language?/products" element={ <Products/> } />
            <Route index path="/:language?/product-details/:slug?/:id" element={ <ProductDetails /> } />
            <Route index path="/:language?/marketing" element={ <Marketing/> } />
            <Route index path="/:language?/blogs" element={ <Blogs/> } />
            <Route path="*" element={ <NotFoundPage/> } />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Fragment>
  )
}

export default App
