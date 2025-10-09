import React from 'react'
import PageWrapper from '../componants/layouts/pagewrapper'
import About from '../componants/sections/about/about'
import "../sass/pages/main.scss"


export default function Main() {
  return (
    <PageWrapper>
      <About/>
    </PageWrapper>
  )
}