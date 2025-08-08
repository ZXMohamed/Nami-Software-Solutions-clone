//*react
import React from 'react'
//*components
import PageWrapper from '../componants/pagewrapper'
import Portfolio from '../componants/portfolio/portfolio'
//*styles
import 'swiper/css';
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <Portfolio/>
    </PageWrapper>
  )
}