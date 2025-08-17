//*react
import React from 'react'
//*component
import PageWrapper from '../componants/pagewrapper'
//*styles
import 'swiper/css';//!use when needed
import "../sass/pages/main.scss"

import AllProducts from '../componants/ourproducts/allproducts';

export default function Products() {
  return (
    <PageWrapper>
      <AllProducts />
      <br />
    </PageWrapper>
  )
}