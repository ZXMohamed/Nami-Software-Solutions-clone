//*react
import React, { useContext, useMemo, useState } from "react";
//*route
import { Link, useLocation, useParams } from "react-router";
//*mui
import { Toolbar, Drawer, IconButton, Stack } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
//*styles
import "../../../sass/shared/navbar.scss";
//*components
import LogoLink from "../../shared/logolink";
//*scripts
import { Language } from "../../../languages/languagesContext";
import { getPage, navSettings } from "../../../routes/routesmanager";
import { activeTabAnimation } from "./pageactivetabs";
//*assets
import logo from "../../../assets/photo/global/namilogo.svg";

const SideMenu = () => {
    console.log("SM");

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        logo: language_isSuccess ? language.navBar.navLogo : logo,
        navTabs: language_isSuccess ? language.navBar.navTabs :  {
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

    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <IconButton className="navSideMenuButton" onClick={ () => setOpenDrawer(!openDrawer) }>
                <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer dir={ defaultContent.direction } anchor={ defaultContent.direction == "ltr" ? "left" : "right" } open={ openDrawer } onClose={ () => setOpenDrawer(false) } disableScrollLock={true} >
                <Toolbar className="navSideMenuContent">
                    <Stack direction="column" spacing={ 0.8 } className="navSideMenu">
                        <LogoLink>
                            <img src={ defaultContent.logo } width={ "126px" } height={ "43px" } loading="lazy" alt="Nami Software Solutions" className="navLogo" />
                        </LogoLink>
                        <Tabs defaultContent={defaultContent}/>
                    </Stack>
                </Toolbar>
            </Drawer>
        </>
    );
};
export default SideMenu;


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