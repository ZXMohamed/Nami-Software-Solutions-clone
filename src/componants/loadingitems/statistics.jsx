//*react
import React from 'react'
//*mui
import { CircularProgress } from '@mui/material'


export function WaitStatisticProgress({ num = 1 }) { 
    const progressArray = [];
    for (let i = 0; i < num; i++) { 
        progressArray.push(<CircularProgress key={i} variant="indeterminate" color='secondary' size={40} thickness={2}/>)
    }
    return progressArray;
}