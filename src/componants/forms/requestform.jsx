//*react
import React, { useEffect, useMemo, useRef } from 'react';
//*mui
import { Box, Button, InputLabel, Stack, TextField, Alert } from '@mui/material';
//*styles
import "../../sass/shared/requestform.scss";
//*form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { pattern } from '../../form/util/rules';
import { setFormAdditionalInputs } from './additionalinputs';
import ReCAPTCHA from "react-google-recaptcha";
import { sitekey } from '../../form/recaptcha';
import { createZodObject } from '../../form/schema/requestform';
import { createInputsSettings } from '../../form/settings/requestform';

export default function RequestForm({ closeButton = () => { }, defaultContent, formAdditionalInputs = [], form_isLoading, form_isSuccess, form_isError, submit = () => { } }) {

    if (!defaultContent) return <></>

    const reCaptcha = useRef();
    const reCaptchaToken = useRef();

    const additionalInputs = useMemo(()=>setFormAdditionalInputs(defaultContent, formAdditionalInputs), [defaultContent]);

    const schema = useMemo(() => createZodObject(defaultContent, pattern,additionalInputs.schema), [defaultContent]);

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
    
    useEffect(() => { if (Object.keys(errors).length > 0) trigger(); }, [defaultContent]);

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
            submit(data);
            reCaptcha.current.reset();
            reCaptchaToken.current = undefined;
        }

    };

  return (
      <Box dir={ defaultContent.direction } className='requestForm'>
        <Stack component={"form"} direction="column" spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <button type='button' className='closeForm' onClick={closeButton}>X</button>
            
            {(form_isSuccess && !form_isLoading && !errors?.recaptcha) && <Alert variant="filled" color='primary' severity="success" className='formAlert'>{defaultContent.form.alert.success}</Alert>}
            {(form_isError && !form_isLoading && !errors?.recaptcha) && <Alert variant="filled" color='error' severity="error" className='formAlert'>{defaultContent.form.alert.error}</Alert>}
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
              
            {additionalInputs.inputs.map((input,inx)=>input(inx,register,errors))}
        
            <ReCAPTCHA ref={reCaptcha} key={defaultContent.language} sitekey={sitekey} onChange={(token) => { reCaptchaToken.current = token; }} hl={defaultContent.language}/>
          
            <Stack direction={'row'} className='sendButtonContainer'>
                <Box>
                    <Button type='submit' loading={form_isLoading} loadingPosition={"center"} variant='contained' disableRipple disabled={isSubmitting} className='send'>
                        { defaultContent.form.submit }
                    </Button>
                </Box>
            </Stack>
        </Stack>
    </Box>
  )
}