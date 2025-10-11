//*react
import React from 'react'
//*mui
import { Skeleton, Stack } from '@mui/material'
//*styles
import "../../sass/shared/techbadge.scss"


export function WaitItemsSkelton() { 
    return (
      <Stack direction={"row"} flexWrap={"wrap"} gap={2}>
        <Skeleton variant="rounded" width={ 100 } height={ 40 } />
        <Skeleton variant="rounded" width={ 100 } height={ 40 } />
        <Skeleton variant="rounded" width={ 100 } height={ 40 } />
        <Skeleton variant="rounded" width={ 100 } height={ 40 } />
      </Stack>
    );
}