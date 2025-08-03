//*react
import React from 'react'
//*components
import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home'
import OurProducts from '../componants/ourproducts/ourproducts'
//*styles
import 'swiper/css';//!use when needed
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <Home />
      <OurProducts/>
    </PageWrapper>
  )
}