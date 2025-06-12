import React, { useState } from 'react'
import { Box, Container, Grid, Stack, TextField, Typography } from '@mui/material'

import ReCAPTCHA from "react-google-recaptcha";

import location from "../assets/photo/contact/location.svg"
import call from "../assets/photo/contact/call.svg"
import mail from "../assets/photo/contact/mail.svg"


export default function Contact() {

    const [contactinfo, setcontactinfo] = useState([{
        icon:location,
        title:"Visit us",
        contactmethod: "Nasr city - MAKRM EBEED /Al-Khair Tower - Al-Najjar Street - Shebin Al-Koum - Menoufia",
        route:""
    },{
        icon: mail,
        title:"Message us",
        contactmethod: "info@nami-tec.com",
        route:""
    },{
        icon:call,
        title:"Call us at",
        contactmethod: "+201099347981",
        route:""
    }]);
    
    const [inputhelptext, setinputhelptext] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message:""
    });

    const [captchaToken, setCaptchaToken] = useState(null);

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
        console.log("Captcha token:", token);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!captchaToken) {
        alert("Please complete the CAPTCHA.");
        return;
        }

        // Proceed with form submission logic (e.g. send data to backend)
        console.log("Form submitted with CAPTCHA:", captchaToken);
    };


    function helptextshow(e,input) { 
        setinputhelptext({...inputhelptext,[input]:(e.target.value=="" ?"This is a required field":"")})
    }

  return (
    <Box className="contactsec">
        <Container maxWidth="lg">
            <Grid container rowSpacing={{xs:5,md:0}}>
                <Grid size={{xs:12,md:6}} order={{xs:1,md:0}}>
                    <Stack component={"form"} direction={"column"} spacing={6} className='contactformsec' onSubmit={handleSubmit} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
                        <Grid container rowSpacing={8} columnSpacing={4}>
                            <Grid size={{xs:12,sm:6}}><TextField type={"text"}  color='secondary' label="Name" variant="standard" helperText={inputhelptext.name} onBlur={(e)=>helptextshow(e,"name")} /></Grid>
                            <Grid size={{xs:12,sm:6}}><TextField type="email"  color='secondary'  label="Email" variant="standard" helperText={inputhelptext.email} onBlur={(e)=>helptextshow(e,"email")} /></Grid>
                            <Grid size={{xs:12,sm:6}}><TextField type={"number"} color='secondary'   label="Phone" variant="standard" helperText={inputhelptext.phone} onBlur={(e)=>{helptextshow(e,"phone")}} /></Grid>
                            <Grid size={ { xs: 12, sm: 6 } }><TextField type={ "Text" } color='secondary' label="Subject" variant="standard" helperText={ inputhelptext.subject } onBlur={(e)=>{helptextshow(e,"subject")}} /></Grid>
                            <Grid size={ 12 }><TextField color='secondary'  label="Message" multiline rows={4} variant="standard" helperText={inputhelptext.message} onBlur={(e)=>{setinputhelptext({...inputhelptext,message:(e.target.value=="" ?"This is a required field":"")})}} /></Grid>
                        </Grid>
                        <ReCAPTCHA sitekey="6LdAk10rAAAAAKeGJg9mnA0wwBNtenRYAlp5da7e" onChange={handleCaptchaChange} />
                        <Stack direction={"row"} className='sendbuttoncon'>
                            <Box className="">
                                <button type='submit'>Send</button>
                            </Box>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid size={{xs:12,md:6}} order={{xs:0,md:1}} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                    <Stack direction="column" spacing={2} className='headsec'>
                        <Typography variant='h5' component={'h2'} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50"><i>Contact with us</i></Typography>
                        <Typography variant='h4' component={'h1'} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">Let us help you build your next app.</Typography>
                        <Typography data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
                            Our team of professionals is committed to delivering exceptional results in
                            software development and technical project management. Share your project
                            details with us so we can create a custom experience that meets your vision.
                        </Typography>
                    </Stack>
                    <br/>
                    <br/>
                    <Stack direction="column" spacing={2} className='contactinfosec'>
                        {contactinfo.map((val,inx)=><Contactinfoitem key={inx} icon={val.icon} title={val.title} contactmethod={val.contactmethod} route={val.route} aosanimation={{"data-aos":"fade-up", "data-aos-duration":"1000", "data-aos-delay":((inx+1)*50)}}/>)}
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
                    <img src={icon} alt={ title } />
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