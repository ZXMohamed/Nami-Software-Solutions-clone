import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Container, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReCAPTCHA from "react-google-recaptcha";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';

export default function Careers() {

    const [openposition, setopenposition] = useState(["PHP Developer"]);
    const [job, setjob] = useState("0");

    const [lastinputchanged, setlastinputchanged] = useState("");

    const [captchaToken, setCaptchaToken] = useState(null);

    const regex = {
        name:(name)=>name.match(/^[A-Za-z]+([ '-][A-Za-z]+)*$/),
        phone:(phone)=>phone.match(/^\+?[0-9]{1,4}[-\s.]?(\(?\d{2,4}\)?[-\s.]?)?\d{3,4}[-\s.]?\d{4}$/) || phone.match(/^01[0125][0-9]{8}$/) || phone.match(/^\d{10,15}$/),
        email:()=>"",
    }

    const zodmsgs = {
        required: "This is a required field",
        length: { less: (input,num)=>`${input} less than ${num} chars`, more: (input,num)=>`${input} more than ${num} chars` },
        valid: (input) => `this ${input} is not valid`,
        unknow: (input)=>`unknow ${input}`,
        filesize: (size)=>`file is bigger than ${size}MB`
    }

    const schema = zod.object({
        name: zod.string().nonempty(zodmsgs.required).min(3, { message: zodmsgs.length.less("name",3) }).max(100, { message: zodmsgs.length.more("name",100) }).refine((name) => regex.name(name), { message: zodmsgs.valid("name") }),
        phone: zod.string().min(1, { message: zodmsgs.required }).refine((phone) => regex.phone(phone), { message: zodmsgs.valid("number") }),
        job: zod.string().refine((selectedjob) => selectedjob != "0", { message: zodmsgs.required }).refine((selectedjob) => openposition.includes(selectedjob), { message: zodmsgs.unknow("job") }),
        cvfile: zod.any().refine((files) => files.length > 0, { message: zodmsgs.required }).refine((files) => files[0]?.size < (5 * 1024 * 1024), { message: zodmsgs.filesize(5) })
    });

    const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm({resolver:zodResolver(schema),mode:"onChange"});

    const headertitle = useRef();
    const headersubtitle = useRef();
    const careersparagraph = useRef();

    gsap.registerPlugin(SplitText, ScrollTrigger);
    
    useEffect(() => {
        const headertitlesplit = new SplitText(headertitle.current, {
            type: "words"
        });
        const headersubtitlesplit = new SplitText(headersubtitle.current, {
            type: "words"
        });
        const careerparagraphsplit = new SplitText(careersparagraph.current, {
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

        gsap.to(careerparagraphsplit.words, {
            scrollTrigger: {
                trigger: careersparagraph.current,
                // scrub: 1,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:0.5,
            y: 0,
            opacity:1,
            stagger: 0.01,
        });
    }, []);
    
    const inputssettings = {
        name: register("name", { required: true, onChange: () => { setlastinputchanged("name"); }}),
        phone: register("phone", { required: true, onChange: () => { setlastinputchanged("phone"); }}),
        job: register("job", { required: true, onChange: (selected) => { setjob(selected.target.value); setlastinputchanged("job"); }}),
        cvfile: register("cvfile", { required: true, onChange: () => { setlastinputchanged("cvfile"); }}),
    }

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
        console.log("Captcha token:", token);
    };

    const handlelasterrors = (lastinputchanged) => {        
        
        let errorinputs = Object.keys(errors);
        let lasterrorinput = errorinputs[errorinputs.length - 1];
        
        if (errors?.[lastinputchanged]) {

            return errors?.[lastinputchanged]?.message;
        
        } else if (errorinputs.length != 0) {
        
            return errors[lasterrorinput].message;
        
        } else { 
            return "";
        }
        
    };

    const onsubmit = (data) => {
        if (!captchaToken) {
            // alert("Please complete the CAPTCHA.");
            return;
        } else {
            //$send recaptch to php
            console.log(data);
            // Proceed with form submission logic (e.g. send data to backend)
            console.log("Form submitted with CAPTCHA:", captchaToken);
        }

    };

  return (
    <Box className='careerssec'>
        <Container>    
            <Grid container>
                <Grid size={{xs:12,md:7}}>
                    <Stack direction={'column'} spacing={1} className='headersec'>
                        <Typography ref={headertitle} variant='h5' component={'h2'} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50"><i>Careers</i></Typography>
                        <Typography ref={headersubtitle} variant='h3' component={'h1'} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">Build your future with our company</Typography>
                        <Typography ref={careersparagraph} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
                            At our company, we strive to create an environment focused on learning and striving to achieve
                            a person's fullest potential. We got itWe maintain a prominent presence in the industry thanks to
                            our continuous efforts, and we invite you to be part of the story of our continuous development.
                        </Typography>
                    </Stack>
                </Grid>
                <Grid size={{xs:12,md:5}}>
                    <Stack component={'form'} direction={'column'} spacing={2} className='formsec' onSubmit={handleSubmit(onsubmit)} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250">
                        <Typography variant='h6' component={'h3'}><i>Upload your CV</i></Typography>
                        <TextField variant="outlined" type='text' color={errors?.name?"error":"primary"} className={errors?.name?"inputerror":""} placeholder='Full name' {...inputssettings.name} />
                        <TextField variant="outlined" type="number"color={errors?.phone?"error":"primary"} className={errors?.phone?"inputerror":""} placeholder='Phone number' {...inputssettings.phone} />
                        <Select variant='outlined'  color={errors?.job?"error":"primary"} className={errors?.job?"inputerror":""} { ...inputssettings.job} value={job}>
                            <MenuItem value={"0"}>Select the job</MenuItem>
                              { openposition.map((val,inx) => <MenuItem key={inx} value={val}>{val}</MenuItem>)}
                        </Select>
                        <Fileinput color={errors?.cvfile?"error":"primary"} { ...inputssettings.cvfile} />
                        <ReCAPTCHA sitekey="6LdAk10rAAAAAKeGJg9mnA0wwBNtenRYAlp5da7e" onChange={handleCaptchaChange}/>
                        <Button variant='contained' disableRipple type='submit' disabled={isSubmitting}>Apply now</Button>
                        <Typography>{handlelasterrors(lastinputchanged)}</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}



function Fileinput(props) {

    const filename = useRef();

    const open = (e, shownametarget) => {
        shownametarget.current.textContent = e.target.files[0]?.name || "No file chosen";
    }
    return (
        <Box className={ "fileinput " + (props.color=="error"?"fileinputerror": "")} >
            <input type="file" id="cvupload" hidden { ...props } onChange={ (e) => {  props.onChange(e); open(e, filename); } } />
            <label htmlFor="cvupload">
                <div variant='contained'>Choose File</div>
                <Typography ref={filename} component={'span'}>No file chosen</Typography>
            </label>
        </Box>
    )
}