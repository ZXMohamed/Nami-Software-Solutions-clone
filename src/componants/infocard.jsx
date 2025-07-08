import React from 'react'
import { Container, Typography, Box, Stack } from '@mui/material'

export default function InfoCard({title,subtitle,description,children,sx}) {
  return (
    <Box sx={sx} className="infoCard" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
        <Container maxWidth="lg">
            <Box className="infoCardWaveAnimation">
                <div></div>
                <div></div>
                <div></div>
            </Box>
            <Stack className='infoCardContent' direction={'column'} spacing={2} alignItems={"center"}>
              { subtitle && <Typography variant='h5' component={'h2'} className="infoCardTitle"><i>{subtitle}</i></Typography> }
              { title && <Typography variant='h4' component={'h1'} className="infoCardSubtitle">{title}</Typography> }
              { description && <Typography className="infoCardDescription">{description}</Typography> }
              <br/>
              <br/>
              <Box className="infoCardAttachment">
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