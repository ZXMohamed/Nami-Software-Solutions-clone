//*react
import React, { memo, useContext, useMemo } from 'react'
//*mui
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
//*component
import SocialButtons from './social&contacts/socialbuttons';
//*queries
import { useGetSocialQuery } from '../redux/server state/social';
//*scripts
import { Language } from '../languages/languagesContext';
//*assets
import logo from "../assets/photo/global/namilogo.svg";
import mailbox from "../assets/photo/footer/mailbox.svg";
//*styles
import "../sass/shared/footer.scss"

const Footer = memo(() => {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        downBar: {
            copyRights: language_isSuccess ? language.footer.downBar.copyRights : "© 2025 All rights reserved for Nami Software Development Company."
        }
    }), [language, language_isSuccess]);

    return (
        <Box dir={ defaultContent.direction } className='footer'>
            <Container maxWidth="lg">
                <Grid container className='footerTabs'>
                    <FooterAboutTab />
                    <FooterServicesTab />
                    <FooterLinksTab />
                    <FooterContactEmail />
                </Grid>
                <Stack direction={ 'row' } spacing={ 0.5 } className='footerDownBar'>
                    <Typography className='footerCopyRights'>{ defaultContent.downBar.copyRights }</Typography>
                    <SocialButtons />
                </Stack>
            </Container>
        </Box>
    )
});

export default Footer;


function FooterAboutTab() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        footerLogo: language_isSuccess ? language.footer.footerLogo : logo,
        description: language_isSuccess ? language.footer.description : "At Integrated Solutions, we combine creativity and professionalism to transform your ideas into inspiring digital experiences. Connect with us today to achieve tangible success together.",
    }), [language, language_isSuccess]);
    
    return (
        <Grid dir={defaultContent.direction} size={{xs:12,md:3}} className="footerAboutTab">
            <img src={defaultContent.footerLogo} alt="Nami Software Solutions" loading='lazy' className='footerLogo'/>
            <Typography className='footerDescription'>{ defaultContent.description }</Typography>
        </Grid>
    )
}

function FooterServicesTab() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        tabs: {
            services: {
                title: language_isSuccess ? language.footer.tabs.services.title : "Services",
                items: language_isSuccess ? language.footer.tabs.services.items : ["Design services", "Cloud services", "Technical consulting", "Digital marketing", "Mobile application development", "Website development"]
            },
        },
    }), [language, language_isSuccess]);
    
    return (
        <Grid dir={defaultContent.direction} size={{xs:12,xxs:6,md:3}} className='footerServicesTab'>
            <Typography variant='h6' component={'h1'} className='footerTabTitle'>{defaultContent.tabs.services.title}</Typography>
            <ul type="none" className='footerTabList'>
                { defaultContent.tabs.services.items.map((item, inx) => <li key={ inx } >{ item }</li>)}
            </ul>
        </Grid>
    )
}

function FooterLinksTab() {
    
    
    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        tabs: {
            links: {
                title: language_isSuccess ? language.footer.tabs.links.title : "Links",
                items: language_isSuccess ? language.footer.tabs.links.items : ["Home", "About us", "Services", "Contact us"]
            },
        },
    }), [language, language_isSuccess]);

    return (
        <Grid dir={defaultContent.direction} size={{xs:12,xxs:6,md:3}} className='footerLinksTab'>
            <Typography variant='h6' component={'h1'} className='footerTabTitle'>{defaultContent.tabs.links.title}</Typography>
            <ul type="none" className='footerTabList'>
                { defaultContent.tabs.links.items.map((item, inx) => <li key={ inx } >{ item }</li>)}
            </ul>
        </Grid>
    )
}

function FooterContactEmail() {

    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        tabs: {
            contactEmail: {
                title: language_isSuccess ? language.footer.tabs.contactEmail.title : "Contact email",
                // items:language_isSuccess ? language.footer.tabs.contactEmail.items : ["Support","Human resources","Sales and marketing"]
            }
        },
    }), [language, language_isSuccess]);

    const { data: social, isSuccess: social_isSuccess } = useGetSocialQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });
    
    return (
        <Grid dir={defaultContent.direction} size={{xs:12,xxs:6,md:3}} className='footerContactEmail'>
            <Typography variant='h6' component={'h1'} className='footerTabTitle'>{defaultContent.tabs.contactEmail.title}</Typography>
            { social_isSuccess && <ul type="none" className='footerTabList'>
                <li><img src={ mailbox } alt="contact email Support" loading='lazy' className='footerTabListItemsIcon' /><a href={ social?.email.support.link } className='footerTabListItemsLink'>{ language_isSuccess ? social?.email.support["title-" + language.page.language] : social?.email.support.title }</a></li>
                <li><img src={ mailbox } alt="contact email Human resources" loading='lazy' className='footerTabListItemsIcon' /><a href={ social?.email.humanResources.link } className='footerTabListItemsLink'>{ language_isSuccess ? social?.email.humanResources["title-" + language.page.language] : social?.email.humanResources.title }</a></li>
                <li><img src={ mailbox } alt="contact email Sales and marketing" loading='lazy' className='footerTabListItemsIcon' /><a href={ social?.email.sales.link } className='footerTabListItemsLink'>{ language_isSuccess ? social?.email.sales["title-" + language.page.language] : social?.email.sales.title }</a></li>
            </ul> }
        </Grid>
    )
}