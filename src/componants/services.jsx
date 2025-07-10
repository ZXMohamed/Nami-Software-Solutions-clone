import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Stack, Typography, Container, Button, Skeleton } from '@mui/material';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useGetServicesQuery } from '../redux/server state/services';


export default function Services() {

    const { isLoading: servicesItems_isLoading, isSuccess: servicesItems_isSuccess, data: servicesItems, isError: servicesItems_isError, error } = useGetServicesQuery();

    const description = useRef();

    useEffect(() => {
        descriptionWordsUP(description);
    },[]);


    function servicesItemsShow(cellInRow) { 
        return Object.values(servicesItems).map((service, inx) => <ServiceCard data={ service } size={ 12 / cellInRow } aosAnimation={{ "data-aos":"fade-up", "data-aos-duration":"600", "data-aos-delay":((inx+1)*100).toString()}} />);
    }

  return (
    <Box className="servicesSection">
        <Container disableGutters="false">
            <Stack direction={'column'} spacing={2} className='servicesHeader'>
                <Typography variant='h5' component='h1' className='servicesTitle'  data-aos="fade-up" data-aos-duration="600" data-aos-delay="50"><i>Our Services</i></Typography>
                <Typography variant='h4' component='h2' className='servicesSubtitle' data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">Where quality meets innovation</Typography>
                <Typography ref={description} className='servicesDescription' data-aos="fade-up" data-aos-duration="600" data-aos-delay="150">
                    Nami Foundation provides integrated digital solutions for resale in website design And mobile
                    applications. We resell upgraded products with the highest quality standards to meet your needs.
                </Typography>
            </Stack>
            <br/>
            <br/>
            <Grid container spacing={ 3 } className='servicesItems'>
                { servicesItems_isLoading && <WaitItemsSkelton cellInRow={ 3 } num={ 6 } /> }
                { servicesItems_isSuccess && servicesItemsShow(3) }
                { servicesItems_isError && <Typography variant={"h6"} color="error">Data Not Found !</Typography> }
            </Grid>
        </Container>
    </Box>
  )
}

function ServiceCard({ data, size, aosAnimation }) { 
    const itemObjectives = useRef();

    if (!data) { 
        throw "Service item data unset !"
    }

    useEffect(() => {
        showObjectivesOnHover(itemObjectives);
    }, []);

    return (
        <Grid key={ data.id }  size={ { md: size, xxxs: 6, xs: 12 } } { ...aosAnimation }>
            <Stack direction={ 'column' } spacing={ 1 } className='itemFace'>
                <Stack direction={ 'row' } className='itemHeader'>
                    <img src={ data.image } alt={ data.title + " service" } loading='lazy' className='itemIcon'/>
                    <div className='itemArrow'></div>
                </Stack>
                <Typography variant='h5' component={ 'h3' } className='itemTitle'>{ data.title }</Typography>
                <Typography className='itemDescription'>{ data.description }</Typography>
            </Stack>
            <Stack direction={ 'column' } className='itemBack'>
                <ul ref={ itemObjectives } className='itemObjectives'>
                    { data.objectives.map((val, inx) => <li key={ inx }>{ val }</li>) }
                </ul>
                <Button variant='contained' disableRipple={ true } className='itemReadMore'>Read more</Button>
            </Stack>
        </Grid>
    )
}

function WaitItemsSkelton({ cellInRow, num }) { 
    const skeltonArray = [];
    for (let i = 0; i < num; i++) { 
        skeltonArray.push(
            <Grid size={ 12 / cellInRow }>
                <Stack direction={"row"} justifyContent={ "space-between" } alignItems={"center"}>
                    <Skeleton variant="rounded" width={ 60 } height={ 60 } />
                    <Skeleton variant="circular" width={ 45 } height={ 45 } />
                </Stack>
                <br/>
                <Skeleton variant="rounded" width={ "60%" } height={ 20 } />
                <br/>
                <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
                <br/>
                <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
                <br/>
                <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            </Grid>
        );
    }
    return skeltonArray;
}

function descriptionWordsUP(description) {
    const descriptionSplit = new SplitText(description.current, {
        type: "words"
    });

    gsap.to(descriptionSplit.words, {
        scrollTrigger: {
            trigger: description.current,
            scrub: 1,
            start: "top+=0 bottom",
            end: "top+=20 bottom",
        },
        duration:1,
        y: 0,
        opacity:1,
        stagger: 0.05,
    });
}
function showObjectivesOnHover(itemObjectives) {
    const itemObjectivesAnimate = gsap.to(itemObjectives.current.querySelectorAll("li"), {
        stagger: 0.1,
        transform: "translateX(0px)",
        filter: "opacity(100%)",
        duration: 0.6,
        paused: true
    });
    itemObjectives.current.parentElement.onmouseover = ()=>itemObjectivesAnimate.restart();
    itemObjectives.current.parentElement.onmouseleave = ()=>itemObjectivesAnimate.kill();
}