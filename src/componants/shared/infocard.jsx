//*react
import React, { useEffect, useRef } from 'react'
//*mui
import { Container, Typography, Box, Stack } from '@mui/material'
//*styles
import "../../sass/shared/infocard.scss"
//*components
import { WaveAnimation } from './waveanimation';
//*animation
import { descriptionWordsUP, infoCardAosAnimation } from '../../animation/infocard';

export default function InfoCard({ dir = "ltr", title, subtitle, description, animateDescription = false, wave_dir = "left", typographyForm, effects = [], children, sx }) {
  
  const descriptionRef = useRef();

  useEffect(() => {
    requestIdleCallback(() => {
      animateDescription && descriptionWordsUP(descriptionRef)
    })
  }, []);
  
  return (
    <Box sx={sx} dir={dir} className="infoCard" {...infoCardAosAnimation}>
        <Container maxWidth="lg" className={effects.join(" ")}>
          <WaveAnimation dir={dir} wave_dir={ wave_dir }/>
            <Stack className='infoCardContent' direction={'column'} spacing={2} alignItems={"center"}>
              { title && <Typography variant='h5' component={'h2'} className="infoCardTitle"><i>{title}</i></Typography> }
              { subtitle && <Typography variant='h4' component={ 'h3' } className={ "infoCardSubtitle "+typographyForm.subtitle.join(" ") }>{subtitle}</Typography> }
              { description && <Typography ref={descriptionRef} className="infoCardDescription">{description}</Typography> }
              <br/>
              { children && 
                <>
                  <br/>
                  <Box className="infoCardAttachment">
                    {children}
                  </Box>
                </>
              }
          </Stack>
        </Container>
    </Box>
  )
}

export const typographyForm = {
  subtitle: {
    size: {
      big: "infoCardSubtitleBig",
      small:"infoCardSubtitleSmall"
    }
  }
} 
export const infoCardEffects = {
  sharpEffect: "sharpEffect"
}

//*example
/*
<InfoCard dir={ "ltr" } wave_dir={ "left" } effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle : [typographyForm.subtitle.size.small], description:{animate:true} }} description={"Nami Foundation provides integrated digital solutions for resale in website design And mobile applications. We resell upgraded products with the highest quality standards to meet your needs."} subtitle={ "Good planning is not enough Great callings require the extraordinary!" } title={"ss"}>

</InfoCard>
*/