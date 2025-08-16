import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MiniHeader from './miniheader'
import "../sass/shared/QA.scss"
import { useGetServicesQuestionQuery } from '../redux/server state/services';

export default function QA() {

    const { isError: servicesQuestion_isError, isSuccess: servicesQuestion_isSuccess, data: servicesQuestion } = useGetServicesQuestionQuery();

    return (
        <>
            <Box dir={"ltr"} className="QASection">
                <MiniHeader dir={"ltr"} title={"FAQS"} subtitle={"The most common questions that clients ask about website development"}/>
                <Container maxWidth="lg" className='QABoxCon'>
                    { servicesQuestion_isSuccess && <QABox dir={ "ltr" } data={ { Q: "What services does Nami provide?", A: "Nami offers a variety of services including website design and development, application development, cybersecurity services, and data analysis, in addition to digital marketing solutions and software support and maintenance." } } aosAnimation={ boxAosAnimation } /> }
                    { !servicesQuestion_isSuccess && <>jj</>}
                    <QABox dir={ "ltr" } data={ { Q: "What services does Nami provide?", A: "Nami offers a variety of services including website design and development, application development, cybersecurity services, and data analysis, in addition to digital marketing solutions and software support and maintenance." } } aosAnimation={ boxAosAnimation } />
                    <QABox dir={"ltr"} data={{Q:"What services does Nami provide?", A:"Nami offers a variety of services including website design and development, application development, cybersecurity services, and data analysis, in addition to digital marketing solutions and software support and maintenance."}} aosAnimation={boxAosAnimation}/>
                    { servicesQuestion_isError && <Typography variant='h5' color='error'>data not found !</Typography>}
                </Container>
            </Box>
        </>
    )
}

function QABox({dir, data, aosAnimation}) {
    
    return (
        <Accordion dir={dir} className='QABox' {...aosAnimation}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className='QABox-Q'>
                { data.Q }
            </AccordionSummary>
            <AccordionDetails className='QABox-A'>{data.A}</AccordionDetails>
        </Accordion>
    )
}



const aosAnimation = {
  ["data-aos"]: "fade-up",
  ["data-aos-duration"]: "1000",
}
const boxAosAnimation = {
  ...aosAnimation,
  ["data-aos-delay"]: "100"
}