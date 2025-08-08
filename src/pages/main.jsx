import React from 'react'

import PageWrapper from '../componants/pagewrapper'

import "../sass/pages/main.scss"
import Services from '../componants/services'

export default function Main() {
  return (
    <PageWrapper>
      <Services/>
    </PageWrapper>
  )
}