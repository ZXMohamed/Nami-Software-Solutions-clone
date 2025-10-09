//*react
import React from 'react'
//*mui
import { CircularProgress } from '@mui/material'

export function WaiteProgress(props) {
    
    const progressSet = [];
    
    for (let i = 0; i <= props.num; i++) { 
        progressSet.push(<CircularProgress key={i} { ...props } />);
    }
    
    return progressSet;
}