//*react
import React from 'react'
//*components
import InfoCard, { infoCardEffects, typographyForm } from '../../shared/infocard'
import { Products } from './ourproducts'
//*hooks
import { useContent } from '../../../languages/hooks/usecontent';

export default function AllProducts() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                header: {
                    subtitle: content.header.subtitle,
                    description: content.header.description,
                }
            }
        } else {
            return firstContent;
        }
    })();

    return (
        <>
            <InfoCard dir={ defaultContent.direction } waveDir={ "right" } effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle: [typographyForm.subtitle.size.big] } } subtitle={ defaultContent.header.subtitle } animateDescription description={ defaultContent.header.description } />
            <br/>
            <br/>
            <Products dir={ defaultContent.direction } />
        </>
  )
}



const firstContent = {
    direction: "ltr",
    header: {
        subtitle: "Where quality meets innovation",
        description: "Nami Foundation provides integrated digital solutions for resale in website design And mobile applications. We resell upgraded products with the highest quality standards to meet your needs.",
    }
}