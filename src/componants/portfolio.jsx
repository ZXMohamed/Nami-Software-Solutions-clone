import React, { useState } from 'react'
import { Box, Container, Stack, Typography, useMediaQuery } from '@mui/material';
import Sectionheader from './sectionheader'
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
    <Box className='portfoliosec'>
        <Sectionheader title={'We bring your digital vision to life'} subtitle={'Newest portfolio'} showallurl={''}/>
        <Portfolioslider/>
    </Box>
  )
}

export function Portfolioslider() {
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
    
    const ismdsize = useMediaQuery('(max-width:992px)');
    const isxxxssize = useMediaQuery('(max-width:600px)');

    return (
        <Container maxWidth="lg">
            <Swiper slidesPerView={ ismdsize ? (isxxxssize ? 1 : 2) : 3 } spaceBetween={ 10 } loop={ true } autoplay={ { delay: 2000,disableOnInteraction: false } } modules={[Autoplay]} className='slider'>
                { projects.map((val, inx) => {
                    return (<SwiperSlide key={inx} className='slide'>{/* data-aos="fade-up" data-aos-duration="1000" data-aos-delay={ (100 * inx).toString() } */}
                                <Projectcard image={ val.image } name={ val.name } description={ val.description } badges={ val.badges } aosanimation={ { "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-delay": (100 * inx).toString() } }/>
                            </SwiperSlide>)
                })}
            </Swiper>
        </Container>
  )
}



export function Projectcard({ image, name, description, aosanimation }) {
    if (!image && !name) { 
        throw "project name or image unset !"
    }
  return (
    <Box className='projectcard' {...aosanimation}>
        <Stack direction={"column"} spacing={1}>
            <Stack direction={'row'} className='header'>
                <Typography variant='h6' component={'h3'}>{name}</Typography>
                <Box>
                    <Box></Box>
                </Box>
            </Stack>
            <Typography>{description}</Typography>
            <Box className="shine">
                <img src={ image } alt={ name + " project from nami" } loading='lazy' />
            </Box>
        </Stack>
    </Box>
  )
}

{ /*split project & product sass in separate files */ }
{/*shipping */}