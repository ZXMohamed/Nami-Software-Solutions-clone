//*react
import React from 'react'
//*components
import PageWrapper from '../componants/layouts/pagewrapper'
//*styles
import 'swiper/css';
import "../sass/pages/projects.scss"
import ProjectsView from '../componants/sections/portfolio/projectsview';

export default function Portfolio() {
  return (
    <PageWrapper>
      <ProjectsView/>
    </PageWrapper>
  )
}