import React from 'react'
import PageWrapper from '../componants/pagewrapper'
import RoutesBar from '../componants/routesbar';
import ProjectShowDetails from '../componants/projectshowdetails/projectshowdetails';

import "../sass/pages/projectdetails.scss"
import 'swiper/css';

export default function ProjectDetails() {
  return (
    <PageWrapper>
      <RoutesBar/>
      <ProjectShowDetails />
      <br/>
      <br/>
      <br/>
    </PageWrapper>
  )
}
