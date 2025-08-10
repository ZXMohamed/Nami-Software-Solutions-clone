//*react
import React from 'react'
//*component
import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home/home'
import About from '../componants/about/about'
import { Our } from '../componants/about/our'
import Services from '../componants/services'
import OurProducts from '../componants/ourproducts/ourproducts'
import Portfolio from '../componants/portfolio/portfolio'
import Careers from '../componants/careers'
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
    </PageWrapper>
  )
}