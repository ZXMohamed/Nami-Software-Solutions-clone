import React from 'react'
import { Box } from '@mui/material'
import "../../sass/shared/mobilescreens.scss"
    

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';


export default function MobileScreens({ dir, data }) {
  return (
    <Box dir={dir} className="mobileScreensCon">
        <Swiper key={dir} dir={dir} {...sliderSettings(data.length)} className='mobileScreensSlider'>
            {data.map((image, inx) => (
            <SwiperSlide key={inx} className='mobileScreensSlide'>
                <img src={image} className='mobileScreensImage'/>
            </SwiperSlide>
            ))}
        </Swiper>
    </Box>
  )
}

const sliderSettings = (slidesNum)=>({
  modules: [EffectCoverflow, Navigation, Autoplay],
  effect:"coverflow",
  grabCursor:true,
  centeredSlides:true,
  slidesPerView: "auto",
  centeredSlidesBounds: true,
  loop: true,
  loopedSlides:slidesNum,
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
});