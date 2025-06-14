import React from 'react'
import { Stack } from '@mui/material'

export default function Socialbuttons({ aosanimation }) {
    return (
        <Stack direction="row" spacing={ 1 } className="socialbtns" {...aosanimation} >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </Stack>
    )
}
