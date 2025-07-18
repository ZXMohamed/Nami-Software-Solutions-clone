import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

import "../sass/shared/servicebadge.scss"


export function ServicesBadgesList({ dir, children, type }) {

    return (
        <Box dir={dir} className={"servicesBadges " + type || servicesBadgesListType.box} >
            {children}
        </Box>
  )
}

export function ServiceBadge({ data, size }) {

    if (!data) { 
        throw "Service badge data unset !"
    }

    return (
        <Stack direction="row" component={"a"} href={data.link} target={"_blank"} gap={ 0.7 } className={"serviceBadge " + size || serviceBadgeSize.small} >
            <img src={data.image} alt={"Nami " + data.title + " service"} className='serviceIcon'/>
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