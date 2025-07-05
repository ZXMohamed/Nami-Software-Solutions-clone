import React from 'react'
import { Container, Typography, Box, Stack } from '@mui/material'

export default function InfoCard({title,subtitle,description,children,style}) {
  return (
    <Box style={style} className="infoCard" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
        <Container maxWidth="lg">
            <Box className="infoCardWaveAnimation">
                <div></div>
                <div></div>
                <div></div>
            </Box>
            <Stack direction={'column'} spacing={2} alignItems={"center"}>
              { subtitle && <Typography variant='h5' component={'h2'}><i>{subtitle}</i></Typography> }
              { title && <Typography variant='h4' component={'h1'}>{title}</Typography> }
              { description && <Typography>{description}</Typography> }
              <br/>
              <br/>
              <Box>
                  {children}
              </Box>
          </Stack>
        </Container>
    </Box>
  )
}

/*
<Infocard title={ "Good planning is not enough Great callings require the extraordinary!" } subtitle={ "Statistics" }></Infocard>

*/