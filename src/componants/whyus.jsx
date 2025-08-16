import React, { useContext, useMemo } from 'react'
import { Box, Container, Grid, Skeleton, Stack, Typography } from '@mui/material'
import MiniHeader from './miniheader'
import "../sass/shared/whyus.scss"
import { useGetServicesQuestionQuery } from '../redux/server state/services'
import { Language } from '../languages/languagesContext'

export default function WhyUs() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        language: language_isSuccess ? language.page.language : "en",
        title: language_isSuccess ? language.whyUs.title : "Why us",
        subtitle: language_isSuccess ? language.whyUs.subtitle : "Why to choose work with us"
    }), [language, language_isSuccess]);

    const { isError: servicesQuestion_isError, isSuccess: servicesQuestion_isSuccess, data: servicesQuestion } = useGetServicesQuestionQuery()
console.log(servicesQuestion);
    return (
        <>
            <Box dir={defaultContent.direction} className="whyUsSection">
                <MiniHeader dir={defaultContent.direction} title={defaultContent.title} subtitle={defaultContent.subtitle}/>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        { servicesQuestion_isSuccess && Object.values(servicesQuestion.whySec).map((answer) =>
                            <Grid key={answer.id} size={ { sm: 4, xs: 12 } }>
                                <AnswerBox dir={defaultContent.direction} data={ answer } aosAnimation={ boxAosAnimation } />
                            </Grid>  
                        )}
                        { !servicesQuestion_isSuccess && <Grid size={ { sm: 4, xs: 12 } }> <AnswerBoxWaitItemsSkelton /> </Grid> }
                    </Grid>
                    {servicesQuestion_isError && <Typography component={"p"} variant='h5' color='error'>data not found !</Typography>}
                </Container>
            </Box>
        </>
    )
}

function AnswerBox({ dir, data, aosAnimation }) {

    if (!data || (data && Object.keys(data).length == 0)) return <></>;
    
    return (
        <Stack dir={dir} direction={"column"} className='answerBox' {...aosAnimation}>
            <img src={ data.image } width={ 60 } height={ 60 } alt={ data.title + " service form nami" } className='answerBoxIcon' />
            <Typography component={ "h5" } variant='h6' className='answerBoxTitle'>{ data.title }</Typography>
            <Typography className='answerBoxDescription'>{ data.description }</Typography>
        </Stack>
    )
}

function AnswerBoxWaitItemsSkelton() { 
    return (
        <>
            <Stack direction={ "row" } justifyContent={ "space-between" } alignItems={ "center" }>
                <Skeleton variant="rounded" width={ 60 } height={ 60 } />
            </Stack>
            <br/>
            <Skeleton variant="rounded" width={ 200 } height={ 20 } />
            <br/>
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <br/>
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <br/>
            <Skeleton variant="rounded" width={ "80%" } height={ 10 } />
            <br/>
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <br/>
            <Skeleton variant="rounded" width={ "80%" } height={ 10 } />
        </>
    );
}

const aosAnimation = {
  ["data-aos"]: "fade-up",
  ["data-aos-duration"]: "1000",
}
const boxAosAnimation = {
  ...aosAnimation,
  ["data-aos-delay"]: "100"
}