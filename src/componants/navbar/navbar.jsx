//*react
import React, { useContext, useMemo } from "react";
//*mui
import { AppBar, Toolbar, Container, Stack } from "@mui/material";
//*styles
import "../../sass/shared/navbar.scss"
//*components
import { SideMenu } from "./sidemenu";
import { LanguageButton } from "./languagebutton";
//*scripts
import { Language } from "../../languages/languagesContext";
//*assets
import logo from "../../assets/photo/global/namilogo.svg";

const navBarAosAnimation = {
    ["data-aos"]: "navBarShrink",
    ["data-aos-duration"]: "1000",
    ["data-aos-offset"]: "930",
    ["data-aos-once"]: "false"
}

function NavBar() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
    
    const defaultContent = useMemo(() => ({ 
        direction : language_isSuccess ? language.page.direction : "ltr",
        logo : language_isSuccess ? language.navBar.navLogo : logo,
        navTabs : language_isSuccess ? language.navBar.navTabs : ["Home","About us","Services","Our products","Portfolio","Marketing","Blogs","Careers","Contact us"]
    }),
        [language, language_isSuccess]
    );


    return (
        <AppBar dir={defaultContent.direction} color="transparent" elevation={ 0 } className="navBar" {...navBarAosAnimation}>
            <Container maxWidth="lg" disableGutters>
                <Toolbar className="navContent" disableGutters>
                    <img src={ defaultContent.logo } width={"126px"} height={"43px"} alt="Nami Software Solutions" loading="lazy" className="navLogo"/>
                    <Stack direction="row">    
                        <Stack direction="row" className="navBarItems">
                            {
                                defaultContent.navTabs.map((tab, inx) => {
                                    const activeItem = inx == 0 ? "navBarActiveItem" : ""; 
                                    return <span key={ inx } className={ activeItem }> { tab } </span>;
                                })
                            }
                        </Stack>
                        <LanguageButton/>
                        <SideMenu/>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;