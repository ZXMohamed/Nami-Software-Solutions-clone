import { Button } from '@mui/material'
import React from 'react'

export default function RequestButton(props) {
  return (
    <Button variant="contained" disableRipple="false" className="requestButton" { ...props }>{ props.title }</Button>
  )
}
