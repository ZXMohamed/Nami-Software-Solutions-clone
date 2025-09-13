//*react
import React from 'react'
//*components
import PageWrapper from '../componants/pagewrapper'
//*styles
import 'swiper/css';
import "../sass/pages/projects.scss"
import ProjectsView from '../componants/portfolio/projectsview';

export default function Project() {
  return (
    <PageWrapper>
      <ProjectsView/>
    </PageWrapper>
  )
}