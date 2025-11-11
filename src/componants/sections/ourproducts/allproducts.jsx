//*react
import React from 'react'
//*mui
import { Box } from '@mui/material';
//*components
import InfoCard, { infoCardEffects, typographyForm } from '../../shared/infocard';
import { Products } from './ourproducts';
//*scripts
import { defaultLanguage } from '../../../languages/languagesContext';
//*hooks
import { useContent } from '../../../languages/hooks/usecontent';
//*assets
import logo from "../../../assets/photo/global/namilogo.svg";



export default function AllProducts() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                pageTitle:content.page.title,
                meta: {
                    title: content.page.meta.title,
                    description: content.page.meta.description,
                    image: content.page.meta.image,
                },
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
        <Box className={ "AllProductsCon" } >
            <InfoCard dir={ defaultContent.direction } wave_dir={ "right" } effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle: [typographyForm.subtitle.size.big] } } subtitle={ defaultContent.header.subtitle } animateDescription description={ defaultContent.header.description } />
            <br/>
            <br/>
            <Products dir={ defaultContent.direction } language={ defaultContent.language } />
        </Box>
  )
}



const firstContent = {
    direction: "ltr",
    language: defaultLanguage,
    pageTitle:"Our Products | Smart Software Solutions for Business Growth",
    meta: {
        title: "Our Products | Nami Software Solutions",
        description: "Nami Foundation provides integrated digital solutions for resale in website design And mobile applications. We resell upgraded products with the highest quality standards to meet your needs.",
        image: logo,
    },
    header: {
        subtitle: "Where quality meets innovation",
        description: "Nami Foundation provides integrated digital solutions for resale in website design And mobile applications. We resell upgraded products with the highest quality standards to meet your needs.",
    }
}