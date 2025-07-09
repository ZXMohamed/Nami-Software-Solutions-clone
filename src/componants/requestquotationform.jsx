import React, { useState } from 'react';
import { Box, Button, InputLabel, Stack, TextField } from '@mui/material';
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";
import { pattern, zodMsgs } from '../form/assets';
import { sitekey } from '../form/recaptcha';

const schema = zod.object({
    name: zod.string().nonempty(zodMsgs.required).min(3, { message: zodMsgs.length.less("name",3) }).max(100, { message: zodMsgs.length.more("name",100) }).refine((name) => pattern.name(name), { message: zodMsgs.valid("name") }),
    phone: zod.string().min(1, { message: zodMsgs.required }).refine((phone) => pattern.phone(phone), { message: zodMsgs.valid("number") }),
    email: zod.string().nonempty(zodMsgs.required).email(zodMsgs.valid("email")),
    description: zod.string().nonempty(zodMsgs.required).max(500, { message: zodMsgs.length.more("name",100) })
});

export default function RequestQuotationForm() {

    const [captchaToken, setCaptchaToken] = useState(null);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema), mode: "onChange" });

    const inputsSettings = {
        name: register("name", { required: true}),
        phone: register("phone", { required: true}),
        email: register("email", { required: true}),
        description: register("description", { required: true}),
    }

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
        console.log("Captcha token:", token);
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
    <Box className='requestForm'>
        <Stack component={"form"} direction="column" spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <button className='closeForm'>X</button>
            <Box>
                <InputLabel htmlFor="formName" className='inputTitle'>Name <span className='requiredSymbol'>*</span></InputLabel>  
                <TextField type='text' id='formName' color={errors?.name?"error":"primary"} helperText={errors?.name?.message} {...inputsSettings.name}/>
            </Box>
            
            <Box>
                <InputLabel htmlFor="formEmail" className='inputTitle'>Email <span  className='requiredSymbol'>*</span></InputLabel>  
                <TextField type='email' id='formEmail' color={errors?.email?"error":"primary"} helperText={errors?.email?.message} {...inputsSettings.email} />
            </Box>
            
            <Box>
                <InputLabel htmlFor="formPhone" className='inputTitle'>Phone <span  className='requiredSymbol'>*</span></InputLabel>  
                <TextField type='number' id='formPhone' color={errors?.phone?"error":"primary"} helperText={errors?.phone?.message} {...inputsSettings.phone} />
            </Box>
            
            <Box>
                <InputLabel htmlFor="formDescription" className='inputTitle'>Description <span  className='requiredSymbol'>*</span></InputLabel>  
                <TextField multiline maxRows={6} minRows={2} id='formDescription' color={errors?.description?"error":"primary"} helperText={errors?.description?.message}  {...inputsSettings.description}/> 
            </Box>
        
            <ReCAPTCHA sitekey={sitekey} onChange={handleCaptchaChange}/>
          
            <Stack direction={'row'} className='sendButtonContainer'>
                <Box>
                    <Button type='submit' variant='contained' disableRipple disabled={isSubmitting} className='send'>Send</Button>
                </Box>
            </Stack>
        </Stack>
    </Box>
  )
}