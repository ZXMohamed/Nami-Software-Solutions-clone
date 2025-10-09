//*react
import React, { lazy, memo, Suspense } from 'react'
//*mui
import { Box, Container, Grid, Typography, Stack, Skeleton } from '@mui/material'
//*hooks
import { useContent } from '../../../languages/hooks/usecontent'
//*assets
import innovation from "../../../assets/photo/our/Innovation.svg"
import quality from "../../../assets/photo/our/Quality.svg"
import focusOnTheClint from "../../../assets/photo/our/Focus On The Clint.svg"
import teamwork from "../../../assets/photo/our/Teamwork.svg"
import quickResponse from "../../../assets/photo/our/quick Response.svg"
import continuousLearning from "../../../assets/photo/our/Continuous Learning.svg"
import Sustainability from "../../../assets/photo/our/Sustainability.svg"
//*animation
import { ourMessageAosAnimation, ourValuesAosAnimation, ourVisionAosAnimation, valueBoxAosAnimation } from '../../../animation/our'

function Our() {

  const { isSuccess: content_isSuccess, data: content } = useContent();
  const defaultContent = { direction: content_isSuccess ? content.page.direction : "ltr" };

  return (
    <Box id="Aboutus" dir={defaultContent.direction} className="ourSection">
      <Container maxWidth={ "lg" }>
        <Grid container spacing={4}>
          <OurVision />
          <OurMessage/>
        </Grid>
        <Grid container>
          <OurValues/>
        </Grid>
      </Container>
    </Box>
  )
}
export default Our;

const OurVision = () => {

  const { isSuccess: content_isSuccess, data: content } = useContent();

  const defaultContent = (() => {
    if (content_isSuccess) {
      return {
        direction: content.page.direction,
        vision: {
          title: content.our.vision.title,
          description: content.our.vision.description
        }
      }
    } else {
        return ourVisionFirstContent;
    }
  })();

  return (
    <Grid container size={ { xs: 12, sm: 6 } } spacing={ 1 } className="ourVision" {...ourVisionAosAnimation}>
      <SideVideo />
      <Grid size={ { xxs: 10, xs: 12, sm: 12, md: 9 } }>
        <Typography variant='h4' component='h2' className="cardTitle">{ defaultContent.vision.title }</Typography>
        <Typography className="cardDescription">
          { defaultContent.vision.description }
        </Typography>
      </Grid>
    </Grid>
  )
};

const OurMessage = () => {

  const { isSuccess: content_isSuccess, data: content } = useContent();

  const defaultContent = (() => {
    if (content_isSuccess) {
      return {
        direction: content.page.direction,
        message: {
          title: content.our.message.title,
          description: content.our.message.description
        }
      }
    } else {
        return ourMessageFirstContent;
    }
  })();

  return (
    <Grid container size={ { xs: 12, sm: 6 } } spacing={ 1 } className="ourMessage" {...ourMessageAosAnimation}>
      <SideVideo />
      <Grid size={ { xxs: 10, xs: 12, sm: 12, md: 9 } }>
        <Typography variant='h4' component='h2' className='cardTitle'>{ defaultContent.message.title }</Typography>
        <Typography className='cardDescription'>
          { defaultContent.message.description }
        </Typography>
      </Grid>
    </Grid>
  )
};

const values = [
  { title: "Innovation", icon: innovation },
  { title: "Quality", icon: quality },
  { title: "Focus on the client", icon: focusOnTheClint },
  { title: "Teamwork", icon: teamwork },
  { title: "Quick response", icon: quickResponse },
  { title: "Continuous learning", icon: continuousLearning },
  { title: "Sustainability", icon: Sustainability }
];

const OurValues = () => {

  const { isSuccess: content_isSuccess, data: content } = useContent();

  const defaultContent = (() => {
    if (content_isSuccess) {
      return {
        direction: content.page.direction,
        values: {
          title: content.our.values.title,
          description: content.our.values.description,
          values: values.map((values, inx) => ({ title: content.our.values.values[inx].title, icon: values.icon }))
        }
      }
    } else {
      return ourValuesFirstContent;
    }
  })();
  
  return (
    <Grid size={ 12 } className="ourValues" {...ourValuesAosAnimation}>
      <Typography variant='h4' component='h2' className="cardTitle">{ defaultContent.values.title }</Typography>
      <Typography className="cardDescription">
        { defaultContent.values.description }
      </Typography>
      <Box className="valuesBox">
        { defaultContent.values.values.map((value, inx) => (
          <ValueBox key={ inx } data={ value } aosAnimation = {valueBoxAosAnimation(inx + 1)}/>
        )) }
      </Box>
    </Grid>
  )
};

const ValueBox = ({ data, aosAnimation }) => {

  if (!data || (data && Object.keys(data).length == 0)) return <></>;

  const { isSuccess: content_isSuccess, data: content } = useContent();
  const defaultContent = { direction: content_isSuccess ? content.page.direction : "ltr" };

  return (
    <Stack dir={ defaultContent.direction } direction={ 'column' } className="valueBox" { ...aosAnimation } >
      <Box sx={ { backgroundImage: `url("${data.icon}")` } } className='valueIcon'></Box>
      <span className='valueTitle'>{ data.title }</span>
    </Stack>
  )
};

const OurLazySideVideo = lazy(() => import("./oursidevideo"));

const SideVideo = memo(() => {

  return (
    <Suspense fallback={ <Skeleton variant="rounded" width={ 100 } height={ 100 } /> }>
      <Grid size={ { xxs: 2, xs: 12, sm: 12, md: 3 } }>
        <OurLazySideVideo />
      </Grid>
    </Suspense>
  )
});

const ourVisionFirstContent = {
  direction: "ltr",
  vision: {
    title: "Our vision",
    description: "We seek to be the world's leading company in providing innovative technological solutions that help organizations achieve digital excellence and enhance their presence on the Internet in a unique and distinct way.",
  }
}
const ourMessageFirstContent = {
  direction: "ltr",
  message: {
    title: "Our message",
    description: "We empower our clients by providing website and mobile application design and development solutions that combine creativity, advanced technology, and a unique user experience to achieve their sustainable digital success.",
  }
}
const ourValuesFirstContent = {
  direction: "ltr",
  values: {
    title: "Our values",
    description: "We at Nami Corporation are proud of a set of core values ​​that drive our operations, build our relationships with our customers, and define our approach to providing integrated technology solutions.",
    values: values.map((values, inx) => ({ title: values.title, icon: values.icon }))
  }
}