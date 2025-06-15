import React, { useState } from 'react'
import { Box, Button, InputLabel, Stack, TextField } from '@mui/material'
import ReCAPTCHA from "react-google-recaptcha";

export default function Requestform() {

    const [captchaToken, setCaptchaToken] = useState(null);

    const handleCaptchaChange = (token) => {
        setCaptchaToken(token);
        console.log("Captcha token:", token);
    };


    const [inputhelptext, setinputhelptext] = useState({
        name: "",
        email: "",
        phone: "",
        description:""
    });

    function helptextshow(e,input) { 
        setinputhelptext({...inputhelptext,[input]:(e.target.value=="" ?"This is a required field":"")})
    }

  return (
    <Box className='requestform'>
        <Stack direction="column" spacing={2} component={"form"} className='form'>
            <button className='close'>X</button>
            <Box>
                <InputLabel htmlFor="formname">Name <span>*</span></InputLabel>  
                <TextField type='text' id='formname' name='name' helperText={inputhelptext.name} onBlur={(e)=>helptextshow(e,"name")}/>
            </Box>
            
            <Box>
                <InputLabel htmlFor="formemail">Email <span>*</span></InputLabel>  
                <TextField type='email' id='formemail' name='email' helperText={inputhelptext.email} onBlur={(e)=>helptextshow(e,"email")}/>
            </Box>
            
            <Box>
                <InputLabel htmlFor="formphone">Phone <span>*</span></InputLabel>  
                <TextField type='phone' id='formphone' name='phone' helperText={inputhelptext.phone} onBlur={(e)=>helptextshow(e,"phone")}/>
            </Box>
            
            <Box>
                <InputLabel htmlFor="formdescription">Description <span>*</span></InputLabel>  
                <TextField multiline minRows={1} id='formdescription' name='description' helperText={inputhelptext.description} onBlur={(e)=>helptextshow(e,"description")}/> 
            </Box>
        
            <ReCAPTCHA sitekey="6LdAk10rAAAAAKeGJg9mnA0wwBNtenRYAlp5da7e" onChange={handleCaptchaChange}/>
          
            <Stack direction={'row'} justifyContent={'center'}>
                <Box className="">
                    <button type='submit' className='send'>Send</button>
                </Box>
            </Stack>
        </Stack>
    </Box>
  )
}
