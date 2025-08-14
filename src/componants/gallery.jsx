import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "../sass/shared/gallery.scss"

export default function Gallery({ dir, data }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Box dir={dir} className="galleryCon">
          {/* Thumbnails */}
          <Swiper dir={dir} onSwiper={ setThumbsSwiper } {...thumbnailsSliderSettings} className="galleryThumbnailsSlider" >
            {data.map((image, inx) => (
              <SwiperSlide key={image.id} className="galleryThumbnailsSlide">
                <img src={ image.image } className="galleryThumbnailsImage" style={{ filter: activeIndex !== inx ? "grayscale(100%)" : "none" }} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Main images */}
          <Swiper dir={dir} thumbs={ { swiper: thumbsSwiper } } onSlideChange={ (swiper) => setActiveIndex(swiper.activeIndex) } {...galleryMainSliderSettings} className="galleryMainSlider" >
            {data.map((image) => (
              <SwiperSlide key={image.id} className="galleryMainSlide">
                <img src={ image.image } className="galleryMainImage" />
              </SwiperSlide>
            ))}
          </Swiper>
    </Box>
  );
}


const thumbnailsSliderSettings = {
  direction: "vertical",
  slidesPerView: 5,
  spaceBetween: 10,
  watchSlidesProgress: true,
  modules: [Thumbs]
}

const galleryMainSliderSettings = {
  spaceBetween : 10,
  modules : [Thumbs],
  style : { flex: 1 },
}