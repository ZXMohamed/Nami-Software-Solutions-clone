import React from 'react'

import PageWrapper from '../componants/pagewrapper'

import "../sass/pages/main.scss"
import Contact from '../componants/contact/contact'

export default function Main() {
  return (
    <PageWrapper>
      <Contact/>
    </PageWrapper>
  )
}