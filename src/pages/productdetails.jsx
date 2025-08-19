import React from 'react'
import PageWrapper from '../componants/pagewrapper'
import ProductOrderDetails from '../componants/productorder/ProductOrderDetails'

import "../sass/pages/productorder.scss"
import 'swiper/css';
import RoutesBar from '../componants/routesbar';

export default function ProductDetails() {
  return (
    <PageWrapper>
      <RoutesBar/>
      <ProductOrderDetails />
      <br/>
      <br/>
    </PageWrapper>
  )
}
