//*react
import React from 'react'
//*mui
import { Box, Skeleton } from '@mui/material'
//*styles
import "../../sass/shared/pointslist.scss"

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