import { Button } from '@mui/material'
import React from 'react'
import "../sass/shared/requestbutton.scss"
export default function RequestButton(props) {
  return (
    <Button variant="contained" disableRipple="false" { ...props } className={"requestButton "+ props.className} >{ props.title }</Button>
  )
}
