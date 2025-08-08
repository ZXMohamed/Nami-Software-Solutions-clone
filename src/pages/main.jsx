//*react
import React from 'react'
//*component
import PageWrapper from '../componants/pagewrapper'
import Careers from '../componants/careers'
//*styles
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <Careers/>
    </PageWrapper>
  )
}