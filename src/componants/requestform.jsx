import { Box, InputLabel, TextField } from '@mui/material'
import React from 'react'

export default function Requestform() {
  return (
    <Box className='requestform'>
        <Box component={"form"} className='form'>
            <button className='close'>X</button>
            
            <InputLabel htmlfor="formname">Name <span>*</span></InputLabel>  
            <TextField type='text' id='formname' name='name' helperText={'this r'}/>
            
            <InputLabel htmlfor="formemail">Email <span>*</span></InputLabel>  
            <TextField type='email' id='formemail' name='email' helperText={'this r'}/>
            
            <InputLabel htmlfor="formphone">Phone <span>*</span></InputLabel>  
            <TextField type='phone' id='formphone' name='phone' helperText={'this r'}/>
            
            <InputLabel htmlfor="formdescription">Description <span>*</span></InputLabel>  
            <TextField multiline  id='formdescription' name='description' helperText={'this r'}/>
        </Box>
    </Box>
  )
}
