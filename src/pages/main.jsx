import React from 'react'

import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home'

import "../sass/pages/main.scss"
import ServicesTicker from '../componants/servicesticker'

export default function Main() {
  return (
    <PageWrapper>
      <Home />
      <ServicesTicker/>
    </PageWrapper>
  )
}