//*react
import React, { memo, useEffect, useMemo, useRef } from 'react'
//*mui
import { Stack, Typography } from '@mui/material'
//*gsap
import gsap from 'gsap'
//*styles
import "../../../sass/shared/statisticsbox.scss"


export function StatisticsList({ children }) {

    const editedChildren = React.Children.map(children, (child, inx) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                aosAnimation: statisticsBoxAosAnimation(inx + 1)
            });
        }
        return child;
    });

  return (
    <Stack direction={ 'row' } className='statisticsList'>
       {editedChildren}
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


const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]: "1000"
}
const statisticsBoxAosAnimation = (order) => ({
    ...aosAnimation,
    ["data-aos-delay"]: (100 * order).toString()
})

function countUp(statisticValue,maxValue) { 
    gsap.to(statisticValue.current, {
        scrollTrigger: {
            start: "top bottom",
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