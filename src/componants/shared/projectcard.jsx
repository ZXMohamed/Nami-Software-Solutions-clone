//*react
import React, { memo, useEffect } from 'react'
//*mui
import { Box, Stack, Typography } from '@mui/material';
//*styles
import "../../sass/shared/projectscard.scss"
//*hooks
import useCashedImage from '../../hooks/usecashedimage';

export const ProjectCard = memo(({ dir, data, bordered, aosAnimation, style }) => {
    if (!data || (data && Object.keys(data).length == 0)) return <></>;

    const [image, cashImage] = useCashedImage(data.image, "portfolio", data.id);

    useEffect(() => {
        cashImage();
    }, []);

    return (
        <Box dir={ dir } className='projectCard' { ...aosAnimation } sx={ style }>
            <Stack dir={ dir } direction={ "column" } spacing={ 1 } sx={ { borderWidth: (bordered ? 1 : 0) } }>
                <Stack direction={ 'row' } className='projectHeader'>
                    <Typography variant='h6' component={ 'h3' } className='projectTitle'>{ data.title }</Typography>
                    <Box className="projectArrow">
                        <Box></Box>
                    </Box>
                </Stack>
                <Typography className='projectDescription'>{ data.description }</Typography>
                <Box className="projectImageContainer shine">
                    <img src={ image } alt={ data.title + " project from Nami" } loading='lazy' />
                    {image===null && <><br/><Typography color='error' sx={{p:2}}>Can't Load Image</Typography></>}
                </Box>
            </Stack>
        </Box>
    )
});