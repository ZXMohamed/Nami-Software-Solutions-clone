//*react
import React from 'react'
//*mui
import { CircularProgress } from '@mui/material'

export function WaitContactMethodProgress({ num }) {
    const progressArray = [];
    for (let i = 0; i < num; i++){
        progressArray.push( <CircularProgress key={i} variant="indeterminate" size={40} thickness={2} />)
    }
    return progressArray;
}