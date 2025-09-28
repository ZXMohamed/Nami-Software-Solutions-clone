//*react
import React from 'react'
//*component
import PageWrapper from '../componants/layouts/pagewrapper'
import Careers from '../componants/sections/careers'
//*styles
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <Careers/>
    </PageWrapper>
  )
}