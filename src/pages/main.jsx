import React from 'react'

import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home'

import "../sass/pages/main.scss"
import Contact from '../componants/contact'

export default function Main() {
  return (
    <PageWrapper>
      <Home />
      <Contact/>
    </PageWrapper>
  )
}