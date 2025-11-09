import React from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router'
import { mainPageLinkAosAnimation, notFoundAosAnimation } from '../../animation/notfound'
import { WaveAnimation } from '../shared/waveanimation'

function NotFound() {

    return (
        <Box className="notFoundCon" >
            <h1 {...notFoundAosAnimation}><span>404</span> <br />Page Not Found</h1>
            <Link to={ "/" } { ...mainPageLinkAosAnimation }>Back to main page</Link>
            <WaveAnimation wave_dir="ltr"/>
        </Box>
    )
}

export default NotFound