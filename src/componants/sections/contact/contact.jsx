//*react
import React, { useContext, useMemo } from 'react'
//*mui
import { Box, Container, Grid, useMediaQuery } from '@mui/material'
//*component
import { FormSection } from './contactform';
import { ContactMethodsSection, InfoSection } from './contactinfo';
//*scripts
import { Language } from '../../../languages/languagesContext';


export default function Contact() {

    const { isSuccess: language_isSuccess, data: language }=useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
    }), [language, language_isSuccess]);

    const isXXSSize = useMediaQuery("(max-width:500px)");

    return (
        <Box dir={defaultContent.direction} className="contactSection">
            <Container maxWidth="lg" disableGutters={isXXSSize}>
                <Grid container rowSpacing={{xs:5,md:0}}>
                    <Grid size={{xs:12,md:6}} order={{xs:1,md:0}} className="contactSide">
                        <FormSection/>
                    </Grid>
                    <Grid size={{xs:12,md:6}} order={{xs:0,md:1}} className="contactInfoSide">
                        <InfoSection/>
                        <br/>
                        <br/>
                        <ContactMethodsSection/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}