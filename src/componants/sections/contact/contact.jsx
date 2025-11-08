//*react
import React from 'react'
//*mui
import { Box, Container, Grid, useMediaQuery } from '@mui/material'
//*component
import { FormSection } from '../../forms/contactform';
import { ContactMethodsSection, InfoSection } from './contactinfo';
//*hooks
import { useContent } from '../../../languages/hooks/usecontent';


export default function Contact() {

  const { isSuccess: content_isSuccess, data: content } = useContent();
  const defaultContent = { direction: content_isSuccess ? content.page.direction : "ltr" };

    const isXXSSize = useMediaQuery("(max-width:500px)");

    return (
        <Box id="contactus" dir={defaultContent.direction} className="contactSection">
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