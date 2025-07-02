import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Stack, Typography, Container, Button, Skeleton } from '@mui/material';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import webdevelopment from '../assets/photo/services/webdevelopment.svg';
import mobiledevelopment from '../assets/photo/services/mobiledevelopment.svg';
import markiting from '../assets/photo/services/markiting.svg';
import consalting from '../assets/photo/services/consalting.svg';
import cloud from '../assets/photo/services/cloud.svg';
import design from '../assets/photo/services/design.svg';
import { useGetServicesQuery } from '../redux/server state/services';


export default function Services() {
    const { isLoading, isSuccess, data: servicesItems, isError, error } = useGetServicesQuery();
    const servicespragraph = useRef();
    gsap.registerPlugin(SplitText, ScrollTrigger);
    useEffect(() => {
        const servicespragraphsplit = new SplitText(servicespragraph.current, {
            type: "words"
        });

        gsap.to(servicespragraphsplit.words, {
            scrollTrigger: {
                trigger: servicespragraph.current,
                scrub: 1,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:1,
            y: 0,
            opacity:1,
            stagger: 0.05,
        });
    },[]);


    function servicesitemsshow(cellinrow) { 
        return Object.values(servicesItems).map((val, inx) => <Item data={ val } size={ 12 / cellinrow } aos={{ "data-aos":"fade-up", "data-aos-duration":"600", "data-aos-delay":((inx+1)*100).toString()}} />);
    }

  return (
    <Box className="servicessec">
        <Container disableGutters="false">
            <Stack direction={'column'} spacing={2} className='servicesheader'>
                <Typography variant='h5' component='h2' data-aos="fade-up" data-aos-duration="600" data-aos-delay="50"><i>Our Services</i></Typography>
                <Typography variant='h4' component='h1'data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">Where quality meets innovation</Typography>
                <Typography ref={servicespragraph} data-aos="fade-up" data-aos-duration="600" data-aos-delay="150">
                    Nami Foundation provides integrated digital solutions for resale in website design And mobile
                    applications. We resell upgraded products with the highest quality standards to meet your needs.
                </Typography>
            </Stack>
            <br/>
            <br/>
            <Grid container spacing={ 3 } className='servicesitems'>
                  { isLoading && <Waititemsshow cellinrow={ 3 } num={ 6 } />}
                  { isSuccess && servicesitemsshow(3) }
                  {isError && <h1>data not found !</h1>}
            </Grid>
        </Container>
    </Box>
  )
}

function Item({ data, size, aos }) { 
    const itemObjectives = useRef();

    if (!data) { 
        throw "Service item data unset !"
    }

    useEffect(() => {
        const itemObjectivesanimate = gsap.to(itemObjectives.current.querySelectorAll("li"), {
            stagger: 0.1,
            transform: "translateX(0px)",
            filter: "opacity(100%)",
            duration: 0.6,
            paused: true
        });
        itemObjectives.current.parentElement.onmouseover = ()=>itemObjectivesanimate.restart();
        itemObjectives.current.parentElement.onmouseleave = ()=>itemObjectivesanimate.kill();
    }, []);
    return (
        <Grid key={ data.id }  size={ { md: size, xxxs: 6, xs: 12 } } { ...aos }>
            <Stack direction={ 'column' } spacing={ 1 } className='face'>
                <Stack direction={ 'row' }>
                    <img src={ data.image } alt={ data.title + " service" } loading='lazy' />
                    <div></div>
                </Stack>
                <Typography variant='h5' component={ 'h3' }>{ data.title }</Typography>
                <Typography>{ data.description }</Typography>
            </Stack>
            <Stack direction={ 'column' } className='back'>
                <ul ref={ itemObjectives }>
                    { data.objectives.map((val, inx) => <li key={ inx }>{ val }</li>) }
                </ul>
                <Button variant='contained' disableRipple={ true } >Read more</Button>
            </Stack>
        </Grid>
    )
}


function Waititemsshow({ cellinrow, num }) { 
    const skeltonarray = [];
    for (let i = 0; i < num; i++) { 
        skeltonarray.push(
            <Grid size={ 12 / cellinrow }>
                <Skeleton variant="rounded" width={ "100%" } height={ 250 } aos={ { "data-aos": "fade-up", "data-aos-duration": "600", "data-aos-delay": ((1 + 1) * 100).toString() } } />
            </Grid>
        );
    }
    return skeltonarray;
}