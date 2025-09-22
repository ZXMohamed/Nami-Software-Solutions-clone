//*react
import React, { memo, useContext, useEffect, useMemo, useRef } from 'react';
//*route
import { Link, useParams } from 'react-router';
import { pages_routes } from '../../routes/routes';
//*mui
import { Box, Grid, Stack, Typography, Container, Button, Skeleton } from '@mui/material';
//*gsap
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
//*queries
import { useGetServicesQuery } from '../../redux/server state/services';
//*hook
import useUpdateEffect from '../../hooks/useupdateeffect';
//*scripts
import { defaultLanguage, Language } from '../../languages/languagesContext';


export default function Services() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        language: language_isSuccess ? language.page.language : defaultLanguage,
        title: language_isSuccess ? language.services.title : "Our Services",
        subtitle: language_isSuccess ? language.services.subtitle : "Where quality meets innovation",
        description: language_isSuccess ? language.services.description : "Nami Foundation provides integrated digital solutions for resale in website design And mobile applications. We resell upgraded products with the highest quality standards to meet your needs.",
        buttons: {
            readMore: language_isSuccess ? language.services.buttons.readMore : "Read more",
        }
    }), [language, language_isSuccess]);
    
    const description = useRef();

    useEffect(() => {
        requestIdleCallback(() => {
            descriptionWordsUP(description);
        })
    }, []);

    return (
        <Box id="Services" dir={defaultContent.direction} className="servicesSection" >
            <Container disableGutters>
                <Stack direction={'column'} spacing={2} className='servicesHeader'>
                    <Typography variant='h5' component='h1' className='servicesTitle' {...servicesTitleAosAnimation}><i>{defaultContent.title}</i></Typography>
                    <Typography variant='h4' component='h2' className='servicesSubtitle' {...servicesSubtitleAosAnimation}>{defaultContent.subtitle}</Typography>
                    <Typography ref={description} className='servicesDescription' {...servicesDescriptionAosAnimation}>{defaultContent.description}</Typography>
                </Stack>
                <br/>
                <br/>
                <Grid container spacing={ 3 } className='servicesItems'>
                    <ServiceCardGrid dir={ defaultContent.direction } language={defaultContent.language} readMoreButton={ defaultContent.buttons.readMore } />
                </Grid>
            </Container>
        </Box>
    )
}

const ServiceCardGrid = ({ dir, language, readMoreButton }) => {

    const { isSuccess: servicesItems_isSuccess, data: servicesItems, isError: servicesItems_isError, refetch: servicesItems_refetch } = useGetServicesQuery(undefined, {
        selectFromResult: ({ isSuccess, data, isError }) => ({ isSuccess, data, isError })
    });

    const servicesItemsGridCellInRow = useRef(3);

    const servicesItemsGrid = useMemo(() => {
        if (servicesItems) return Object.values(servicesItems).map((service, inx) => {
            return <ServiceCard key={ inx } dir={ dir } data={ service } readMoreButton={ readMoreButton } size={ 12 / servicesItemsGridCellInRow.current } aosAnimation={ serviceCardAosAnimation(inx + 1) } />
        });
    }, [servicesItems, servicesItems_isSuccess, servicesItemsGridCellInRow.current]);
    
    useUpdateEffect(() => {
        servicesItems_refetch()
    }, [language]);

    return (
        <>
            { !servicesItems_isSuccess && <WaitItemsSkelton cellInRow={ 3 } num={ 6 } /> }
            { servicesItems_isSuccess && servicesItemsGrid }
            { servicesItems_isError && <Typography variant={"h6"} color="error">Data Not Found !</Typography> }
        </>
    );
};

const ServiceCard = memo(({ dir, data, readMoreButton, size, aosAnimation }) => {

    if (!data || (data && Object.keys(data).length == 0)) return <></>;

    const itemObjectives = useRef();

    useEffect(() => {
        showObjectivesOnHover(itemObjectives);
    }, []);

    const { language: urlLang } = useParams();

    return (
        <Grid key={ data.id } size={ { md: size, xxxs: 6, xs: 12 } } { ...aosAnimation }>

            <Link to={ pages_routes(urlLang, data.id)["Service details"].link }>
                
                <Stack dir={ dir } direction={ 'column' } spacing={ 1 } className='serviceItemFace'>
                
                    <Stack direction={ 'row' } className='serviceItemHeader'>
                        <img src={ data.image } alt={ data.title + " service" } loading='lazy' className='serviceItemIcon' />
                        <div className='serviceItemArrow'></div>
                    </Stack>
                
                    <Typography variant='h5' component={ 'h3' } className='serviceItemTitle'>{ data.title }</Typography>
                    <Typography className='serviceItemDescription'>{ data.description }</Typography>
                
                </Stack>
                
                <Stack dir={ dir } direction={ 'column' } className='serviceItemBack'>
                
                    <ul ref={ itemObjectives } className='serviceItemObjectives'>
                        { data.objectives.map((objective, inx) => <li key={ inx }>{ objective }</li>) }
                    </ul>
                
                    <Button variant='contained' disableRipple className='serviceItemReadMore'>{ readMoreButton }</Button>
                
                </Stack>
            
            </Link>

        </Grid>
    )
});

function WaitItemsSkelton({ cellInRow, num }) { 
    const skeltonArray = [];
    for (let i = 0; i < num; i++) { 
        skeltonArray.push(
            <Grid key={i} size={ 12 / cellInRow }>
                <Stack direction={"row"} justifyContent={ "space-between" } alignItems={"center"}>
                    <Skeleton variant="rounded" width={ 60 } height={ 60 } />
                    <Skeleton variant="circular" width={ 45 } height={ 45 } />
                </Stack>
                <br/>
                <Skeleton variant="rounded" width={ "60%" } height={ 20 } />
                <br/>
                <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
                <br/>
                <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
                <br/>
                <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            </Grid>
        );
    }
    return skeltonArray;
}

function descriptionWordsUP(description) {
    const descriptionSplit = new SplitText(description.current, {
        type: "words"
    });

    gsap.to(descriptionSplit.words, {
        scrollTrigger: {
            trigger: description.current,
            scrub: 5,
            start: "top+=0 bottom",
            end: "top+=20 bottom",
        },
        duration:0.5,
        y: 0,
        opacity:1,
        stagger: 0.05,
    });
}
function showObjectivesOnHover(itemObjectives) {
    const itemObjectivesAnimate = gsap.to(itemObjectives.current.querySelectorAll("li"), {
        stagger: 0.1,
        transform: "translateX(0px)",
        filter: "opacity(100%)",
        duration: 0.6,
        paused: true
    });
    itemObjectives.current.parentElement.onmouseover = ()=>itemObjectivesAnimate.restart();
    itemObjectives.current.parentElement.onmouseleave = ()=>itemObjectivesAnimate.kill();
}

const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]:"600" 
}
const servicesTitleAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]:"50"
}
const servicesSubtitleAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]:"100"
}
const servicesDescriptionAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]:"150"
}
const serviceCardAosAnimation = (order) => ({
    ...aosAnimation,
    ["data-aos-delay"]:(order*100).toString()
})