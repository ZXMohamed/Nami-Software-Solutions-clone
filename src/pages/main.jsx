import React from 'react'

import PageWrapper from '../componants/pagewrapper'
import About from '../componants/about'

import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <About/>
    </PageWrapper>
  )
}