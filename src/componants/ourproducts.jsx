import React, { useContext, useState } from 'react'
import { Box, CircularProgress, Container, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material'
import SectionHeader from './sectionheader'
import InfoCard from './infoCard'
import { StatisticsList, StatisticsBox } from './statisticsbox'
import { ServiceBadge, serviceBadgeSize, ServicesBadgesList, servicesBadgesListType } from './servicesbadges'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'

import { useGetProductsQuery } from '../redux/server state/products'
import { useGetStatisticsQuery } from '../redux/server state/statistics'
import { Language } from '../languages/languagesContext'

const productsSliderSettings = {
    loop: true,
    spaceBetween: 12,
    autoplay: { delay: 2000, disableOnInteraction: false },
    modules : [Autoplay] 
};

export default function OurProducts() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
        header:{
            title: language_isSuccess ? language.products.header.title : "Our products",
            subtitle: language_isSuccess ? language.products.header.subtitle : "Where quality meets innovation",
            buttons:{
                headerButton: language_isSuccess ? language.products.header.buttons.headerButton : "Show all"
            }
        }
    }
    
    return (
        <>
            <Box dir={defaultContent.direction} className={'ourProductsSection'}>
                <SectionHeader dir={defaultContent.direction} title={ defaultContent.header.title } subtitle={ defaultContent.header.subtitle }  headerButtonTitle={defaultContent.header.buttons.headerButton} headerButtonUrl={ "" } />
                <Products/>
            </Box>
            <Statistics/>
        </>
  )
}

export function Products() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
    }

    const { isLoading: products_isLoading, isSuccess: products_isSuccess, data: products, isError: products_isError } = useGetProductsQuery();
    
    const isMDSize = useMediaQuery('(max-width:992px)');
    const isXXXSSize = useMediaQuery('(max-width:600px)');

    return (
        <Container maxWidth="lg" disableGutters>
            <Swiper slidesPerView={ visibleSlidesPerSize(isXXXSSize, isMDSize) } dir={ defaultContent.direction } {...productsSliderSettings} className='productsSlider'>
                { products_isLoading && WaitItemSkeleton(3) }
                { products_isSuccess && Object.values(products).map((product, inx) => {
                    return (<SwiperSlide key={product.id} className='productsSlide'>
                                <ProductCard dir={defaultContent.direction} data={product} aosAnimation={ { "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-delay": (100 * inx).toString() } }/>
                            </SwiperSlide>)
                }) }
                {products_isError && <Typography variant="h6" color='error'>Data Not Found !</Typography>}
            </Swiper>
        </Container>
  )
}

function ProductCard({ dir, data, aosAnimation }) {
    if (!data.image && !data.title) { 
        throw "product name or image unset !"
    }
  return (
    <Box className='productCard' {...aosAnimation}>
        <Stack dir={dir} direction={"column"} >
            <Box className="productImageContainer shine">
                <img src={ data.image } alt={ data.title + " service product from Nami" } loading='lazy' />
            </Box>
            <Typography variant='h6' component={'h3'} className='productTitle'>{data.title}</Typography>
            <Typography className='productDescription'>{data.description}</Typography>
            <Box className="badgesContainer">            
                <ServicesBadgesList type={servicesBadgesListType.box}>
                    {data.serviceBadges.map((badge,inx)=><ServiceBadge key={badge.id} data={badge} size={serviceBadgeSize.small}/>)}
                </ServicesBadgesList>
            </Box>
        </Stack>
    </Box>
  )
}

export function Statistics() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
        title: language_isSuccess ? language.statistics.title : "Statistics",
        subtitle: language_isSuccess ? language.statistics.subtitle : "Good planning is not enough Great callings require the extraordinary!",
    }
    
    const { isLoading:statistic_isLoading, isError:statistic_isError, isSuccess:statistic_isSuccess, data: statistics } = useGetStatisticsQuery();
    
    return (
        <Box className='infoCardSection'>
            <InfoCard dir={defaultContent.direction} title={ defaultContent.title } subtitle={ defaultContent.subtitle }>
                <StatisticsList>
                    {statistic_isLoading && waitStatisticProgress(5)}
                    {statistic_isSuccess && Object.values(statistics).map((statistic, inx) => <StatisticsBox key={statistic.id} value={statistic.value} type={statistic.type} title={statistic.title} />) }
                    {statistic_isError && <Typography variant='h6' color='error'>Data Not Found !</Typography>}
                </StatisticsList>
            </InfoCard>
        </Box>
  )
}

function visibleSlidesPerSize(isXXXSSize, isMDSize) {
    //*from smaller size to bigger size
    if (isXXXSSize) {
        return 1;
    } else if (isMDSize) {
        return 2;
    } else {
        return 3;
    }
}

function WaitItemSkeleton(num = 1) { 
    const skeletonArray = [];
    for (let i = 0; i < num; i++) { 
        skeletonArray.push(
            <SwiperSlide key={ i } className='slide'>
                <Stack width={"100%"} alignItems={"center"}>
                    <Skeleton width={ "100%" } height={ 400 } variant='rounded' />
                    <br />
                    <Skeleton width={ "30%" } height={ 20 } variant='rounded' />
                    <br />
                    <Skeleton width={ "80%" } height={ 10 } variant='rounded' />
                    <br/>
                    <Skeleton width={ "80%" } height={ 10 } variant='rounded' />
                    <br />
                    <Stack direction={ "row" } spacing={3}>
                        <Skeleton width={ 100 } height={ 30 } variant='rounded' />
                        <Skeleton width={ 100 } height={ 30 } variant='rounded' />
                        <Skeleton width={ 100 } height={ 30 } variant='rounded'/>
                    </Stack>
                </Stack>
            </SwiperSlide>
        )
    }
    return skeletonArray;
}

function waitStatisticProgress(num = 1) { 
    const progressArray = [];
    for (let i = 0; i < num; i++) { 
        progressArray.push(<CircularProgress key={i} variant="indeterminate" color='secondary' size={40} thickness={2}/>)
    }
    return progressArray;
}