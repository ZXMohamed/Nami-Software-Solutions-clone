import React from 'react'
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import MiniHeader from './miniheader'
import "../sass/shared/whyus.scss"
import x from "../assets/photo/global/instagram.svg"
import { useGetServicesQuestionQuery } from '../redux/server state/language'

export default function WhyUs() {

    const { isError: servicesQuestion_isError, isSuccess: servicesQuestion_isSuccess, data: servicesQuestion} = useGetServicesQuestionQuery()

    return (
        <>
            <Box dir={"ltr"} className="whyUsSection">
                <MiniHeader dir={"ltr"} title={"Why us"} subtitle={"Why to choose work with us"}/>
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid size={ { sm: 4, xs: 12 } }>
                            <AnswerBox dir={"ltr"} data={{icon:x, title:"Strong frame", description:"At Nami, we excel at using the latest technologies and advanced frameworks to develop high-performance and flexible websites."}} aosAnimation={boxAosAnimation} />
                        </Grid>
                    </Grid>
                    {servicesQuestion_isError && <Typography component={"p"} variant='h5' color='error'>data not found !</Typography>}
                </Container>
            </Box>
        </>
    )
}

function AnswerBox({dir, data, aosAnimation}) {
    
    return (
        <Stack dir={dir} direction={"column"} className='answerBox' {...aosAnimation}>
            { data.icon && <img src={ data.icon } width={ 60 } height={ 60 } alt={ data.title + " service form nami" } className='answerBoxIcon' /> }
            <Typography component={ "h5" } variant='h6' className='answerBoxTitle'>{ data.title }</Typography>
            { data.description && <Typography className='answerBoxDescription'>{ data.description }</Typography> }
        </Stack>
    )
}

function waitSkelton() {
    
    return
}

const aosAnimation = {
  ["data-aos"]: "fade-up",
  ["data-aos-duration"]: "1000",
}
const boxAosAnimation = {
  ...aosAnimation,
  ["data-aos-delay"]: "100"
}