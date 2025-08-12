import React from 'react'
import { Box, Container, Grid } from '@mui/material'
import MiniHeader from './miniheader'
import "../sass/shared/whyus.scss"

export default function WhyUs() {

    return (
        <>
            <Box dir={"ltr"} className="whyUsSection">
                <MiniHeader dir={"ltr"} title={"Why us"} subtitle={"Why to choose work with us"}/>
                <br/>
                <br/>
                <Container maxWidth="lg">
                    <Grid container>
                        <AnswerBox dir={"ltr"} data={{}} />
                    </Grid>
                </Container>
            </Box>
        </>
    )
}

function AnswerBox({dir, data}) {
    
    return (
        <Box>

        </Box>
    )
}