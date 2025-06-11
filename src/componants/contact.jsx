import React, { useState } from 'react'
import { Box, Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'

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

  return (
    <Box className="contactsec">
        <Container maxWidth="lg">
            <Grid container>
                <Grid size={6}>
                    <Stack component={"form"} direction={"column"} spacing={10} className='contactformsec' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
                        <Grid container rowSpacing={8} columnSpacing={3}>
                            <Grid size={6}><TextField type={"text"}  color='secondary' label="Name" variant="standard" /></Grid>
                            <Grid size={6}><TextField type="email"  color='secondary'  label="Email" variant="standard" /></Grid>
                            <Grid size={6}><TextField type={"numper"} color='secondary'   label="Phone" variant="standard" /></Grid>
                            <Grid size={6}><TextField type={"Text"}  color='secondary'  label="Subject" variant="standard" /></Grid>
                            <Grid size={ 12 }><TextField color='secondary'  label="Message" multiline rows={4} variant="standard" /></Grid>
                        </Grid>
                        <Box>captcha</Box>
                        <Stack direction={"row"} className='sendbuttoncon'>
                            <Box className="">
                                <button>Send</button>
                            </Box>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid size={6}>
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
                        {contactinfo.map((val,inx)=><Contactinfoitem icon={val.icon} title={val.title} contactmethod={val.contactmethod} route={val.route} aosanimation={{"data-aos":"fade-up", "data-aos-duration":"1000", "data-aos-delay":((inx+1)*50)}}/>)}
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
            <Grid size={ 1 }>
                <Box className="iconbox">
                    <img src={icon} alt={ title } />
                </Box>
            </Grid>
            <Grid size={ 11 }>
                <Stack direction={ "column" } spacing={ 1 }>
                    <Typography variant='h6' component={ 'h3' }>{ title}</Typography>
                    <Typography variant='h6' component={ 'h4' }>{ contactmethod}</Typography>
                </Stack>
            </Grid>
        </Grid>
    )
}