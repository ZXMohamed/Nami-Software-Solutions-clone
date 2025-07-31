//*react
import React, { useContext, useMemo, useState } from "react";
//*mui
import { Toolbar, Drawer, IconButton, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
//*styles
import "../../sass/shared/navbar.scss";
//*scripts
import { Language } from "../../languages/languagesContext";
//*assets
import logo from "../../assets/photo/global/namilogo.svg";

export function SideMenu() {
    
    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = useMemo(() => ({ 
        direction : language_isSuccess ? language.page.direction : "ltr",
        logo : language_isSuccess ? language.navBar.navLogo : logo,
        navTabs : language_isSuccess ? language.navBar.navTabs : ["Home","About us","Services","Our products","Portfolio","Marketing","Blogs","Careers","Contact us"]
    }),
        [language, language_isSuccess]
    );
    
    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <IconButton className="navSideMenuButton" onClick={ () => setOpenDrawer(!openDrawer) }>
                <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer dir={defaultContent.direction} anchor={ defaultContent.direction == "ltr" ? "left" : "right" }  open={ openDrawer } onClose={ () => setOpenDrawer(false) } >
                <Toolbar className="navSideMenuContent">
                    <Stack direction="column" spacing={ 0.8 } className="navSideMenu">
                        <img src={ defaultContent.logo } width={"126px"} height={"43px"} loading="lazy" alt="Nami Software Solutions" className="navLogo"/>
                        {
                            defaultContent.navTabs.map((tab, inx) => {
                                const activeItem = inx == 0 ? "navBarActiveItem" : "";
                                return <div key={ inx } className={ "navSideMenuItem " + activeItem }> { tab } </div>
                            })
                        }
                    </Stack>
                </Toolbar>
            </Drawer>
        </>
    );
}