//*react
import React, { useContext, useEffect, useMemo, useRef } from 'react'
//*mui
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material'
//*gsap
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
//*queries
import { useGetLocationQuery } from '../../redux/server state/location';
import { useGetSocialQuery } from '../../redux/server state/social';
//*scripts
import { Language } from '../../languages/languagesContext';


export function InfoSection() {

    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        title: language_isSuccess ? language.contact.title : "Contact with us",
        subtitle: language_isSuccess ? language.contact.subtitle : "Let us help you build your next app.",
        description: language_isSuccess ? language.contact.description : "Our team of professionals is committed to delivering exceptional results in software development and technical project management. Share your project details with us so we can create a custom experience that meets your vision.",
    }), [language, language_isSuccess]);

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
            <Typography ref={ contactSubtitle } variant='h5' component={ 'h1' } className='contactInfoTitle' {...titleAosAnimation}><i>{defaultContent.title}</i></Typography>
            <Typography ref={contactTitle} variant='h4' component={'h2'} className='contactInfoSubtitle' {...subtitleAosAnimation}>{defaultContent.subtitle}</Typography>
            <Typography ref={contactDescription} data-aos="fade-up" className='contactInfoDescription' {...descriptionAosAnimation}>{defaultContent.description}</Typography>
        </Stack>
    )
}

export function ContactMethodsSection() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        locationTitle: language_isSuccess ? language.contact.locationTitle : "Visit us",
        supportTitle: language_isSuccess ? language.contact.supportTitle : "Message us",
        callTitle: language_isSuccess ? language.contact.callTitle : "Call us at"
    }), [language, language_isSuccess]);

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
            { location_isSuccess && <ContactMethodItem icon={ location.icon.outline } title={ defaultContent.locationTitle } contactMethod={ language_isSuccess ? location["address-" + language.page.language] : location.address } link={ location.link } target={ "_blank" } route={ "val.route" } aosAnimation={ contactMethodItemAosAnimation(1) } />}
            { social_isSuccess && <ContactMethodItem icon={ social.email.support.icon.outline } title={ defaultContent.supportTitle } contactMethod={ social.email.support.email } link={ social.email.support.link } target={ "_self" } route={ "val.route" } aosAnimation={ contactMethodItemAosAnimation(2) } />}
            { social_isSuccess && <ContactMethodItem icon={ social.phone.icon.outline } title={ defaultContent.callTitle } contactMethod={ social.phone.number } link={ social.phone.link } target={ "_self" } route={ "val.route" } aosAnimation={ contactMethodItemAosAnimation(3) } />}
        </Stack> 
    )
}

function ContactMethodItem({ icon, title, contactMethod, link, target, route, aosAnimation }) { 

    return (
        <Grid container {...aosAnimation}>
            <Grid size={ { xs:2,xxs:1 } }>
                <Box className="contactMethodIconCircle">
                    <img src={icon} alt={ "Nami "+title } loading='lazy' className='contactMethodIcon'/>
                </Box>
            </Grid>
            <Grid size={ { xs:10,xxs:11 } }>
                <Stack direction={ "column" } spacing={ 1 }>
                    <Typography variant='h6' component={ 'h3' } className='contactMethodTitle'>{ title}</Typography>
                    <Typography variant='h6' component={ 'h4' } className='contactMethodLink'><a href={link} target={target}>{contactMethod}</a></Typography>
                </Stack>
            </Grid>
        </Grid>
    )
}

function WaitContactMethodProgress({ num }) {
    const progressArray = [];
    for (let i = 0; i < num; i++){
        progressArray.push( <CircularProgress key={i} variant="indeterminate" size={40} thickness={2} />)
    }
    return progressArray;
}

const aosAnimation = {
    ["data-aos"]:"fade-up",
    ["data-aos-duration"]:"1000"
}
const titleAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]:"50"
}
const subtitleAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]:"100"
}
const descriptionAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]:"150"
}
const contactMethodItemAosAnimation = (order) => ({
    ...aosAnimation,
    ["data-aos-delay"]: (150 * order).toString()
})

function titleWordsUp(contactTitle) {
    const contactTitleSplit = new SplitText(contactTitle.current, {
        type: "words"
    });
    gsap.to(contactTitleSplit.words, {
            scrollTrigger: {
                trigger: contactTitle.current,
                // scrub: 1,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:0.5,
            y: 0,
            opacity:1,
            stagger: 0.05,
        }
    );
}
function subtitleWordsUp(contactSubtitle) {
    const contactSubtitleSplit = new SplitText(contactSubtitle.current, {
        type: "lines"
    });
    gsap.to(contactSubtitleSplit.lines, {
            scrollTrigger: {
                trigger: contactSubtitle.current,
                // scrub: 1,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:0.5,
            y: 0,
            opacity:1,
            stagger: 0.1,
        }
    );
}
function descriptionWordsUp(contactDescription) {
    const contactDescriptionSplit = new SplitText(contactDescription.current, {
        type: "words"
    });
    gsap.to(contactDescriptionSplit.words, {
            scrollTrigger: {
                trigger: contactDescription.current,
                // scrub: 1,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:0.5,
            y: 0,
            opacity:1,
            stagger: 0.02,
        }
    );
}