//*react
import React, { memo, useEffect, useRef } from 'react'
//*mui
import { Stack, Typography } from '@mui/material'
//*gsap
import gsap from 'gsap'
//*styles
import "../../../sass/shared/statisticsbox.scss"
//*animation
import { countUp, statisticsBoxAosAnimation } from '../../../animation/statisticsbox'


export function StatisticsList({ children }) {

    
    
    return (
        <Stack direction={ 'row' } className='statisticsList'>
        
            { React.Children.map(children, (child, inx) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        aosAnimation: statisticsBoxAosAnimation(inx + 1)
                    });
                }
                return child;
            }) }
            
    </Stack>
  )
}

export const StatisticsBox = memo(({ data, aosAnimation }) => {

    const statisticValue = useRef();

    if (!data || (data && Object.keys(data).length == 0)) return <></>
    
    useEffect(() => {
        requestIdleCallback(() => {
            countUp(statisticValue, data.value);
        })
    }, [])
    
    return (
        <Stack direction={ 'column' } { ...aosAnimation } className='statisticsBox'>
            { data.value && <Typography variant='h4' component={ 'h4' } className='statisticsBoxValue'><span ref={ statisticValue }>0</span> { data.type } </Typography> }
            { data.title && <Typography variant='h6' component={ 'h3' } className='statisticsBoxTitle'>{ data.title }</Typography> }
        </Stack>
    )
});

//*example
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