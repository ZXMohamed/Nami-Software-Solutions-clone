import React from 'react'
import PageWrapper from '../componants/layouts/pagewrapper'
import ServiceOrderDetails from '../componants/sections/serviceorder/serviceorderdetails'
import "../sass/pages/service.scss"
export default function Service() {
  return (
    <PageWrapper>
      <ServiceOrderDetails/>
    </PageWrapper>
  )
}
