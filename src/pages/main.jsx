//*react
import React from 'react'
//*component
import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/Home/Home'
//*styles
import "../sass/pages/main.scss"
import ServicesTicker from '../componants/servicesticker'

export default function Main() {
  return (
    <PageWrapper>
      <Home/>
    </PageWrapper>
  )
}