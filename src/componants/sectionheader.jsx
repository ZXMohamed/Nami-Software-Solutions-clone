import react, { useEffect, useRef } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default function SectionHeader({ title, subtitle, showAllUrl }) { 
    
    const headerTitle = useRef();
    const headerSubtitle = useRef();

    useEffect(() => {
        headerTitleAnimation(headerTitle);
        headerSubtitleAnimation(headerSubtitle);
    },[]);

    return (
        <Box className="sectionHeader">
            <Container maxWidth="lg">
                <Typography ref={headerSubtitle} variant="h5" component="h2" className="sectionHeaderTitle"  data-aos="fade-up" data-aos-duration="600" data-aos-delay="50"><i>{subtitle}</i></Typography>
                <Grid container>
                    <Grid size={ { sm: 10, xs: 12 } } className="sectionHeaderSubtitleContainer" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                        <Typography ref={headerTitle} variant="h4" component="h1" className="sectionHeaderSubtitle">{title}</Typography>
                    </Grid>
                    <Grid size={ { sm: 2, xs: 12 } } className="ShowAllButtonContainer" data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                        <a href={ showAllUrl } className="ShowAllButton">Show all<Box></Box></a>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

function headerTitleAnimation(headerTitle) {

    const headerTitleSplit = new SplitText(headerTitle.current, {
        type: "words"
    });

    gsap.to(headerTitleSplit.words, {
        scrollTrigger: {
            trigger: headerTitle.current,
            // scrub: 1,
            start: "top+=0 bottom",
            end: "top+=20 bottom",
        },
        duration:0.5,
        y: 0,
        opacity:1,
        stagger: 0.15,
    });
   
}
function headerSubtitleAnimation(headerSubtitle) {

    const headerSubtitleSplit = new SplitText(headerSubtitle.current, {
        type: "words"
    });

    gsap.to(headerSubtitleSplit.words, {
        scrollTrigger: {
            trigger: headerSubtitle.current,
            // scrub: 1,
            start: "top+=0 bottom",
            end: "top+=20 bottom",
        },
        duration:0.5,
        y: 0,
        opacity:1,
        stagger: 0.1,
    });

}