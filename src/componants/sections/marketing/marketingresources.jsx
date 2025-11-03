//*react
import React from 'react'
//*routes
import { pages_routes } from '../../../routes/routes';
//*mui
import { Box } from '@mui/material';
//*components
import Marketers from './marketers';
import Partnership from './partnership';
import InfoCard, { infoCardEffects, typographyForm } from '../../shared/infocard'
import PageHead from '../../shared/pagehead';
//*scripts
import { defaultLanguage } from '../../../languages/languagesContext';
//*hooks
import { useContent } from '../../../languages/hooks/usecontent';
//*assets
import logo from "../../../assets/photo/global/namilogo.svg";



export default function MarketingResources() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                language: content.page.language,
                direction: content.page.direction,
                pageTitle: content.page.title,
                meta: {
                    title: content.page.meta.title,
                    description: content.page.meta.description,
                    image: content.page.meta.image,
                },
                subtitle: content.header.subtitle,
                description: content.header.description,
            }
        } else {
            return firstContent;
        }
    })();

    return (
        <Box>
            <PageHead pageTitle={defaultContent.pageTitle} title={defaultContent.meta.title} description={ defaultContent.meta.description } language={ defaultContent.language } image={ defaultContent.meta.image } url={ pages_routes(defaultContent.language)["marketing"].link } />
            <InfoCard dir={ defaultContent.direction } wave_dir={ "right" } effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle: [typographyForm.subtitle.size.big] } } subtitle={ defaultContent.subtitle } description={ defaultContent.description } animateDescription />
            <br />
            <Marketers />
            <Partnership />
        </Box>
    )
}


const firstContent = {
    language: defaultLanguage,
    direction: "ltr",
    pageTitle: "Marketing | App & Website Development Company in Egypt and the Arab World | Nami Tech",
    meta: {
        title: "Marketing | Nami Software Solutions",
        description: "At Nami Corporation, we create advanced marketing solutions that put our clients ahead of the competition. Our team of experts works on design and implementationDigital marketing strategies that achieve tangible results and enhance the presence of brands online. We are always looking forWe are looking for talented marketers to join our team and contribute to the success of our clients. Join us to be part of this exciting marketing journey!",
        image: logo,
    },
    subtitle: "You are my partner in everything",
    description: "At Nami Corporation, we create advanced marketing solutions that put our clients ahead of the competition. Our team of experts works on design and implementationDigital marketing strategies that achieve tangible results and enhance the presence of brands online. We are always looking forWe are looking for talented marketers to join our team and contribute to the success of our clients. Join us to be part of this exciting marketing journey!",
}