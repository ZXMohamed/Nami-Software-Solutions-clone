//*react
import React, { Fragment, memo, useEffect, useRef } from 'react'
//*mui
import { Box, Stack, Typography } from '@mui/material';
//*hooks
import { useContent } from '../../languages/hooks/usecontent';
//*styles
import "../../sass/shared/servicesticker.scss";
//*animation
import { tickerItemsMover } from '../../animation/servicesticker';

const ServicesTicker = memo(() => {

  const { isSuccess: content_isSuccess, data: content } = useContent();
  const defaultContent = (() => {
    if (content_isSuccess) {
        return {
          direction: content.page.direction,
          items: content.ticker.items,
          delay: content.ticker.delay
        }
    } else {
        return firstContent;
    }
  })();

  const ticker = useRef();
  const tickerMovies = useRef([]);

  useEffect(() => {
    requestIdleCallback(() => {
      tickerMovies.current.map((itemMove) => {
        itemMove.killTweensOf("*");
        itemMove.globalTimeline?.clear();
        itemMove.globalTimeline?.time(0);
      });
      tickerMovies.current = tickerItemsMover(ticker, defaultContent.direction, defaultContent.delay);
    })
  }, [defaultContent.direction]);

  return (
    <Box dir={ defaultContent.direction } className='servicesTicker'>
      <Stack ref={ ticker } direction={ 'row' } className='tickerBar'>
        {
          defaultContent.items.map((item, inx) => <Fragment key={ inx }>
            <div className='tickerItemSplitter'></div>
            <Typography className='tickerItem'>{ item }</Typography>
          </Fragment>)
        }
      </Stack>
    </Box>
  )
});
export default ServicesTicker;

const firstContent = {
  direction: "ltr",
  items: ["Software", "Graphic Design", "Information Security", "E-Commerce", "Search Engine Optimization (SEO)", "Digital marketing", "Project management", "Machine learning", "Web development"],
  delay: 680
}