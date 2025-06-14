import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { Box, Stack, Typography } from '@mui/material';

export default function Servicesticker() {

  const ticker = useRef();

  useEffect(() => {
    const tickeritems = ticker.current.children;
    let delay = 0;

    gsap.utils.toArray(tickeritems).forEach((item, index) => {

      const previtemwidth = (index == 0 ? 0 : getComputedStyle(tickeritems[index - 1]).getPropertyValue("width"));

      delay = delay + parseInt(previtemwidth) / 43;

      console.log(delay);
      const x = gsap.timeline();

      x.fromTo(item, {
        left:"0",
        x: "1950",
      },{
        x: "-50",
        duration: 30,
        ease: "none",
        repeat: -1,
        delay: delay
      });
// x.progress(((index+1)/10)).play();
    });


  },[]);

  return (
    <Box className='servicesticker'>
      <Stack ref={ticker} direction={ 'row' }>
        <Typography>Software</Typography>
        <Typography>Graphic Design</Typography>
        <Typography>Information Security</Typography>
        <Typography>E-Commerce</Typography>
        <Typography>Search Engine Optimization (SEO)</Typography>
        <Typography>Digital marketing</Typography>
        <Typography>Project management</Typography>
        <Typography>Machine learning</Typography>
        <Typography>Web development</Typography>
      </Stack>
    </Box>
  )
}
