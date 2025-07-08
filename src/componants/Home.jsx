import { Box, Typography, Stack, Button } from "@mui/material";
import SocialButtons from "./socialbuttons";
import RequestButton from "./requestbutton";

export default function Home() { 

    return (
        <Box className="homeSection">
            <Typography variant="h2" component="h1" className="homeTitle" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
                Nami <span>Software</span> Solutions
            </Typography>
            
            <Typography className="homeDescription" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                For website design and development services and phone applications operating
                on the Android and iOS operating systems, the company provides integrated web
                solutions to all institutions in the world and has a huge customer base in all
                countries of the world.
            </Typography>

            <SocialButtons aosAnimation={ { ["data-aos"]: "fade-up",["data-aos-duration"] : "1000",["data-aos-delay"]: "150" } }/>

            <Stack direction="row" spacing={ { xs:0,xxs:2} } className="homeButtons" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <Button variant="outlined" disableRipple="false" className="homeButton homePortfolioButton">Portfolio</Button>
                <RequestButton title={"Request for Quotation"} className="homeRequestButton" />
                <Button variant="outlined" disableRipple="false" className="homeButton homeProductsButton">Our products</Button>
            </Stack>
            
            <FallingBackground/>
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
