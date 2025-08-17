import React from 'react'
import PageWrapper from '../componants/pagewrapper'
import ServiceOrder from '../componants/serviceorder/serviceorder'
import "../sass/pages/service.scss"
import WhyUs from '../componants/whyus'
import QA from '../componants/QA'
export default function Service() {
  return (
    <PageWrapper>
      <ServiceOrder />
      <br/>
      <WhyUs />
      <br/>
      <QA/>
    </PageWrapper>
  )
}
