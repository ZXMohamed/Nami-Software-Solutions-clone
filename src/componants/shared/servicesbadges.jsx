//*react
import React from 'react'
//*mui
import { Box, Stack, Typography } from '@mui/material'
//*styles
import "../../sass/shared/servicebadge.scss"


export function ServicesBadgesList({ dir, children, type }) {

    return (
        <Box dir={ dir } className={ "servicesBadges " + (type || servicesBadgesListType.box)} >
            {children}
        </Box>
  )
}

export function ServiceBadge({ data, size }) {

    if (!data || (data && Object.keys(data).length == 0)) return <></>;

    return (
        <Stack direction="row" component={"a"} href={data.link} target={"_blank"} gap={ 0.7 } className={"serviceBadge " + (size || serviceBadgeSize.small)} onClick={(e)=>{e.stopPropagation()}}>
            <img src={data.image} alt={ data.title } className='serviceIcon'/>
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