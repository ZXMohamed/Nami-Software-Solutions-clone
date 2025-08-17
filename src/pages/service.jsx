import React from 'react'
import PageWrapper from '../componants/pagewrapper'
import ServiceOrder from '../componants/serviceorder/serviceorder'
import "../sass/pages/service.scss"
import WhyUs from '../componants/whyus'
export default function Service() {
  return (
    <PageWrapper>
      <ServiceOrder />
      <WhyUs />
      
    </PageWrapper>
  )
}
