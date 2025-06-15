import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';

export default function Servicesticker() {

  const ticker = useRef();

  useEffect(() => {
    const tickerwidth = ticker.current.offsetWidth;
    const tickeritems = ticker.current.children;
    const tickermoves = [];
    
    gsap.utils.toArray(tickeritems).forEach((item, index) => {

      const tickeritemmove = gsap.timeline();

      tickeritemmove.fromTo(item, {
        left: "0",
        x: tickerwidth,
      }, {
        x: -1*((1912-ticker.current.offsetWidth)+100),
        duration: 28,
        ease: "none",
        repeat: -1,
        onStart: () => {
          const itemwidth = gsap.getProperty(item, "width");
          callnextitem(itemwidth,tickerwidth);
          function callnextitem(itemwidth,tickerwidth) {
            setTimeout(() => {
              if (gsap.getProperty(item, "x") <= tickerwidth - itemwidth) {
                tickermoves[index + 1]?.play();
              }
              else {
                callnextitem(...arguments);
              }
            }, 478)//*delay between each item
          }
        }
      });
      if (index != 0) tickeritemmove.pause();
    tickermoves.push(tickeritemmove)
    });
    
  });

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
