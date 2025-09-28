//*react
import React, { useContext, useMemo } from 'react'
//*mui
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Skeleton, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//*components
import MiniHeader from '../shared/miniheader'
//*queries
import { useGetServicesQuestionQuery } from '../../redux/server state/services';
//*scripts
import { Language } from '../../languages/languagesContext';
//*styles
import "../../sass/shared/QA.scss"

export default function QA() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        language: language_isSuccess ? language.page.language : "en",
        title: language_isSuccess ? language.QA.title : "FAQS",
        subtitle: language_isSuccess ? language.QA.subtitle : "The most common questions that clients ask about website development"
    }), [language, language_isSuccess]);

    const { isError: servicesQuestion_isError, isSuccess: servicesQuestion_isSuccess, data: servicesQuestion } = useGetServicesQuestionQuery(undefined, {
        selectFromResult: ({ isSuccess, data, isError }) => ({ isSuccess, data, isError })
    });
console.log(servicesQuestion);
    return (
        <>
            <Box dir={defaultContent.direction} className="QASection">
                <MiniHeader dir={defaultContent.direction} title={defaultContent.title} subtitle={defaultContent.subtitle}/>
                <Container maxWidth="lg">
                    { servicesQuestion_isSuccess && Object.values(servicesQuestion.QA).map((QA) => 
                        <QABox key={QA.id} dir={ defaultContent.direction } data={ QA } aosAnimation={ boxAosAnimation } />
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