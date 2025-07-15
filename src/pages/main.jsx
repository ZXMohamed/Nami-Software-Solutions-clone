import React from 'react'

import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home'
import OurProducts from '../componants/ourproducts'

import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <Home />
      <OurProducts/>
    </PageWrapper>
  )
}