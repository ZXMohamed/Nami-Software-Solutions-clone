import React from 'react'
import PageWrapper from '../componants/layouts/pagewrapper'

import "../sass/pages/projectdetails.scss"
import 'swiper/css';
import ProjectShowDetails from '../componants/sections/projectshowdetails/projectshowdetails';

export default function ProjectDetails() {
  return (
    <PageWrapper>
      <ProjectShowDetails/>
    </PageWrapper>
  )
}
