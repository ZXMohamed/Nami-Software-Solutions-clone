import React, { useContext, useRef, useState } from "react";
import { AppBar, Toolbar, Container, Drawer, IconButton, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useGetAvailableLanguagesQuery } from "../redux/server state/language";

import "../sass/shared/navbar.scss"

//*Images
import logo from "../assets/photo/global/namilogo.svg";
import { Language } from "../languages/languagesContext";


function NavBar() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
    
    const defaultContent = {
        //$isSuccess then if content has --- && default
        //$logo AR EN
        //$isSuccess then if content has --- && default
        direction : language_isSuccess ? language.page.direction : "ltr",
        logo : language_isSuccess ? language.navBar.navLogo : logo,
        navTabs : language_isSuccess ? language.navBar.navTabs : ["Home","About us","Services","Our products","Portfolio","Marketing","Blogs","Careers","Contact us"]
    }

    return (
        <AppBar position="fixed" color="transparent" elevation={ 0 } dir={defaultContent.direction} className="navBar" data-aos="navBarShrink" data-aos-duration="1000" data-aos-offset="930" data-aos-once="false">
            <Container maxWidth="lg" disableGutters={ true }>
                <Toolbar className="navContent" disableGutters={ true }>
                    <img src={ defaultContent.logo } className="navLogo" alt="Nami Software Solutions" loading="lazy" width={"126px"} height={"43px"}/>
                    <Stack direction="row">    
                        <Stack direction="row" className="navBarItems">
                            { defaultContent.navTabs.map((tab, inx) => <span key={ inx } className={ inx==0 ? "navBarActiveItem" : "" }> {tab} </span> )}
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


function SideMenu() {
    
    const [openDrawer, setOpenDrawer] = useState(false);

    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
        logo : language_isSuccess ? language.navBar.navLogo : logo,
        navTabs : language_isSuccess ? language.navBar.navTabs : ["Home","About us","Services","Our products","Portfolio","Marketing","Blogs","Careers","Contact us"]
    }

    return (
        <>
            <IconButton disableRipple="false" className="navSideMenuButton" onClick={ () => setOpenDrawer(!openDrawer) }>
                <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer anchor={defaultContent.direction == "ltr"?"left":"right" } dir={defaultContent.direction} open={ openDrawer } onClose={ () => setOpenDrawer(false) } >
                <Toolbar className="navSideMenuContent">
                    <Stack direction="column" spacing={ 0.8 } className="navSideMenu">
                        <img src={ defaultContent.logo } className="navLogo" alt="Nami Software Solutions" loading="lazy" width={"126px"} height={"43px"}/>
                        { defaultContent.navTabs.map((tab, inx) => <div key={ inx } className={ "navSideMenuItem " + (inx== 0 ? "navBarActiveItem" : "") }> {tab} </div> )}
                    </Stack>
                </Toolbar>
            </Drawer>
        </>
    );
}

function LanguageButton() {

    // const LanguageButtonTitle = useRef();
    const languageIndex = useRef(0);

    const { data: AL, isSuccess: AL_isSuccess } = useGetAvailableLanguagesQuery();
    
    const { getLanguage, isSuccess: L_isSuccess } = useContext(Language);

    function toggleLanguage(languagesList, languageIndex) {          
        if (languagesList.length - 1 == languageIndex.current) {
            languageIndex.current = 0;
            const language = languagesList[languageIndex.current];
            //$get page name
            getLanguage(language.requestName, "main");
        } else {
            languageIndex.current++;
            const language = languagesList[languageIndex.current];
            //$get page name
            getLanguage(language.requestName, "main");
        }
    }

    function languageButtonTitle(languagesList, languageIndex) {
        if (languagesList.length - 1 == languageIndex.current) {
            return languagesList[0].title;
        } else {
            return languagesList[languageIndex.current + 1].title;
        }
    }
    
    return (
        <>
            {
                AL_isSuccess && AL.languages?.length >= 2 &&
                    <div className="navBarLang">
                        <button onClick={ () => toggleLanguage(AL.languages, languageIndex) }>
                            { languageButtonTitle(AL.languages, languageIndex) }
                        </button>
                    </div>
            }
        </>
    )

}