import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

// import applicationdesign from '../assets/photo/servicesbadges/applicationdesign.svg'
// import androidapplication from '../assets/photo/servicesbadges/androidapplication.svg'
// import website from '../assets/photo/servicesbadges/website.svg'
// import iosapp from '../assets/photo/servicesbadges/iosapp.svg'


export function ServicesBadgesList({ children, type }) {

    return (
        <Box className={"servicesBadges " + type || servicesBadgesListType.box} >
            {children}
        </Box>
  )
}

export function ServiceBadge({ data, size }) {

    if (!data) { 
        throw "Service badge data unset !"
    }

    return (
        <Stack direction="row" spacing={ 0.7 } className={"serviceBadge " + size || serviceBadgeSize.small} >
            <img src={data.icon} alt={"Nami " + data.title + " service"} className='serviceIcon'/>
            <Typography variant='h6' component={'h4'} className='serviceTitle'>{data.title}</Typography>
        </Stack>
    )
}

export const servicesBadgesListType = { 
    box : "servicesBadgesBox",
    row : "servicesBadgesRow"
}

export const serviceBadgeSize = {
    big : "serviceBadgeBig",
    small:"serviceBadgeSmall"
}

// export const ServiceBadgedatas = {
//     applicationdesign: {
//         title: "Application design",
//         icon: applicationdesign
//     },
//     androidapplication: {
//         title: "Android application",
//         icon: androidapplication
//     },
//     website: {
//         title: "Website",
//         icon: website
//     },
//     iosapp:{ 
//         title: "IOS app",
//         icon: iosapp
//     }
// }