//*react
import React from 'react'
//*component
import PageWrapper from '../componants/layouts/pagewrapper'
import QA from '../componants/sections/QA'
//*styles
import "../sass/pages/main.scss"

export default function Service() {
  return (
    <PageWrapper>
      <QA/>
    </PageWrapper>
  )
}