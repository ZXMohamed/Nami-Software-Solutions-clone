import React from 'react'

import PageWrapper from '../componants/pagewrapper'

import "../sass/pages/main.scss"
import ServicesTicker from '../componants/servicesticker'

export default function Main() {
  return (
    <PageWrapper>
      <ServicesTicker/>
    </PageWrapper>
  )
}