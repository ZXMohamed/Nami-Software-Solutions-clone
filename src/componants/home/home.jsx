//*react
import { useContext, useMemo } from "react";
//*mui
import { Box, Typography, Stack, Button } from "@mui/material";
//*components
import SocialButtons from "../social&contacts/socialbuttons";
import RequestQuotation from "./RequestQuotation";
import FallingBackground from "./fallingbackground";
//*scripts
import { Language } from "../../languages/languagesContext";

export default function Home() { 
console.log("home");
    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
    
    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        title: language_isSuccess ? language.home.title : { first: "Nami", middle: "Software", last: "Solutions" },
        description: language_isSuccess ? language.home.description : "For website design and development services and phone applications operating on the Android and iOS operating systems, the company provides integrated web solutions to all institutions in the world and has a huge customer base in all countries of the world.",
        buttons: {
            portfolio: language_isSuccess ? language.home.buttons.portfolio : "Portfolio",
            ourProducts: language_isSuccess ? language.home.buttons.ourProducts : "our Products",
            requestQuotation: language_isSuccess ? language.home.buttons.requestQuotation : "Request for Quotation"
        }
    }), [language, language_isSuccess]);

    return (
        <Box className="homeSection" dir={ defaultContent.direction }>
            
            <Typography variant="h2" component="h1" className="homeTitle" {...titleAosAnimation}>
                {defaultContent.title.first} <span>{defaultContent.title.middle}</span> {defaultContent.title.last}
            </Typography>
            
            <Typography className="homeDescription" {...descriptionAosAnimation}>
                {defaultContent.description}
            </Typography>

            <SocialButtons aosAnimation={ { ...socialButtonsAosAnimation } }/>

            <Stack direction="row" gap={ { xs: 0, xxs: 2 } } className="homeButtons" {...homeButtonsAosAnimation}>
                <Button variant="outlined" disableRipple className="homeButton homePortfolioButton">{defaultContent.buttons.portfolio}</Button>
                <RequestQuotation/>
                <Button variant="outlined" disableRipple className="homeButton homeProductsButton">{ defaultContent.buttons.ourProducts }</Button>
            </Stack>
            
            <FallingBackground/>

        </Box>
    )
}



const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]: "1000",
}
const titleAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "50"
}
const descriptionAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "100"
}
const socialButtonsAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "150"
}
const homeButtonsAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "200"
}