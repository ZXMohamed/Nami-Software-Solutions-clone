import React from 'react'
import PageWrapper from '../componants/layouts/pagewrapper'
import ServicesTicker from '../componants/layouts/servicesticker'
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <ServicesTicker/>
    </PageWrapper>
  )
}