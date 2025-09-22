//*react
import React from 'react'
//*component
import PageWrapper from '../componants/layouts/pagewrapper'
import Home from '../componants/sections/home/home'
import About from '../componants/sections/about/about'
import Our from '../componants/sections/about/our'
import Services from '../componants/sections/services'
import OurProducts from '../componants/sections/ourproducts/ourproducts'
import Portfolio from '../componants/sections/portfolio/portfolio'
import Careers from '../componants/sections/careers'
import Contact from '../componants/sections/contact/contact'
//*styles
import "../sass/pages/main.scss"
import "swiper/css"

export default function Main() {

  return (
    <PageWrapper>
      <Home />
      <About />
      <Our />
      <Services />
      <OurProducts />
      <Portfolio />
      <Careers />
      <Contact />
    </PageWrapper>
  )
}