import { Box, Typography, Stack, Button } from "@mui/material";
import SocialButtons from "./socialbuttons";
import RequestButton from "./requestbutton";
import { useContext, useState } from "react";
import { Language } from "../languages/languagesContext";
import RequestQuotationForm from './requestquotationform';

export default function Home() { 

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
    
    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
        title : language_isSuccess ? language.home.title : { first : "Nami", middle : "Software", last : "Solutions" },
        description : language_isSuccess ? language.home.description : "For website design and development services and phone applications operating on the Android and iOS operating systems, the company provides integrated web solutions to all institutions in the world and has a huge customer base in all countries of the world.",
        buttons:{
            portfolio : language_isSuccess ? language.home.buttons.portfolio : "Portfolio",
            ourProducts : language_isSuccess ? language.home.buttons.ourProducts : "our Products",
            requestQuotation : language_isSuccess ? language.home.buttons.requestQuotation : "Request for Quotation"
        }
    }
    
    const [requestFormOpen, setRequestFormOpen] = useState(false);


    return (
        <Box className="homeSection" dir={defaultContent.direction}>
            <Typography variant="h2" component="h1" className="homeTitle" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
                {defaultContent.title.first} <span>{defaultContent.title.middle}</span> {defaultContent.title.last}
            </Typography>
            
            <Typography className="homeDescription" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                {defaultContent.description}
            </Typography>

            <SocialButtons aosAnimation={ { ["data-aos"]: "fade-up",["data-aos-duration"] : "1000",["data-aos-delay"]: "150" } }/>

            <Stack direction="row" gap={ { xs:0,xxs:2} } className="homeButtons" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <Button variant="outlined" disableRipple="false" className="homeButton homePortfolioButton">{defaultContent.buttons.portfolio}</Button>
                <RequestButton title={ defaultContent.buttons.requestQuotation } className="homeRequestButton" onClick={ ()=>setRequestFormOpen(true) } />
                <Button variant="outlined" disableRipple="false" className="homeButton homeProductsButton">{defaultContent.buttons.ourProducts}</Button>
            </Stack>
            
            <FallingBackground />

            { requestFormOpen && <RequestQuotationForm closeButton={ ()=>setRequestFormOpen(false) } />}
        </Box>
    )
}



function FallingBackground() {
  return (
        <Box className="fallingBackground">
            <div className="fallingBackgroundDelay-5"></div>
            <div className="fallingBackgroundDelay-3"></div>
            <div className="fallingBackgroundDelay-2"></div>
            <div className="fallingBackgroundDelay-4"></div>
            <div className="fallingBackgroundDelay-3"></div>
            <div className="fallingBackgroundDelay-5"></div>
            <div className="fallingBackgroundDelay-4"></div>
        </Box>
    )
}
