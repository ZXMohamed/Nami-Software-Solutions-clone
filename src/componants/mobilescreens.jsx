import React from 'react'
import { Box } from '@mui/material'
import "../sass/shared/mobilescreens.scss"
    

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

const images = [
  'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/10.jpg',
  'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/11.jpg',
  'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/12.jpg',
  'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/10.jpg',
  'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/11.jpg',
  'http://marveltheme.com/tf/html/appai/appai/img/app-screenshots/12.jpg'
];


export default function MobileScreens({ dir }) {
  return (
    <Box className="mobileScreensCon">
        <Swiper dir={dir}
            {...sliderSettings}
            className='mobileScreensSlider'>
            {images.map((src, inx) => (
            <SwiperSlide key={inx} className='mobileScreensSlide'>
                <img src={src} alt={""} className='mobileScreensImage'/>
            </SwiperSlide>
            ))}
        </Swiper>
    </Box>
  )
}

const sliderSettings = {
    modules: [EffectCoverflow, Navigation, Autoplay],
    effect:"coverflow",
    grabCursor:true,
    centeredSlides:true,
    slidesPerView:"auto",
    loop: true,
    loopedSlides:images.length,
    watchSlidesProgress:true,
    autoplay:{
        delay: 3000,
        disableOnInteraction: false
    },
    coverflowEffect:{
        rotate: 10,
        stretch: 100,
        depth: 200,
        modifier: 1,
        slideShadows: true
    }
};