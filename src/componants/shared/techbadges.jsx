//*react
import React from 'react'
//*mui
import { Box, Skeleton, Stack, Typography } from '@mui/material'
//*styles
import "../../sass/shared/techbadge.scss"


export function TechBadgesList({ dir, loading, children, type }) {

    return (
        <Box dir={ dir } className={ "techBadges " + (type || techBadgesListType.box)} >
            { !loading && children }
            {loading && <WaitItemsSkelton/>}
        </Box>
  )
}

export function TechBadge({ data, size }) {

    if (!data || (data && Object.keys(data).length == 0)) return <></>;

    return (
        <Stack direction="row" className={"techBadge " + (size || techBadgeSize.small)} >
            <Typography component={'span'} className='techTitle'>{data.title}</Typography>
        </Stack>
    )
}

export const techBadgesListType = { 
    box : "techBadgesBox",
    row : "techBadgesRow"
}

export const techBadgeSize = {
    big : "techBadgeBig",
    small:"techBadgeSmall"
}

function WaitItemsSkelton() { 
    return (
      <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
        <Skeleton variant="rounded" width={ 100 } height={ 40 } />
        <Skeleton variant="rounded" width={ 100 } height={ 40 } />
        <Skeleton variant="rounded" width={ 100 } height={ 40 } />
        <Skeleton variant="rounded" width={ 100 } height={ 40 } />
      </Stack>
    );
}