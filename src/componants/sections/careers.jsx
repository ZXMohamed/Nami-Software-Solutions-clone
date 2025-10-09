//*react
import React, { useEffect, useRef } from 'react'
//*mui
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
//*hooks
import { useContent } from '../../languages/hooks/usecontent';
//*components
import { FormSection } from '../forms/careersform';
//*animation
import { descriptionAosAnimation, descriptionWordsUp, subtitleAosAnimation, subtitleWordsUp, titleAosAnimation, titleWordsUp } from '../../animation/careers';


export default function Careers() {

    const { isSuccess: content_isSuccess, data: content } = useContent();
    const defaultContent = { direction: content_isSuccess ? content.page.direction : "ltr" };

    return (
        <Box id="careers" dir={defaultContent.direction} className='careersSection'>
            <Container disableGutters>    
                <Grid container>
                    <Grid size={{xs:12,md:8}}>
                        <InfoSection/>
                    </Grid>
                    <Grid size={{xs:12,md:4}} className="careersFormContainer">
                        <FormSection/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

function InfoSection() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                title: content.careers.title,
                subtitle: content.careers.subtitle,
                description: content.careers.description,
            }
        } else {
            return infoSectionFirstContent;
        }
    })();

    const careersTitle = useRef();
    const careersSubtitle = useRef();
    const careersDescription = useRef();

    useEffect(() => {
        requestIdleCallback(() => {
            titleWordsUp(careersTitle);
            subtitleWordsUp(careersSubtitle);
            descriptionWordsUp(careersDescription);
        })
    }, []);

    return (
        <Stack direction={'column'} spacing={1} className='careersInfoSection'>
            <Typography ref={careersTitle} variant='h5' component={'h1'} className='careersTitle'{...titleAosAnimation}><i>{defaultContent.title}</i></Typography>
            <Typography ref={ careersSubtitle } variant='h3' component={ 'h2' } className='careersSubtitle'{ ...subtitleAosAnimation }>{defaultContent.subtitle}</Typography>
            <Typography ref={careersDescription} className='careersDescription'{...descriptionAosAnimation}>{defaultContent.description}</Typography>
        </Stack>
    )
}

const infoSectionFirstContent = {
    direction: "ltr",
    title: "Careers",
    subtitle: "Build your future with our company",
    description: "At our company, we strive to create an environment focused on learning and striving to achieve a person's fullest potential. We got itWe maintain a prominent presence in the industry thanks to our continuous efforts, and we invite you to be part of the story of our continuous development.",
}