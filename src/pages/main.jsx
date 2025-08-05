//*react
import React from 'react'
//*component
import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home'
import Careers from '../componants/careers'
//*styles
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <Home />
      <Careers/>
    </PageWrapper>
  )
}