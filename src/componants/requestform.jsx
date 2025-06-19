import React, { useState } from 'react'
import { Box, Button, InputLabel, Stack, TextField } from '@mui/material'
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import ReCAPTCHA from "react-google-recaptcha";

export default function Requestform() {

    const [captchaToken, setCaptchaToken] = useState(null);

    const regex = {
        name:(name)=>name.match(/^[A-Za-z]+([ '-][A-Za-z]+)*$/),
        phone:(phone)=>phone.match(/^\+?[0-9]{1,4}[-\s.]?(\(?\d{2,4}\)?[-\s.]?)?\d{3,4}[-\s.]?\d{4}$/) || phone.match(/^01[0125][0-9]{8}$/) || phone.match(/^\d{10,15}$/),
    }

    const zodmsgs = {
        required: "This is a required field",
        length: { less: (input,num)=>`${input} less than ${num} chars`, more: (input,num)=>`${input} more than ${num} chars` },
        valid: (input) => `this ${input} is not valid`,
    }

    const schema = zod.object({
        name: zod.string().nonempty(zodmsgs.required).min(3, { message: zodmsgs.length.less("name",3) }).max(100, { message: zodmsgs.length.more("name",100) }).refine((name) => regex.name(name), { message: zodmsgs.valid("name") }),
        phone: zod.string().min(1, { message: zodmsgs.required }).refine((phone) => regex.phone(phone), { message: zodmsgs.valid("number") }),
        email: zod.string().nonempty(zodmsgs.required).email(zodmsgs.valid("email")),
        description: zod.string().nonempty(zodmsgs.required).max(500, { message: zodmsgs.length.more("name",100) })
    });

    const { register, handleSubmit, formState: { errors,isSubmitting } } = useForm({resolver:zodResolver(schema),mode:"onChange"});
    
    const inputssettings = {
        name: register("name", { required: true}),
        phone: register("phone", { required: true}),
        email: register("email", { required: true}),
        description: register("description", { required: true}),
    }
    
    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
        console.log("Captcha token:", token);
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
    <Box className='requestform'>
        <Stack component={"form"} direction="column" spacing={2} onSubmit={handleSubmit(onsubmit)} className='form'>
            <button className='close'>X</button>
            <Box>
                <InputLabel htmlFor="formname">Name <span>*</span></InputLabel>  
                <TextField type='text' id='formname' name='name' color={errors?.name?"error":"primary"} helperText={errors?.name?.message} {...inputssettings.name}/>
            </Box>
            
            <Box>
                <InputLabel htmlFor="formemail">Email <span>*</span></InputLabel>  
                <TextField type='email' id='formemail' name='email' color={errors?.email?"error":"primary"} helperText={errors?.email?.message} {...inputssettings.email} />
            </Box>
            
            <Box>
                <InputLabel htmlFor="formphone">Phone <span>*</span></InputLabel>  
                <TextField type='phone' id='formphone' name='phone' color={errors?.phone?"error":"primary"} helperText={errors?.phone?.message} {...inputssettings.phone} />
            </Box>
            
            <Box>
                <InputLabel htmlFor="formdescription">Description <span>*</span></InputLabel>  
                <TextField multiline minRows={2} id='formdescription' name='description' color={errors?.description?"error":"primary"} helperText={errors?.description?.message}  {...inputssettings.description}/> 
            </Box>
        
            <ReCAPTCHA sitekey="6LdAk10rAAAAAKeGJg9mnA0wwBNtenRYAlp5da7e" onChange={handleCaptchaChange}/>
          
            <Stack direction={'row'} justifyContent={'center'} className='sendbuttoncon'>
                <Box>
                    <Button type='submit' variant='contained' disableRipple disabled={isSubmitting} className='send'>Send</Button>
                </Box>
            </Stack>
        </Stack>
    </Box>
  )
}
