//*react
import React, { useContext, useEffect, useMemo, useRef } from 'react'
//*mui
import { Alert, Box, Button, Grid, Stack, TextField } from '@mui/material'
//*form
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { pattern, initZodMsgs } from '../../form/assets';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";
import { sitekey } from '../../form/recaptcha';
//*queries
import { useContactMutation } from '../../redux/server state/contact';
//*scripts
import { Language } from '../../languages/languagesContext';


export function FormSection() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        language: language_isSuccess ? language.page.language : "en",
        form: {
            title: language_isSuccess ? language.contact.form.title : "",
            inputs: {
                name: language_isSuccess ? language.contact.form.inputs.name : "name",
                email: language_isSuccess ? language.contact.form.inputs.email : "email",
                phone: language_isSuccess ? language.contact.form.inputs.phone : "phone",
                subject: language_isSuccess ? language.contact.form.inputs.subject : "subject",
                message: language_isSuccess ? language.contact.form.inputs.message : "message"
            },
            alert: {
                success: language_isSuccess ? language.contact.form.alert.success : "Request Sent Successfully.",
                error: language_isSuccess ? language.contact.form.alert.error : "Request Failed.",
                reCaptcha: language_isSuccess ? language.requestQuotation.form.alert.reCaptcha : "Please verify that you're not a robot."
            },
            submit: language_isSuccess ? language.contact.form.submit : "Send"
        }
    }), [language, language_isSuccess]);

    
    // const [captchaToken, setCaptchaToken] = useState(null);
    const reCaptcha = useRef();
    const reCaptchaToken = useRef();
    
    const schema = useMemo(() => {
        const zodMsgs = initZodMsgs(language);
        return createZodObject(defaultContent, zodMsgs, pattern);
    }, [language, language_isSuccess]);
    
    const { register, handleSubmit, watch, setError, clearErrors, trigger, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), mode: "onChange" });
    
    const inputsSettings = useMemo(() => createInputsSettings(register), []);

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
    
    const [contact, { isSuccess: contact_isSuccess, isLoading: contact_isLoading, isError: contact_isError }] = useContactMutation();

    const onsubmit = (data) => {
        if (!reCaptchaToken.current) {
            setError("recaptcha", {
                type: "manual",
                message: defaultContent.form.alert.reCaptcha
            });
        } else {
            clearErrors("recaptcha");
            //$send recaptch to php
            data.reCaptchaToken = reCaptchaToken.current
            contact(data);
            reCaptcha.current.reset();
            reCaptchaToken.current = undefined;
        }

    };

    return (
        <Stack dir={defaultContent.direction} component={"form"} direction={"column"} spacing={6} className='contactFormSection' onSubmit={handleSubmit(onsubmit)} {...formAosAnimation}>
            
            {(contact_isSuccess && !contact_isLoading) && <Alert variant="filled" color='primary' severity="success" className='formAlert'>{ defaultContent.form.alert.success }</Alert> }

            <Grid container rowSpacing={ 5 } columnSpacing={ 4 }>
                
                <Grid size={ { xs: 12, sm: 6 } }><TextField type={ "text" } color='secondary' label={defaultContent.form.inputs.name} variant="standard" helperText={ errors?.name?.message } { ...inputsSettings.name } /></Grid>
                
                <Grid size={ { xs: 12, sm: 6 } }><TextField type="email" color='secondary' label={defaultContent.form.inputs.email} variant="standard" helperText={ errors?.email?.message } { ...inputsSettings.email } /></Grid>
                
                <Grid size={ { xs: 12, sm: 6 } }><TextField type={ "number" } color='secondary' label={defaultContent.form.inputs.phone} variant="standard" helperText={ errors?.phone?.message } { ...inputsSettings.phone } /></Grid>
                
                <Grid size={ { xs: 12, sm: 6 } }><TextField type={ "Text" } color='secondary' label={defaultContent.form.inputs.subject} variant="standard" helperText={ errors?.subject?.message } { ...inputsSettings.subject } /></Grid>
                
                <Grid size={ 12 }><TextField color='secondary' label={defaultContent.form.inputs.message} multiline rows={ 4 } variant="standard" helperText={ errors?.message?.message } { ...inputsSettings.message } /></Grid>
            
            </Grid>
            
            <ReCAPTCHA ref={reCaptcha} key={defaultContent.language} sitekey={ sitekey } onChange={ (token) => { reCaptchaToken.current = token; } } hl={ defaultContent.language } />
            
            {(contact_isError && !contact_isLoading) && <Alert variant="filled" color='error' severity="error" className='formAlert'>{defaultContent.form.alert.error}</Alert>}
            { errors?.recaptcha && <Alert variant="filled" color='warning' severity="warning" className='formAlert'>{ errors.recaptcha.message }</Alert> }
            
            <Stack direction={ "row" } className='contactFormSubmitContainer'>
                <Box className="contactFormSubmitBorder">
                    <Button loading={contact_isLoading} loadingPosition='center' variant='contained' disableRipple type='submit' disabled={isSubmitting} className='contactFormSubmit'>{defaultContent.form.submit}</Button>
                </Box>
            </Stack>
        
        </Stack>
    )
}

function createZodObject(defaultContent,zodMsgs,pattern) {
    return zod.object({
        name: zod.string().nonempty(zodMsgs.required).min(3, { message: zodMsgs.length.less(defaultContent.form.inputs.name,3) }).max(100, { message: zodMsgs.length.more(defaultContent.form.inputs.name,100) }).refine((name) => pattern.name(name), { message: zodMsgs.valid(defaultContent.form.inputs.name) }),
        subject: zod.string().nonempty(zodMsgs.required).min(3, { message: zodMsgs.length.less(defaultContent.form.inputs.subject,3) }).max(100, { message: zodMsgs.length.more(defaultContent.form.inputs.subject,100) }),
        message: zod.string().nonempty(zodMsgs.required).max(500, { message: zodMsgs.length.more(defaultContent.form.inputs.message,500) }),
        phone: zod.string().min(1, { message: zodMsgs.required }).refine((phone) => pattern.phone(phone), { message: zodMsgs.valid(defaultContent.form.inputs.number) }),
        email: zod.string().nonempty(zodMsgs.required).email(zodMsgs.valid)
    });
}

const createInputsSettings = (register) => ({
    name: register("name", { required: true }),
    subject: register("subject", { required: true }),
    phone: register("phone", { required: true }),
    email: register("email", { required: true }),
    message: register("message", { required: true }),
});

const aosAnimation = {
    ["data-aos"]:"fade-up",
    ["data-aos-duration"]:"1000"
}
const formAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]:"150"
}

