//*react
import React from 'react'
//*mui
import { Box } from '@mui/material';
//*components
import InfoCard, { infoCardEffects, typographyForm } from '../shared/infocard'
//*hooks
import { useContent } from '../../languages/hooks/usecontent';

export default function BlogsView() {
    
    const { isSuccess: content_isSuccess, data: content } = useContent();
    
    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                subtitle: content.header.subtitle,
                description: content.header.description,
            }
        } else {
            return firstContent;
        }
    })();


    return (
        <Box>
            <InfoCard dir={ defaultContent.direction } wave_dir={ "right" } effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle: [typographyForm.subtitle.size.big] } } subtitle={ defaultContent.subtitle } description={ defaultContent.description } animateDescription />
        </Box>
    )
}

const firstContent = {
    direction: "ltr",
    subtitle: "Discover the world of articles together",
    description: "We offer unique and diverse content that meets readers’ interests and enhances their knowledge experiences. Our team of professional writers works passionately to craft engaging articles that inspire thought and enrich Arabic content. We always strive to develop innovative content that builds bridges of communication and knowledge. If you are a creative writer or passionate about the world of writing, join us and help make a difference in the world of Arabic content!",
}
