//*react
import React from 'react'
//*component
import PageWrapper from '../componants/pagewrapper'
import "../sass/pages/main.scss"
import ServicesTicker from '../componants/servicesticker'

import Footer from '../componants/footer'

export default function Main() {
  return (
    <PageWrapper>
      <ServicesTicker/>
      <Footer/>
    </PageWrapper>
  )
}