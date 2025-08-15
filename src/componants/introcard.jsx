//*react
import React from 'react'
//*mui
import { Stack, Typography } from '@mui/material'
//*styles
import "../sass/shared/introcard.scss"

export default function IntroCard({ dir, icon, title, description, children = [] }) {
  
    if (!title) return <></>;

    return (
        <Stack dir={dir} direction={"column"} className='introCardCon' {...cardAosAnimation}>
            { icon && <img src={ icon } width={ 40 } height={ 40 } alt={ title + " service form nami" } className='introCardIcon' /> }
            <Typography component={ "h1" } variant='h4' className='introCardTitle' {...titleAosAnimation} >{ title }</Typography>
            { description && <Typography className='introCardDescription' {...descriptionAosAnimation} >{ description }</Typography> }
            {children}
        </Stack>
    )
}

const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]: "1000",
}
const cardAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "50"
}
const titleAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "100"
}
const descriptionAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "150"
}