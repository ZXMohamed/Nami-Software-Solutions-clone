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
import { activeTabAnimation } from "./pageactivetabs";
import { navSettings } from "../../routes/navbarroutes";
import { Link, useLocation, useParams } from "react-router";

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

    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <>
            <IconButton className="navSideMenuButton" onClick={ () => setOpenDrawer(!openDrawer) }>
                <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer dir={ defaultContent.direction } anchor={ defaultContent.direction == "ltr" ? "left" : "right" } open={ openDrawer } onClose={ () => setOpenDrawer(false) } disableScrollLock={true} >
                <Toolbar className="navSideMenuContent">
                    <Stack direction="column" spacing={ 0.8 } className="navSideMenu">
                        {logoLink(<img src={ defaultContent.logo } width={ "126px" } height={ "43px" } loading="lazy" alt="Nami Software Solutions" className="navLogo" />)}
                        {
                            Object.keys(defaultContent.navTabs).map((tab, inx) => {
                                // const activeItem = inx == 0 ? "navBarActiveItem" : "";
                               const x = navSettings(tab, location, urlLang);
                                    if (x.outerRoute)
                                        return <Link key={ inx } to={x.link} dir={defaultContent.direction} { ...activeTabAnimation(tab) }> { defaultContent.navTabs[tab].title } </Link>;
                                    else
                                        return <a key={ inx } href={x.link} dir={defaultContent.direction} { ...activeTabAnimation(tab) }> { defaultContent.navTabs[tab].title } </a>;
                            })
                        }
                    </Stack>
                </Toolbar>
            </Drawer>
        </>
    );
};
export default SideMenu;