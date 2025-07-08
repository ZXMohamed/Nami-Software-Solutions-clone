import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Box, Container, Grid, Typography, Button, IconButton, Stack, Skeleton } from '@mui/material'

import innovation from "../assets/photo/our/Innovation.svg"
import quality from "../assets/photo/our/Quality.svg"
import focusOnTheClint from "../assets/photo/our/Focus On The Clint.svg"
import teamwork from "../assets/photo/our/Teamwork.svg"
import quickResponse from "../assets/photo/our/quick Response.svg"
import continuousLearning from "../assets/photo/our/Continuous Learning.svg"
import Sustainability from "../assets/photo/our/Sustainability.svg"

export function Our() { 

  return (
    <Box className="ourSection">
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
  return (
    <Grid size={ { xs: 12, sm: 6 } } className="ourVision" container spacing={ 1 } data-aos={ 'fade-up' } data-aos-duration="600" data-aos-delay="0">
      <SideVideo/>
      <Grid size={ { xxs: 10, xs: 12, sm: 12, md: 9 } }>
        <Typography variant='h4' component='h2' className="cardTitle">Our vision</Typography>
        <Typography className="cardDescription">
          We seek to be the world's leading company in providing innovative technological solutions that help organizations achieve digital excellence and enhance their presence on the Internet in a unique and distinct way.
        </Typography>
      </Grid>
    </Grid>
  )
}

function OurMessage() {
  
  return (
    <Grid size={ { xs: 12, sm: 6 } } className="ourMessage" container spacing={ 1 } data-aos={ 'fade-up' } data-aos-duration="600" data-aos-delay="50">
      <SideVideo/>
      <Grid size={ { xxs:10,xs: 12, sm:12,md: 9 } }>
        <Typography variant='h4' component='h2' className='cardTitle'>Our message</Typography>
        <Typography className='cardDescription'>
          We empower our clients by providing website and mobile application design and development solutions that combine creativity, advanced technology, and a unique user experience to achieve their sustainable digital success.
        </Typography>
      </Grid>
    </Grid>
  )
}

const values = [
  { title: "Innovation", icon: innovation },
  { title: "Quality", icon: quality },
  { title: "Focus on the client", icon: focusOnTheClint },
  { title: "Teamwork", icon: teamwork },
  { title: "Quick response", icon: quickResponse },
  { title: "Continuous learning", icon: continuousLearning },
  { title: "Sustainability", icon: Sustainability }
];

function OurValues() {
  
  return (
    <Grid size={ 12 } className="ourValues" data-aos={ 'fade-up' } data-aos-duration="600" data-aos-delay="0">
      <Typography variant='h4' component='h2' className="cardTitle">Our values</Typography>
      <Typography className="cardDescription">
        We at Nami Corporation are proud of a set of core values ​​that drive our operations, build our relationships with our customers, and define our approach to providing integrated technology solutions.
      </Typography>
      <Box className="valuesBox">
        { values.map((value, inx) => (
          <ValueBox inx={inx} data={ value } />
        )) }
      </Box>
    </Grid>
  )
}

function ValueBox({inx,data}) {
  return (
    <Stack key={inx} direction={ 'column' } className="valueBox" data-aos={ 'fade-up' } data-aos-duration="600" data-aos-delay={50*(inx+1)}>
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