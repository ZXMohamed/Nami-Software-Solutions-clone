import React from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router'
import InfoCard, { infoCardEffects, typographyForm } from '../shared/infoCard'

function NotFound() {

    return (
        <Box dir="ltr" className="notFoundCon" >
            <InfoCard dir='ltr' title={"404"} subtitle={"Page Not Found"} typographyForm={{subtitle:[typographyForm.subtitle.size.big]}} effects={[infoCardEffects.sharpEffect]} wave_dir='right'>
                <Link to={ "/" }>Back To Main Page</Link>
            </InfoCard>
        </Box>
    )
}

export default NotFound