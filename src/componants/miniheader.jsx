//*react
import React from 'react'
//*mui
import { Box, Container, Typography } from '@mui/material'
//*styles
import "../sass/shared/miniheader.scss"


export default function MiniHeader({ dir, title, subtitle }) {
    
  return (
    <Box dir={dir} className="miniHeaderCon">
      <Container maxWidth="lg">
        <Typography component={"h3"} variant={"h6"} className='miniHeaderTitle' {...titleAosAnimation}>{title}</Typography>
        <Typography component={"h4"} variant={"h4"} className='miniHeaderSubtitle' {...subtitleAosAnimation}>{subtitle}</Typography>
      </Container>
    </Box>
  )
}

const aosAnimation = {
  ["data-aos"]: "fade-up",
  ["data-aos-duration"]: "1000",
}
const titleAosAnimation = {
  ...aosAnimation,
  ["data-aos-delay"]: "50"
}
const subtitleAosAnimation = {
  ...aosAnimation,
  ["data-aos-delay"]: "80"
}