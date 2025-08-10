//*react
import React, { memo } from 'react'
//*mui
import { Box, Stack, Typography } from '@mui/material';
//*styles
import "../../sass/shared/projectscard.scss"

export const ProjectCard = memo(({ dir, data, aosAnimation }) => {
    if (!data || (data && Object.keys(data).length == 0)) return <></>;

    return (
        <Box dir={ dir } className='projectCard' { ...aosAnimation }>
            <Stack direction={ "column" } spacing={ 1 }>
                <Stack direction={ 'row' } className='projectHeader'>
                    <Typography variant='h6' component={ 'h3' } className='projectTitle'>{ data.title }</Typography>
                    <Box className="projectArrow">
                        <Box></Box>
                    </Box>
                </Stack>
                <Typography className='projectDescription'>{ data.description }</Typography>
                <Box className="projectImageContainer shine">
                    <img src={ data.image } alt={ data.name + " project from Nami" } loading='lazy' />
                </Box>
            </Stack>
        </Box>
    )
});