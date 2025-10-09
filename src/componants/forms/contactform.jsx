//*react
import React, { useContext, useEffect, useMemo, useRef } from 'react'
//*mui
import { Alert, Box, Button, Grid, Stack, TextField } from '@mui/material'
//*hooks
import { useContent } from '../../languages/hooks/usecontent';
//*form
import { zodResolver } from "@hookform/resolvers/zod";
import { pattern } from '../../form/util/rules';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";
import { sitekey } from '../../form/recaptcha';
import { createZodObject } from '../../form/schema/contactform';
import { createInputsSettings } from '../../form/settings/contactform';
//*queries
import { useContactMutation } from '../../redux/server state/contact';
//*scripts
import { defaultLanguage } from '../../languages/languagesContext';
//*animation
import { formAosAnimation } from '../../animation/contactform';


export function FormSection() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                zodMsgs: content.zodMsgs,
                form: {
                    title: content.contact.form.title,
                    inputs: {
                        name: content.contact.form.inputs.name,
                        email: content.contact.form.inputs.email,
                        phone: content.contact.form.inputs.phone,
                        subject: content.contact.form.inputs.subject,
                        message: content.contact.form.inputs.message
                    },
                    alert: {
                        success: content.contact.form.alert.success,
                        error: content.contact.form.alert.error,
                        reCaptcha: content.requestQuotation.form.alert.reCaptcha
                    },
                    submit: content.contact.form.submit
                }
            }
        } else {
            return { ...firstContent, zodMsgs: content.zodMsgs };
        }
    })();
    
    const reCaptcha = useRef();
    const reCaptchaToken = useRef();
    
    const schema = useMemo(() => createZodObject(defaultContent, pattern), [content, content_isSuccess]);
    
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
    }, [content, content_isSuccess])
    
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
            
            {(contact_isSuccess && !contact_isLoading && !errors?.recaptcha) && <Alert variant="filled" color='primary' severity="success" className='formAlert'>{ defaultContent.form.alert.success }</Alert> }

            <Grid container rowSpacing={ 5 } columnSpacing={ 4 }>
                
                <Grid size={ { xs: 12, sm: 6 } }><TextField type={ "text" } color='secondary' label={defaultContent.form.inputs.name} variant="standard" helperText={ errors?.name?.message } { ...inputsSettings.name } /></Grid>
                
                <Grid size={ { xs: 12, sm: 6 } }><TextField type="email" color='secondary' label={defaultContent.form.inputs.email} variant="standard" helperText={ errors?.email?.message } { ...inputsSettings.email } /></Grid>
                
                <Grid size={ { xs: 12, sm: 6 } }><TextField type={ "number" } color='secondary' label={defaultContent.form.inputs.phone} variant="standard" helperText={ errors?.phone?.message } { ...inputsSettings.phone } /></Grid>
                
                <Grid size={ { xs: 12, sm: 6 } }><TextField type={ "Text" } color='secondary' label={defaultContent.form.inputs.subject} variant="standard" helperText={ errors?.subject?.message } { ...inputsSettings.subject } /></Grid>
                
                <Grid size={ 12 }><TextField color='secondary' label={defaultContent.form.inputs.message} multiline rows={ 4 } variant="standard" helperText={ errors?.message?.message } { ...inputsSettings.message } /></Grid>
            
            </Grid>
            
            <ReCAPTCHA ref={reCaptcha} key={defaultContent.language} sitekey={ sitekey } onChange={ (token) => { reCaptchaToken.current = token; } } hl={ defaultContent.language } />
            
            {(contact_isError && !contact_isLoading && !errors?.recaptcha) && <Alert variant="filled" color='error' severity="error" className='formAlert'>{defaultContent.form.alert.error}</Alert>}
            { errors?.recaptcha && <Alert variant="filled" color='warning' severity="warning" className='formAlert'>{ errors.recaptcha.message }</Alert> }
            
            <Stack direction={ "row" } className='contactFormSubmitContainer'>
                <Box className="contactFormSubmitBorder">
                    <Button loading={contact_isLoading} loadingPosition='center' variant='contained' disableRipple type='submit' disabled={isSubmitting} className='contactFormSubmit'>{defaultContent.form.submit}</Button>
                </Box>
            </Stack>
        
        </Stack>
    )
}

const firstContent = {
    direction: "ltr",
    language: defaultLanguage,
    form: {
        title: "",
        inputs: {
            name: "name",
            email: "email",
            phone: "phone",
            subject: "subject",
            message: "message"
        },
        alert: {
            success: "Request Sent Successfully.",
            error: "Request Failed.",
            reCaptcha: "Please verify that you're not a robot."
        },
        submit: "Send"
    }
}