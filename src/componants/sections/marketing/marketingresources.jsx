//*react
import React from 'react'
//*mui
import { Box } from '@mui/material';
//*hooks
import { useContent } from '../../../languages/hooks/usecontent';
//*components
import Marketers from './marketers';
import Partnership from './partnership';
import InfoCard, { infoCardEffects, typographyForm } from '../../shared/infocard'
import PageHead from '../../shared/pagehead';

export default function MarketingResources() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                language: content.page.language,
                direction: content.page.direction,
                logo: content.navBar.navLogo,
                subtitle: content.header.subtitle,
                description: content.header.description,
            }
        } else {
            return firstContent;
        }
    })();

    return (
        <Box>
            <PageHead description={defaultContent.description} language={defaultContent.language} image={defaultContent.logo} url='/'/>
            <InfoCard dir={ defaultContent.direction } wave_dir={ "right" } effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle: [typographyForm.subtitle.size.big] } } subtitle={ defaultContent.subtitle } description={ defaultContent.description } animateDescription />
            <br />
            <Marketers />
            <Partnership />
        </Box>
    )
}


const firstContent = {
    direction: "ltr",
    subtitle: "You are my partner in everything",
    description: "At Nami Corporation, we create advanced marketing solutions that put our clients ahead of the competition. Our team of experts works on design and implementationDigital marketing strategies that achieve tangible results and enhance the presence of brands online. We are always looking forWe are looking for talented marketers to join our team and contribute to the success of our clients. Join us to be part of this exciting marketing journey!",
}