import React from 'react'
import PageWrapper from '../componants/pagewrapper'

import "../sass/pages/projectdetails.scss"
import 'swiper/css';
import ProjectShowDetails from '../componants/projectshowdetails/projectshowdetails';

export default function ProjectDetails() {
  return (
    <PageWrapper>
      <ProjectShowDetails/>
    </PageWrapper>
  )
}
