//*react
import React from 'react'
//*mui
import { Button } from '@mui/material'
//*styles
import "../../sass/shared/requestbutton.scss"

export default function RequestButton(props) {
  return (
    <Button variant="contained" disableRipple { ...props } className={"requestButton "+ props.className} >{ props.title }</Button>
  )
}
