//*react
import React from 'react'
//*route
import { pages_routes } from '../../routes/routes';
import { Link, useLocation } from 'react-router';
//*mui
import { Box, Container, Grid, Stack, Typography } from '@mui/material'
//*hooks
import { useContent } from '../../languages/hooks/usecontent';
//*component
import LogoLink from '../shared/logolink';
import SocialButtons from '../shared/social&contacts/socialbuttons';
//*queries
import { useGetSocialQuery } from '../../redux/server state/social';
//*scripts
import { defaultLanguage } from '../../languages/languagesContext';
import { getPage, navSettings } from '../../routes/routesmanager';
//*assets
import logo from "../../assets/photo/global/namilogo.svg";
import mailbox from "../../assets/photo/footer/mailbox.svg";
//*styles
import "../../sass/shared/footer.scss"


const Footer = () => {

    const { isSuccess: content_isSuccess, data: content } = useContent();
    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                downBar: {
                    copyRights: content.footer.downBar.copyRights 
                }
            }
        } else {
            return footerFirstContent;
        }
    })();

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
}

export default Footer;


function FooterAboutTab() {

    const { isSuccess: content_isSuccess, data: content } = useContent();
    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                footerLogo: content.footer.footerLogo,
                footerLogoAlt: content.footer.footerLogoAlt,
                description: content.footer.description,
            }
        } else {
            return footerAboutTabFirstContent;
        }
    })();
    
    return (
        <Grid dir={defaultContent.direction} size={{xs:12,md:3}} className="footerAboutTab">
            <LogoLink>
                <img src={ defaultContent.footerLogo } alt={defaultContent.footerLogoAlt} loading='lazy' className='footerLogo' width={"175"} height={"60"}/>
            </LogoLink>
            <Typography className='footerDescription'>{ defaultContent.description }</Typography>
        </Grid>
    )
}

function FooterServicesTab() {

    const { isSuccess: content_isSuccess, data: content } = useContent();
    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                tabs: {
                    services: {
                        title: content.footer.tabs.services.title,
                        items: content.footer.tabs.services.items
                    },
                },
            }
        } else {
            return footerServicesTabFirstContent;
        }
    })();
    
    return (
        <Grid dir={defaultContent.direction} size={{xs:12,xxs:6,md:3}} className='footerServicesTab'>
            <Typography variant='h6' component={'h2'} className='footerTabTitle'>{defaultContent.tabs.services.title}</Typography>
            <ul type="none" className='footerTabList'>
                { Object.keys(defaultContent.tabs.services.items).map((item, inx) => {
                    return <li key={ inx } >
                        <Link to={ pages_routes(defaultContent.language, defaultContent.tabs.services.items[item].id, defaultContent.tabs.services.items[item].title.replaceAll(" ","-"))["service details"].link } className='footerTabListItemsLink'>
                            { defaultContent.tabs.services.items[item].title }
                        </Link>
                    </li>;
                    })
                }
            </ul>
        </Grid>
    )
}

function FooterLinksTab() {

    const { isSuccess: content_isSuccess, data: content } = useContent();
    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                tabs: {
                    links: {
                        title: content.footer.tabs.links.title,
                        items: content.footer.tabs.links.items
                    },
                },
            }
        } else {
            return footerLinksTabFirstContent;
        }
    })();

    return (
        <Grid dir={defaultContent.direction} size={{xs:12,xxs:6,md:3}} className='footerLinksTab'>
            <Typography variant='h6' component={'h2'} className='footerTabTitle'>{defaultContent.tabs.links.title}</Typography>
            <ul type="none" className='footerTabList'>
                <Links defaultContent={defaultContent}/>
            </ul>
        </Grid>
    )
}
function Links({ defaultContent }) {
    
    const location = useLocation();

    if (getPage(location, defaultContent.language) == "main") { 
        const nav = navSettings(defaultContent.language, true);
        return Object.keys(defaultContent.tabs.links.items).map((item, inx) => {
            if (nav[item.toLowerCase()].outerRoute)
                return <li key={ inx } ><Link to={nav[item.toLowerCase()].link} className='footerTabListItemsLink'>{ defaultContent.tabs.links.items[item].title }</Link></li>;
            else
                return <li key={ inx } ><a href={nav[item.toLowerCase()].link} className='footerTabListItemsLink'>{ defaultContent.tabs.links.items[item].title }</a></li>;
        })
    } else {
        const nav = navSettings(defaultContent.language, false);
        return Object.keys(defaultContent.tabs.links.items).map((item, inx) => {
            return <li key={ inx } ><Link to={nav[item.toLowerCase()].link} className='footerTabListItemsLink'>{ defaultContent.tabs.links.items[item].title }</Link></li>;
        })
    }

}

function FooterContactEmail() {

    const { isSuccess: content_isSuccess, data: content } = useContent();
    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                tabs: {
                    contactEmail: {
                        title: content.footer.tabs.contactEmail.title,
                    }
                },
            }
        } else {
            return footerContactEmailFirstContent;
        }
    })();

    const { data: social, isSuccess: social_isSuccess } = useGetSocialQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });
    
    return (
        <Grid dir={defaultContent.direction} size={{xs:12,xxs:6,md:3}} className='footerContactEmail'>
            <Typography variant='h6' component={'h2'} className='footerTabTitle'>{defaultContent.tabs.contactEmail.title}</Typography>
            { social_isSuccess && <ul type="none" className='footerTabList'>
                <li><img src={ mailbox } alt="contact email Support" loading='lazy' className='footerTabListItemsIcon' width={"20"} height={"20"} /><a href={ social?.email.support.link } className='footerTabListItemsLink'>{ content_isSuccess ? social?.email.support["title-" + content.page.language] : social?.email.support.title }</a></li>
                <li><img src={ mailbox } alt="contact email Human resources" loading='lazy' className='footerTabListItemsIcon' width={"20"} height={"20"} /><a href={ social?.email.humanResources.link } className='footerTabListItemsLink'>{ content_isSuccess ? social?.email.humanResources["title-" + content.page.language] : social?.email.humanResources.title }</a></li>
                <li><img src={ mailbox } alt="contact email Sales and marketing" loading='lazy' className='footerTabListItemsIcon' width={"20"} height={"20"} /><a href={ social?.email.sales.link } className='footerTabListItemsLink'>{ content_isSuccess ? social?.email.sales["title-" + content.page.language] : social?.email.sales.title }</a></li>
            </ul> }
        </Grid>
    )
}

const footerFirstContent = {
    direction: "ltr",
    downBar: {
        copyRights: "© 2025 All rights reserved for Nami Software Development Company."
    }
}
const footerAboutTabFirstContent = {
    direction: "ltr",
    footerLogo: logo,
    footerLogoAlt: "Nami Software Solutions",
    description: "At Integrated Solutions, we combine creativity and professionalism to transform your ideas into inspiring digital experiences. Connect with us today to achieve tangible success together.",
}
const footerServicesTabFirstContent = {
    direction: "ltr",
    language: defaultLanguage,
    tabs: {
        services: {
            title: "Services",
            items: {
                "Design services": { title: "Design services", id: 6 },
                "Cloud services": { title: "Cloud services", id: 5 },
                "Technical consulting": { title: "Technical consulting", id: 4 },
                "Digital marketing": { title: "Digital marketing", id: 3 },
                "Mobile application development": { title: "Mobile application development", id: 2 },
                "Website development": { title: "Website development", id: 1 }
            }
        },
    },
}
const footerLinksTabFirstContent = {
    direction: "ltr",
    language: defaultLanguage,
    tabs: {
        links: {
            title: "Links",
            items: {
                "Home": { title: "Home" },
                "About us": { title: "About us" },
                "Services": { title: "Services" },
                "Contact us": { title: "Contact us" },
            }
        },
    },
}
const footerContactEmailFirstContent = {
    direction: "ltr",
    tabs: {
        contactEmail: {
            title: "Contact email",
        }
    },
}