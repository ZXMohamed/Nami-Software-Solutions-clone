//*react
import react, { useEffect, useRef } from "react";
//*mui
import { Box, Container, Grid, Typography } from "@mui/material";
//*gsap
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
//*styles
import "../../sass/shared/sectionheader.scss"
import { Link } from "react-router";

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

const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]: "600"
}
const sectionHeaderTitleAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]:"50"
}
const containerAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]:"100"
}


function titleWordsUP(headerTitle) {

    const headerTitleSplit = new SplitText(headerTitle.current, {
        type: "words"
    });

    gsap.to(headerTitleSplit.words, {
        scrollTrigger: {
            trigger: headerTitle.current,
            start: "top+=0 bottom",
            end: "top+=20 bottom",
        },
        duration:0.5,
        y: 0,
        opacity:1,
        stagger: 0.15,
    });
   
}
function subtitleWordsUP(headerSubtitle) {

    const headerSubtitleSplit = new SplitText(headerSubtitle.current, {
        type: "words"
    });

    gsap.to(headerSubtitleSplit.words, {
        scrollTrigger: {
            trigger: headerSubtitle.current,
            start: "top+=0 bottom",
            end: "top+=20 bottom",
        },
        duration:0.5,
        y: 0,
        opacity:1,
        stagger: 0.1,
    });

}