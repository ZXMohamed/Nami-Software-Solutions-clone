//*react
import React from 'react'
//*mui
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
//*components
import MiniHeader from '../shared/miniheader'
import { AnswerBoxWaitItemsSkelton } from '../loadingitems/whyus'
//*hooks
import { useContent } from '../../languages/hooks/usecontent'
import useUpdateEffect from '../../hooks/useupdateeffect'
//*queries
import { useGetServicesQuestionQuery } from '../../redux/server state/services'
//*styles
import "../../sass/shared/whyus.scss"
//*animation
import { boxAosAnimation } from '../../animation/whyus'


export default function WhyUs() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                title: content.whyUs.title,
                subtitle: content.whyUs.subtitle
            }
        } else {
            return firstContent;
        }
    })();

    const { isError: servicesQuestion_isError, error: servicesQuestion_error, isSuccess: servicesQuestion_isSuccess, data: servicesQuestion, isFetching: servicesQuestion_isFetching,  refetch: servicesQuestion_refetch } = useGetServicesQuestionQuery();
    
    useUpdateEffect(() => { 
        servicesQuestion_refetch();
    }, [defaultContent.language])

    return (
        <>
            <Box dir={defaultContent.direction} className="whyUsSection">
                <MiniHeader dir={defaultContent.direction} title={defaultContent.title} subtitle={defaultContent.subtitle}/>
                <Container maxWidth="lg">
                    <Grid container spacing={ 3 }>
                        { (!servicesQuestion_isFetching && servicesQuestion_isSuccess) && !servicesQuestion.whySecError &&
                            Object.values(servicesQuestion.whySec).map((answer) =>
                            <Grid key={answer.id} size={ { sm: 4, xs: 12 } }>{console.log(answer)}
                                <AnswerBox dir={defaultContent.direction} data={ answer } aosAnimation={ boxAosAnimation } />
                            </Grid>  
                        )}
                        { servicesQuestion_isFetching && <Grid size={ { sm: 4, xs: 12 } }> <AnswerBoxWaitItemsSkelton /> </Grid> }
                    </Grid>
                    { (!servicesQuestion_isFetching && servicesQuestion_isSuccess) && servicesQuestion.whySecError &&
                        <Typography component={ "p" } variant='h5' color='error'>{ servicesQuestion.whySec.error }</Typography> }
                    {servicesQuestion_isError && <Typography component={"p"} variant='h5' color='error'>{servicesQuestion_error.data.whySec.error}</Typography>}
                </Container>
            </Box>
        </>
    )
}

function AnswerBox({ dir, data, aosAnimation }) {

    if (!data || (data && Object.keys(data).length == 0)) return <></>;
    
    return (
        <Stack dir={dir} direction={"column"} className='answerBox' {...aosAnimation}>
            <img src={ data.image } width={ 60 } height={ 60 } alt={ data.title } className='answerBoxIcon' />
            <Typography component={ "h5" } variant='h6' className='answerBoxTitle'>{ data.title }</Typography>
            <Typography className='answerBoxDescription'>{ data.description }</Typography>
        </Stack>
    )
}


const firstContent = {
    direction: "ltr",
    language: "en",
    title: "Why us",
    subtitle: "Why to choose work with us"
}