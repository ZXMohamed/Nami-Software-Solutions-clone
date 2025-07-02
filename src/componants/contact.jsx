import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, CircularProgress, Container, Grid, Stack, TextField, Typography } from '@mui/material'

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

import ReCAPTCHA from "react-google-recaptcha";

import location from "../assets/photo/contact/location.svg"
import call from "../assets/photo/contact/call.svg"
import mail from "../assets/photo/contact/mail.svg"

import { useGetlocationQuery } from '../redux/server state/location';
import { useGetsocialQuery } from '../redux/server state/social';


export default function Contact() {

    const {isError : location_isError, isSuccess : location_isSuccess, isLoading : location_isLoading, data:location,error : location_error} = useGetlocationQuery()
    const {isError : social_isError, isSuccess : social_isSuccess, isLoading : social_isLoading, data:social,error : social_error} = useGetsocialQuery()

    // const [contactinfo, setcontactinfo] = useState([{
    //     icon:location,
    //     title:"Visit us",
    //     contactmethod: "Nasr city - MAKRM EBEED /Al-Khair Tower - Al-Najjar Street - Shebin Al-Koum - Menoufia",
    //     route:""
    // },{
    //     icon: mail,
    //     title:"Message us",
    //     contactmethod: "info@nami-tec.com",
    //     route:""
    // },{
    //     icon:call,
    //     title:"Call us at",
    //     contactmethod: "+201099347981",
    //     route:""
    // }]);
    
    const zodmsgs = {
        required: "This is a required field",
        length: { less: (input, num)=>`${input} less than ${num} chars`, more: (input,num)=>`${input} more than ${num} chars` },
        valid: (input) => `this ${input} is not valid`,
    }
    const regex = {
        name:(name)=>name.match(/^[A-Za-z]+([ '-][A-Za-z]+)*$/),
        phone:(phone)=>phone.match(/^\+?[0-9]{1,4}[-\s.]?(\(?\d{2,4}\)?[-\s.]?)?\d{3,4}[-\s.]?\d{4}$/) || phone.match(/^01[0125][0-9]{8}$/) || phone.match(/^\d{10,15}$/),
    }
    
    const schema = zod.object({
        name: zod.string().nonempty(zodmsgs.required).min(3, { message: zodmsgs.length.less("name",3) }).max(100, { message: zodmsgs.length.more("name",100) }).refine((name) => regex.name(name), { message: zodmsgs.valid("name") }),
        subject: zod.string().nonempty(zodmsgs.required).min(3, { message: zodmsgs.length.less("subject",3) }).max(100, { message: zodmsgs.length.more("subject",100) }),
        message: zod.string().nonempty(zodmsgs.required).max(500, { message: zodmsgs.length.more("message",500) }),
        phone: zod.string().min(1, { message: zodmsgs.required }).refine((phone) => regex.phone(phone), { message: zodmsgs.valid("number") }),
        email: zod.string().nonempty(zodmsgs.required).email(zodmsgs.valid)
    });

    const { register, handleSubmit, formState:{errors, isSubmitting} } = useForm({resolver:zodResolver(schema),mode:"onChange"});
    
    const inputssettings = {
        name: register("name", { required: true }),
        subject: register("subject", { required: true }),
        phone: register("phone", { required: true }),
        email: register("email", { required: true }),
        message: register("message", { required: true }),
    }
    


    const headertitle = useRef();
    const headersubtitle = useRef();
    const contactparagraph = useRef();

    gsap.registerPlugin(SplitText, ScrollTrigger);
    
    useEffect(() => {
        const headertitlesplit = new SplitText(headertitle.current, {
            type: "words"
        });
        const headersubtitlesplit = new SplitText(headersubtitle.current, {
            type: "words"
        });
        const contactparagraphsplit = new SplitText(contactparagraph.current, {
            type: "words"
        });

        gsap.to(headertitlesplit.words, {
            scrollTrigger: {
                trigger: headertitle.current,
                // scrub: 1,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:0.5,
            y: 0,
            opacity:1,
            stagger: 0.05,
        });

        gsap.to(headersubtitlesplit.words, {
            scrollTrigger: {
                trigger: headersubtitle.current,
                // scrub: 1,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:0.5,
            y: 0,
            opacity:1,
            stagger: 0.1,
        });

        gsap.to(contactparagraphsplit.words, {
            scrollTrigger: {
                trigger: contactparagraph.current,
                // scrub: 1,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:0.5,
            y: 0,
            opacity:1,
            stagger: 0.02,
        });
    },[]);

    const [captchaToken, setCaptchaToken] = useState(null);

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
        console.log("Captcha token:", token);
    };

    const onsubmit = (data) => {
        if (!captchaToken) {
        // alert("Please complete the CAPTCHA.");
        
        } else {console.log(data);
            
            // Proceed with form submission logic (e.g. send data to backend)
            console.log("Form submitted with CAPTCHA:", captchaToken);
        }

    };


  return (
    <Box className="contactsec">
        <Container maxWidth="lg">
            <Grid container rowSpacing={{xs:5,md:0}}>
                <Grid size={{xs:12,md:6}} order={{xs:1,md:0}}>
                    <Stack component={"form"} direction={"column"} spacing={6} className='contactformsec' onSubmit={handleSubmit(onsubmit)} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
                        <Grid container rowSpacing={8} columnSpacing={4}>
                            <Grid size={{xs:12,sm:6}}><TextField type={"text"}  color='secondary' label="Name" variant="standard" helperText={errors?.name?.message} {...inputssettings.name} /></Grid>
                            <Grid size={{xs:12,sm:6}}><TextField type="email"  color='secondary'  label="Email" variant="standard" helperText={errors?.email?.message} {...inputssettings.email} /></Grid>
                            <Grid size={{xs:12,sm:6}}><TextField type={"number"} color='secondary'   label="Phone" variant="standard" helperText={errors?.phone?.message} {...inputssettings.phone} /></Grid>
                            <Grid size={ { xs: 12, sm: 6 } }><TextField type={ "Text" } color='secondary' label="Subject" variant="standard" helperText={errors?.subject?.message} {...inputssettings.subject} /></Grid>
                            <Grid size={ 12 }><TextField color='secondary'  label="Message" multiline rows={6} variant="standard" helperText={errors?.message?.message} {...inputssettings.message} /></Grid>
                        </Grid>
                        <ReCAPTCHA sitekey="6LdAk10rAAAAAKeGJg9mnA0wwBNtenRYAlp5da7e" onChange={handleCaptchaChange} />
                        <Stack direction={"row"} className='sendbuttoncon'>
                            <Box className="">
                                <Button variant='contained' disableRipple type='submit' disabled={isSubmitting}>Send</Button>
                            </Box>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid size={{xs:12,md:6}} order={{xs:0,md:1}} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Stack direction="column" spacing={2} className='headersec'>
                        <Typography ref={headersubtitle} variant='h5' component={'h2'} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50"><i>Contact with us</i></Typography>
                        <Typography ref={headertitle} variant='h4' component={'h1'} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">Let us help you build your next app.</Typography>
                        <Typography ref={contactparagraph} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
                            Our team of professionals is committed to delivering exceptional results in
                            software development and technical project management. Share your project
                            details with us so we can create a custom experience that meets your vision.
                        </Typography>
                    </Stack>
                    <br/>
                    <br/>
                    <Stack direction="column" spacing={2} className='contactinfosec'>
                        {location_isLoading && waitProgress(1)}
                        {social_isLoading && waitProgress(2)}
                        {location_isSuccess && <Contactinfoitem icon={location.icon.outline} title={"Visit us"} contactmethod={location.address} route={"val.route"} aosanimation={{"data-aos":"fade-up", "data-aos-duration":"1000", "data-aos-delay":(50)}}/>}
                        {social_isSuccess && <Contactinfoitem icon={social.email.icon.outline} title={"Message us"} contactmethod={social.email.title} route={"val.route"} aosanimation={{"data-aos":"fade-up", "data-aos-duration":"1000", "data-aos-delay":(100)}}/>}
                        {social_isSuccess && <Contactinfoitem icon={social.phone.icon.outline} title={"Call us at"} contactmethod={social.phone.title} route={"val.route"} aosanimation={{"data-aos":"fade-up", "data-aos-duration":"1000", "data-aos-delay":(150)}}/>}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}




function Contactinfoitem({icon,title,contactmethod,route,aosanimation}) { 

    return (
        <Grid container {...aosanimation}>
            <Grid size={ { xs:2,xxs:1 } }>
                <Box className="iconbox">
                    <img src={icon} alt={ "Nami "+title } loading='lazy'/>
                </Box>
            </Grid>
            <Grid size={ { xs:10,xxs:11 } }>
                <Stack direction={ "column" } spacing={ 1 }>
                    <Typography variant='h6' component={ 'h3' }>{ title}</Typography>
                    <Typography variant='h6' component={ 'h4' }>{ contactmethod}</Typography>
                </Stack>
            </Grid>
        </Grid>
    )
}

function waitProgress(num) {
    const progressarray = [];
    for (let i = 0; i < num; i++){
        progressarray.push( <CircularProgress variant="indeterminate" size={40} thickness={2} />)
    }
    return progressarray;
}