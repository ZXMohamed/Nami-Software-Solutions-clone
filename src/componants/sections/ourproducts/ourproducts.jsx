//*react
import React, { memo, useMemo } from 'react'
//*route
import { pages_routes } from '../../../routes/routes'
//*mui
import { Box, Container, Typography, useMediaQuery } from '@mui/material'
//*swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
//*hooks
import useUpdateEffect from '../../../hooks/useupdateeffect'
import { useContent } from '../../../languages/hooks/usecontent'
//*component
import SectionHeader from '../../shared/sectionheader'
import { Statistics } from './statistics'
import { ProductCard } from '../../shared/productcard'
import { waitItemSkeleton } from '../../loadingitems/ourproducts'
//*queries
import { useGetProductsQuery } from '../../../redux/server state/products'
//*scripts
import { defaultLanguage } from '../../../languages/languagesContext'
//*styles
import "../../../sass/shared/productcard.scss"
//*animation
import { productCardAosAnimation } from '../../../animation/ourproducts'


export default function OurProducts() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                header: {
                    title: content.products.header.title,
                    subtitle: content.products.header.subtitle,
                    buttons: {
                        headerButton: content.products.header.buttons.headerButton
                    }
                }
            }
        } else {
            return ourProductsFirstContent;
        }
    })();

    return (
        <>
            <Box id="ourproducts" dir={defaultContent.direction} className={'ourProductsSection'}>
                <SectionHeader dir={defaultContent.direction} title={ defaultContent.header.title } subtitle={ defaultContent.header.subtitle }  headerButtonTitle={defaultContent.header.buttons.headerButton} headerButtonUrl={ pages_routes(defaultContent.language)["our products"].link } />
                <Products dir={ defaultContent.direction } language={ defaultContent.language } />
            </Box>
            <Statistics/>
        </>
  )
}

const Products = memo(({ dir, language }) => {

    const { isSuccess: products_isSuccess, isFetching: products_isFetching, data: products, isError: products_isError, error: products_error, refetch: products_refetch } = useGetProductsQuery();
    
    const isMDSize = useMediaQuery('(max-width:992px)');
    const isXXXSSize = useMediaQuery('(max-width:600px)');

    const sliderLoopCase = useMemo(() => {
        if (products_isSuccess)
            return Object.values(products).length > visibleSlidesPerSize(isXXXSSize, isMDSize);
        else
            return false;
    }, [isMDSize, isXXXSSize]);

    useUpdateEffect(() => {
        products_refetch()
    }, [language]);

    return (
        <Container maxWidth="lg" disableGutters>
            <Swiper key={dir} dir={dir} slidesPerView={ visibleSlidesPerSize(isXXXSSize, isMDSize) } { ...productsSliderSettings( sliderLoopCase ) } className='productsSlider'>
                { products_isFetching && waitItemSkeleton(3) }
                { (!products_isFetching && products_isSuccess) && Object.values(products).map((product, inx) => {
                    return (<SwiperSlide key={ product.id } className='productsSlide'>
                                <ProductCard dir={ dir } data={ product } aosAnimation={ productCardAosAnimation(inx+1) } />
                            </SwiperSlide>
                    )
                }) }
                { products_isError && <Typography variant="h6" color='error'>{ products_error.data.error }</Typography> }
            </Swiper>
        </Container>
    )
});

const productsSliderSettings = (loop) => ({
    loop: loop,
    spaceBetween: 12,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false
    },
    modules : [Autoplay] 
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

const ourProductsFirstContent = {
    direction: "ltr",
    language: defaultLanguage,
    header: {
        title: "Our products",
        subtitle: "Where quality meets innovation",
        buttons: {
            headerButton: "Show all"
        }
    }
}