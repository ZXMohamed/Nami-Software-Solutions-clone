import { Box, Typography, Stack, Button } from "@mui/material";
import Socialbuttons from "./socialbuttons";
import Requestbutton from "./requestbutton";

export default function Home() { 

    return (
        <Box sx={ { minHeight: { xs: "500px", sm: "660px" } } } className="homesec">
            <Typography variant="h2" component="h1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="50">
                <b>Nami <span>Software</span> Solutions</b>
            </Typography>
            
            <Typography data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
                For website design and development services and phone applications operating
                on the Android and iOS operating systems, the company provides integrated web
                solutions to all institutions in the world and has a huge customer base in all
                countries of the world.
            </Typography>

            <Socialbuttons aosanimation={ { ["data-aos"]: "fade-up",["data-aos-duration"] : "1000",["data-aos-delay"]: "150" } }/>

            <Stack direction="row" spacing={ { xs:0,xxs:2} } className="homebtns" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                <Button variant="outlined" disableRipple="false" className="homebtn homeportfoliobtn">Portfolio</Button>
                <Requestbutton sx={ {order:{xs:"-1",xxs:"1",xxxs:"0"}}} />
                <Button variant="outlined" disableRipple="false" className="homebtn homeproductsbtn">Our products</Button>
            </Stack>
            
            <Box className="homesecbg">
                <div className="homebackanimatedBGdelay-5"></div>
                <div className="homebackanimatedBGdelay-3"></div>
                <div className="homebackanimatedBGdelay-2"></div>
                <div className="homebackanimatedBGdelay-4"></div>
                <div className="homebackanimatedBGdelay-3"></div>
                <div className="homebackanimatedBGdelay-5"></div>
                <div className="homebackanimatedBGdelay-4"></div>
            </Box>
        </Box>
    )
}