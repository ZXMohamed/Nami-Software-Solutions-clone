//*react
import React from 'react'
//*components
import PageWrapper from '../componants/layouts/pagewrapper'
import Portfolio from '../componants/sections/portfolio/portfolio'
//*styles
import 'swiper/css';
import "../sass/pages/main.scss"
import ProjectsView from '../componants/sections/portfolio/projectsview';

export default function Main() {
  return (
    <PageWrapper>
      <Portfolio/>
    </PageWrapper>
  )
}