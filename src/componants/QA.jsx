import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MiniHeader from './miniheader'
import "../sass/shared/QA.scss"

export default function QA() {

    return (
        <>
            <Box dir={"ltr"} className="QASection">
                <MiniHeader dir={"ltr"} title={"FAQS"} subtitle={"The most common questions that clients ask about website development"}/>
                <Container maxWidth="lg" className='QABoxCon'>
                    <QABox dir={"ltr"} data={{Q:"What services does Nami provide?", A:"Nami offers a variety of services including website design and development, application development, cybersecurity services, and data analysis, in addition to digital marketing solutions and software support and maintenance."}} />
                    <QABox dir={"ltr"} data={{Q:"What services does Nami provide?", A:"Nami offers a variety of services including website design and development, application development, cybersecurity services, and data analysis, in addition to digital marketing solutions and software support and maintenance."}} />
                    <QABox dir={"ltr"} data={{Q:"What services does Nami provide?", A:"Nami offers a variety of services including website design and development, application development, cybersecurity services, and data analysis, in addition to digital marketing solutions and software support and maintenance."}} />
                </Container>
            </Box>
        </>
    )
}

function QABox({dir, data}) {
    
    return (
        <Accordion dir={dir} className='QABox'>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='QABox-Q'>
                { data.Q }
            </AccordionSummary>
            <AccordionDetails className='QABox-A'>{data.A}</AccordionDetails>
        </Accordion>
    )
}