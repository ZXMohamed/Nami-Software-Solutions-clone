//*react
import React from 'react'
//*component
import PageWrapper from '../componants/pagewrapper'
//*styles
import "../sass/pages/main.scss"
import InfoCard, { infoCardEffects, typographyForm } from '../componants/infocard'

export default function OurProducts() {
  return (
    <PageWrapper>
        <InfoCard dir={ "ltr" } waveDir={ "right" } effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle: [typographyForm.subtitle.size.big] } } subtitle={ "Where quality meets innovation" } description={ "Nami Foundation provides integrated digital solutions for resale in website design And mobile applications. We resell upgraded products with the highest quality standards to meet your needs." } />

    </PageWrapper>
  )
}