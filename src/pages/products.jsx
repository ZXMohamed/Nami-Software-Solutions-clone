//*react
import React from 'react'
//*component
import PageWrapper from '../componants/layouts/pagewrapper'
import AllProducts from '../componants/sections/ourproducts/allproducts';
//*styles
import 'swiper/css';//!use when needed
import "../sass/pages/products.scss"


export default function Products() {
  return (
    <PageWrapper>
      <AllProducts />
      <br />
    </PageWrapper>
  )
}