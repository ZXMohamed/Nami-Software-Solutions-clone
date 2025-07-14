import React, { lazy, Suspense, useContext, useEffect, useRef, useState } from 'react'
import { Box, Container, Grid, Typography, Button, IconButton, Stack, Skeleton } from '@mui/material'

import innovation from "../assets/photo/our/Innovation.svg"
import quality from "../assets/photo/our/Quality.svg"
import focusOnTheClint from "../assets/photo/our/Focus On The Clint.svg"
import teamwork from "../assets/photo/our/Teamwork.svg"
import quickResponse from "../assets/photo/our/quick Response.svg"
import continuousLearning from "../assets/photo/our/Continuous Learning.svg"
import Sustainability from "../assets/photo/our/Sustainability.svg"
import { Language } from '../languages/languagesContext'

export function Our() { 

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = {
    direction: language_isSuccess ? language.page.direction : "ltr",
  }

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

function OurVision() {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = {
    direction: language_isSuccess ? language.page.direction : "ltr",
    vision: {
      title : language_isSuccess ? language.our.vision.title : "Our vision",
      description: language_isSuccess ? language.our.vision.description : "We seek to be the world's leading company in providing innovative technological solutions that help organizations achieve digital excellence and enhance their presence on the Internet in a unique and distinct way.", 
    }
  }
    
  return (
    <Grid size={ { xs: 12, sm: 6 } } className="ourVision" container spacing={ 1 } data-aos={ 'fade-up' } data-aos-duration="600" data-aos-delay="0">
      <SideVideo/>
      <Grid size={ { xxs: 10, xs: 12, sm: 12, md: 9 } }>
        <Typography variant='h4' component='h2' className="cardTitle">{ defaultContent.vision.title }</Typography>
        <Typography className="cardDescription">
          {defaultContent.vision.description}
        </Typography>
      </Grid>
    </Grid>
  )
}

function OurMessage() {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = {
    direction: language_isSuccess ? language.page.direction : "ltr",
    message: {
      title : language_isSuccess ? language.our.message.title : "Our message",
      description: language_isSuccess ? language.our.message.description : "We empower our clients by providing website and mobile application design and development solutions that combine creativity, advanced technology, and a unique user experience to achieve their sustainable digital success.", 
    }
  }

  return (
    <Grid size={ { xs: 12, sm: 6 } } className="ourMessage" container spacing={ 1 } data-aos={ 'fade-up' } data-aos-duration="600" data-aos-delay="50">
      <SideVideo/>
      <Grid size={ { xxs:10,xs: 12, sm:12,md: 9 } }>
        <Typography variant='h4' component='h2' className='cardTitle'>{ defaultContent.message.title }</Typography>
        <Typography className='cardDescription'>
          {defaultContent.message.description}
        </Typography>
      </Grid>
    </Grid>
  )
}

function OurValues() {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = {
    direction: language_isSuccess ? language.page.direction : "ltr",
    values: {
      title : language_isSuccess ? language.our.values.title : "Our values",
      description: language_isSuccess ? language.our.values.description : "We at Nami Corporation are proud of a set of core values ​​that drive our operations, build our relationships with our customers, and define our approach to providing integrated technology solutions.",
      values : [
        { title: language_isSuccess ? language.our.values.values[0].title : "Innovation", icon: innovation },
        { title: language_isSuccess ? language.our.values.values[1].title : "Quality", icon: quality },
        { title: language_isSuccess ? language.our.values.values[2].title : "Focus on the client", icon: focusOnTheClint },
        { title: language_isSuccess ? language.our.values.values[3].title : "Teamwork", icon: teamwork },
        { title: language_isSuccess ? language.our.values.values[4].title : "Quick response", icon: quickResponse },
        { title: language_isSuccess ? language.our.values.values[5].title : "Continuous learning", icon: continuousLearning },
        { title: language_isSuccess ? language.our.values.values[6].title : "Sustainability", icon: Sustainability }
      ]
    }
  }
  
  return (
    <Grid size={ 12 } className="ourValues" data-aos={ 'fade-up' } data-aos-duration="600" data-aos-delay="0">
      <Typography variant='h4' component='h2' className="cardTitle">{defaultContent.values.title}</Typography>
      <Typography className="cardDescription">
        {defaultContent.values.description}
      </Typography>
      <Box className="valuesBox">
        { defaultContent.values.values.map((value, inx) => (
          <ValueBox inx={inx} data={ value } />
        )) }
      </Box>
    </Grid>
  )
}

function ValueBox({ inx, data }) {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = {
    direction: language_isSuccess ? language.page.direction : "ltr",
  }

  return (
    <Stack key={inx} direction={ 'column' } dir={defaultContent.direction} className="valueBox" data-aos={ 'fade-up' } data-aos-duration="600" data-aos-delay={50*(inx+1)}>
      <Box sx={{backgroundImage:`url("${data.icon}")`}} className='valueIcon'></Box>
      <span  className='valueTitle'>{ data.title }</span>
    </Stack>
  )
}

const OurLazySideVideo = lazy(() => import("./oursidevideo"));

function SideVideo() {
  return (
    <Suspense fallback={ <Skeleton variant="rounded" width={ 100 } height={100} />}>
      <Grid size={ { xxs:2,xs: 12, sm: 12,md:3 } }>
        <OurLazySideVideo />
      </Grid>
    </Suspense>
  )
}