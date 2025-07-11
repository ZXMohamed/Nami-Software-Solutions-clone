import React, { useEffect, useRef } from 'react'
import gsap from 'gsap';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';

export default function ServicesTicker() {

  const ticker = useRef();

  useEffect(() => {
    tickerItemsMover(ticker)
  },[]);

  return (
    <Box className='servicesTicker'>
      <Stack ref={ticker} direction={ 'row' } className='tickerBar'>
        <Typography className='tickerItem'>Software</Typography>
        <Typography className='tickerItem'>Graphic Design</Typography>
        <Typography className='tickerItem'>Information Security</Typography>
        <Typography className='tickerItem'>E-Commerce</Typography>
        <Typography className='tickerItem'>Search Engine Optimization (SEO)</Typography>
        <Typography className='tickerItem'>Digital marketing</Typography>
        <Typography className='tickerItem'>Project management</Typography>
        <Typography className='tickerItem'>Machine learning</Typography>
        <Typography className='tickerItem'>Web development</Typography>
      </Stack>
    </Box>
  )
}


function tickerItemsMover(ticker) {

  const additionalArea = 100;
  const visibleArea = 1912;
  const tickerItemsDelay = 478;

  const tickerWidth = ticker.current.offsetWidth;
  const tickerItems = ticker.current.children;
  const tickerMoves = [];
  
  gsap.utils.toArray(tickerItems).forEach((item, index) => {

    const tickerItemMove = gsap.timeline();

    tickerItemMove.fromTo(item, {
        left: "0",
        x: tickerWidth, //*start position
      },
      {
        x: -1 * ((visibleArea - ticker.current.offsetWidth) + additionalArea), //*calculate end position
        duration: 28,
        ease: "none",
        repeat: -1,//*infinity loop

        onStart: () => {

          const itemWidth = gsap.getProperty(item, "width");

          callNextItem(itemWidth, tickerWidth); //* call the next item to start moving
          
          function callNextItem(itemWidth, tickerWidth) {
            //*each (tickerItemsDelay) check 
            //*if current item has fully enter the ticker
            //*to call the next item to move
            setTimeout(() => { 

              if (gsap.getProperty(item, "x") <= (tickerWidth - itemWidth)) {//*if current item has fully enter the ticker

                tickerMoves[index + 1]?.play();//*to call the next item to move

              }
              else {

                callNextItem(...arguments);//*each (tickerItemsDelay) re-check 

              }

            }, tickerItemsDelay);

          }

        }
        
      }
    );

      if (index != 0) tickerItemMove.pause();//*pause all items moves except the first item

      tickerMoves.push(tickerItemMove); //*set in moves array to call it 
    }
    
  );

}