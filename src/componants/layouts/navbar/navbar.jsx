//*react
import React, { memo } from "react";
//*route
import { Link, useLocation, useParams } from "react-router";
//*mui
import { AppBar, Toolbar, Container, Stack } from "@mui/material";
//*styles
import "../../../sass/shared/navbar.scss"
//*hooks
import { useContent } from "../../../languages/hooks/usecontent";
//*components
import SideMenu from "./sidemenu";
import LanguageButton from "./languagebutton";
import LogoLink from "../../shared/logolink";
//*scripts
import { getPage, navSettings } from "../../../routes/routesmanager";
import { activeTabAnimation } from "./pageactivetabs";
//*assets
import logo from "../../../assets/photo/global/namilogo.svg";
import { navBarAosAnimation } from "../../../animation/navbar";

const NavBar = memo(() => {
    console.log("NB");

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                logo: content.navBar.navLogo,
                logoAlt:content.navBar.navLogoAlt,
                navTabs: content.navBar.navTabs
            }
        } else {
            return firstContent;
        }
    })();


    return (
        <AppBar dir={ defaultContent.direction } color="transparent" elevation={ 0 } className="navBar" { ...navBarAosAnimation }>
            <Container maxWidth="lg" disableGutters>
                <Toolbar className="navContent" disableGutters>
                    <LogoLink>
                        <img src={ defaultContent.logo } width={ "126px" } height={ "43px" } alt={defaultContent.logoAlt} loading="lazy" className="navLogo" />
                    </LogoLink>
                    <Stack direction="row">
                        <Stack direction="row" className="navBarItems">
                            <Tabs defaultContent={defaultContent}/>
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



function Tabs({ defaultContent }) {
    
    const location = useLocation();
    const { language : urlLang } = useParams();

    if (getPage(location, urlLang) == "main") { 
        const nav = navSettings(urlLang, true);
        return Object.keys(defaultContent.navTabs).map((tab, inx) => {
            if (nav[tab.toLowerCase()].outerRoute)
                return <Link key={ inx } to={nav[tab.toLowerCase()].link} dir={defaultContent.direction} { ...activeTabAnimation(tab) }> { defaultContent.navTabs[tab].title } </Link>;
            else
            return <a key={ inx } href={nav[tab.toLowerCase()].link} dir={defaultContent.direction} { ...activeTabAnimation(tab) }> { defaultContent.navTabs[tab].title } </a>;
        })
    } else {
        const nav = navSettings(urlLang, false);
        return Object.keys(defaultContent.navTabs).map((tab, inx) => {
            return <Link key={ inx } to={nav[tab.toLowerCase()].link} dir={defaultContent.direction}> { defaultContent.navTabs[tab].title } </Link>;
        })
    }

}


const firstContent = {
    direction: "ltr",
    logo: logo,
    logoAlt:"Nami Software Solutions",
    navTabs: {
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
}