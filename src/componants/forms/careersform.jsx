//*react
import React, { useEffect, useMemo, useRef } from 'react'
//*mui
import { Alert, Button, Stack, TextField, Typography } from '@mui/material'
//*hooks
import { useContent } from '../../languages/hooks/usecontent';
//*components
import SelectInput from '../shared/SelectInput';
import FileInput from '../shared/fileinput';
//*form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { pattern } from '../../form/util/rules';
import ReCAPTCHA from "react-google-recaptcha";
import { sitekey } from '../../form/recaptcha';
import { createZodObject } from '../../form/schema/careersform';
import { createInputsSettings } from '../../form/settings/careersform';
//*queries
import { useRequestJobMutation } from '../../redux/server state/openjobs';
//*scripts
import { defaultLanguage } from '../../languages/languagesContext';
//*animation
import { formAosAnimation } from '../../animation/careersform';


export function FormSection() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                zodMsgs: content.zodMsgs,
                form: {
                    title: content.careers.form.title,
                    inputs: {
                        name: content.careers.form.inputs.name,
                        phone: content.careers.form.inputs.phone,
                        job: content.careers.form.inputs.job,
                        cvFile: content.careers.form.inputs.cvFile
                    },
                    alert: {
                        success: content.careers.form.alert.success,
                        error: content.careers.form.alert.error,
                        reCaptcha: content.careers.form.alert.reCaptcha
                    },
                    submit: content.careers.form.submit
                }
            }
        } else {
            return { ...firstContent, zodMsgs: content.zodMsgs };
        }
    })();

    const lastInputChanged = useRef("");

    const reCaptcha = useRef();
    const reCaptchaToken = useRef();

    const schema = useMemo(() => createZodObject(defaultContent, pattern), [content, content_isSuccess]);

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
    }, [content, content_isSuccess])
    
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

            <FileInput color={ errors?.cvFile ? "error" : "primary" } title={defaultContent.form.inputs.cvFile.title} no_file={defaultContent.form.inputs.cvFile.noFile} { ...inputsSettings.cvFile } />
            
            <ReCAPTCHA ref={ reCaptcha } key={defaultContent.language} sitekey={ sitekey } onChange={ (token) => { reCaptchaToken.current = token; } } hl={ defaultContent.language } />
            
            <Button loading={requestJob_isLoading} loadingPosition='center' variant='contained' disableRipple type='submit' disabled={ isSubmitting } className='formSubmit'>{ defaultContent.form.submit }</Button>
            
            <Typography className='formErrorMsg'>{ handleLastErrors(lastInputChanged, errors) }</Typography>
            
        </Stack>
    )
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

const firstContent = {
    direction: "ltr",
    language: defaultLanguage,
    form: {
        title: "Upload your CV",
        inputs: {
            name: "Full name",
            phone: "phone number",
            job: "select the job",
            cvFile: { title: "choose file", noFile: "No file chosen" }
        },
        alert: {
            success: "Request Sent Successfully.",
            error: "Request Failed.",
            reCaptcha: "Please verify that you're not a robot."
        },
        submit: "Apply now"
    }
}