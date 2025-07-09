import React, { useState } from 'react'
import { Box, Container, Stack, Typography, useMediaQuery } from '@mui/material';
import SectionHeader from './sectionHeader'
import { Swiper,SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import Ebhar from '../assets/photo/portfolio/Ebhar.webp'
import Somu from '../assets/photo/portfolio/Somu.webp'
import Rawafed from '../assets/photo/portfolio/Rawafed.webp'
import Taraf from '../assets/photo/portfolio/Taraf.webp'
import abr from '../assets/photo/portfolio/عبر الشرق للاستقدام.webp'
import Tameem from '../assets/photo/portfolio/Tameem Law.webp'

export default function Portfolio() {
  return (
    <Box className='portfolioSection'>
        <SectionHeader title={'We bring your digital vision to life'} subtitle={'Newest portfolio'} showAllUrl={''}/>
        <PortfolioSlider/>
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
    const [projects, setprojects] = useState([{
        name: "Ebhar",
        description: "موقع الكترونى لمنصة ابهار لنشر وتوزيع الكتب.",
        image: Ebhar,
    },{
        name: "Somu",
        description: "موقع الكترونى لشركة سمو للتدريب فى المملكة العربية السعودية.",
        image: Somu,
    },{
        name: "Rawafed",
        description: "موقع الكترونى لمكتب روافد من اكبر مكاتب الاستقدام في المملكة العربية السعودية.",
        image: Rawafed,
    },{
        name: "Taraf",
        description: "موقع الكترونى لمكتب ترف الأعمال للاستقدام فى المملكة العربية السعودية.",
        image: Taraf,
    },{
        name: "عبر الشرق للاستقدام",
        description: "موقع الكترونى لمكتب عبر الشرق أفضل مكتب استقدام عمالة منزلية حاصل على ترخيص من منصة مساند الحكومية لتوفير خدمات استقدام عمالة منزلية بمعايير الجودة العالمية.",
        image: abr,
    },{
        name: "Tameem Law",
        description: "موقع الكترونى لشركة تميم الحسينــان للمحامـاة والاستشــارات القانونيـة فى المملكة العربية السعودية.",
        image: Tameem,
    }]);
    
    const isMDsize = useMediaQuery('(max-width:992px)');
    const isXXXSSize = useMediaQuery('(max-width:600px)');

    return (
        <Container maxWidth="lg">
            <Swiper slidesPerView={ visibleSlidePerSize(isXXXSSize,isMDsize)} {...projectsSliderSettings} className='projectsSlider'>
                { projects.map((project, inx) => {
                        return (
                            <SwiperSlide key={ project.id } className='projectsSlide'>
                                <ProjectCard image={ project.image } name={ project.name } description={ project.description } aosAnimation={ { "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-delay": (100 * inx).toString() } }/>
                            </SwiperSlide>
                        )
                    }
                )}
            </Swiper>
        </Container>
  )
}

export function ProjectCard({ image, name, description, aosAnimation }) {
    if (!image && !name) { 
        throw "project name or image unset !"
    }
  return (
    <Box className='projectCard' {...aosAnimation}>
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

{ /*split project & product sass in separate files */ }
{/*shipping */ }
{/*skeleton */}