import { Box, Button, Container, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

export default function Careers() {

    const [openposition, setopenposition] = useState(["PHP Developer"]);

  return (
    <Box className='careerssec'>
        <Container>    
            <Grid container>
                <Grid size={{xs:12,md:7}}>
                    <Stack direction={'column'} spacing={1} className='headersec'>
                        <Typography variant='h5' component={'h2'} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50"><i>Careers</i></Typography>
                        <Typography variant='h3' component={'h1'} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">Build your future with our company</Typography>
                        <Typography data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
                            At our company, we strive to create an environment focused on learning and striving to achieve
                            a person's fullest potential. We got itWe maintain a prominent presence in the industry thanks to
                            our continuous efforts, and we invite you to be part of the story of our continuous development.
                        </Typography>
                    </Stack>
                </Grid>
                <Grid size={{xs:12,md:5}}>
                    <Stack component={'form'} direction={'column'} spacing={2} className='formsec' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250">
                        <Typography variant='h6' component={'h3'}><i>Upload your CV</i></Typography>
                        <TextField variant="outlined" type='text' placeholder='Full name'/>
                        <TextField variant="outlined" type="number" placeholder='Phone number'/>
                        <Select variant='outlined' value={0} onChange={"handleChange"}>
                            <MenuItem value={0}>Select the job</MenuItem>
                              { openposition.map((val,inx) => <MenuItem key={inx} value={val}>{val}</MenuItem>)}
                        </Select>
                        <Fileinput/>
                        <Button variant='contained' disableRipple>Apply now</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    </Box>
  )
}



function Fileinput(props) { 

    return (
        <Box className="fileinput">
            <input type="file" id="cvupload" hidden { ...props } />
            <label htmlFor="cvupload">
                <div variant='contained' disableRipple>Choose File</div>
                <Typography component={'span'}>No file chosen</Typography>
            </label>
        </Box>
    )
}