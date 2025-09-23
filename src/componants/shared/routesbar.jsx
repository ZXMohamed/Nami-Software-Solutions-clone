//*react
import React, { useContext, useMemo } from 'react'
//*mui
import { Box, Breadcrumbs, Container } from '@mui/material'
//*styles
import "../../sass/shared/routesbar.scss"
import { Language } from '../../languages/languagesContext';

export default function RoutesBar() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
    }), [language, language_isSuccess]);
    
    return (
        <>
            <Box dir={defaultContent.direction}>
                <Container maxWidth="lg">
                    <Breadcrumbs dir={ defaultContent.direction } separator={ defaultContent.direction == "ltr"?"↣":"↢"} className='routesBarContainer'>
                        <span className='routBarTab'>Home</span>
                        <span className='routBarTab'>Services</span>
                        <span className='routBarTab activeRoutTab'>Design services</span>
                    </Breadcrumbs>
                </Container>
            </Box>
            <br/>
            <br/>
        </>
  )
}
