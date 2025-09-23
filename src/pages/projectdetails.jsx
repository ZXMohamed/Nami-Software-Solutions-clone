import React from 'react'
import PageWrapper from '../componants/layouts/pagewrapper'
import RoutesBar from '../componants/shared/routesbar';
import ProjectShowDetails from '../componants/sections/projectshowdetails/projectshowdetails';

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
