//*react
import React from 'react'
//*mui
import { Box, Skeleton, Stack } from '@mui/material'


export function GalleryWaitItemsSkelton() { 
    return (
      <Stack direction={ "row" } gap={3}>
          <Box>
            <Skeleton variant="rounded" width={ 120 } height={ 110 } />
            <br/>
            <Skeleton variant="rounded" width={ 120 } height={ 110 } />
            <br/>
            <Skeleton variant="rounded" width={ 120 } height={ 110 } />
            <br/>
            <Skeleton variant="rounded" width={ 120 } height={ 100 } />
            <br/>
          </Box>
          <Skeleton variant="rounded" width={ "100%" } height={ 500 } />
        </Stack>
    );
}

export function IntroCardWaitItemsSkelton() { 
    return (
        <>
            <Skeleton variant="rounded" width={ 200 } height={ 20 } />
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <Skeleton variant="rounded" width={ "80%" } height={ 10 } />
            <Stack direction={"row"} columnGap={2}>
              <Skeleton variant="rounded" width={ "20%" } height={ 40 } />
              <Skeleton variant="rounded" width={ "20%" } height={ 40 } />
              <Skeleton variant="rounded" width={ "20%" } height={ 40 } />
            </Stack>
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
        <br />
      </Box>
    );
}