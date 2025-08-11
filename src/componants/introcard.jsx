//*react
import React from 'react'
//*mui
import { Stack, Typography } from '@mui/material'
//*styles
import "../sass/shared/introcard.scss"

export default function IntroCard({ dir, icon, title, description, children = [], aosAnimation }) {
  
    if (!title) return <></>;

    return (
        <Stack dir={dir} direction={"column"} className='introCardCon' {...aosAnimation}>
            { icon && <img src={ icon } width={ 40 } height={ 40 } alt={ title + " service form nami" } className='introCardIcon' /> }
            <Typography component={ "h1" } variant='h4' className='introCardTitle'>{ title }</Typography>
            { description && <Typography className='introCardDescription'>{ description }</Typography> }
            {children}
        </Stack>
    )
}
