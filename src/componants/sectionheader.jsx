import react, { useEffect, useRef } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

export default function Sectionheader({ title, subtitle, showallurl }) { 
    
    const headertitle = useRef();
    const headersubtitle = useRef();

    gsap.registerPlugin(SplitText, ScrollTrigger);
    
    useEffect(() => {
        const headertitlesplit = new SplitText(headertitle.current, {
            type: "words"
        });
        const headersubtitlesplit = new SplitText(headersubtitle.current, {
            type: "words"
        });

        gsap.to(headertitlesplit.words, {
            scrollTrigger: {
                trigger: headertitle.current,
                // scrub: 1,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:0.5,
            y: 0,
            opacity:1,
            stagger: 0.2,
        });
        gsap.to(headersubtitlesplit.words, {
            scrollTrigger: {
                trigger: headertitle.current,
                // scrub: 1,
                start: "top+=0 bottom",
                end: "top+=20 bottom",
            },
            duration:0.5,
            y: 0,
            opacity:1,
            stagger: 0.1,
        });
    },[]);
    return (
        <Box className="sectionheader">
            <Container maxWidth="lg">
                <Typography ref={headersubtitle} variant="h5" component="h2" textAlign={{sm:"left",xs:"center"}} data-aos="fade-up" data-aos-duration="600" data-aos-delay="50"><i>{subtitle}</i></Typography>
                <Grid container>
                    <Grid size={ { sm: 10, xs: 12 } } justifyContent={ { sm: 'flex-start', xs: 'center' } } display={ 'flex' } data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                        <Typography ref={headertitle} variant="h4" component="h1">{title}</Typography>
                    </Grid>
                    <Grid size={ { sm: 2, xs: 12 } } justifyContent={ { sm: 'flex-end', xs: 'center' }} display={'flex'} data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                        <a href={ showallurl }>Show all<Box></Box></a>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}