import React, { useContext, useEffect, useRef } from 'react'
import gsap from 'gsap';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import { Language } from '../languages/languagesContext';

export default function ServicesTicker() {

  const { isSuccess: language_isSuccess, data: language }=useContext(Language);

  const defaultContent = {
    direction: language_isSuccess ? language.page.direction : "ltr",
    items: language_isSuccess ? language.ticker.items : ["Software", "Graphic Design", "Information Security", "E-Commerce", "Search Engine Optimization (SEO)", "Digital marketing", "Project management", "Machine learning", "Web development"]
  }

  const ticker = useRef();

  useEffect(() => {
    requestIdleCallback(() => {
      tickerItemsMover(ticker)
    })
  },[defaultContent.direction]);

  return (
    <Box dir={defaultContent.direction} className='servicesTicker'>
      <Stack ref={ ticker } direction={ 'row' } className='tickerBar'>
        { defaultContent.items.map((item,inx) => <Typography key={inx} className='tickerItem'>{ item }</Typography>)}
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
        // reversed:true,
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