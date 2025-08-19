import React from 'react'
import PageWrapper from '../componants/pagewrapper'
import ProductOrderDetails from '../componants/productorder/ProductOrderDetails'

import "../sass/pages/productdetailsorder.scss"
import 'swiper/css';

export default function ProductDetails() {
  return (
    <PageWrapper>
      <ProductOrderDetails/>
    </PageWrapper>
  )
}
