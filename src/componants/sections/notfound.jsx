import React from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router'

function NotFound() {

    return (
        <Box className="notFoundCon">
            <h1><span>404</span> <br />Page Not Found</h1>
            <Link to={"/"}>Back to main page</Link>
        </Box>
    )
}

export default NotFound