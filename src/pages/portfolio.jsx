//*react
import React from 'react'
//*components
import PageWrapper from '../componants/layouts/pagewrapper'
import ProjectsView from '../componants/sections/portfolio/projectsview';
//*styles
import 'swiper/css';
import "../sass/pages/portfolio.scss"

export default function Portfolio() {
  return (
    <PageWrapper>
      <ProjectsView />
      <br/>
    </PageWrapper>
  )
}