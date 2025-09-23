//*react
import React, { memo, useContext, useMemo } from "react";
//*route
import { Link, useLocation, useParams } from "react-router";
//*mui
import { AppBar, Toolbar, Container, Stack } from "@mui/material";
//*styles
import "../../../sass/shared/navbar.scss"
//*components
import SideMenu from "./sidemenu";
import LanguageButton from "./languagebutton";
//*scripts
import { Language } from "../../../languages/languagesContext";
import { navSettings } from "../../../routes/routesmanager";
import { activeTabAnimation } from "./pageactivetabs";
//*assets
import logo from "../../../assets/photo/global/namilogo.svg";

const NavBar = memo(() => {
    console.log("NB");
    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
    
    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        logo: language_isSuccess ? language.navBar.navLogo : logo,
        navTabs: language_isSuccess ? language.navBar.navTabs : {
            "Home": { title: "Home" },
            "About us": { title: "About us" },
            "Services": { title: "Services" },
            "Our products": { title: "Our products" },
            "Portfolio": { title: "Portfolio" },
            "Marketing": { title: "Marketing" },
            "Blogs": { title: "Blogs" },
            "Careers": { title: "Careers" },
            "Contact us": { title: "Contact us" },
        }
    }),
        [language, language_isSuccess]
    );

    const location = useLocation();
    const { language: urlLang } = useParams();

    function logoLink(logo) {
        const nav = navSettings("Home", location, urlLang);
        if (nav.outerRoute) {
            return <Link to={nav.link}>
                {logo}
            </Link>
        } else {
            return <a href={nav.link}>
                {logo}
            </a>
        }
    }

    return (
        <AppBar dir={ defaultContent.direction } color="transparent" elevation={ 0 } className="navBar" { ...navBarAosAnimation }>
            <Container maxWidth="lg" disableGutters>
                <Toolbar className="navContent" disableGutters>
                    { logoLink(<img src={ defaultContent.logo } width={ "126px" } height={ "43px" } alt="Nami Software Solutions" loading="lazy" className="navLogo" />) }
                    <Stack direction="row">
                        <Stack direction="row" className="navBarItems">
                            {
                                Object.keys(defaultContent.navTabs).map((tab, inx) => {
                                    const nav = navSettings(tab, location, urlLang);
                                    if (nav.outerRoute)
                                        return <Link key={ inx } to={nav.link} dir={defaultContent.direction} { ...activeTabAnimation(tab,location) }> { defaultContent.navTabs[tab].title } </Link>;
                                    else
                                        return <a key={ inx } href={nav.link} dir={defaultContent.direction} { ...activeTabAnimation(tab,location) }> { defaultContent.navTabs[tab].title } </a>;
                                })
                            }
                        </Stack>
                        <LanguageButton />
                        <SideMenu />
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
});

export default NavBar;



const navBarAosAnimation = {
    ["data-aos"]: "navBarShrink",
    ["data-aos-duration"]: "3000",
    ["data-aos-offset"]: "930",
    ["data-aos-once"]: "false"
}