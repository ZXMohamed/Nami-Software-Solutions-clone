import React from 'react'

import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home'

import "../sass/pages/main.scss"
import Footer from '../componants/footer'

export default function Main() {
  return (
    <PageWrapper>
      <Home />
      <Footer/>
    </PageWrapper>
  )
}