import React from 'react'
import PageWrapper from '../componants/layouts/pagewrapper'
import Services from '../componants/sections/services'
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <Services/>
    </PageWrapper>
  )
}