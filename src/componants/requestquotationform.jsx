import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, Button, InputLabel, Stack, TextField, Alert } from '@mui/material';
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";
import { pattern, zodMsgs } from '../form/assets';
import { sitekey } from '../form/recaptcha';

import "../sass/shared/requestform.scss";
import { Language } from '../languages/languagesContext';
import { useRequestQuotationMutation } from '../redux/server state/requestquotation';

const schema = zod.object({
    name: zod.string().nonempty(zodMsgs.required).min(3, { message: zodMsgs.length.less("name",3) }).max(100, { message: zodMsgs.length.more("name",100) }).refine((name) => pattern.name(name), { message: zodMsgs.valid("name") }),
    phone: zod.string().min(1, { message: zodMsgs.required }).refine((phone) => pattern.phone(phone), { message: zodMsgs.valid("number") }),
    email: zod.string().nonempty(zodMsgs.required).email(zodMsgs.valid("email")),
    description: zod.string().nonempty(zodMsgs.required).max(500, { message: zodMsgs.length.more("name",100) })
});

export default function RequestQuotationForm({ closeButton }) {

    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
        language: language_isSuccess ? language.page.language : "en",
        form:{
            title:"",
            inputs:{
                name:language_isSuccess ? language.requestQuotation.form.inputs.name: "Name",
                email:language_isSuccess ? language.requestQuotation.form.inputs.email : "Email",
                phone:language_isSuccess ? language.requestQuotation.form.inputs.phone : "Phone",
                description:language_isSuccess ? language.requestQuotation.form.inputs.description : "Description"
            },
            alert: {
                success:language_isSuccess ? language.requestQuotation.form.alert.success:"Request Sent Successfully.",
                error:language_isSuccess ? language.requestQuotation.form.alert.error:"Request Failed.",
            },
            submit:language_isSuccess ? language.requestQuotation.form.submit : "Send"
        }
    }

    //const [captchaToken, setCaptchaToken] = useState(null);

    const reCaptcha = useRef();
    const reCaptchaToken = useRef();

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

    const inputsSettings = {
        name: register("name", { required: true}),
        phone: register("phone", { required: true}),
        email: register("email", { required: true}),
        description: register("description", { required: true}),
    }

    const handleCaptchaChange = (token) => {
        reCaptchaToken.current = token;
    };

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
            // alert("Please complete the CAPTCHA.");
            // return;
        } else {
            //$send recaptch to php
            data.reCaptchaToken = reCaptchaToken.current
            requestQuotation(data);
            reCaptcha.current.reset();
            reCaptchaToken.current = undefined;
            //Proceed with form submission logic (e.g. send data to backend);
            //console.log("Form submitted with CAPTCHA:", reCaptchaToken.current);
        }

    };

  return (
      <Box dir={ defaultContent.direction } className='requestForm'>
        <Stack component={"form"} direction="column" spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <button type='button' className='closeForm' onClick={closeButton}>X</button>
            
            {(requestQuotation_isSuccess && !requestQuotation_isLoading) && <Alert variant="filled" color='primary' severity="success" className='formAlert'>{defaultContent.form.alert.success}</Alert>}
            {(requestQuotation_isError && !requestQuotation_isLoading) && <Alert variant="filled" color='error' severity="error" className='formAlert'>{defaultContent.form.alert.error}</Alert>}
            
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
        
            <ReCAPTCHA ref={reCaptcha} sitekey={sitekey} onChange={handleCaptchaChange} hl={defaultContent.language}/>
          
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
