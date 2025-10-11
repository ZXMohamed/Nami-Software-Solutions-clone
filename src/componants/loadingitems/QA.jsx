//*react
import React from 'react'
//*mui
import { Skeleton } from '@mui/material'


export function QABoxWaitItemsSkelton() { 
    return (
        <>
            <Skeleton variant="rounded" width={ "100%" } height={ 50 } />
            <br/>
            <Skeleton variant="rounded" width={ "100%" } height={ 50 } />
            <br/>
            <Skeleton variant="rounded" width={ "100%" } height={ 50 } />
        </>
    );
}