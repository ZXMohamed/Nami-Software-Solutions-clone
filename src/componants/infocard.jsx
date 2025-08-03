//*react
import React from 'react'
//*mui
import { Container, Typography, Box, Stack } from '@mui/material'
//*styles
import "../sass/shared/infocard.scss"

export default function InfoCard({ dir, title, subtitle, description, children, sx }) {
  return (
    <Box dir={dir} sx={sx} className="infoCard" {...infoCardAosAnimation}>
        <Container maxWidth="lg">
          <WaveAnimation/>
            <Stack className='infoCardContent' direction={'column'} spacing={2} alignItems={"center"}>
              { subtitle && <Typography variant='h5' component={'h1'} className="infoCardTitle"><i>{title}</i></Typography> }
              { title && <Typography variant='h4' component={'h2'} className="infoCardSubtitle">{subtitle}</Typography> }
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

const WaveAnimation = () => {
  return (
    <Box className="infoCardWaveAnimation">
        <div></div>
        <div></div>
        <div></div>
    </Box>
  );
} 

const aosAnimation = {
  ["data-aos"]:"fade-up",
  ["data-aos-duration"]:"1000"
}
const infoCardAosAnimation = {
  ...aosAnimation,
  ["data-aos-delay"]:"50"
}



/*
<Infocard title={ "Good planning is not enough Great callings require the extraordinary!" } subtitle={ "Statistics" }></Infocard>

*/