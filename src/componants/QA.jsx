import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Skeleton, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MiniHeader from './miniheader'
import "../sass/shared/QA.scss"
import { useGetServicesQuestionQuery } from '../redux/server state/services';

export default function QA() {



    const { isError: servicesQuestion_isError, isSuccess: servicesQuestion_isSuccess, data: servicesQuestion } = useGetServicesQuestionQuery();
console.log(servicesQuestion);
    return (
        <>
            <Box dir={"ltr"} className="QASection">
                <MiniHeader dir={"ltr"} title={"FAQS"} subtitle={"The most common questions that clients ask about website development"}/>
                <Container maxWidth="lg">
                    { servicesQuestion_isSuccess && Object.values(servicesQuestion.QA).map((QA) => 
                        <QABox key={QA.id} dir={ "ltr" } data={ QA } aosAnimation={ boxAosAnimation } />
                    )}
                    { !servicesQuestion_isSuccess && <QABoxWaitItemsSkelton/>}
                    { servicesQuestion_isError && <Typography variant='h5' color='error'>data not found !</Typography>}
                </Container>
            </Box>
        </>
    )
}

function QABox({ dir, data, aosAnimation }) {
    
    if (!data || (data && Object.keys(data).length == 0)) return <></>;
    
    return (
        <Box className='QABoxCon' {...aosAnimation}>
            <Accordion dir={dir} className='QABox'>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className='QABox-Q'>
                    { data.Q }
                </AccordionSummary>
                <AccordionDetails className='QABox-A'>{data.A}</AccordionDetails>
            </Accordion>
        </Box>
    )
}

function QABoxWaitItemsSkelton() { 
    return (
        <>
            <Skeleton variant="rounded" width={ "100%" } height={ 50 } />
            <br/>
            <Skeleton variant="rounded" width={ "100%" } height={ 50 } />
            <br/>
            <Skeleton variant="rounded" width={ "100%" } height={ 50 } />
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