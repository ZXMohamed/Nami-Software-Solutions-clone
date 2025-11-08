//*react
import React, { useState } from 'react'
//*mui
import { Alert, AlertTitle, LinearProgress, Snackbar, Typography } from '@mui/material';

function AlertContainer({ openAlert, duration = 5000, children }) {
    
    const [open, setOpen] = useState(true);

    return (
        <Snackbar open={ openAlert == undefined ? open : openAlert } autoHideDuration={ openAlert == undefined ? duration : undefined  } onClose={ () => setOpen(false) }>
            { children }
        </Snackbar>
    )
}

function Success({ openAlert, title = "Success", description = "", duration = 2000 }) {
    return (
        <AlertContainer openAlert={openAlert} duration={duration}>
            <Alert color='primary' variant='filled' severity="success">
                <AlertTitle>
                    <b>{ title }</b>
                </AlertTitle>
                <Typography sx={{minWidth:"250px"}}>
                    {description}
                </Typography>
            </Alert>
        </AlertContainer>
    )
}
function Error({ openAlert, title = "Error", description = "", duration = 5000 }) {
    return (
        <AlertContainer openAlert={openAlert} duration={duration}>
            <Alert color='error' variant='filled' severity="error">
                <AlertTitle><b>{title}</b></AlertTitle>
                <Typography sx={{minWidth:"250px"}}>
                    {description}
                </Typography>
            </Alert>
        </AlertContainer>
    )
}
function Loading({ openAlert, title = "Loading...", description = "", duration = 5000 }) {
    return (
        <AlertContainer openAlert={openAlert} duration={duration}>
            <Alert color='primary' variant='filled' severity="info">
                <AlertTitle>
                    <b>{ title }</b>
                    <LinearProgress color='primary' ></LinearProgress>
                </AlertTitle>
                <Typography sx={{minWidth:"250px"}}>
                    {description}
                </Typography>
            </Alert>
        </AlertContainer>
    )
}

function Warning({ openAlert, title = "Warning", description = "", duration = 5000 }) {
    return (
        <AlertContainer openAlert={openAlert} duration={duration}>
            <Alert color='warning' variant='filled' severity="warning">
                <AlertTitle><b>{ title }</b></AlertTitle>
                <Typography sx={{minWidth:"250px"}}>
                    {description}
                </Typography>
            </Alert>
        </AlertContainer>
    )
}

export default { Success, Error, Loading, Warning };