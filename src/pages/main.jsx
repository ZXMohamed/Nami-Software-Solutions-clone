//*react
import React from 'react'
//*components
import PageWrapper from '../componants/pagewrapper'
import OurProducts from '../componants/ourproducts/ourproducts'
//*styles
import 'swiper/css';//!use when needed
import "../sass/pages/main.scss"
import ServicesTicker from '../componants/servicesticker'

export default function Main() {
  return (
    <PageWrapper>
      <OurProducts/>
    </PageWrapper>
  )
}