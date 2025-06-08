import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

import applicationdesign from '../assets/photo/servicesbadges/applicationdesign.svg'
import androidapplication from '../assets/photo/servicesbadges/androidapplication.svg'
import website from '../assets/photo/servicesbadges/website.svg'
import iosapp from '../assets/photo/servicesbadges/iosapp.svg'


export function Servicesbadgeslist({ children, type }) {

    return (
        <Box className={"servicesbadges " + type || servicesbadgeslisttype.box} >
        {children}
    </Box>
  )
}

export function Servicebadge({ type, size }) {

    if (!type) { 
        throw "Service badge type unset !"
    }

    return (
        <Stack direction="row" spacing={ 0.7 } className={"servicebadge " + size || servicebadgesize.small} >
            <img src={type.icon} alt="" />
            <Typography variant='h6' component={'h4'}>{type.title}</Typography>
        </Stack>
    )
}

export const servicesbadgeslisttype = { 
    box : "servicesbadgesbox",
    row : "servicesbadgesrow"
}

export const servicebadgetypes = {
    applicationdesign: {
        title: "Application design",
        icon: applicationdesign
    },
    androidapplication: {
        title: "Android application",
        icon: androidapplication
    },
    website: {
        title: "Website",
        icon: website
    },
    iosapp:{ 
        title: "IOS app",
        icon: iosapp
    }
}

export const servicebadgesize = {
    big : "servicebadgebig",
    small:"servicebadgesmall"
}