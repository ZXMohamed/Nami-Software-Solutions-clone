//*react
import React from 'react'
//*component
import PageWrapper from '../componants/pagewrapper'
import QA from '../componants/QA'
//*styles
import "../sass/pages/main.scss"

export default function Main() {
  return (
    <PageWrapper>
      <QA/>
    </PageWrapper>
  )
}