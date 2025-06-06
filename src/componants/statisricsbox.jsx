import React, { useEffect, useRef } from 'react'
import { Stack, Typography } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Statisricslist({children}) {
  return (
    <Stack direction={ 'row' } columnGap={ 2.5 } rowGap={2.5} justifyContent={ 'center' } flexWrap={ {xs:"wrap",md:"no-wrap"}} >
        {React.Children.map(children, (child,inx) => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    aosanimation: {
                        "data-aos": "fade-up",
                        "data-aos-duration": "1000",
                        "data-aos-delay": (100 * inx).toString()
                    }
                });
            }
            return child;
        })}
    </Stack>
    
  )
}

export function Statisticsbox({ value, title, type, aosanimation}) {

    const Statisticvalue = useRef();

    gsap.registerPlugin(ScrollTrigger);
    
    useEffect(() => { 
        gsap.to(Statisticvalue.current, {
        scrollTrigger: {
            start: "top+=0 bottom",
            trigger: Statisticvalue.current,
        },
        textContent: value,
        duration: 4,
        snap: { textContent: 1 },
        stagger: 1,
        });
    },[])
  return (
      <Stack direction={ 'column' } justifyContent={ 'space-around' } alignItems={ 'center' } { ...aosanimation } className='statisticsbox'>
        {value && <Typography variant='h4' component={'h4'}><span ref={Statisticvalue}>0</span> {type}</Typography>}
        {title && <Typography variant='h6' component={'h3'}>{ title }</Typography>}
    </Stack>
  )
}
