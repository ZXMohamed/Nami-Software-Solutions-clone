import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Container,
    Drawer,
    IconButton,
    Stack
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from "react-router";

//*Images
import logo from "../assets/photo/global/namilogo.svg";

function Navbar() {

    return (
        <AppBar position="fixed" color="transparent" elevation={ 0 } className="navbar" data-aos="navbarshrink" data-aos-duration="1000" data-aos-offset="930" data-aos-once="false">
            <Container maxWidth="lg" disableGutters={ true }>
                <Toolbar className="navcontent" disableGutters={ true } sx={ { padding: { lg: "0px 10px 0px 15px", md: "0px 1% 0px 1.8%",xs: " 0px 3% 0px 3.3%" } } }>
                    <img src={ logo } className="navlogo" alt="Nami Software Solutions"/>
                    <Stack direction="row"  >    
                        <Stack direction="row" spacing={ 0 } className="navbaritems" sx={ { display: { md: "flex" ,xs:"none" } } }>
                            <span className="navbaractiveitem">Home</span>
                            <span>About us</span>
                            <span>Services</span>
                            <span>Our products</span>
                            <span>Portfolio</span>
                            <span>Marketing</span>
                            <span>Careers</span>
                            <span>Contact us</span>
                        </Stack>
                        <div className="navbarlang">
                            <button>ع</button>
                        </div>
                        <Sidemenu/>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;


function Sidemenu() {
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <IconButton disableRipple="false" sx={{display:{md:"none",xs:"flex"}}} onClick={ () => setOpenDrawer(!openDrawer) }>
                <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer anchor="left" open={ openDrawer } onClose={ () => setOpenDrawer(false) } >
                <Toolbar sx={{justifyContent:"flex-start",alignItems:"flex-start"}}>
                    <Stack direction="column" spacing={ 0.8 } pt={ 4 } className="navsidemenu">
                        <img src={ logo } className="navlogo" />
                        <div className="navbaractiveitem">Home</div>
                        <div>About us</div>
                        <div>Services</div>
                        <div>Our products</div>
                        <div>Portfolio</div>
                        <div>Marketing</div>
                        <div>Careers</div>
                        <div>Contact us</div>
                    </Stack>
                </Toolbar>
            </Drawer>
        </>
    );
}
