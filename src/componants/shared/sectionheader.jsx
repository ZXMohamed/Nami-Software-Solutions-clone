//*react
import { useEffect, useRef } from "react";
//*mui
import { Box, Container, Grid, Typography } from "@mui/material";
//*styles
import "../../sass/shared/sectionheader.scss"
import { Link } from "react-router";
//*animation
import { containerAosAnimation, sectionHeaderTitleAosAnimation, subtitleWordsUP, titleWordsUP } from "../../animation/sectionheader";

export default function SectionHeader({ dir, title, subtitle, headerButtonTitle,headerButtonUrl }) { 

    const headerTitle = useRef();
    const headerSubtitle = useRef();

    useEffect(() => {
        requestIdleCallback(() => {            
            titleWordsUP(headerTitle);
            subtitleWordsUP(headerSubtitle);
        })
    },[]);

    return (
        <Box dir={dir} className="sectionHeader">
            <Container maxWidth="lg">
                <Typography ref={headerSubtitle} variant="h5" component="h2" className="sectionHeaderTitle" {...sectionHeaderTitleAosAnimation}><i>{title}</i></Typography>
                <Grid container>
                    <Grid size={ { sm: 10, xs: 12 } } className="sectionHeaderSubtitleContainer" {...containerAosAnimation}>
                        <Typography ref={headerTitle} variant="h4" component="h1" className="sectionHeaderSubtitle">{subtitle}</Typography>
                    </Grid>
                    <Grid size={ { sm: 2, xs: 12 } } className="sectionHeaderButtonContainer" {...containerAosAnimation}>
                        <Link to={ headerButtonUrl } className="sectionHeaderButton">{ headerButtonTitle }<Box></Box></Link>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}