//*react
import React, { useState } from "react";
//*mui
import { Box, useMediaQuery, useTheme } from "@mui/material";
//*swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
//*styles
import "../../sass/shared/gallery.scss"


export default function Gallery({ dir, data, sideThumbs, alt }) {
  const [thumbs, setThumbs] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const muiTheme = useTheme();
  const isMDSize = useMediaQuery(muiTheme.breakpoints.down('md'));

  return (
    <Box dir={dir} className="galleryCon">
      {/* Thumbnails */}
      { sideThumbs && <Swiper dir={ dir } onSwiper={ setThumbs } { ...thumbnailsSliderSettings(isMDSize ? "horizontal" : "vertical") } className="galleryThumbnailsSlider" >
        { data.map((image, inx) => (
          <SwiperSlide key={ inx } className="galleryThumbnailsSlide">
            <img src={ image } className="galleryThumbnailsImage" style={ { filter: activeIndex !== inx ? "grayscale(100%)" : "none" } } alt={ alt } />
          </SwiperSlide>
        )) }
      </Swiper> }
      {/* Main images */}
      <Swiper key={dir} dir={dir} thumbs={ { swiper: thumbs } } onSlideChange={ (swiper) => setActiveIndex(swiper.activeIndex) } {...galleryMainSliderSettings} className="galleryMainSlider" >
        {data.map((image,inx) => (
          <SwiperSlide key={inx} className="galleryMainSlide shine">
            <img src={ image } className="galleryMainImage" alt={ alt } />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}


const thumbnailsSliderSettings = (direction) => ({
  direction: direction,
  slidesPerView: 5,
  spaceBetween: 10,
  watchSlidesProgress: true,
  modules: [Thumbs]
})

const galleryMainSliderSettings = {
  spaceBetween : 10,
  modules : [Thumbs],
  style : { flex: 1 },
}