//*react
import React from 'react'
//*component
import PageWrapper from '../componants/pagewrapper'
import WhyUs from '../componants/whyus'
//*styles
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <WhyUs/>
    </PageWrapper>
  )
}