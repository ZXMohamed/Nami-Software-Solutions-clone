//*react
import React from 'react'
//*mui
import { Box, Skeleton } from '@mui/material'


export function WaitItemsSkelton() { 
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