import { Button } from '@mui/material'
import React from 'react'

export default function Requestbutton(props) {
  return (
    <Button variant="contained" disableRipple="false" className="requestbutton" { ...props }>{ props.title }</Button>
  )
}
