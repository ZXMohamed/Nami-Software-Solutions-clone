//*react
import React, { useEffect, useRef } from 'react'
//*mui
import { Box, Grid, Stack, Typography } from '@mui/material'
//*queries
import { useGetLocationQuery } from '../../../redux/server state/location';
import { useGetSocialQuery } from '../../../redux/server state/social';
//*hooks
import { useContent } from '../../../languages/hooks/usecontent';
//*components
import { WaitContactMethodProgress } from '../../loadingitems/contactinfo';
//*animation
import { contactMethodItemAosAnimation, descriptionAosAnimation, descriptionWordsUp, subtitleAosAnimation, subtitleWordsUp, titleAosAnimation, titleWordsUp } from '../../../animation/contactinfo';


export function InfoSection() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                title: content.contact.title,
                subtitle: content.contact.subtitle,
                description: content.contact.description,
            }
        } else {
            return infoSectionFirstContent;
        }
    })();

    const contactTitle = useRef();
    const contactSubtitle = useRef();
    const contactDescription = useRef();
    
    useEffect(() => {
        requestIdleCallback(() => {
            titleWordsUp(contactTitle);
            subtitleWordsUp(contactSubtitle);
            descriptionWordsUp(contactDescription);
        })
    }, []);
    
    return (
        <Stack dir={defaultContent.direction} direction="column" spacing={2} className='contactInfoSection'>
            <Typography ref={ contactSubtitle } variant='h5' component={ 'h2' } className='contactInfoTitle' {...titleAosAnimation}><i>{defaultContent.title}</i></Typography>
            <Typography ref={contactTitle} variant='h4' component={'h3'} className='contactInfoSubtitle' {...subtitleAosAnimation}>{defaultContent.subtitle}</Typography>
            <Typography ref={contactDescription} data-aos="fade-up" className='contactInfoDescription' {...descriptionAosAnimation}>{defaultContent.description}</Typography>
        </Stack>
    )
}

export function ContactMethodsSection() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                locationTitle: content.contact.locationTitle,
                supportTitle: content.contact.supportTitle,
                callTitle: content.contact.callTitle
            }
        } else {
            return contactMethodsSectionFirstContent;
        }
    })();

    const { isSuccess: location_isSuccess, data: location } = useGetLocationQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });
    
    const { isSuccess: social_isSuccess, data: social } = useGetSocialQuery(undefined,{
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });
    
    return (
        <Stack dir={defaultContent.direction} direction="column" spacing={2} className='contactMethodsSection'>
            { !location_isSuccess && <WaitContactMethodProgress num={ 1 }/>}
            { !social_isSuccess && <WaitContactMethodProgress num={ 2 } />}
            { location_isSuccess && <ContactMethodItem icon={ location.icon.outline } title={ defaultContent.locationTitle } contactMethod={ content_isSuccess ? location["address-" + content.page.language] : location.address } link={ location.link } target={ "_blank" } route={ "val.route" } aosAnimation={ contactMethodItemAosAnimation(1) } />}
            { social_isSuccess && <ContactMethodItem icon={ social.email.support.icon.outline } title={ defaultContent.supportTitle } contactMethod={ social.email.support.email } link={ social.email.support.link } target={ "_self" } route={ "val.route" } aosAnimation={ contactMethodItemAosAnimation(2) } />}
            { social_isSuccess && <ContactMethodItem icon={ social.phone.icon.outline } title={ defaultContent.callTitle } contactMethod={ social.phone.number } link={ social.phone.link } target={ "_self" } route={ "val.route" } aosAnimation={ contactMethodItemAosAnimation(3) } />}
        </Stack> 
    )
}

function ContactMethodItem({ icon, title, contactMethod, link, target, aosAnimation }) { 

    return (
        <Grid container {...aosAnimation}>
            <Grid size={ { xs:2,xxs:1 } }>
                <Box className="contactMethodIconCircle">
                    <img src={icon} alt={ "Nami "+title } loading='lazy' className='contactMethodIcon' width={"19"} height={"19"}/>
                </Box>
            </Grid>
            <Grid size={ { xs:10,xxs:11 } }>
                <Stack direction={ "column" } spacing={ 1 }>
                    <Typography variant='h6' component={ 'h4' } className='contactMethodTitle'>{ title}</Typography>
                    <Typography variant='h6' component={ 'h5' } className='contactMethodLink'><a href={link} target={target}>{contactMethod}</a></Typography>
                </Stack>
            </Grid>
        </Grid>
    )
}

const infoSectionFirstContent = {
    direction: "ltr",
    title: "Contact with us",
    subtitle: "Let us help you build your next app.",
    description: "Our team of professionals is committed to delivering exceptional results in software development and technical project management. Share your project details with us so we can create a custom experience that meets your vision.",
}
const contactMethodsSectionFirstContent = {
    direction: "ltr",
    locationTitle: "Visit us",
    supportTitle: "Message us",
    callTitle: "Call us at"
}