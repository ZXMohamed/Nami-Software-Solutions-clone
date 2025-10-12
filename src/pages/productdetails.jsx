import React from 'react'
import PageWrapper from '../componants/layouts/pagewrapper'
import ProductOrderDetails from '../componants/sections/productorder/ProductOrderDetails'
import "../sass/pages/productorder.scss"
import 'swiper/css';

export default function ProductDetails() {
  return (
    <PageWrapper>
      <ProductOrderDetails/>
    </PageWrapper>
  )
}
