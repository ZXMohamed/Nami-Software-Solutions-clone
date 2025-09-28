import React from 'react'
import PageWrapper from '../componants/layouts/pagewrapper'
import ServiceOrderDetails from '../componants/sections/serviceorder/serviceorderdetails'
import "../sass/pages/service.scss"
import WhyUs from '../componants/sections/whyus'
import QA from '../componants/sections/QA'
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
