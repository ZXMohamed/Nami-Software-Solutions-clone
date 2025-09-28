//*react
import React, { useContext, useMemo } from 'react'
//*route
import { Link, useParams } from 'react-router';
import { pages_routes } from '../../routes/routes';
//*mui
import { Box, Breadcrumbs, Container } from '@mui/material'
//*scripts
import { Language } from '../../languages/languagesContext';
//*styles
import "../../sass/shared/routesbar.scss"

export default function RoutesBar({ title, storeTab }) {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        title: language_isSuccess ? language.page.title : "Product details",
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
        },
        routesBar: {
            home: language_isSuccess ? language.routesBar.home.title : "Home"
        },
    }), [language, language_isSuccess]);

    const { language: urlLang } = useParams();
    
    return (
        <>
            <Box dir={defaultContent.direction}>
                <Container maxWidth="lg">
                    <Breadcrumbs dir={ defaultContent.direction } separator={ defaultContent.direction == "ltr"?"↣":"↢"} className='routesBarContainer'>
                        <Link to={pages_routes(urlLang)["home"].link} className='routBarTab'>{ defaultContent.routesBar.home }</Link>
                        <Link to={pages_routes(urlLang)?.[storeTab.toLowerCase()]?.link} className='routBarTab'>{ defaultContent.navTabs?.[storeTab]?.title || ""}</Link>
                        <span className='routBarTab activeRoutTab'>{ title }</span>
                    </Breadcrumbs>
                </Container>
            </Box>
            <br/>
            <br/>
        </>
  )
}
