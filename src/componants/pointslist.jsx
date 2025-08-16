import { Box, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import "../sass/shared/pointslist.scss"

export default function PointsList({ dir, loading, data=[] }) {
  return (
    <Box dir={dir}>
      {!loading && data.map((point) => <Point key={ point.id } title={ point.title } />) }
      {loading && <WaitItemsSkelton/>}
    </Box>
  )
}

function Point({title}) {
    
    return (
        <Stack direction={"row"} className='pointCon'>
            <Typography component={"span"} className='pointTitle'>{ title }</Typography>
        </Stack>
    )
}

function WaitItemsSkelton() { 
    return (
      <Box columnGap={2}>
        <Skeleton variant="rounded" width={ "100%" } height={ 40 } />
        <br />
        <Skeleton variant="rounded" width={ "100%" } height={ 40 } />
        <br />
        <Skeleton variant="rounded" width={ "100%" } height={ 40 } />
        <br />
        <Skeleton variant="rounded" width={ "100%" } height={ 40 } />
      </Box>
    );
}