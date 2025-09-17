//*react
import React, { memo, useContext, useEffect, useMemo } from "react";
//*mui
import { AppBar, Toolbar, Container, Stack } from "@mui/material";
//*styles
import "../../sass/shared/navbar.scss"
//*components
import SideMenu from "./sidemenu";
import LanguageButton from "./languagebutton";
//*scripts
import { Language } from "../../languages/languagesContext";
//*assets
import logo from "../../assets/photo/global/namilogo.svg";
import { Link, useLocation, useParams } from "react-router";

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


    return (
        <AppBar dir={ defaultContent.direction } color="transparent" elevation={ 0 } className="navBar" { ...navBarAosAnimation }>
            <Container maxWidth="lg" disableGutters>
                <Toolbar className="navContent" disableGutters>
                    <img src={ defaultContent.logo } width={ "126px" } height={ "43px" } alt="Nami Software Solutions" loading="lazy" className="navLogo" />
                    <Stack direction="row">
                        <Stack direction="row" className="navBarItems">
                            {
                                Object.keys(defaultContent.navTabs).map((tab, inx) => {
                                    // const activeItem = inx == 0 ? "navBarActiveItem" : "";
                                    const x = navTabsSettings(tab, location, urlLang);
                                    if (x.reactRouter)
                                        return <Link key={ inx } to={x.link} dir={defaultContent.direction} { ...x.aosAnimation }> { defaultContent.navTabs[tab].title } </Link>;
                                    else
                                        return <a key={ inx } href={x.link} dir={defaultContent.direction} { ...x.aosAnimation }> { defaultContent.navTabs[tab].title } </a>;
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
const activeTabAnimation = (tab) => {
    const sectionsList = ["Home", "About us", "Services", "Our products", "Portfolio", "Careers", "Contact us"]; 
    if (sectionsList.includes(tab)) {
        return {
            ["data-aos"]: "activeTab",
            ["data-aos-once"]: "false",
            ["data-aos-anchor-placement"]: "top-top",
            ["disable-mutation-observer"]: "false",
            ["data-aos-anchor"]: "#" + tab.replace(" ", ""),
            ["data-aos-mirror"]:"true"
        }
    } else {
        return {}
    }
}
const navTabsSettings = (tab, location, urlLang) => {

    const main_routes = {
        "Home": { link: "#Home", reactRouter: false },
        "About us": { link: "#Aboutus", reactRouter: false },
        "Services": { link: "#Services", reactRouter: false },
        "Our products": { link: "/ourproducts/"+urlLang, reactRouter: true },
        "Portfolio": { link: "/portfolio/"+urlLang, reactRouter: true },
        "Marketing": { link: "/marketing/"+urlLang, reactRouter: true },
        "Blogs": { link: "/blogs/"+urlLang, reactRouter: true },
        "Careers": { link: "#Careers", reactRouter: false },
        "Contact us": { link: "#Contactus", reactRouter: false },
    }
    const pages_routes = {
        "Home": { link: "/"+urlLang+"#Home", reactRouter: true },
        "About us": { link: "/"+urlLang+"#Aboutus", reactRouter: true },
        "Services": { link: "/"+urlLang+"#Services", reactRouter: true },
        "Our products": { link: "/ourproducts/"+urlLang, reactRouter: true },
        "Portfolio": { link: "/portfolio/"+urlLang , reactRouter: true },
        "Marketing": { link: "/marketing/"+urlLang, reactRouter: true },
        "Blogs":  { link: "/blogs/"+urlLang, reactRouter: true },
        "Careers": { link: "/"+urlLang+"#Careers", reactRouter: true },
        "Contact us": { link: "/"+urlLang+"#Contactus", reactRouter: true },

    }
    const parts = location.pathname.split("/").filter(Boolean);
    const page = parts.length > 1 ? parts[1] : "main";

    if (page == "main") {
        return { ...main_routes[tab], aosAnimation: activeTabAnimation(tab)}
    } else {
        return { ...pages_routes[tab], aosAnimation: activeTabAnimation(tab)}
    }

}