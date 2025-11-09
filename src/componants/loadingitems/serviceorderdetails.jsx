//*react
import React from 'react'
//*mui
import { Box, Skeleton, Stack } from '@mui/material'

export function IntroCardWaitItemsSkelton() { 
    return (
        <>
            <Stack direction={ "row" } justifyContent={ "space-between" } alignItems={ "center" }>
                <Skeleton variant="rounded" width={ 60 } height={ 60 } />
            </Stack>
            <br/>
            <Skeleton variant="rounded" width={ 200 } height={ 20 } />
            <br/>
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <br/>
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <br/>
            <Skeleton variant="rounded" width={ "80%" } height={ 10 } />
        </>
    );
}

export function ListCardWaitItemsSkelton() { 
    return (
      <Box>
        <Skeleton variant="rounded" width={ "100%" } height={ 15 } />
        <br/>
        <Skeleton variant="rounded" width={ "90%" } height={ 15 } />
        <br/>
        <Skeleton variant="rounded" width={ "100%" } height={ 15 } />
        <br/>
        <Skeleton variant="rounded" width={ "60%" } height={ 15 } />
        <br/>
        <Skeleton variant="rounded" width={ "80%" } height={ 15 } />
        <br/>
        <br />
        <Skeleton variant="rounded" width={ "100%" } height={ 50 } />
        
      </Box>
    );
}