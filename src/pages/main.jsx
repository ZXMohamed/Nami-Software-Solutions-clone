//*react
import React from 'react'
//*components
import PageWrapper from '../componants/layouts/pagewrapper'
import OurProducts from '../componants/sections/ourproducts/ourproducts'
import AllProducts from '../componants/sections/ourproducts/allproducts';
//*styles
import 'swiper/css';//!use when needed
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <OurProducts />
      <br />
      <AllProducts/>
    </PageWrapper>
  )
}