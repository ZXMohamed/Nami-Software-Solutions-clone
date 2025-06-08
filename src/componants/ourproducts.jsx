import { Box, Container, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import Sectionheader from './sectionheader'
import Infocard from './infocard'
import { Statisricslist, Statisticsbox } from './statisricsbox'

import circle from "../assets/photo/ourproducts/circle/circle.webp";
import mishwar from "../assets/photo/ourproducts/Mishwar/Mishwar.webp";
import ADhmn from "../assets/photo/ourproducts/ADhmn/ADhmn.webp";

export default function Ourproducts() {

    const [products,setproducts] = useState([{
        name: "Circle",
        description: "A world of shopping at your fingertips. We are a unique shopping app that provides you with all your groceries and consumer goods. You can order everything your home needs, from fresh vegetables and fruits, groceries, dairy and cheese, fresh meats and poultry, frozen products of all kinds, snacks, baked goods and sweets, cleaning supplies, baby care products, personal care items, and pet food. All this and more in one place near you, just a click away. Download the app and enjoy a fast delivery experience that brings your essentials right to your doorstep, wherever you are.",
        image: circle,
        badges:[]
    },{
        name: "Mishwar",
        description: "We are **Mishwar**, a leading company in the delivery services sector with extensive experience in effectively meeting our customers' needs with high quality. We are passionate about making the delivery experience easy and convenient for everyone.",
        image: mishwar,
        badges:[]
    },{
        name: "ADhmn",
        description: "**Odamn Home Maintenance Company** Odamn is not just an app... Odamn is a set of tools designed for you, bringing all home maintenance services right to your home, establishment, or retreat. In short, Odamn is an app, a website, a customer service center, equipment, and technicians all aimed at providing you with top-notch service. Odamn represents a new way of thinking. Our slogan is \"Home maintenance at the touch of an app on your phone.\"",
        image: ADhmn,
        badges:[]
    }]);

    return (
    <>
        <Box className={'ourproductssec'}>
            <Sectionheader title={"Where quality meets innovation"} subtitle={"Our products"} showallurl={""}/>
            <Container maxWidth="lg">
                <Stack direction={'row'} spacing={1.4}>
                    {products.map((val,inx)=>{
                        return (
                            <Productcard key={ inx } image={ val.image } name={ val.name } description={ val.description } badges={ val.badges } aosanimation={ { "data-aos": "fade-up", "data-aos-duration": "1000", "data-aos-delay": (100 * inx).toString() } }/>
                        )
                    })}
                </Stack>
            </Container>
        </Box>
        <Box className='infocardsec'>{/*//$use loop on obj */}
            <Infocard title={ "Good planning is not enough Great callings require the extraordinary!" } subtitle={ "Statistics" }>
                <Statisricslist>
                    <Statisticsbox value="8" type="+" title="Years" />
                    <Statisticsbox value="75" type="+" title="Projects"/>
                    <Statisticsbox value="200" type="+" title="Mobile Application"/>
                    <Statisticsbox value="160" type="+" title="Websites"/>
                    <Statisticsbox value="95" type="%" title="Customer satisfaction"/>
                </Statisricslist>
            </Infocard>
        </Box>
    </>
  )
}



function Productcard({ image, name, description, badges, aosanimation }) {{/*//$ set aos on slider */}
    if (!image && !name) { 
        throw "product name or image unset !"
    }
  return (
    <Stack direction={"column"} className='productcard'>
        <Box className="shine">
          <img src={ image } alt={ name + " shopping service product from nami" } loading='lazy' />
        </Box>
        <Typography variant='h6' component={'h3'}>{name}</Typography>
        <Typography>{description}</Typography>
        {/*//$ services badges*/}
    </Stack>
  )
}
