//*react
import React,{memo} from 'react'
//*mui
import { Button } from '@mui/material'
//*styles
import "../../../sass/shared/requestbutton.scss"


const RequestButton = memo((props) => {
  return (
    <Button variant="contained" disableRipple { ...props } className={ "requestButton " + props.className } >{ props.title }</Button>
  )
});

export default RequestButton;
