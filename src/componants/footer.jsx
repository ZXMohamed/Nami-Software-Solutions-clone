import { Box, Container, Grid, Stack, Typography } from '@mui/material'
import React from 'react'

import logo from "../assets/photo/global/namilogo.svg";
import mailbox from "../assets/photo/footer/mailbox.svg";
import SocialButtons from './socialbuttons';

import { useGetSocialQuery } from '../redux/server state/social';

export default function Footer() {

  return (
    <Box className='footer'>
        <Container maxWidth="lg">
            <Grid container className='footerTabs'>
                <FooterAboutTab/>
                <FooterServicesTab/>
                <FooterLinksTab/>
                <FooterContactEmail/>
            </Grid>
            <Stack direction={'row'} spacing={0.5} className='footerDownBar'>
                <Typography className='footerCopyRights'>© 2025 All rights reserved for Nami Software Development Company.</Typography>
                <SocialButtons/>
            </Stack>
        </Container>
    </Box>
  )
}


function FooterAboutTab() {
    
    return (
        <Grid size={{xs:12,md:3}} className="footerAboutTab">
            <img src={logo} alt="Nami Software Solutions" loading='lazy' className='footerLogo'/>
            <Typography className='footerDescription'>
                At Integrated Solutions, we combine creativity and professionalism to transform your ideas into inspiring digital experiences. Connect with us today to achieve tangible success together.
            </Typography>
        </Grid>
    )
}

function FooterServicesTab() {
    
    return (
        <Grid size={{xs:12,xxs:6,md:3}} className='footerServicesTab'>
            <Typography variant='h6' component={'h1'} className='footerTabTitle'>Services</Typography>
            <ul type="none" className='footerTabList'>
                <li>Design services</li>
                <li>Cloud services</li>
                <li>Technical consulting</li>
                <li>Digital marketing</li>
                <li>Mobile application development</li>
                <li>Website development</li>
            </ul>
        </Grid>
    )
}

function FooterLinksTab() {
    
    return (
        <Grid size={{xs:12,xxs:6,md:3}} className='footerLinksTab'>
            <Typography variant='h6' component={'h1'} className='footerTabTitle'>Links</Typography>
            <ul type="none" className='footerTabList'>
                <li>Home</li>
                <li>About us</li>
                <li>Services</li>
                <li>Contact us</li>
            </ul>
        </Grid>
    )
}

function FooterContactEmail() {

    const { data: social } = useGetSocialQuery();
    
    return (
        <Grid size={{xs:12,xxs:6,md:3}} className='footerContactEmail'>
            <Typography variant='h6' component={'h1'} className='footerTabTitle'>Contact email</Typography>
            <ul type="none" className='footerTabList'>
                <li><img src={ mailbox } alt="contact email Support" loading='lazy' className='footerTabListItemsIcon'/><a href={ social?.email.support.link } className='footerTabListItemsLink'>{ social?.email.support.title }</a></li>
                <li><img src={mailbox} alt="contact email Human resources" loading='lazy' className='footerTabListItemsIcon'/><a href={ social?.email.humanResources.link } className='footerTabListItemsLink'>{ social?.email.humanResources.title }</a></li>
                <li><img src={mailbox} alt="contact email Sales and marketing" loading='lazy' className='footerTabListItemsIcon'/><a href={ social?.email.sales.link } className='footerTabListItemsLink'>{ social?.email.sales.title }</a></li>
            </ul>
        </Grid>
    )
}