import React from 'react'

import PageWrapper from '../componants/pagewrapper'

import "../sass/pages/main.scss"
import { Our } from '../componants/about'

export default function Main() {
  return (
    <PageWrapper>
        <Our/>
    </PageWrapper>
  )
}