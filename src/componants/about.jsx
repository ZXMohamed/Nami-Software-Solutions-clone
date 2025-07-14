import React, { useContext, useEffect, useRef } from 'react'
import { Box, Container, Grid, Typography, Button, IconButton, Stack } from '@mui/material'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';

import { useGetCompanyFileQuery } from '../redux/server state/companyfile';

import aboutSideImg from "../assets/photo/about/aboutsideimg.webp";

import DownloadButton from './downloadbutton';

import { Language } from '../languages/languagesContext';


export default function About() {

  const { isSuccess: companyFile_isSuccess, data: companyFile } = useGetCompanyFileQuery();

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);
  
  const defaultContent = {
      direction: language_isSuccess ? language.page.direction : "ltr",
      title : language_isSuccess ? language.about.title : "Know about us ..",
      subtitle : language_isSuccess ? language.about.subtitle : "Nami is a company specialized in providing Integrated web services",
      description : language_isSuccess ? language.about.description : "Starting from graphic design to programming and designing smart phone applications, Nami strivesAnd its work team from the day of its establishment until it became one of the most important Arab web development companies, and weWe know the path and we are walking on it with great strides.",
      buttons:{
          companyFile : language_isSuccess ? language.about.buttons.companyFile : "Download the company file",
    },
    establishment:{
        title: language_isSuccess ? language.about.establishment.title : "Establishment",
        establishmentDate: language_isSuccess ? language.about.establishment.establishmentDate : "2017"
    }
  }

  const sideImgContainer = useRef();
  const sideImg = useRef();
  const subtitle = useRef();
  const description = useRef();
  const establishmentDate = useRef();

  useEffect(() => {
    imgMoveWithScroll(sideImgContainer, sideImg);
    subtitleBackgroundMoveWithScroll(subtitle);
    descriptionLinesUp(description);
    establishmentDateCountUp(establishmentDate, description, defaultContent.establishment.establishmentDate);
  });

  
  return (
    <Box className="aboutSection" dir={defaultContent.direction}>
      <Container maxWidth="lg" disableGutters="true">
          <Grid container>
              <Grid size={ { md: 6, xs: 12 } } data-aos="fade-up" data-aos-duration="1000" className="movingImgSide">
                  <Box ref={ sideImgContainer } className="sideImgContainer">
                    <img ref={sideImg} src={aboutSideImg}  alt="Nami Software Solutions" className="movingImg" loading='lazy'/>
                  </Box>
              </Grid>
              <Grid size={ { md: 6, xs: 12 } } className="infoSide">
                <Typography variant="h5" component="h1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50" className='aboutTitle'><i>{defaultContent.title}</i></Typography>
                <Typography ref={subtitle} variant="h4" component="h2" className='aboutSubtitle'>{defaultContent.subtitle}</Typography>
                <Typography ref={description} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="60" className='aboutDescription'>{defaultContent.description}</Typography>
                
                { companyFile_isSuccess && <DownloadButton direction={defaultContent.direction} link={ companyFile?.url } title={ defaultContent.buttons.companyFile } /> }
                
                <Stack direction="row" dir={defaultContent.direction} className='establishmentCounter' data-aos="fade-up" data-aos-duration="600" data-aos-delay="50">
                  <span className="establishmentTitle">{defaultContent.establishment.title}</span>
                  <Typography ref={establishmentDate} variant='h1' component='h3'  className="establishmentDate" data-aos="fade-up" data-aos-duration="600" data-aos-delay="50">0</Typography>
                </Stack>
              </Grid>
          </Grid>
      </Container>
    </Box>
  )
}

function imgMoveWithScroll(sideImgContainer,sideImg) {
  gsap.timeline({
    scrollTrigger: {
      trigger: sideImgContainer.current,
      scrub: 1,
      start: "top+=90 bottom",
      end: "top+=1000 bottom"
    },
  }).to(sideImg.current, {
    yPercent: -16,
  });
}
function subtitleBackgroundMoveWithScroll(subtitle) {
  const subtitleLineSplit = new SplitText(subtitle.current, {
    type: "lines"
  });

  const subtitleLines = subtitleLineSplit.lines;
  gsap.to(subtitleLines, {
    backgroundPositionX: "100%",
    stagger: 1,
    ease: "power2.in",
    scrollTrigger: {
      trigger: subtitle.current,
      scrub: 1,
      start: "top+=0 bottom",
      end: "top+=400 bottom"
    }
  });
}
function descriptionLinesUp(description) {
  const descriptionLineSplit = new SplitText(description.current, {
    type: "lines"
  });

  const descriptionLines = descriptionLineSplit.lines;
  gsap.from(descriptionLines, {
    scrollTrigger: {
      start: "top+=50 bottom",
      end: "top+=50 bottom",
      trigger: description.current,
      // once: true,
      // markers:true
    },
    duration: 0.5,
    opacity: 0,
    y: 80,
    // ease: "back",
    stagger: 0.05
  });
}
function establishmentDateCountUp(establishmentDate,description,finalValue) {
  gsap.to(establishmentDate.current, {
    scrollTrigger: {
      start: "top+=150 bottom",
      // toggleActions: "play none none none",
      trigger: description.current,
      // once: true,
      // markers:true
    },
    textContent: finalValue,
    duration: 4,
    ease: "power2.in",
    snap: { textContent: 1 },
    stagger: 1,
  });
}