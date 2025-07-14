import React from 'react'

import PageWrapper from '../componants/pagewrapper'
import Home from '../componants/home'

import "../sass/pages/main.scss"
import { Our } from '../componants/about'

export default function Main() {
  return (
    <PageWrapper>
        <Home/>
        <Our/>
    </PageWrapper>
  )
}