//*react
import React, { useEffect, useRef } from 'react'
//*mui
import { Container, Typography, Box, Stack } from '@mui/material'
//*styles
import "../sass/shared/infocard.scss"
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';

export default function InfoCard({ dir = "ltr", title, subtitle, description, animateDescription = false, waveDir = "left", typographyForm, effects = [], children, sx }) {
  
  const descriptionx = useRef();

  useEffect(() => {
    requestIdleCallback(() => {
      animateDescription && descriptionWordsUP(descriptionx)
    })
  },[]);
  return (
    <Box dir={dir} sx={sx} className="infoCard" {...infoCardAosAnimation}>
        <Container maxWidth="lg" className={effects.join(" ")}>
          <WaveAnimation waveDir={ waveDir }/>
            <Stack className='infoCardContent' direction={'column'} spacing={2} alignItems={"center"}>
              { title && <Typography variant='h5' component={'h1'} className="infoCardTitle"><i>{title}</i></Typography> }
              { subtitle && <Typography variant='h4' component={ 'h2' } className={ "infoCardSubtitle "+typographyForm.subtitle.join(" ") }>{subtitle}</Typography> }
              { description && <Typography ref={descriptionx} className="infoCardDescription">{description}</Typography> }
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

const WaveAnimation = ({ waveDir }) => {
  return (
    <Box waveDir={waveDir} className="infoCardWaveAnimation">
        <div></div>
        <div></div>
        <div></div>
    </Box>
  );
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

const aosAnimation = {
  ["data-aos"]:"fade-up",
  ["data-aos-duration"]:"1000"
}
const infoCardAosAnimation = {
  ...aosAnimation,
  ["data-aos-delay"]:"50"
}

function descriptionWordsUP(description) {
    const descriptionSplit = new SplitText(description.current, {
        type: "words"
    });

    gsap.to(descriptionSplit.words, {
        scrollTrigger: {
            trigger: description.current,
            scrub: 5,
            start: "top+=0 bottom",
            end: "top+=20 bottom",
        },
        duration:1,
        y: 0,
        opacity:1,
        stagger: 0.05,
    });
}

/*
<InfoCard dir={ "ltr" } waveDir={ "left" } effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle : [typographyForm.subtitle.size.small], description:{animate:true} }} description={"Nami Foundation provides integrated digital solutions for resale in website design And mobile applications. We resell upgraded products with the highest quality standards to meet your needs."} subtitle={ "Good planning is not enough Great callings require the extraordinary!" } title={"ss"}>

</InfoCard>
*/