//*react
import React, { memo, useContext, useMemo } from 'react'
//*mui
import { Box, Container, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material'
//*swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
//*component
import SectionHeader from '../../shared/sectionheader'
import { ServiceBadge, serviceBadgeSize, ServicesBadgesList, servicesBadgesListType } from '../../shared/servicesbadges'
import { Statistics } from './statistics'
//*queries
import { useGetProductsQuery } from '../../../redux/server state/products'
//*scripts
import { Language } from '../../../languages/languagesContext'
//*styles
import "../../../sass/shared/productcard.scss"

export default function OurProducts() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        header: {
            title: language_isSuccess ? language.products.header.title : "Our products",
            subtitle: language_isSuccess ? language.products.header.subtitle : "Where quality meets innovation",
            buttons: {
                headerButton: language_isSuccess ? language.products.header.buttons.headerButton : "Show all"
            }
        }
    }), [language, language_isSuccess]);
    
    return (
        <>
            <Box dir={defaultContent.direction} className={'ourProductsSection'}>
                <SectionHeader dir={defaultContent.direction} title={ defaultContent.header.title } subtitle={ defaultContent.header.subtitle }  headerButtonTitle={defaultContent.header.buttons.headerButton} headerButtonUrl={ "" } />
                <Products dir={ defaultContent.direction } />
            </Box>
            <Statistics/>
        </>
  )
}

export const Products = memo(({dir}) => {

    const { isSuccess: products_isSuccess, data: products, isError: products_isError } = useGetProductsQuery(undefined, {
        selectFromResult: ({ isSuccess, data, isError }) => ({ isSuccess, data, isError })
    });
    
    const isMDSize = useMediaQuery('(max-width:992px)');
    const isXXXSSize = useMediaQuery('(max-width:600px)');

    const sliderLoopCase = useMemo(() => {
        if (products_isSuccess)
            return Object.values(products).length > visibleSlidesPerSize(isXXXSSize, isMDSize);
        else
            return false;
    }, [isMDSize, isXXXSSize]);

    return (
        <Container maxWidth="lg" disableGutters>{console.log("sda")}
            <Swiper key={"new-"+sliderLoopCase} dir='ltr' slidesPerView={ visibleSlidesPerSize(isXXXSSize, isMDSize) } { ...productsSliderSettings( dir, sliderLoopCase ) } className='productsSlider'>
                { !products_isSuccess && waitItemSkeleton(3) }
                { products_isSuccess && Object.values(products).map((product, inx) => {
                    return (<SwiperSlide key={ product.id } className='productsSlide'>
                                <ProductCard dir={ dir } data={ product } aosAnimation={ productCardAosAnimation(inx+1) } />
                            </SwiperSlide>
                    )
                }) }
                { products_isError && <Typography variant="h6" color='error'>Data Not Found !</Typography> }
            </Swiper>
        </Container>
    )
});

export const ProductCard = memo(({ dir, data, aosAnimation }) => {
    if (!data || (data && Object.keys(data).length == 0)) return <></>;
    return (
        <Box className='productCard' { ...aosAnimation }>
            <Stack dir={ dir } direction={ "column" } >
                <Box className="productImageContainer shine">
                    <img src={ data.image } alt={ data.title + " service product from Nami" } loading='lazy' />
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

const productsSliderSettings = (direction, loop) => ({
    loop: loop,
    spaceBetween: 12,
    autoplay: { delay: 2000, disableOnInteraction: false, reverseDirection: (direction == "ltr" ? false : true) },
    modules : [Autoplay] 
})

const aosAnimation = {
    ["data-aos"] : "fade-up",
    ["data-aos-duration"] : "1000"
}
const productCardAosAnimation = (order) => ({
    ...aosAnimation,
    ["data-aos-delay"] : (100 * order).toString()
})

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

function waitItemSkeleton(num = 1) { 
    const skeletonArray = [];
    for (let i = 0; i < num; i++) {
        skeletonArray.push(
            <SwiperSlide key={ i } >
                <Stack width={"100%"} alignItems={"center"}>
                    <Skeleton width={ "100%" } height={ 400 } variant='rounded' />
                    <br />
                    <Skeleton width={ "30%" } height={ 20 } variant='rounded' />
                    <br />
                    <Skeleton width={ "80%" } height={ 10 } variant='rounded' />
                    <br />
                    <Skeleton width={ "80%" } height={ 10 } variant='rounded' />
                    <br />
                    <Stack direction={ "row" } spacing={3}>
                        <Skeleton width={ 100 } height={ 30 } variant='rounded' />
                        <Skeleton width={ 100 } height={ 30 } variant='rounded' />
                    </Stack>
                    <br />
                    <Stack direction={ "row" } spacing={3}>
                        <Skeleton width={ 100 } height={ 30 } variant='rounded'/>
                        <Skeleton width={ 100 } height={ 30 } variant='rounded' />
                    </Stack>
                </Stack>
            </SwiperSlide>
        )
    }
    return skeletonArray;
}
