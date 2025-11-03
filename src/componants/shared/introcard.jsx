//*react
import React from 'react'
//*mui
import { Stack, Typography } from '@mui/material'
//*styles
import "../../sass/shared/introcard.scss"
//*animation
import { descriptionAosAnimation, titleAosAnimation } from '../../animation/introcard';

export default function IntroCard({ dir, icon, title, description, gutters, children = [] }) {
  
    if (!title) return <></>;

    return (
        <Stack dir={ dir } direction={ "column" } className='introCardCon' padding={ gutters ? "32px" : "16px" }>
            { icon && <img src={ icon } width={ 40 } height={ 40 } alt={ title } className='introCardIcon' /> }
            <Typography component={ "h1" } variant='h4' className='introCardTitle' {...titleAosAnimation} >{ title }</Typography>
            { description && <Typography className='introCardDescription' {...descriptionAosAnimation} >{ description }</Typography> }
            {children}
        </Stack>
    )
}