//*react
import React, { memo } from 'react'
//*route
import { useNavigate, useParams } from 'react-router'
import { pages_routes } from '../../routes/routes'
//*mui
import { Box, Stack, Typography } from '@mui/material'
//*component
import { ServiceBadge, serviceBadgeSize, ServicesBadgesList, servicesBadgesListType } from './servicesbadges'
//*styles
import "../../sass/shared/productcard.scss"


export const ProductCard = memo(({ dir, data, aosAnimation }) => {
    if (!data || (data && Object.keys(data).length == 0)) return <></>;

    const navigation = useNavigate();
    const { language: urlLang } = useParams();

    return (
        <Box className='productCard' { ...aosAnimation } onClick={ () => navigation(pages_routes(urlLang, data.id, data.title)["product details"].link) }>
            <Stack dir={ dir } direction={ "column" } >
                <Box className="productImageContainer shine">
                    <img src={ data.image } alt={ data.title } loading='lazy' />
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