import React, { useContext, useMemo } from 'react'
import InfoCard, { infoCardEffects, typographyForm } from '../shared/infocard'
import { Language } from '../../languages/languagesContext';
import { Box } from '@mui/material';

export default function BlogsView() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
    
    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        subtitle: language_isSuccess ? language.header.subtitle : "Discover the world of articles together",
        description: language_isSuccess ? language.header.description : "We offer unique and diverse content that meets readers’ interests and enhances their knowledge experiences. Our team of professional writers works passionately to craft engaging articles that inspire thought and enrich Arabic content. We always strive to develop innovative content that builds bridges of communication and knowledge. If you are a creative writer or passionate about the world of writing, join us and help make a difference in the world of Arabic content!",
    }), [language, language_isSuccess]);

    return (
        <Box>
            <InfoCard dir={"ltr" } waveDir={"right" } effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle: [typographyForm.subtitle.size.big] } }  subtitle={ defaultContent.subtitle } description={ defaultContent.description } animateDescription />
        </Box>
    )
}
