//*react
import React, { memo, useContext, useEffect, useMemo, useRef } from 'react'
//*mui
import { Box, Container, Grid, Typography, Stack } from '@mui/material'
//*gsap
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
//*components
import DownloadButton from '../buttons/downloadbutton';
//*queries
import { useGetCompanyFileQuery } from '../../redux/server state/companyfile';
//*scripts
import { Language } from '../../languages/languagesContext';
//*assets
import aboutSideImg from "../../assets/photo/about/aboutsideimg.webp";


export default function About() {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);
  
  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
  }), [language, language_isSuccess]);

  return (
    <Box dir={defaultContent.direction} className="aboutSection">
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid size={ { md: 6, xs: 12 } } className="aboutMovingImgSide" {...movingImgSideAosAnimation}>
            <SideImg/>
          </Grid>
          <Grid size={ { md: 6, xs: 12 } } className="aboutInfoSide">
            <Info/>
            <CompanyFile/>
            <Establishment/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const SideImg = () => {
  
  const sideImgContainer = useRef();
  const sideImg = useRef();

  useEffect(() => {
    requestIdleCallback(() => { 
      imgMoveWithScroll(sideImgContainer, sideImg);
    });
  },[]);

  return (
    <Box ref={ sideImgContainer } className="aboutSideImgContainer">
      <img ref={sideImg} src={aboutSideImg}  alt="Nami Software Solutions" loading='lazy' className="aboutMovingImg" />
    </Box>
  )
}

const Info = () => {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);
  
  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
    title : language_isSuccess ? language.about.title : "Know about us ..",
    subtitle : language_isSuccess ? language.about.subtitle : "Nami is a company specialized in providing Integrated web services",
    description : language_isSuccess ? language.about.description : "Starting from graphic design to programming and designing smart phone applications, Nami strivesAnd its work team from the day of its establishment until it became one of the most important Arab web development companies, and weWe know the path and we are walking on it with great strides.",
  }), [language, language_isSuccess]);

  const subtitle = useRef();
  const description = useRef();

  useEffect(() => {
    requestIdleCallback(() => { 
      subtitleBackgroundMoveWithScroll(subtitle);
      descriptionLinesUp(description);
    });
  }, []);
  
  return (
  <>
    <Typography variant="h5" component="h1" className='aboutTitle' {...aboutTitleAosAnimation}><i>{defaultContent.title}</i></Typography>
    <Typography ref={subtitle} variant="h4" component="h2" className='aboutSubtitle'>{defaultContent.subtitle}</Typography>
    <Typography ref={description} className='aboutDescription' {...aboutDescriptionAosAnimation}>{defaultContent.description}</Typography>
  </>
  )
}
const CompanyFile = () => {
  const { isSuccess: language_isSuccess, data: language } = useContext(Language);
  
  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
    buttons: {
      companyFile: language_isSuccess ? language.about.buttons.companyFile : "Download the company file",
    }
  }), [language, language_isSuccess]);

  const { isSuccess: companyFile_isSuccess, data: companyFile } = useGetCompanyFileQuery(undefined, {
    selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
  });
  return (
    <>
      { companyFile_isSuccess && <DownloadButton direction={defaultContent.direction} link={ companyFile?.url } title={ defaultContent.buttons.companyFile } /> }
    </>
  );
}
const Establishment = () => {console.log("ddddd");

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);
  
  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
    establishment: {
      title: language_isSuccess ? language.about.establishment.title : "Establishment",
        establishmentDate: language_isSuccess ? language.about.establishment.establishmentDate : "2017"
    }
  }), [language, language_isSuccess]);

  const establishment = useRef();
  const establishmentDate = useRef();

  useEffect(() => {
    requestIdleCallback(() => { 
      establishmentDateCountUp(establishmentDate, establishment, defaultContent.establishment.establishmentDate);
    });
  }, []);
  
  return (
    <Stack ref={establishment} direction="row" dir={defaultContent.direction} className='establishmentCounter' {...establishmentCounterAosAnimation}>
      <span className="establishmentTitle">{defaultContent.establishment.title}</span>
      <Typography ref={establishmentDate} variant='h1' component='h3' className="establishmentDate" {...establishmentDateAosAnimation}>0</Typography>
    </Stack>
  )
}

const aosAnimation = {
  ["data-aos"]:"fade-up",
  ["data-aos-duration"]:"1000" 
}
const movingImgSideAosAnimation = {
  ...aosAnimation
}
const aboutTitleAosAnimation = {
  ...aosAnimation,
  ["data-aos-delay"]:"50"
}
const aboutDescriptionAosAnimation = {
  ...aosAnimation,
  ["data-aos-delay"]:"80"
}
const establishmentCounterAosAnimation = {
  ...aosAnimation,
  ["data-aos-duration"]:"600",
  ["data-aos-delay"]:"80"
}
const establishmentDateAosAnimation = {
  ...aosAnimation,
  ["data-aos-duration"]:"600",
  ["data-aos-delay"]:"80"
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
function establishmentDateCountUp(establishmentDate,establishment,finalValue) {
  gsap.to(establishmentDate.current, {
    scrollTrigger: {
      start: "top bottom",
      // toggleActions: "play none none none",
      trigger: establishment.current,
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