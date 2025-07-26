import React, { useContext, useEffect, useRef, useState } from 'react'
import { Alert, Box, Button, CircularProgress, Container, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material'

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

import ReCAPTCHA from "react-google-recaptcha";

import { useGetLocationQuery } from '../redux/server state/location';
import { useGetSocialQuery } from '../redux/server state/social';
import { pattern, zodMsgs } from '../form/assets';
import { sitekey } from '../form/recaptcha';
import { Language } from '../languages/languagesContext';
import { useContactMutation } from '../redux/server state/contact';


export default function Contact() {

    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
    }

    const isXXSSize = useMediaQuery("(max-width:500px)");

    return (
        <Box dir={defaultContent.direction} className="contactSection">
            <Container maxWidth="lg" disableGutters={isXXSSize}>
                <Grid container rowSpacing={{xs:5,md:0}}>
                    <Grid size={{xs:12,md:6}} order={{xs:1,md:0}} className="contactSide1">
                        <FormSection/>
                    </Grid>
                    <Grid size={{xs:12,md:6}} order={{xs:0,md:1}} className="contactSide2">
                        <InfoSection/>
                        <br/>
                        <br/>
                        <ContactMethodsSection/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

const schema = zod.object({
    name: zod.string().nonempty(zodMsgs.required).min(3, { message: zodMsgs.length.less("name",3) }).max(100, { message: zodMsgs.length.more("name",100) }).refine((name) => pattern.name(name), { message: zodMsgs.valid("name") }),
    subject: zod.string().nonempty(zodMsgs.required).min(3, { message: zodMsgs.length.less("subject",3) }).max(100, { message: zodMsgs.length.more("subject",100) }),
    message: zod.string().nonempty(zodMsgs.required).max(500, { message: zodMsgs.length.more("message",500) }),
    phone: zod.string().min(1, { message: zodMsgs.required }).refine((phone) => pattern.phone(phone), { message: zodMsgs.valid("number") }),
    email: zod.string().nonempty(zodMsgs.required).email(zodMsgs.valid)
});

function FormSection() {

    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
        language: language_isSuccess ? language.page.language : "en",
        form: {
            title:language_isSuccess ? language.contact.form.title : "",
            inputs:{
                name: language_isSuccess ? language.contact.form.inputs.name : "name",
                email:language_isSuccess ? language.contact.form.inputs.email : "email",
                phone:language_isSuccess ? language.contact.form.inputs.phone : "phone",
                subject:language_isSuccess ? language.contact.form.inputs.subject : "subject",
                message:language_isSuccess ? language.contact.form.inputs.message : "message"
            },
            alert: {
                success:language_isSuccess ? language.contact.form.alert.success:"Request Sent Successfully.",
                error:language_isSuccess ? language.contact.form.alert.error:"Request Failed.",
            },
            submit:language_isSuccess ? language.contact.form.submit : "Send"
        }
    }

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

    const inputsSettings = {
        name: register("name", { required: true }),
        subject: register("subject", { required: true }),
        phone: register("phone", { required: true }),
        email: register("email", { required: true }),
        message: register("message", { required: true }),
    }

    // const [captchaToken, setCaptchaToken] = useState(null);
    const reCaptcha = useRef();
    const reCaptchaToken = useRef();

    const handleCaptchaChange = (token) => {
        reCaptchaToken.current = token;
        // console.log("Captcha token:", token);
    };

    useEffect(() => {
        const subscription = watch((value,{ name, type }) => {
            if (reCaptchaToken.current) {
                if (name && type) {
                    reCaptcha.current.reset();
                    reCaptchaToken.current = undefined;
                }
            }
        });
        return () => subscription.unsubscribe();
    }, []);
    
    const [contact, { isSuccess: contact_isSuccess, isLoading: contact_isLoading, isError: contact_isError }] = useContactMutation();

    const onsubmit = (data) => {
        if (!reCaptchaToken.current) {
            // alert("Please complete the CAPTCHA.");
            // return;
        } else {
            //$send recaptch to php
            data.reCaptchaToken = reCaptchaToken.current
            contact(data);
            reCaptcha.current.reset();
            reCaptchaToken.current = undefined;
            //Proceed with form submission logic (e.g. send data to backend);
            //console.log("Form submitted with CAPTCHA:", reCaptchaToken.current);
        }

    };

    return (
        <Stack dir={defaultContent.direction} component={"form"} direction={"column"} spacing={6} className='contactFormSection' onSubmit={handleSubmit(onsubmit)} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
            
            {(contact_isSuccess && !contact_isLoading) && <Alert variant="filled" color='primary' severity="success" className='formAlert'>{ defaultContent.form.alert.success }</Alert> }

            <Grid container rowSpacing={ 5 } columnSpacing={ 4 }>
                
                <Grid size={ { xs: 12, sm: 6 } }><TextField type={ "text" } color='secondary' label={defaultContent.form.inputs.name} variant="standard" helperText={ errors?.name?.message } { ...inputsSettings.name } /></Grid>
                
                <Grid size={ { xs: 12, sm: 6 } }><TextField type="email" color='secondary' label={defaultContent.form.inputs.email} variant="standard" helperText={ errors?.email?.message } { ...inputsSettings.email } /></Grid>
                
                <Grid size={ { xs: 12, sm: 6 } }><TextField type={ "number" } color='secondary' label={defaultContent.form.inputs.phone} variant="standard" helperText={ errors?.phone?.message } { ...inputsSettings.phone } /></Grid>
                
                <Grid size={ { xs: 12, sm: 6 } }><TextField type={ "Text" } color='secondary' label={defaultContent.form.inputs.subject} variant="standard" helperText={ errors?.subject?.message } { ...inputsSettings.subject } /></Grid>
                
                <Grid size={ 12 }><TextField color='secondary' label={defaultContent.form.inputs.message} multiline rows={ 4 } variant="standard" helperText={ errors?.message?.message } { ...inputsSettings.message } /></Grid>
            
            </Grid>
            
            <ReCAPTCHA ref={reCaptcha} sitekey={ sitekey } onChange={ handleCaptchaChange } hl={ defaultContent.language } />
            
            {(contact_isError && !contact_isLoading) && <Alert variant="filled" color='error' severity="error" className='formAlert'>{defaultContent.form.alert.error}</Alert>}

            <Stack direction={ "row" } className='contactFormSubmitContainer'>
                <Box className="contactFormSubmitBorder">
                    <Button loading={contact_isLoading} loadingPosition='center' variant='contained' disableRipple type='submit' disabled={isSubmitting} className='contactFormSubmit'>{defaultContent.form.submit}</Button>
                </Box>
            </Stack>
        
        </Stack>
    )
}
function InfoSection() {

    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
        title: language_isSuccess ? language.contact.title : "Contact with us",
        subtitle: language_isSuccess ? language.contact.subtitle : "Let us help you build your next app.",
        description: language_isSuccess ? language.contact.description : "Our team of professionals is committed to delivering exceptional results in software development and technical project management. Share your project details with us so we can create a custom experience that meets your vision.",
    }

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
            <Typography ref={contactSubtitle} variant='h5' component={'h1'} className='contactInfoTitle' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50"><i>{defaultContent.title}</i></Typography>
            <Typography ref={contactTitle} variant='h4' component={'h2'} className='contactInfoSubtitle' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">{defaultContent.subtitle}</Typography>
            <Typography ref={contactDescription} data-aos="fade-up" className='contactInfoDescription' data-aos-duration="1000" data-aos-delay="150">{defaultContent.description}</Typography>
        </Stack>
    )
}
function ContactMethodsSection() {

    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
        form: {
            title:"",
            inputs:{
                name:"name",
                email:"email",
                phone:"phone",
                subject:"subject",
                message:"message"
            },
            submit:"Send"
        },
        locationTitle:  language_isSuccess ? language.contact.locationTitle : "Visit us",
        supportTitle:  language_isSuccess ? language.contact.supportTitle : "Message us",
        callTitle:  language_isSuccess ? language.contact.callTitle : "Call us at"
    }

    const { isSuccess: location_isSuccess, isLoading: location_isLoading, data: location } = useGetLocationQuery();
    
    const { isSuccess: social_isSuccess, isLoading: social_isLoading, data: social } = useGetSocialQuery();
        
    return (
        <Stack dir={defaultContent.direction} direction="column" spacing={2} className='contactMethodsSection'>
            {location_isLoading && waitContactMethodProgress(1)}
            {social_isLoading && waitContactMethodProgress(2)}
            { location_isSuccess && <ContactMethodItem icon={ location.icon.outline } title={ defaultContent.locationTitle } contactMethod={ language_isSuccess ? location["address-" + language.page.language] : location.address} link={location.link} target={"_blank"} route={"val.route"} aosAnimation={{"data-aos":"fade-up", "data-aos-duration":"1000", "data-aos-delay":(50)}}/>}
            {social_isSuccess && <ContactMethodItem icon={social.email.support.icon.outline} title={defaultContent.supportTitle} contactMethod={social.email.support.email} link={social.email.support.link} target={"_self"} route={"val.route"} aosAnimation={{"data-aos":"fade-up", "data-aos-duration":"1000", "data-aos-delay":(100)}}/>}
            {social_isSuccess && <ContactMethodItem icon={social.phone.icon.outline} title={defaultContent.callTitle} contactMethod={social.phone.number} link={social.phone.link} target={"_self"} route={"val.route"} aosAnimation={{"data-aos":"fade-up", "data-aos-duration":"1000", "data-aos-delay":(150)}}/>}
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

function waitContactMethodProgress(num) {
    const progressArray = [];
    for (let i = 0; i < num; i++){
        progressArray.push( <CircularProgress key={i} variant="indeterminate" size={40} thickness={2} />)
    }
    return progressArray;
}

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