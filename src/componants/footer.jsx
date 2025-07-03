import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'

import logo from "../assets/photo/global/namilogo.svg";
import mailbox from "../assets/photo/footer/mailbox.svg";
import Socialbuttons from './socialbuttons';

import { useGetsocialQuery } from '../redux/server state/social';

export default function Footer() {

    const { data:social } = useGetsocialQuery();

  return (
    <Box className='footer'>
        <Container maxWidth="lg">
            <Grid container className='taps'>
                <Grid size={{xs:12,md:3}} className="about">
                    <img src={logo} alt="Nami Software Solutions" />
                    <Typography>
                        At Integrated Solutions, we combine creativity and professionalism to transform your ideas into inspiring digital experiences. Connect with us today to achieve tangible success together.
                    </Typography>
                </Grid>
                <Grid size={{xs:12,xxs:6,md:3}} className='services'>
                    <Typography variant='h6' component={'h1'}>Services</Typography>
                    <ul type="none">
                        <li>Design services</li>
                        <li>Cloud services</li>
                        <li>Technical consulting</li>
                        <li>Digital marketing</li>
                        <li>Mobile application development</li>
                        <li>Website development</li>
                    </ul>
                </Grid>
                <Grid size={{xs:12,xxs:6,md:3}} className='links'>
                    <Typography variant='h6' component={'h1'}>Links</Typography>
                      <ul type="none">
                        <li>Home</li>
                        <li>About us</li>
                        <li>Services</li>
                        <li>Contact us</li>
                    </ul>
                </Grid>
                <Grid size={{xs:12,xxs:6,md:3}} className='contactemail'>
                    <Typography variant='h6' component={'h1'}>Contact email</Typography>
                      <ul type="none">
                          <li><img src={ mailbox } alt="contact email Support" /><a href={ social.email.support.link }>{ social.email.support.title }</a></li>
                        <li><img src={mailbox} alt="contact email Human resources" /><a href={ social.email.humanResources.link }>{ social.email.humanResources.title }</a></li>
                        <li><img src={mailbox} alt="contact email Sales and marketing" /><a href={ social.email.sales.link }>{ social.email.sales.title }</a></li>
                    </ul>
                </Grid>
            </Grid>
            <Stack direction={'row'} spacing={0.5} className='social'>
                <Typography>© 2025 All rights reserved for Nami Software Development Company.</Typography>
                <Socialbuttons/>
            </Stack>
        </Container>
    </Box>
  )
}
