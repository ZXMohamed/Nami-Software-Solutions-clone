import React, { useState } from "react";
import { AppBar, Toolbar, Container, Drawer, IconButton, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

//*Images
import logo from "../assets/photo/global/namilogo.svg";

const navBarTabs = ["Home","About us","Services","Our products","Portfolio","Marketing","Blogs","Careers","Contact us"]

function NavBar() {

    return (
        <AppBar position="fixed" color="transparent" elevation={ 0 } className="navBar" data-aos="navBarShrink" data-aos-duration="1000" data-aos-offset="930" data-aos-once="false">
            <Container maxWidth="lg" disableGutters={ true }>
                <Toolbar className="navContent" disableGutters={ true }>
                    <img src={ logo } className="navLogo" alt="Nami Software Solutions"/>
                    <Stack direction="row">    
                        <Stack direction="row" className="navBarItems">
                            { navBarTabs.map((tab, inx) => <span key={ inx } className={ inx==0 ? "navBarActiveItem" : "" }> {tab} </span> )}
                        </Stack>
                        <div className="navBarLang">
                            <button>ع</button>
                        </div>
                        <SideMenu/>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;


function SideMenu() {
    
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <IconButton disableRipple="false" className="navSideMenuButton" onClick={ () => setOpenDrawer(!openDrawer) }>
                <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer anchor="left" open={ openDrawer } onClose={ () => setOpenDrawer(false) } >
                <Toolbar className="navSideMenuContent">
                    <Stack direction="column" spacing={ 0.8 } className="navSideMenu">
                        <img src={ logo } className="navLogo" />
                        { navBarTabs.map((tab, inx) => <div key={ inx } className={ "navSideMenuItem " + (inx== 0 ? "navBarActiveItem" : "") }> {tab} </div> )}
                    </Stack>
                </Toolbar>
            </Drawer>
        </>
    );
}
