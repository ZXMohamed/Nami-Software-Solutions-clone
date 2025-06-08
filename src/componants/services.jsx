import React, { useEffect, useRef, useState } from 'react';
import { Box, Grid, Stack, Typography, Container, Button } from '@mui/material';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import webdevelopment from '../assets/photo/services/webdevelopment.svg';
import mobiledevelopment from '../assets/photo/services/mobiledevelopment.svg';
import markiting from '../assets/photo/services/markiting.svg';
import consalting from '../assets/photo/services/consalting.svg';
import cloud from '../assets/photo/services/cloud.svg';
import design from '../assets/photo/services/design.svg';


export default function Services() {
    const [servicesitems, setservicesitems] = useState([{
        icon: webdevelopment,
        title: "Website development",
        description: "We excel in building advanced and responsive websites that reflect your brand identity and help you communicate effectively with your audience. From design to implementation, we are committed to delivering an exceptional digital experience.",
        points: ["User interface design (UI/UX) ", "Front and back end development ", "Search Engine Optimization (SEO) ", "E-commerce development ","Dynamic websites "],
    }, {
        icon: mobiledevelopment,
        title: "Mobile application development",
        description: "We provide comprehensive solutions for developing mobile applications on both Android and iOS platforms, with a focus on performance and optimal user experience to ensure your apps achieve widespread success.",
        points: ["Native apps ", "Hybrid applications", "User interface design for applications", "Improve application performance","Integration of applications with other systems"],
    }, {
        icon: markiting,
        title: "Digital marketing",
        description: "We help you reach your target audience through advanced digital marketing strategies, including search engine optimization (SEO), social media marketing, and pay-per-click (PPC) advertising.",
        points: ["Social media marketing", "Pay-per-click (PPC) campaigns", "Search Engine Optimization (SEO)", "Digital content creation","Digital campaign management"],
    }, {
        icon: consalting,
        title: "Technical consulting",
        description: "We provide innovative cloud services that enable you to scale your business easily and securely.From cloud hosting to comprehensive cloud solutions, we are here to support your digital transformation.",
        points: ["Business analysis", "Digital project planning", "Digital transformation consulting", "Choose the appropriate technology","Technical risk management"],
    }, {
        icon: cloud,
        title: "Cloud services",
        description: "We offer specialized technical consulting to help you choose and implement the best technological solutions that meet your business needs and drive digital success.",
        points: ["Cloud hosting", "Infrastructure as a Service (IaaS)", "Software as a Service (SaaS)", "Cloud computing services","Cloud integration with other systems"],
    }, {
        icon: design,
        title: "Design services",
        description: "We offer a comprehensive range of design services that include graphic design and brand identity design.We work to create innovative designs that reflect the essence of your brand and attract the attention of your audience.",
        points: ["Graphic Design", "Brand identity design", "Logos design", "Marketing materials design","User interface (UI) design"],
        }]);
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
        return servicesitems.map((val, inx) => <Item key={ inx } data={ val } size={ 12 / cellinrow } aos={{ "data-aos":"fade-up", "data-aos-duration":"600", "data-aos-delay":((inx+1)*100).toString()}} />);
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
            {servicesitemsshow(3)}
            </Grid>
        </Container>
    </Box>
  )
}

function Item({ data, size, aos }) { 
    const itempoints = useRef();

    if (!data) { 
        throw "Service item data unset !"
    }

    useEffect(() => {
        const itempointsanimate = gsap.to(itempoints.current.querySelectorAll("li"), {
            stagger: 0.1,
            transform: "translateX(0px)",
            filter: "opacity(100%)",
            duration: 0.6,
            paused: true
        });
        itempoints.current.parentElement.onmouseover = ()=>itempointsanimate.restart();
        itempoints.current.parentElement.onmouseleave = ()=>itempointsanimate.kill();
    }, []);
    return (
        <Grid size={ { md: size, xxxs: 6, xs: 12 } } { ...aos }>
            <Stack direction={ 'column' } spacing={ 1 } className='face'>
                <Stack direction={ 'row' }>
                    <img src={ data.icon } alt={ data.title + " service" } loading='lazy' />
                    <div></div>
                </Stack>
                <Typography variant='h5' component={ 'h3' }>{ data.title }</Typography>
                <Typography>{ data.description }</Typography>
            </Stack>
            <Stack direction={ 'column' } className='back'>
                <ul ref={ itempoints }>
                    { data.points.map((val, inx) => <li key={ inx }>{ val }</li>) }
                </ul>
                <Button variant='contained' disableRipple={ true } >Read more</Button>
            </Stack>
        </Grid>
    )
}