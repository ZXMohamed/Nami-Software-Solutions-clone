import React from 'react'

import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home'

import "../sass/pages/main.scss"
import Services from '../componants/services'

export default function Main() {
  return (
    <PageWrapper>
      <Home />
      <Services/>
    </PageWrapper>
  )
}