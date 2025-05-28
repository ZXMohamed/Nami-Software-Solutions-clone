import React, { useEffect, useRef } from 'react'
import { Box, Container, Grid } from '@mui/material'
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import aboutsideimg from "../assets/photo/about/aboutsideimg.webp";

export default function About() {

  const aboutimgcontainer = useRef();
  const aboutimg = useRef();

gsap.registerPlugin(ScrollTrigger);  

  useEffect(() => {
    gsap.timeline({
      scrollTrigger: {
        trigger: aboutimgcontainer.current,
        scrub: 1
      },
    }).to(aboutimg.current, {
      yPercent: -40,
    });
  },[]);
  
  return (
    <Box>
        <Container maxWidth="lg" disableGutters="true">
            <Grid container>
                <Grid size={ { md: 6, xs: 12 } } className="aboutsectionside1">
                    <div ref={ aboutimgcontainer }>
                      <img ref={aboutimg} src={aboutsideimg}  alt="Nami Software Solutions" loading='lazy'/>
                    </div>
                </Grid>
                <Grid size={ { md: 6, xs: 12 } } className="aboutsectionside2">text</Grid>
            </Grid>
        </Container>
    </Box>
  )
}
