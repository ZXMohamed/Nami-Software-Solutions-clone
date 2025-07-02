import React, { useState } from 'react'
import { Box, CircularProgress, Container, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material'
import Sectionheader from './sectionheader'
import Infocard from './infocard'
import { Statisricslist, Statisticsbox } from './statisricsbox'
import { Servicebadge, servicebadgesize, Servicesbadgeslist, servicesbadgeslisttype } from './servicesbadges'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'

import circle from "../assets/photo/ourproducts/circle/circle.webp";
import mishwar from "../assets/photo/ourproducts/Mishwar/Mishwar.webp";
import ADhmn from "../assets/photo/ourproducts/ADhmn/ADhmn.webp";

import { useGetProductsQuery } from '../redux/server state/products'
import { useGetStatisticsQuery } from '../redux/server state/statistics'
import { object } from 'zod'

export default function Ourproducts() {

    return (
    <>
        <Box className={'ourproductssec'}>
            <Sectionheader title={ "Where quality meets innovation" } subtitle={ "Our products" } showallurl={ "" } />
            <Products/>
        </Box>
        <Statistics/>
    </>
  )
}

export function Products() {
    const { isLoading, isSuccess, data:products, isError, error} = useGetProductsQuery();
    // const [products,setproducts] = useState([{
    //     name: "Circle",
    //     description: "A world of shopping at your fingertips. We are a unique shopping app that provides you with all your groceries and consumer goods. You can order everything your home needs, from fresh vegetables and fruits, groceries, dairy and cheese, fresh meats and poultry, frozen products of all kinds, snacks, baked goods and sweets, cleaning supplies, baby care products, personal care items, and pet food. All this and more in one place near you, just a click away. Download the app and enjoy a fast delivery experience that brings your essentials right to your doorstep, wherever you are.",
    //     image: circle,
    //     badges: ["website", "applicationdesign", "iosapp"]
    // },{
    //     name: "Mishwar",
    //     description: "We are **Mishwar**, a leading company in the delivery services sector with extensive experience in effectively meeting our customers' needs with high quality. We are passionate about making the delivery experience easy and convenient for everyone.",
    //     image: mishwar,
    //     badges:["website", "applicationdesign"]
    // },{
    //     name: "ADhmn",
    //     description: "**Odamn Home Maintenance Company** Odamn is not just an app... Odamn is a set of tools designed for you, bringing all home maintenance services right to your home, establishment, or retreat. In short, Odamn is an app, a website, a customer service center, equipment, and technicians all aimed at providing you with top-notch service. Odamn represents a new way of thinking. Our slogan is \"Home maintenance at the touch of an app on your phone.\"",
    //     image: ADhmn,
    //     badges:[ "applicationdesign", "website", "androidapplication", "iosapp"]
    // }]);
    
    const ismdsize = useMediaQuery('(max-width:992px)');
    const isxxxssize = useMediaQuery('(max-width:600px)');

    return (
        <Container maxWidth="lg">
            <Swiper slidesPerView={ ismdsize ? (isxxxssize ? 1 : 2) : 3 } spaceBetween={ 10 } loop={ true } autoplay={ { delay: 2000, disableOnInteraction: false } } modules={ [Autoplay] } className='slider'>
                { isLoading && Waititem(3) }
                { isSuccess && Object.values(products).map((val, inx) => {
                    return (<SwiperSlide key={val.id} className='slide'>
                                <Productcard data={val} aosanimation={ { "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-delay": (100 * inx).toString() } }/>
                            </SwiperSlide>)
                }) }
                {isError && <h1>data not found !</h1>}
            </Swiper>
        </Container>
  )
}

function Productcard({ data, aosanimation }) {
    if (!data.image && !data.title) { 
        throw "product name or image unset !"
    }
  return (
    <Box className='productcard' {...aosanimation}>
        <Stack direction={"column"} >
            <Box className="shine">
            <img src={ data.image } alt={ data.title + " service product from nami" } loading='lazy' />
            </Box>
            <Typography variant='h6' component={'h3'}>{data.title}</Typography>
            <Typography>{data.description}</Typography>
            <Box className="badges">            
                <Servicesbadgeslist type={servicesbadgeslisttype.box}>
                    {data.servicebadges.map((val,inx)=><Servicebadge key={val.id} data={val} size={servicebadgesize.small}/>)}
                </Servicesbadgeslist>
            </Box>
        </Stack>
    </Box>
  )
}

function Waititem(num = 1) { 
    const skeletonarray = [];
    for (let i = 0; i < num; i++) { 
        skeletonarray.push(
            <SwiperSlide key={i} className='slide'>
                <Skeleton width={ "100%" } height={ 500 } variant='rounded' />
            </SwiperSlide>
        )
    }
    return skeletonarray;
}

export function Statistics() {
    const { isLoading, isError, isSuccess, data: statistics, error } = useGetStatisticsQuery();
    // const [namistatisrics,setnamistatisrics] = useState([{
    //     title: "Years",
    //     value: "8",
    //     type: "+",
    // },{
    //     title: "Projects",
    //     value: "75",
    //     type: "+",
    // },{
    //     title: "Mobile application",
    //     value: "200",
    //     type: "+",
    // },{
    //     title: "Websites",
    //     value: "160",
    //     type: "+",
    // },{
    //     title: "Customer satisfaction",
    //     value: "95",
    //     type: "%",
    // }]);
    
    return (
        <Box className='infocardsec'>
            <Infocard title={ "Good planning is not enough Great callings require the extraordinary!" } subtitle={ "Statistics" }>
                <Statisricslist>
                    {isLoading && Waitprogress(5)}
                    { isSuccess && Object.values(statistics).map((val, inx) => <Statisticsbox key={val.id} value={val.value} type={val.type} title={val.title} />) }
                    {isError && <h1>data not found !</h1>}
                </Statisricslist>
            </Infocard>
        </Box>
  )
}


function Waitprogress(num = 1) { 
    const progressarray = [];
    for (let i = 0; i < num; i++) { 
        progressarray.push(<CircularProgress variant="indeterminate" color='secondary' size={40} thickness={2}/>)
    }
    return progressarray;
}