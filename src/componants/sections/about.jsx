//*react
import React, { lazy, memo, Suspense, useContext, useMemo } from 'react'
//*mui
import { Box, Container, Grid, Typography, Stack, Skeleton } from '@mui/material'
//*scripts
import { Language } from '../../languages/languagesContext'
//*assets
import innovation from "../../assets/photo/our/Innovation.svg"
import quality from "../../assets/photo/our/Quality.svg"
import focusOnTheClint from "../../assets/photo/our/Focus On The Clint.svg"
import teamwork from "../../assets/photo/our/Teamwork.svg"
import quickResponse from "../../assets/photo/our/quick Response.svg"
import continuousLearning from "../../assets/photo/our/Continuous Learning.svg"
import Sustainability from "../../assets/photo/our/Sustainability.svg"

export function Our() {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
  }), [language, language_isSuccess]);

  return (
    <Box dir={defaultContent.direction} className="ourSection">
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

const OurVision = () => {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
    vision: {
      title: language_isSuccess ? language.our.vision.title : "Our vision",
      description: language_isSuccess ? language.our.vision.description : "We seek to be the world's leading company in providing innovative technological solutions that help organizations achieve digital excellence and enhance their presence on the Internet in a unique and distinct way.",
    }
  }), [language, language_isSuccess]);
    
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

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
    message: {
      title: language_isSuccess ? language.our.message.title : "Our message",
      description: language_isSuccess ? language.our.message.description : "We empower our clients by providing website and mobile application design and development solutions that combine creativity, advanced technology, and a unique user experience to achieve their sustainable digital success.",
    }
  }), [language, language_isSuccess]);

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

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
    values: {
      title: language_isSuccess ? language.our.values.title : "Our values",
      description: language_isSuccess ? language.our.values.description : "We at Nami Corporation are proud of a set of core values ​​that drive our operations, build our relationships with our customers, and define our approach to providing integrated technology solutions.",
      values: values.map((values, inx) => ({ title: language_isSuccess ? language.our.values.values[inx].title : values.title, icon: values.icon }))
    }
  }), [language, language_isSuccess]);
  
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

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
  }), [language, language_isSuccess]);

  return (
    <Stack dir={ defaultContent.direction } direction={ 'column' } className="valueBox" { ...aosAnimation } >
      <Box sx={ { backgroundImage: `url("${data.icon}")` } } className='valueIcon'></Box>
      <span className='valueTitle'>{ data.title }</span>
    </Stack>
  )
};

const OurLazySideVideo = lazy(() => import("./Oursidevideo"));

const SideVideo = () => {
  return (
    <Suspense fallback={ <Skeleton variant="rounded" width={ 100 } height={ 100 } /> }>
      <Grid size={ { xxs: 2, xs: 12, sm: 12, md: 3 } }>
        <OurLazySideVideo />
      </Grid>
    </Suspense>
  )
};

const aosAnimation = {
  ["data-aos"]: 'fade-up',
  ["data-aos-duration"]:"600"
}
const ourVisionAosAnimation = {
  ...aosAnimation
}
const ourMessageAosAnimation = {
  ...aosAnimation,
  ["data-aos-delay"]:"50"
}
const ourValuesAosAnimation = {
  ...aosAnimation,
}
const valueBoxAosAnimation = (order)=> ({
  ...aosAnimation,
  ["data-aos-delay"]: (50 * order).toString()
})