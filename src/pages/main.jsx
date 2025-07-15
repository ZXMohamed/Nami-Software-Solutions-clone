import React from 'react'

import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home'

import "../sass/pages/main.scss"
import Portfolio from '../componants/portfolio'

export default function Main() {
  return (
    <PageWrapper>
      <Home />
      <Portfolio/>
    </PageWrapper>
  )
}