//*react
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
//*mui
import { Alert, Box, Button, Container, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
//*gsap
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
//*form
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { initZodMsgs, pattern } from '../../form/assets';
import ReCAPTCHA from "react-google-recaptcha";
import { sitekey } from '../../form/recaptcha';
//*queries
import { useGetOpenJobsQuery, useRequestJobMutation } from '../../redux/server state/openjobs';
//*scripts
import { Language } from '../../languages/languagesContext';


export default function Careers() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
    }), [language, language_isSuccess]);
    
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

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
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
    }), [language, language_isSuccess]);

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
        <Stack direction={'column'} spacing={1} className='careersInfoSection'>
            <Typography ref={careersTitle} variant='h5' component={'h1'} className='careersTitle'{...titleAosAnimation}><i>{defaultContent.title}</i></Typography>
            <Typography ref={ careersSubtitle } variant='h3' component={ 'h2' } className='careersSubtitle'{ ...subtitleAosAnimation }>{defaultContent.subtitle}</Typography>
            <Typography ref={careersDescription} className='careersDescription'{...descriptionAosAnimation}>{defaultContent.description}</Typography>
        </Stack>
    )
}

function FormSection() {console.log("XXX");

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        language: language_isSuccess ? language.page.language : "en",
        zodMsgs: language.zodMsgs,
        form: {
            title: language_isSuccess ? language.careers.form.title : "Upload your CV",
            inputs: {
                name: language_isSuccess ? language.careers.form.inputs.name : "Full name",
                phone: language_isSuccess ? language.careers.form.inputs.phone : "phone number",
                job: language_isSuccess ? language.careers.form.inputs.job : "select the job",
                cvFile: language_isSuccess ? language.careers.form.inputs.cvFile : { title: "choose file", noFile: "No file chosen" }
            },
            alert: {
                success: language_isSuccess ? language.careers.form.alert.success : "Request Sent Successfully.",
                error: language_isSuccess ? language.careers.form.alert.error : "Request Failed.",
                reCaptcha: language_isSuccess ? language.careers.form.alert.reCaptcha : "Please verify that you're not a robot."
            },
            submit: language_isSuccess ? language.careers.form.submit : "Apply now"
        }
    }), [language, language_isSuccess]);

    // const [lastInputChanged, setLastInputChanged] = useState("");
    const lastInputChanged = useRef("");

    const reCaptcha = useRef();
    const reCaptchaToken = useRef();

    const schema = useMemo(() => createZodObject(defaultContent, pattern), [language, language_isSuccess]);

    const { register, handleSubmit, watch, setError, clearErrors, trigger, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

    const inputsSettings = useMemo(() => createInputsSettings(register, lastInputChanged), []);
    
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

    useEffect(() => {
        if (Object.keys(errors).length > 0)
            trigger();
    }, [language, language_isSuccess])
    
    const [requestJob, { isSuccess: requestJob_isSuccess, isError: requestJob_isError, isLoading: requestJob_isLoading }] = useRequestJobMutation();
    
    const onSubmit = (data) => {
        console.log(data.cvFile);
        if (!reCaptchaToken.current) {
            setError("recaptcha", {
                type: "manual",
                message: defaultContent.form.alert.reCaptcha
            });
        } else {
            clearErrors("recaptcha");
            //$send recaptch to php
            data.reCaptchaToken = reCaptchaToken.current
            data.cvFile = data.cvFile[0]
            requestJob(data);
            reCaptcha.current.reset();
            reCaptchaToken.current = undefined;
        }

    };

    return (
        <Stack dir={defaultContent.direction} component={'form'} direction={'column'} spacing={2} className='careersFormSection' onSubmit={handleSubmit(onSubmit)} {...formAosAnimation}>

            <Typography variant='h6' component={ 'h3' } className='careersFormTitle'><i>{ defaultContent.form.title }</i></Typography>

            {(requestJob_isSuccess && !requestJob_isLoading && !errors?.recaptcha) && <Alert variant="filled" severity="success" color='primary'> {defaultContent.form.alert.success} </Alert>}
            {(requestJob_isError && !requestJob_isLoading && !errors?.recaptcha) && <Alert variant="filled" severity="error" color='error'> {defaultContent.form.alert.error} </Alert>}
            { errors?.recaptcha && <Alert variant="filled" color='warning' severity="warning" className='formAlert'>{ errors.recaptcha.message }</Alert> }
            
            <TextField variant="outlined" type='text' color={ errors?.name ? "error" : "primary" } className={ errors?.name ? "inputError" : "" } placeholder={defaultContent.form.inputs.name} { ...inputsSettings.name } />
            
            <TextField variant="outlined" type="number" color={ errors?.phone ? "error" : "primary" } className={ errors?.phone ? "inputError" : "" } placeholder={defaultContent.form.inputs.phone} { ...inputsSettings.phone } />
            
            <SelectInput dir={defaultContent.direction} color={ errors?.job ? "error" : "primary" } className={ errors?.job ? "inputError" : "" } title={defaultContent.form.inputs.job} { ...inputsSettings.job }/>

            <FileInput color={ errors?.cvFile ? "error" : "primary" } title={defaultContent.form.inputs.cvFile.title} noFile={defaultContent.form.inputs.cvFile.noFile} { ...inputsSettings.cvFile } />
            
            <ReCAPTCHA ref={ reCaptcha } key={defaultContent.language} sitekey={ sitekey } onChange={ (token) => { reCaptchaToken.current = token; } } hl={ defaultContent.language } />
            
            <Button loading={requestJob_isLoading} loadingPosition='center' variant='contained' disableRipple type='submit' disabled={ isSubmitting } className='formSubmit'>{ defaultContent.form.submit }</Button>
            
            <Typography className='formErrorMsg'>{ handleLastErrors(lastInputChanged, errors) }</Typography>
            
        </Stack>
    )
}

function SelectInput(props) {

    const { data: openJobs, isSuccess: openJobs_isSuccess } = useGetOpenJobsQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });

    const [job, setJob] = useState("0");

    return (
        <Select variant='outlined' { ...props } defaultValue={ '0' } value={ job } onChange={ (e) => { props.onChange(e); setJob(e.target.value); }}>
            <MenuItem value={"0"}>{props.title}</MenuItem>
            {openJobs_isSuccess && Object.values(openJobs).map((openJob,inx) => <MenuItem key={openJob.id} value={openJob.title}>{openJob.title}</MenuItem>)}
        </Select>
    )
}

function FileInput(props) {

    const [fileName, setFileName] = useState(props.noFile);

    const fileNameChange = (e, setFileName) => {
        if (e.target.files.length > 0) {
            setFileName(e.target.files[0]?.name);
        } else if (e.target.files.length == 0) {
            setFileName(props.noFile);
        }
    }


    return (
        <Box className={ "fileInput " + (props.color=="error"?"fileInputError": "")} >
            <input type="file" id="cvUpload" hidden { ...props } onChange={ (e) => {  props.onChange(e); fileNameChange(e, setFileName); } } />
            <label htmlFor="cvUpload" className='fileInputBody'>
                <div variant='contained' className='fileInputTitle'>{ props.title }</div>
                <Typography component={'span'} className='selectedFileName'>{fileName}</Typography>
            </label>
        </Box>
    )
}

function createZodObject(defaultContent, pattern) {
    
    const required = defaultContent.zodMsgs.required;
    const length = defaultContent.zodMsgs.length;
    const valid = defaultContent.zodMsgs.valid;
    const unknown = defaultContent.zodMsgs.unknown;
    const fileSize = defaultContent.zodMsgs.fileSize;

    const name = defaultContent.form.inputs.name;
    const phone = defaultContent.form.inputs.phone;
    const job = defaultContent.form.inputs.job;
    const email = defaultContent.form.inputs.jop;
    
    return zod.object({
        name: zod.string().nonempty(required).min(3, { message: length.less(name,3) }).max(100, { message: length.more(name,100) }).refine((name) => pattern.name(name), { message: valid(name) }),
        phone: zod.string().min(1, { message: required }).refine((phone) => pattern.phone(phone), { message: valid(phone) }),
        job: zod.string().refine((selectedJob) => selectedJob != "0", { message: required }),
        cvFile: zod.any().refine((files) => files.length > 0, { message: required }).refine((files) => files[0]?.size < (5 * 1024 * 1024), { message: fileSize(5) })
    });
}

const createInputsSettings = (register, lastInputChanged) => ({
    name: register("name", { required: true, onChange: () => { lastInputChanged.current = "name"; } }),
    phone: register("phone", { required: true, onChange: () => { lastInputChanged.current = "phone"; } }),
    job: register("job", { required: true, onChange: () => { lastInputChanged.current = "job"; } }),
    cvFile: register("cvFile", { required: true, onChange: () => { lastInputChanged.current = "cvFile"; } }),
});

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

const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]: "1000"
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
const formAosAnimation={
    ...aosAnimation,
    ["data-aos-delay"]:"250"
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