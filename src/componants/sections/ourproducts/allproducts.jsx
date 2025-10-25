//*react
import React from 'react'
//*components
import InfoCard, { infoCardEffects, typographyForm } from '../../shared/infocard'
import { Products } from './ourproducts'
import PageHead from '../../shared/pagehead';
//*hooks
import { useContent } from '../../../languages/hooks/usecontent';

export default function AllProducts() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                logo: content.navBar.navLogo,
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
            <PageHead description={defaultContent.header.description} image={defaultContent.logo} language={defaultContent.language} type='Products' url='/'/>
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