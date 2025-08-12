import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import "../sass/shared/pointslist.scss"

export default function PointsList({ dir, data=[] }) {
  return (
    <Box dir={dir}>
        {data.map((point)=><Point title={point.title}/>)}
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