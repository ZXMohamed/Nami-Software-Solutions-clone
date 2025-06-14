import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Container, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReCAPTCHA from "react-google-recaptcha";

export default function Careers() {

    const [openposition, setopenposition] = useState(["PHP Developer"]);
    const [job, setjob] = useState("0");

    const [helptext, sethelptext] = useState("");

    const [captchaToken, setCaptchaToken] = useState(null);

    const careerspragraph = useRef();

    gsap.registerPlugin(SplitText, ScrollTrigger);
    
    useEffect(() => {
        const servicespragraphsplit = new SplitText(careerspragraph.current, {
            type: "words"
        });

        gsap.to(servicespragraphsplit.words, {
            scrollTrigger: {
                trigger: careerspragraph.current,
                scrub: 1,
                start: "top+=0 bottom",
                end: "top+=50 bottom",
            },
            duration:1,
            y: 0,
            opacity:1,
            stagger: 0.05,
        });
    },[]);

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

    const showhelptext = (e)=> { 
        sethelptext(e.target.value == "" || e.target.value == "0" || e.target.files[0].name == undefined ? "This is a required field" : "");
    }

  return (
    <Box className='careerssec'>
        <Container>    
            <Grid container>
                <Grid size={{xs:12,md:7}}>
                    <Stack direction={'column'} spacing={1} className='headersec'>
                        <Typography variant='h5' component={'h2'} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50"><i>Careers</i></Typography>
                        <Typography variant='h3' component={'h1'} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">Build your future with our company</Typography>
                        <Typography ref={careerspragraph} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
                            At our company, we strive to create an environment focused on learning and striving to achieve
                            a person's fullest potential. We got itWe maintain a prominent presence in the industry thanks to
                            our continuous efforts, and we invite you to be part of the story of our continuous development.
                        </Typography>
                    </Stack>
                </Grid>
                <Grid size={{xs:12,md:5}}>
                    <Stack component={'form'} direction={'column'} spacing={2} className='formsec' onSubmit={handleSubmit} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250">
                        <Typography variant='h6' component={'h3'}><i>Upload your CV</i></Typography>
                        <TextField variant="outlined" type='text' placeholder='Full name' onBlur={showhelptext} onChange={showhelptext}/>
                        <TextField variant="outlined" type="number" placeholder='Phone number' onBlur={showhelptext} onChange={showhelptext}/>
                        <Select variant='outlined' value={job} onChange={(selected)=>{setjob(selected.target.value);}} onBlur={showhelptext}>
                            <MenuItem value={"0"}>Select the job</MenuItem>
                              { openposition.map((val,inx) => <MenuItem key={inx} value={val}>{val}</MenuItem>)}
                        </Select>
                        <Fileinput onFocus={showhelptext} onBlur={showhelptext}/>
                        <ReCAPTCHA sitekey="6LdAk10rAAAAAKeGJg9mnA0wwBNtenRYAlp5da7e" onChange={handleCaptchaChange}/>
                        <Button variant='contained' disableRipple type='submit'>Apply now</Button>
                        <Typography>{helptext}</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}



function Fileinput(props) { 

    const filename = useRef();

    const open = (e,shownametarget) => { 
        shownametarget.current.textContent = e.target.files[0]?.name || "No file chosen";
    }
    return (
        <Box className="fileinput">
            <input type="file" id="cvupload" hidden { ...props } onChange={(e)=>open(e,filename)}/>
            <label htmlFor="cvupload">
                <div variant='contained'>Choose File</div>
                <Typography ref={filename} component={'span'}>No file chosen</Typography>
            </label>
        </Box>
    )
}