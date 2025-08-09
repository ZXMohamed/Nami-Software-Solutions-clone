//*react
import React from 'react'
//*component
import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home/home'
import About from '../componants/about/about'
import { Our } from '../componants/about/our'
import Services from '../componants/services'
//*styles
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <Home />
      <About />
      <Our />
      <Services/>
    </PageWrapper>
  )
}