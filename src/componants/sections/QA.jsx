//*react
import React from 'react'
//*mui
import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Typography } from '@mui/material'
//*assets
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//*components
import MiniHeader from '../shared/miniheader'
import { QABoxWaitItemsSkelton } from '../loadingitems/QA';
//*styles
import "../../sass/shared/QA.scss"
//*hooks
import { useGetServicesQuestionQuery } from '../../redux/server state/services';
import useUpdateEffect from '../../hooks/useupdateeffect';
import { useContent } from '../../languages/hooks/usecontent';
//*animation
import { boxAosAnimation } from '../../animation/QA';


export default function QA() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                title: content.QA.title,
                subtitle: content.QA.subtitle
            }
        } else {
            return firstContent;
        }
    })();

    const { isError: servicesQuestion_isError, isSuccess: servicesQuestion_isSuccess, data: servicesQuestion, isFetching: servicesQuestion_isFetching, refetch: servicesQuestion_refetch } = useGetServicesQuestionQuery();

    useUpdateEffect(() => {
        servicesQuestion_refetch();
    },[defaultContent.language])

    return (
        <>
            <Box dir={defaultContent.direction} className="QASection">
                <MiniHeader dir={defaultContent.direction} title={defaultContent.title} subtitle={defaultContent.subtitle}/>
                <Container maxWidth="lg">
                    { (!servicesQuestion_isFetching && servicesQuestion_isSuccess) && Object.values(servicesQuestion.QA).map((QA) => 
                        <QABox key={QA.id} dir={ defaultContent.direction } data={ QA } aosAnimation={ boxAosAnimation } />
                    )}
                    { servicesQuestion_isFetching && <QABoxWaitItemsSkelton/>}
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


const firstContent = {
    direction: "ltr",
    language: "en",
    title: "FAQS",
    subtitle: "The most common questions that clients ask about website development"
}