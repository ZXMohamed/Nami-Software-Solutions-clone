//*react
import React, { memo, useEffect } from 'react'
//*route
import { useNavigate, useParams } from 'react-router';
import { pages_routes } from '../../routes/routes';
//*mui
import { Box, Stack, Typography } from '@mui/material';
import HideImageIcon from '@mui/icons-material/HideImage';
//*styles
import "../../sass/shared/projectscard.scss"
//*hooks
import useCashedImage from '../../hooks/usecashedimage';

export const ProjectCard = memo(({ dir, data, bordered, aosAnimation, style }) => {
    if (!data || (data && Object.keys(data).length == 0)) return <></>;

    const navigation = useNavigate();
    const { language: urlLang } = useParams();

    const [image, cashImage] = useCashedImage(data.image, "portfolio", data.id);

    useEffect(() => {
        cashImage();
    }, []);

    return (
        <Box dir={ dir } className='projectCard' { ...aosAnimation } sx={style} onClick={ () => navigation(pages_routes(urlLang, data.id, data.title)["project details"].link)}>
            <Stack dir={dir} direction={ "column" } spacing={ 1 } sx={{borderWidth:(bordered?1:0)}}>
                <Stack direction={ 'row' } className='projectHeader'>
                    <Typography variant='h6' component={ 'h3' } className='projectTitle'>{ data.title }</Typography>
                    <Box className="projectArrow">
                        <Box></Box>
                    </Box>
                </Stack>
                <Typography className='projectDescription'>{ data.description }</Typography>
                <Box className="projectImageContainer shine">
                    <img src={ image } alt={ data.title } loading='lazy' />
                    {!image && <HideImageIcon fontSize='large' color='error' />}
                </Box>
            </Stack>
        </Box>
    )
});