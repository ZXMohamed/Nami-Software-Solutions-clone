import React, { useState } from 'react'
import { Box, Container, Stack, Typography, useMediaQuery } from '@mui/material'
import Sectionheader from './sectionheader'
import Infocard from './infocard'
import { Statisricslist, Statisticsbox } from './statisricsbox'
import { Servicebadge, servicebadgesize, servicebadgetypes, Servicesbadgeslist, servicesbadgeslisttype } from './servicesbadges'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'

import circle from "../assets/photo/ourproducts/circle/circle.webp";
import mishwar from "../assets/photo/ourproducts/Mishwar/Mishwar.webp";
import ADhmn from "../assets/photo/ourproducts/ADhmn/ADhmn.webp";

export default function Ourproducts() {

    return (
    <>
        <Box className={'ourproductssec'}>
            <Sectionheader title={ "Where quality meets innovation" } subtitle={ "Our products" } showallurl={ "" } />
            <Products/>
        </Box>
        <Statisrics/>
    </>
  )
}

export function Products() {

    const [products,setproducts] = useState([{
        name: "Circle",
        description: "A world of shopping at your fingertips. We are a unique shopping app that provides you with all your groceries and consumer goods. You can order everything your home needs, from fresh vegetables and fruits, groceries, dairy and cheese, fresh meats and poultry, frozen products of all kinds, snacks, baked goods and sweets, cleaning supplies, baby care products, personal care items, and pet food. All this and more in one place near you, just a click away. Download the app and enjoy a fast delivery experience that brings your essentials right to your doorstep, wherever you are.",
        image: circle,
        badges: ["website", "applicationdesign", "iosapp"]
    },{
        name: "Mishwar",
        description: "We are **Mishwar**, a leading company in the delivery services sector with extensive experience in effectively meeting our customers' needs with high quality. We are passionate about making the delivery experience easy and convenient for everyone.",
        image: mishwar,
        badges:["website", "applicationdesign"]
    },{
        name: "ADhmn",
        description: "**Odamn Home Maintenance Company** Odamn is not just an app... Odamn is a set of tools designed for you, bringing all home maintenance services right to your home, establishment, or retreat. In short, Odamn is an app, a website, a customer service center, equipment, and technicians all aimed at providing you with top-notch service. Odamn represents a new way of thinking. Our slogan is \"Home maintenance at the touch of an app on your phone.\"",
        image: ADhmn,
        badges:[ "applicationdesign", "website", "androidapplication", "iosapp"]
    }]);
    
    const ismdsize = useMediaQuery('(max-width:992px)');
    const isxxxssize = useMediaQuery('(max-width:600px)');

    return (
        <Container maxWidth="lg">
            <Swiper slidesPerView={ ismdsize ? (isxxxssize ? 1 : 2) : 3 } spaceBetween={ 10 } loop={ true } autoplay={ { delay: 2000,disableOnInteraction: false } } modules={[Autoplay]} className='slider'>
                { products.map((val, inx) => {
                    return (<SwiperSlide key={inx} className='slide'>{/* data-aos="fade-up" data-aos-duration="1000" data-aos-delay={ (100 * inx).toString() } */}
                                <Productcard image={ val.image } name={ val.name } description={ val.description } badges={ val.badges } aosanimation={ { "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-delay": (100 * inx).toString() } }/>
                            </SwiperSlide>)
                })}
            </Swiper>
        </Container>
  )
}

function Productcard({ image, name, description, badges, aosanimation }) {
    if (!image && !name) { 
        throw "product name or image unset !"
    }
  return (
    <Box className='productcard' {...aosanimation}>
        <Stack direction={"column"} >
            <Box className="shine">
            <img src={ image } alt={ name + " shopping service product from nami" } loading='lazy' />
            </Box>
            <Typography variant='h6' component={'h3'}>{name}</Typography>
            <Typography>{description}</Typography>
            <Box className="badges">            
                <Servicesbadgeslist type={servicesbadgeslisttype.box}>
                    {badges.map((val,inx)=><Servicebadge key={inx} type={servicebadgetypes[val]} size={servicebadgesize.small}/>)}
                </Servicesbadgeslist>
            </Box>
        </Stack>
    </Box>
  )
}

function Statisrics() {

    const [namistatisrics,setnamistatisrics] = useState([{
        title: "Years",
        value: "8",
        type: "+",
    },{
        title: "Projects",
        value: "75",
        type: "+",
    },{
        title: "Mobile application",
        value: "200",
        type: "+",
    },{
        title: "Websites",
        value: "160",
        type: "+",
    },{
        title: "Customer satisfaction",
        value: "95",
        type: "%",
    }]);
    
    return (
        <Box className='infocardsec'>
            <Infocard title={ "Good planning is not enough Great callings require the extraordinary!" } subtitle={ "Statistics" }>
                <Statisricslist>
                    { namistatisrics.map((val, inx) => <Statisticsbox key={inx} value={val.value} type={val.type} title={val.title} />) }
                </Statisricslist>
            </Infocard>
        </Box>
  )
}