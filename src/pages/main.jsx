import React from 'react'

import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home'
import About from '../componants/about'

import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <Home />
      <About/>
    </PageWrapper>
  )
}