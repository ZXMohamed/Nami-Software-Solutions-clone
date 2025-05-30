import React, { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Box, Container, Grid, Typography, Button, IconButton, Stack } from '@mui/material'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';
import TextPlugin from "gsap/TextPlugin";


import aboutsideimg from "../assets/photo/about/aboutsideimg.webp";

export function About() {

  const aboutimgcontainer = useRef();
  const aboutimg = useRef();
  const abouttitle = useRef();
  const aboutpragraph = useRef();
  const establishmentdate = useRef();

  gsap.registerPlugin(ScrollTrigger,SplitText,TextPlugin);  

  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: aboutimgcontainer.current,
        scrub: 1,
        start: "top+=90 bottom",
        end: "top+=1000 bottom"
      },
    }).to(aboutimg.current, {
      yPercent: -16,
    });
    
    const pragraphlinesplit = new SplitText(aboutpragraph.current, {
      type: "lines"
    });
  
    const aboutpragraphlines = pragraphlinesplit.lines;
    gsap.from(aboutpragraphlines, {
      scrollTrigger: {
        start: "top+=50 bottom",
        end: "top+=50 bottom",
        trigger: aboutpragraph.current,
        // once: true,
        // markers:true
      },
      duration: 0.5,
      opacity: 0,
      y: 80,
      // ease: "back",
      stagger: 0.05
    });
    
    gsap.to(establishmentdate.current, {
      scrollTrigger: {
        start: "top+=150 bottom",
        // toggleActions: "play none none none",
        trigger: aboutpragraph.current,
        // once: true,
        // markers:true
      },
      textContent: 2017,
      duration: 4,
      ease: "power2.in",
      snap: { textContent: 1 },
      stagger: 1,
    });
    
    
    const titlelinesplit = new SplitText(abouttitle.current, {
      type: "lines"
    });
  
    const abouttitlelines = titlelinesplit.lines;
    gsap.to(abouttitlelines, {
      backgroundPositionX: "100%",
      stagger: 1,
      ease: "power2.in",
      scrollTrigger: {
        trigger: abouttitle.current,
        scrub: 1,
        start: "top+=0 bottom",
        end: "top+=400 bottom"
      }
    });
  },[]);
  
  return (
    <Box className="aboutsection">
      <Container maxWidth="lg" disableGutters="true">
          <Grid container>
              <Grid size={ { md: 6, xs: 12 } } data-aos="fade-up" data-aos-duration="1000" className="aboutsectionside1">
                  <Box ref={ aboutimgcontainer }>
                    <img ref={aboutimg} src={aboutsideimg}  alt="Nami Software Solutions" loading='lazy'/>
                  </Box>
              </Grid>
              <Grid size={ { md: 6, xs: 12 } } className="aboutsectionside2">
                <Typography variant="h5" component="h3" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50"><i>Know about us ..</i></Typography>
                <Typography ref={abouttitle} variant="h4" component="h1">Nami is a company specialized in providing Integrated web services</Typography>
                <Typography ref={aboutpragraph} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="60">Starting from graphic design to programming and designing smart phone
                  applications, Nami strivesAnd its work team from the day of its
                  establishment until it became one of the most important Arab web
                  development companies, and weWe know the path and we are walking on it
                  with great strides.
                </Typography>
                <Button variant='text' disableRipple="true" data-aos="fade-up" data-aos-duration="600" data-aos-delay="0">
                  <div>
                    <IconButton component="div" disableRipple="false">
                      <SubdirectoryArrowRightIcon fontSize="medium" />
                    </IconButton>
                    <span> Download the company file </span>
                  </div>
                </Button>
                <Stack direction="row" justifyContent={"flex-end"} className='establishmentcounter' data-aos="fade-up" data-aos-duration="600" data-aos-delay="50">
                  <span >Establishment</span>
                  <Typography ref={establishmentdate} variant='h1' component='h2' data-aos="fade-up" data-aos-duration="600" data-aos-delay="50">0</Typography>
                </Stack>
              </Grid>
          </Grid>
      </Container>
    </Box>
  )
}

const Ourlazysidevideo = lazy(() => import("./Oursidevideo"));
export function Our() { 

  const [ourvalues] = useState(["Innovation", "Quality", "Focus on the client", "Teamwork", "Quick response", "Continuous learning", "Sustainability"]);

  return (
    <Box className="oursection">
      <Container maxWidth={ "lg" }>
        <Grid container spacing={4}>
          <Grid size={ 6 } className="ourvision" container spacing={ 1 } data-aos={ 'fade-up' } data-aos-duration="600" data-aos-delay="0" alignItems={ "center" }>
            <Suspense>
              <Grid size={ 3 }>
                <Ourlazysidevideo />
              </Grid>
            </Suspense>
            <Grid size={ 9 }>
              <Typography variant='h4' component='h2'>Our vision</Typography>
              <Typography>We seek to be the world's leading company in providing innovative technological solutions that help organizations achieve digital excellence and enhance their presence on the Internet in a unique and distinct way.</Typography>
            </Grid>
          </Grid>
          <Grid size={ 6 } className="ourmessage" container spacing={ 1 } data-aos={ 'fade-up' } data-aos-duration="600" data-aos-delay="50" alignItems={ "center" }>
            <Suspense>
              <Grid size={ 3 }>
                <Ourlazysidevideo />
              </Grid>
            </Suspense>
            <Grid size={ 9 }>
              <Typography variant='h4' component='h2'>Our message</Typography>
              <Typography>We empower our clients by providing website and mobile application design and development solutions that combine creativity, advanced technology, and a unique user experience to achieve their sustainable digital success.</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid size={ 12 } className="ourvalues" data-aos={ 'fade-up' } data-aos-duration="600" data-aos-delay="0">
            <Typography variant='h4' component='h2'>Our values</Typography>
            <Typography>We at Nami Corporation are proud of a set of core values ​​that drive our operations, build our relationships with our customers, and define our approach to providing integrated technology solutions.</Typography>
            <Stack direction={ 'row' } spacing={ 2 }>
              { ourvalues.map((val, inx) => (
                <Stack key={ inx } direction={ 'column' } justifyContent={ 'space-around' } alignItems={ 'center' } data-aos={ 'fade-up' } data-aos-duration="600" data-aos-delay={50*(inx+1)}>
                  <Box></Box>
                  <span>{ val }</span>
                </Stack>
              )) }
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
