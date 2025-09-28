//*react
import React, { useContext, useMemo } from 'react'

import { Box } from '@mui/material';
//*components
import Marketers from './marketers';
import Partnership from './partnership';
import InfoCard, { infoCardEffects, typographyForm } from '../../shared/infocard'
//*scripts
import { Language } from '../../../languages/languagesContext';

export default function MarketingResources() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
    
    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        subtitle: language_isSuccess ? language.header.subtitle : "You are my partner in everything",
        description: language_isSuccess ? language.header.description : "At Nami Corporation, we create advanced marketing solutions that put our clients ahead of the competition. Our team of experts works on design and implementationDigital marketing strategies that achieve tangible results and enhance the presence of brands online. We are always looking forWe are looking for talented marketers to join our team and contribute to the success of our clients. Join us to be part of this exciting marketing journey!",
    }), [language, language_isSuccess]);

    return (
        <Box>
            <InfoCard dir={ "ltr" } waveDir={ "right" } effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle: [typographyForm.subtitle.size.big] } } subtitle={ defaultContent.subtitle } description={ defaultContent.description } animateDescription />
            <br />
            <Marketers />
            <Partnership />
        </Box>
    )
}
