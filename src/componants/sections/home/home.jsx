//*mui
import { Box, Typography, Stack, Button } from "@mui/material";
//*hooks
import { useContent } from "../../../languages/hooks/usecontent";
//*components
import SocialButtons from "../../shared/social&contacts/socialbuttons";
import RequestQuotation from "./RequestQuotation";
import FallingBackground from "./fallingbackground";
//*scripts
import { useNavigate, useParams } from "react-router";
import { pages_routes } from "../../../routes/routes";
//*animation
import { descriptionAosAnimation, homeButtonsAosAnimation, socialButtonsAosAnimation, titleAosAnimation } from "../../../animation/home";

export default function Home() { 
console.log("home");

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                title: content.home.title,
                description: content.home.description,
                buttons: {
                    portfolio: content.home.buttons.portfolio,
                    ourProducts: content.home.buttons.ourProducts,
                    requestQuotation: content.home.buttons.requestQuotation
                }
            }
        } else {
            return firstContent;
        }
    })();


    const { language: urlLang } = useParams();
    const navigate = useNavigate();

    return (
        <Box id="home" className="homeSection" dir={ defaultContent.direction }>
            
            <Typography variant="h2" component="h1" className="homeTitle" {...titleAosAnimation}>
                {defaultContent.title.first} <span>{defaultContent.title.middle}</span> {defaultContent.title.last}
            </Typography>
            
            <Typography className="homeDescription" {...descriptionAosAnimation}>
                {defaultContent.description}
            </Typography>

            <SocialButtons aosAnimation={ socialButtonsAosAnimation }/>

            <Stack direction="row" gap={ 2 } className="homeButtons" {...homeButtonsAosAnimation}>
                <Button variant="outlined" disableRipple className="homeButton homePortfolioButton" onClick={()=>navigate(pages_routes(urlLang)["portfolio"].link)}>{defaultContent.buttons.portfolio}</Button>
                <RequestQuotation/>
                <Button variant="outlined" disableRipple className="homeButton homeProductsButton" onClick={()=>navigate(pages_routes(urlLang)["our products"].link)}>{ defaultContent.buttons.ourProducts }</Button>
            </Stack>
            
            <FallingBackground/>

        </Box>
    )
}


const firstContent = {
    direction: "ltr",
    title: { first: "Nami", middle: "Software", last: "Solutions" },
    description: "For website design and development services and phone applications operating on the Android and iOS operating systems, the company provides integrated web solutions to all institutions in the world and has a huge customer base in all countries of the world.",
    buttons: {
        portfolio: "Portfolio",
        ourProducts: "our Products",
        requestQuotation: "Request for Quotation"
    }
}