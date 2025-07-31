//*react
import React, { useContext, useEffect, useMemo, useRef } from 'react';
//*mui
import { Box, Button, InputLabel, Stack, TextField, Alert } from '@mui/material';
//*styles
import "../sass/shared/requestform.scss";
//*scripts
import { Language } from '../languages/languagesContext';
//*queries
import { useRequestQuotationMutation } from '../redux/server state/requestquotation';
//*form
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { pattern, initZodMsgs } from '../form/assets';
import ReCAPTCHA from "react-google-recaptcha";
import { sitekey } from '../form/recaptcha';

export default function RequestQuotationForm({ closeButton }) {
    
    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        language: language_isSuccess ? language.page.language : "en",
        form: {
            title: "",
            inputs: {
                name: language_isSuccess ? language.requestQuotation.form.inputs.name : "Name",
                email: language_isSuccess ? language.requestQuotation.form.inputs.email : "Email",
                phone: language_isSuccess ? language.requestQuotation.form.inputs.phone : "Phone",
                description: language_isSuccess ? language.requestQuotation.form.inputs.description : "Description"
            },
            alert: {
                success: language_isSuccess ? language.requestQuotation.form.alert.success : "Request Sent Successfully.",
                error: language_isSuccess ? language.requestQuotation.form.alert.error : "Request Failed.",
                reCaptcha: language_isSuccess ? language.requestQuotation.form.alert.reCaptcha : "Please verify that you're not a robot."
            },
            submit: language_isSuccess ? language.requestQuotation.form.submit : "Send"
        }
    }), [language, language_isSuccess]);

    const reCaptcha = useRef();
    const reCaptchaToken = useRef();

    const schema = useMemo(() => {
        const zodMsgs = initZodMsgs(language);
        return createZodObject(defaultContent, zodMsgs, pattern);
    }, [language, language_isSuccess]);

    const { register, handleSubmit, watch, setError, clearErrors, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), mode: "onChange" });
    
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
    },[]);

    const [requestQuotation, { isSuccess: requestQuotation_isSuccess, isLoading: requestQuotation_isLoading, isError: requestQuotation_isError }] = useRequestQuotationMutation();

    const onSubmit = (data) => {
        
        if (!reCaptchaToken.current) {
            setError("recaptcha", {
                type: "manual",
                message: defaultContent.form.alert.reCaptcha
            });
        } else {
            clearErrors("recaptcha");
            //$send recaptch to php
            data.reCaptchaToken = reCaptchaToken.current
            requestQuotation(data);
            reCaptcha.current.reset();
            reCaptchaToken.current = undefined;
        }

    };

  return (
      <Box dir={ defaultContent.direction } className='requestForm'>
        <Stack component={"form"} direction="column" spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <button type='button' className='closeForm' onClick={closeButton}>X</button>
            
            {(requestQuotation_isSuccess && !requestQuotation_isLoading && !errors?.recaptcha) && <Alert variant="filled" color='primary' severity="success" className='formAlert'>{defaultContent.form.alert.success}</Alert>}
            {(requestQuotation_isError && !requestQuotation_isLoading && !errors?.recaptcha) && <Alert variant="filled" color='error' severity="error" className='formAlert'>{defaultContent.form.alert.error}</Alert>}
            {errors?.recaptcha && <Alert variant="filled" color='warning' severity="warning" className='formAlert'>{errors.recaptcha.message}</Alert>}
            
            <Box>
                <InputLabel htmlFor="formName" className='inputTitle'>{defaultContent.form.inputs.name} <span className='requiredSymbol'>*</span></InputLabel>  
                <TextField type='text' id='formName' color={errors?.name?"error":"primary"} helperText={errors?.name?.message} {...inputsSettings.name}/>
            </Box>
            
            <Box>
                <InputLabel htmlFor="formEmail" className='inputTitle'>{defaultContent.form.inputs.email} <span  className='requiredSymbol'>*</span></InputLabel>  
                <TextField type='email' id='formEmail' color={errors?.email?"error":"primary"} helperText={errors?.email?.message} {...inputsSettings.email} />
            </Box>
            
            <Box>
                <InputLabel htmlFor="formPhone" className='inputTitle'>{defaultContent.form.inputs.phone} <span  className='requiredSymbol'>*</span></InputLabel>  
                <TextField type='number' id='formPhone' color={errors?.phone?"error":"primary"} helperText={errors?.phone?.message} {...inputsSettings.phone} />
            </Box>
            
            <Box>
                <InputLabel htmlFor="formDescription" className='inputTitle'>{defaultContent.form.inputs.description} <span  className='requiredSymbol'>*</span></InputLabel>  
                <TextField multiline maxRows={6} minRows={2} id='formDescription' color={errors?.description?"error":"primary"} helperText={errors?.description?.message}  {...inputsSettings.description}/> 
            </Box>
        
            <ReCAPTCHA ref={reCaptcha} sitekey={sitekey} onChange={(token) => { reCaptchaToken.current = token; }} hl={defaultContent.language}/>
          
            <Stack direction={'row'} className='sendButtonContainer'>
                <Box>
                    <Button type='submit' loading={requestQuotation_isLoading} loadingPosition={"center"} variant='contained' disableRipple disabled={isSubmitting} className='send'>
                        { defaultContent.form.submit }
                    </Button>
                </Box>
            </Stack>
        </Stack>
    </Box>
  )
}


function createZodObject(defaultContent,zodMsgs,pattern) {
    return zod.object({
        name: zod.string().nonempty(zodMsgs.required).min(3, { message: zodMsgs.length.less(defaultContent.form.inputs.name,3) }).max(100, { message: zodMsgs.length.more(defaultContent.form.inputs.name,100) }).refine((name) => pattern.name(name), { message: zodMsgs.valid(defaultContent.form.inputs.name) }),
        phone: zod.string().min(1, { message: zodMsgs.required }).refine((phone) => pattern.phone(phone), { message: zodMsgs.valid(defaultContent.form.inputs.phone) }),
        email: zod.string().nonempty(zodMsgs.required).email(zodMsgs.valid(defaultContent.form.inputs.email)),
        description: zod.string().nonempty(zodMsgs.required).max(500, { message: zodMsgs.length.more(defaultContent.form.inputs.description,500) })
    });
}

function createInputsSettings(register) { 
    return {
        name: register("name", { required: true }),
        phone: register("phone", { required: true }),
        email: register("email", { required: true }),
        description: register("description", { required: true }),
    }
}