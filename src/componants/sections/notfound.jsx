import React from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router'
import { mainPageLinkAosAnimation, notFoundAosAnimation } from '../../animation/notfound'

function NotFound() {

    return (
        <Box className="notFoundCon" >
            <h1 {...notFoundAosAnimation}><span>404</span> <br />Page Not Found</h1>
            <Link to={"/"} {...mainPageLinkAosAnimation}>Back to main page</Link>
        </Box>
    )
}

export default NotFound