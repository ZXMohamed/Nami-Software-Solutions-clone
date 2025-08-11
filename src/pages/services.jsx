//*react
import React from 'react'
//*component
import PageWrapper from '../componants/pagewrapper'
import RoutesBar from '../componants/routesbar'
import IntroCard from '../componants/introcard'
import ListCard from '../componants/listcard'
//*styles

import x from "../assets/photo/servicesbadges/androidapplication.svg"

export default function Services() {
  return (
    <PageWrapper>
      <RoutesBar dir={"ltr"}/>
      <IntroCard icon={ x } title={ "Design services" } description={ (" We offer a comprehensive range of design services that include graphic design and brand identity design. We work to create innovative designs that reflect the essence of your brand and attract the attention of your audience.") }></IntroCard>
      <br />
      <ListCard title={ "Service objectives" }></ListCard>
    </PageWrapper>
  )
}