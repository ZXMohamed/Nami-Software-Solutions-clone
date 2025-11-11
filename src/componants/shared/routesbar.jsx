//*react
import React from 'react'
//*route
import { Link, useParams } from 'react-router';
import { pages_routes } from '../../routes/routes';
//*mui
import { Box, Breadcrumbs, Container } from '@mui/material'
//*styles
import "../../sass/shared/routesbar.scss"
//*hooks
import { useContent } from '../../languages/hooks/usecontent';
//*scripts
import { defaultLanguage } from '../../languages/languagesContext';


export default function RoutesBar({ title, storeTab }) {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                navTabs: content.navBar.navTabs,
                routesBar: {
                    home: content.routesBar.home.title
                },
            }
        } else {
            return firstContent;
        }
    })();

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

const firstContent = {
    direction: "ltr",
    language:defaultLanguage,
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
    },
    routesBar: {
        home: "Home"
    },
}
