import React, { useContext, useMemo } from 'react'
import InfoCard, { infoCardEffects, typographyForm } from '../../shared/infocard'
import { Products } from './ourproducts'
import { Language } from '../../../languages/languagesContext';

export default function AllProducts() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        header: {
            subtitle: language_isSuccess ? language.header.subtitle : "Where quality meets innovation",
            description: language_isSuccess ? language.header.description : "Nami Foundation provides integrated digital solutions for resale in website design And mobile applications. We resell upgraded products with the highest quality standards to meet your needs.",
        }
    }), [language, language_isSuccess]);
    
    return (
        <>
            <InfoCard dir={ defaultContent.direction } waveDir={ "right" } effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle: [typographyForm.subtitle.size.big] } } subtitle={ defaultContent.header.subtitle } animateDescription description={ defaultContent.header.description } />
            <br/>
            <br/>
            <Products dir={ defaultContent.direction } />
        </>
  )
}
