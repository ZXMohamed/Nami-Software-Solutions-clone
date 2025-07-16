import React, { useEffect, useRef } from 'react'
import { Stack, Typography } from '@mui/material'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import "../sass/shared/statisticsbox.scss"

export function StatisticsList({children}) {
  return (
    <Stack direction={ 'row' } className='statisticsList'>
        {React.Children.map(children, (child,inx) => {
            
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                    aosAnimation: {
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

export function StatisticsBox({ value, title, type, aosAnimation}) {

    const statisticValue = useRef();

    if (!value || !title) { 
        throw "Statistics box value or title unset !"
    }
    
    useEffect(() => { 
        requestIdleCallback(() => {
            
            countUp(statisticValue,value);
        })
    }, [])
    
    return (
        <Stack direction={ 'column' } { ...aosAnimation } className='statisticsBox'>
            {value && <Typography variant='h4' component={'h4'} className='statisticsBoxValue'><span ref={statisticValue}>0</span> {type} </Typography>}
            {title && <Typography variant='h6' component={'h3'} className='statisticsBoxTitle'>{ title }</Typography>}
        </Stack>
    )
}

function countUp(statisticValue,maxValue) { 
    gsap.to(statisticValue.current, {
        scrollTrigger: {
            start: "top+=0 bottom",
            trigger: statisticValue.current,
        },
        textContent: maxValue,
        duration: 4,
        snap: { textContent: 1 },
        stagger: 1,
    });
}
/*
<Infocard title={ "Good planning is not enough Great callings require the extraordinary!" } subtitle={ "Statistics" }>
    <Statisricslist>
    <Statisticsbox value="8" type="+" title="Years" />
    <Statisticsbox value="75" type="+" title="Projects"/>
    <Statisticsbox value="200" type="+" title="Mobile Application"/>
    <Statisticsbox value="160" type="+" title="Websites"/>
    <Statisticsbox value="95" type="%" title="Customer satisfaction"/>
    </Statisricslist>
</Infocard>
 */