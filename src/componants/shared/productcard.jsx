//*react
import React, { memo, useEffect } from 'react'
//*route
import { useNavigate, useParams } from 'react-router'
import { pages_routes } from '../../routes/routes'
//*mui
import { Box, Stack, Typography } from '@mui/material'
import HideImageIcon from '@mui/icons-material/HideImage';
//*component
import { ServiceBadge, serviceBadgeSize, ServicesBadgesList, servicesBadgesListType } from './servicesbadges'
//*styles
import "../../sass/shared/productcard.scss"
//*hooks
import useCashedImage from '../../hooks/usecashedimage'



export const ProductCard = memo(({ dir, data, aosAnimation, language }) => {
    if (!data || (data && Object.keys(data).length == 0)) return <></>;

    const navigation = useNavigate();

    const [image, cashImage] = useCashedImage(data.image, "products", data.id);

    useEffect(() => {
        cashImage();
    },[])

    return (
        <Box className='productCard' { ...aosAnimation } onClick={ () => navigation(pages_routes(language, data.id, data.title.replaceAll(" ","-"))["product details"].link) }>
            <Stack dir={ dir } direction={ "column" } >
                <Box className="productImageContainer shine">
                    <img src={ image } alt={ data.title } loading='lazy' />
                    {!image && <HideImageIcon color='error' fontSize="large" sx={{p:1}}/>}
                </Box>
                <Typography variant='h6' component={ 'h3' } className='productTitle'>{ data.title }</Typography>
                <Typography className='productDescription'>{ data.description }</Typography>
                <Box className="badgesContainer">
                    <ServicesBadgesList dir={ dir } type={ servicesBadgesListType.box }>
                        { data.serviceBadges.map((badge, inx) => <ServiceBadge key={ badge.id } data={ badge } size={ serviceBadgeSize.small } />) }
                    </ServicesBadgesList>
                </Box>
            </Stack>
        </Box>
    )
});