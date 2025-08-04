//*react
import React from 'react'
//*components
import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home'
import Portfolio from '../componants/portfolio/portfolio'
//*styles
import 'swiper/css';
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <Home />
      <Portfolio/>
    </PageWrapper>
  )
}