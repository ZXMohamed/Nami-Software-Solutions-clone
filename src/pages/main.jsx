//*react
import React from 'react'
//*component
import PageWrapper from '../componants/layouts/pagewrapper'
import Home from '../componants/sections/Home/Home'
//*styles
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <Home/>
    </PageWrapper>
  )
}