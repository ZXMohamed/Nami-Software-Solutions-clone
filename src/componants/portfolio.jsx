import React, { useContext, useState } from 'react'
import { Box, Container, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material';
import SectionHeader from './sectionHeader'
import { Swiper,SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

// import Ebhar from '../assets/photo/portfolio/Ebhar.webp'
// import Somu from '../assets/photo/portfolio/Somu.webp'
// import Rawafed from '../assets/photo/portfolio/Rawafed.webp'
// import Taraf from '../assets/photo/portfolio/Taraf.webp'
// import abr from '../assets/photo/portfolio/عبر الشرق للاستقدام.webp'
// import Tameem from '../assets/photo/portfolio/Tameem Law.webp'

import { Language } from '../languages/languagesContext';
import { useGetProjectsByCatQuery } from '../redux/server state/projects';

export default function Portfolio() {

    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
        title : language_isSuccess ? language.projects.header.title : "Newest portfolio",
        subtitle : language_isSuccess ? language.projects.header.subtitle : "We bring your digital vision to life",
        buttons:{
            headerButton: language_isSuccess ? language.projects.header.buttons.headerButton : "Show all"
        }
    }

  return (
    <Box className='portfolioSection'>
        <SectionHeader dir={defaultContent.direction} title={defaultContent.title} subtitle={defaultContent.subtitle} headerButtonTitle={defaultContent.buttons.headerButton} headerButtonUrl={''}/>
        <PortfolioSlider dir={defaultContent.direction}/>
    </Box>
  )
}

const projectsSliderSettings = {
    spaceBetween : 10,
    loop : true,
    autoplay : { delay: 2000, disableOnInteraction: false },
    modules : [Autoplay]
}

export function PortfolioSlider() {

    const { isSuccess, isLoading, data, isError } = useGetProjectsByCatQuery({ cat: "all", count: 50 });
    
    const isMDsize = useMediaQuery('(max-width:992px)');
    const isXXXSSize = useMediaQuery('(max-width:600px)');

    return (
        <Container maxWidth="lg">
            <Swiper slidesPerView={ visibleSlidePerSize(isXXXSSize, isMDsize) } { ...projectsSliderSettings } className='projectsSlider'>
                { isLoading && WaitItemSkeleton(6)}
                { isSuccess && Object.values(data).map((project, inx) => {
                    return (
                        <SwiperSlide key={ project.id } className='projectsSlide'>
                            <ProjectCard image={ "project.image" } name={ project.title } description={ project.description } aosAnimation={ { "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-delay": (100 * inx).toString() } } />
                        </SwiperSlide>
                    )
                }
                ) }
                { isError && <Typography component={"h1"} variant={"h5"} color='error'>Data Not Found!</Typography>}
            </Swiper>
        </Container>
  )
}

export function ProjectCard({ image, name, description, aosAnimation }) {
    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
    }
    if (!image && !name) { 
        throw "project name or image unset !"
    }
  return (
    <Box dir={defaultContent.direction} className='projectCard' {...aosAnimation}>
        <Stack direction={"column"} spacing={1}>
            <Stack direction={'row'} className='projectHeader'>
                <Typography variant='h6' component={'h3'} className='projectTitle'>{name}</Typography>
                <Box className="projectArrow">
                    <Box></Box>
                </Box>
            </Stack>
            <Typography className='projectDescription'>{description}</Typography>
            <Box className="projectImageContainer shine">
                <img src={ image } alt={ name + " project from Nami" } loading='lazy' />
            </Box>
        </Stack>
    </Box>
  )
}

function visibleSlidePerSize(isXXXSSize, isMDSize) {
    //*from smaller size to bigger size
    if (isXXXSSize) {
        return 1;
    } else if (isMDSize) {
        return 2;
    }else{
        return 3;
    }
}

function WaitItemSkeleton(num = 1) { 
    const skeletonArray = [];
    for (let i = 0; i < num; i++) { 
        skeletonArray.push(
            <SwiperSlide key={ i } className='slide'>
                <Stack width={ "100%" }>
                    <Stack direction={ "row" } justifyContent={"space-between"} alignItems={"center"}>
                        <Skeleton width={ "30%" } height={ 20 } variant='rounded' />
                        <Skeleton width={40} height={40} variant='circular'/>
                    </Stack>
                    <br />
                    <Skeleton width={ "100%" } height={ 10 } variant='rounded' />
                    <br/>
                    <Skeleton width={ "100%" } height={ 10 } variant='rounded' />
                    <br />
                    <Skeleton width={ "100%" } height={ 350 } variant='rounded' />
                </Stack>
            </SwiperSlide>
        )
    }
    return skeletonArray;
}

{/*shipping */ }