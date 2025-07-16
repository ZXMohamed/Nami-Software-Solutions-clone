import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Button, Container, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ReCAPTCHA from "react-google-recaptcha";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { useGetOpenJobsQuery } from '../redux/server state/openjobs';
import { pattern, zodMsgs } from '../form/assets';
import { sitekey } from '../form/recaptcha';
import { Language } from '../languages/languagesContext';


export default function Careers() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
    }
    
  return (
    <Box dir={defaultContent.direction} className='careersSection'>
        <Container disableGutters>    
            <Grid container>
                <Grid size={{xs:12,md:8}}>
                    <InfoSection/>
                </Grid>
                <Grid size={{xs:12,md:4}} className="careersFormContainer">
                   <FormSection/>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}

function InfoSection() {

    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
        title: language_isSuccess ? language.careers.title : "Careers",
        subtitle: language_isSuccess ? language.careers.subtitle : "Build your future with our company",
        description: language_isSuccess ? language.careers.description : "At our company, we strive to create an environment focused on learning and striving to achieve a person's fullest potential. We got itWe maintain a prominent presence in the industry thanks to our continuous efforts, and we invite you to be part of the story of our continuous development.",
        form: {
            title: "Upload your CV",
            inputs: {
                name: "Full name",
                phone: "phone number",
                job: "select the job",
                cvFile: "choose file"
            },
            submit: "Apply now"
        }
    }

    const careersTitle = useRef();
    const careersSubtitle = useRef();
    const careersDescription = useRef();

    useEffect(() => {
        requestIdleCallback(() => {
            titleWordsUp(careersTitle);
            subtitleWordsUp(careersSubtitle);
            descriptionWordsUp(careersDescription);
        })
    }, []);

    return (
        <Stack direction={'column'} spacing={1} className='infoSection'>
            <Typography ref={careersTitle} variant='h5' component={'h1'} className='careersTitle' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50"><i>{defaultContent.title}</i></Typography>
            <Typography ref={careersSubtitle} variant='h3' component={'h2'} className='careersSubtitle' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">{defaultContent.subtitle}</Typography>
            <Typography ref={careersDescription} className='careersDescription' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">{defaultContent.description}</Typography>
        </Stack>
    )
}

const schema = zod.object({
    name: zod.string().nonempty(zodMsgs.required).min(3, { message: zodMsgs.length.less("name",3) }).max(100, { message: zodMsgs.length.more("name",100) }).refine((name) => pattern.name(name), { message: zodMsgs.valid("name") }),
    phone: zod.string().min(1, { message: zodMsgs.required }).refine((phone) => pattern.phone(phone), { message: zodMsgs.valid("number") }),
    job: zod.string().refine((selectedJob) => selectedJob != "0", { message: zodMsgs.required }),
    cvFile: zod.any().refine((files) => files.length > 0, { message: zodMsgs.required }).refine((files) => files[0]?.size < (5 * 1024 * 1024), { message: zodMsgs.fileSize(5) })
});

function FormSection() {

    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
        form: {
            title: language_isSuccess ? language.careers.form.title : "Upload your CV",
            inputs: {
                name: language_isSuccess ? language.careers.form.inputs.name : "Full name",
                phone: language_isSuccess ? language.careers.form.inputs.phone : "phone number",
                job: language_isSuccess ? language.careers.form.inputs.job : "select the job",
                cvFile: language_isSuccess ? language.careers.form.inputs.cvFile : { title: "choose file", noFile: "No file chosen" }
            },
            submit: language_isSuccess ? language.careers.form.submit : "Apply now"
        }
    }

    const [lastInputChanged, setLastInputChanged] = useState("");

    const [captchaToken, setCaptchaToken] = useState(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({resolver:zodResolver(schema),mode:"onChange"});

    const inputsSettings = {
        name: register("name", { required: true, onChange: () => { setLastInputChanged("name"); }}),
        phone: register("phone", { required: true, onChange: () => { setLastInputChanged("phone"); }}),
        job: register("job", { required: true, onChange: () => { setLastInputChanged("job"); }}),
        cvFile: register("cvFile", { required: true, onChange: () => { setLastInputChanged("cvFile"); }}),
    }
    
    const handleLastErrors = (lastInputChanged, errors) => {
        
        let errorInputs = Object.keys(errors);

        let lastErrorInput = errorInputs[errorInputs.length - 1];
        
        if (errors?.[lastInputChanged]) {
            
            return errors?.[lastInputChanged]?.message;
        
        } else if (errorInputs.length != 0) {
        
            return errors[lastErrorInput].message;
        
        } else { 

            return "";
        
        }
        
    };
    
    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
        // console.log("Captcha token:", token);
    };

    const onSubmit = (data) => {
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
        <Stack dir={defaultContent.direction} component={'form'} direction={'column'} spacing={2} className='careersFormSection' onSubmit={handleSubmit(onSubmit)} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250">
            
            <Typography variant='h6' component={ 'h3' } className='careersFormTitle'><i>{ defaultContent.form.title }</i></Typography>
            
            <TextField variant="outlined" type='text' color={ errors?.name ? "error" : "primary" } className={ errors?.name ? "inputError" : "" } placeholder={defaultContent.form.inputs.name} { ...inputsSettings.name } />
            
            <TextField variant="outlined" type="number" color={ errors?.phone ? "error" : "primary" } className={ errors?.phone ? "inputError" : "" } placeholder={defaultContent.form.inputs.phone} { ...inputsSettings.phone } />
            
            <SelectInput dir={defaultContent.direction} color={ errors?.job ? "error" : "primary" } className={ errors?.job ? "inputError" : "" } title={defaultContent.form.inputs.job} { ...inputsSettings.job }/>

            <FileInput color={ errors?.cvFile ? "error" : "primary" } title={defaultContent.form.inputs.cvFile.title} noFile={defaultContent.form.inputs.cvFile.noFile} { ...inputsSettings.cvFile } />
            
            <ReCAPTCHA sitekey={ sitekey } onChange={ handleCaptchaChange } />
            
            <Button variant='contained' disableRipple type='submit' disabled={ isSubmitting } className='formSubmit'>{ defaultContent.form.submit }</Button>
            
            <Typography className='formErrorMsg'>{ handleLastErrors(lastInputChanged, errors) }</Typography>
            
        </Stack>
    )
}

function SelectInput(props) {
    const { data: openJobs, isSuccess: openJobs_isSuccess } = useGetOpenJobsQuery();

    // const [job, setJob] = useState("0");

    return (
        <Select variant='outlined' { ...props } defaultValue={ '0' } onChange={ (selectedItem,e) => { props.onChange();  e.target.value = selectedItem; /*setJob(selectedItem.target.value);*/}}>
            <MenuItem value={"0"}>{props.title}</MenuItem>
            {openJobs_isSuccess && Object.values(openJobs).map((openJob,inx) => <MenuItem key={openJob.id} value={openJob.title}>{openJob.title}</MenuItem>)}
        </Select>
    )
}

function FileInput(props) {

    const fileName = useRef();

    const open = (e, fileNameTarget) => {
        fileNameTarget.current.textContent = e.target.files[0]?.name || "No file chosen";
    }

    return (
        <Box className={ "fileInput " + (props.color=="error"?"fileInputError": "")} >
            <input type="file" id="cvUpload" hidden { ...props } onChange={ (e) => {  props.onChange(e); open(e, fileName); } } />
            <label htmlFor="cvUpload" className='fileInputBody'>
                <div variant='contained' className='fileInputTitle'>{ props.title }</div>
                <Typography ref={fileName} component={'span'} className='selectedFileName'>{props.noFile}</Typography>
            </label>
        </Box>
    )
}

function titleWordsUp(careersTitle) {
    const careersTitleSplit = new SplitText(careersTitle.current, {
        type: "words"
    });
    gsap.to(careersTitleSplit.words, {
            scrollTrigger: {
                trigger: careersTitle.current,
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
function subtitleWordsUp(careersSubtitle) {
    const careersSubtitleSplit = new SplitText(careersSubtitle.current, {
        type: "words"
    });
    gsap.to(careersSubtitleSplit.words, {
            scrollTrigger: {
                trigger: careersSubtitle.current,
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
function descriptionWordsUp(careersDescription) {
    const careersDescriptionSplit = new SplitText(careersDescription.current, {
        type: "words"
    });
    
    gsap.to(careersDescriptionSplit.words, {
            scrollTrigger: {
                trigger: careersDescription.current,
                // scrub: 1,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:0.5,
            y: 0,
            opacity:1,
            stagger: 0.01,
        }
    );
}