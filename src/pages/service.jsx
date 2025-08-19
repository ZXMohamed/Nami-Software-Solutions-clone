import React from 'react'
import PageWrapper from '../componants/pagewrapper'
import ServiceOrderDetails from '../componants/serviceorder/serviceorderdetails'
import "../sass/pages/service.scss"
import WhyUs from '../componants/whyus'
import QA from '../componants/QA'
export default function Service() {
  return (
    <PageWrapper>
      <ServiceOrderDetails />
      <br/>
      <WhyUs />
      <br/>
      <QA/>
    </PageWrapper>
  )
}
