import React from 'react'

import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home'

import "../sass/pages/main.scss"
import Careers from '../componants/careers'

export default function Main() {
  return (
    <PageWrapper>
      <Home />
      <Careers/>
    </PageWrapper>
  )
}