import React, { useState } from 'react';
import { Box, Grid, Stack, Typography, Container, Button } from '@mui/material';

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
    
    
    function servicesitemsshow(cellinrow) { 
        let rowcells = [];
        return servicesitems.map((val, inx) => {
            rowcells.push(<Grid key={ inx } size={ 12/cellinrow }>
                            <Stack direction={ 'column' } spacing={ 1 } className='face'>
                                <Stack direction={ 'row' }>
                                    <img src={ val.icon } alt={ val.title+" service"} loading='lazy'/>
                                    <div></div>
                                </Stack>
                                <Typography variant='h5' component={ 'h3' }>{ val.title }</Typography>
                                <Typography>{ val.description }</Typography>
                            </Stack>
                            <Stack direction={'column'} className='back'>
                                <ul>
                                   {val.points.map((val,inx)=><li key={inx}>{val}</li>)}
                                </ul>
                                <Button>Read more</Button>
                            </Stack>
                        </Grid>);
            if ((inx + 1) % cellinrow == 0) {
                let cells = rowcells;
                rowcells = [];
                return (
                    <Grid key={ (inx + 1) / cellinrow } container spacing={ 3 }>
                        { ...cells }
                    </Grid>
                )
            }
        })
    }
  return (
    <Box className="servicessec">
        <Container disableGutters="false">
            <Stack direction={'column'} spacing={2} className='servicesheader'>
                <Typography variant='h5' component='h2'><i>Our Services</i></Typography>
                <Typography variant='h4' component='h1'>Where quality meets innovation</Typography>
                <Typography>
                    Nami Foundation provides integrated digital solutions for resale in website design And mobile
                    applications. We resell upgraded products with the highest quality standards to meet your needs.
                </Typography>
            </Stack>
            <br/>
            <br/>
            <Stack direction={'column'} spacing={4} className='servicesitems'>
                {servicesitemsshow(3)}
            </Stack>
        </Container>
    </Box>
  )
}
