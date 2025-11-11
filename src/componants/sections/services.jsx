//*react
import React, { memo, useEffect, useMemo, useRef } from 'react';
//*route
import { Link } from 'react-router';
import { pages_routes } from '../../routes/routes';
//*mui
import { Box, Grid, Stack, Typography, Container, Button } from '@mui/material';
//*queries
import { useGetServicesQuery } from '../../redux/server state/services';
//*hook
import useUpdateEffect from '../../hooks/useupdateeffect';
import { useContent } from '../../languages/hooks/usecontent';
//*scripts
import { defaultLanguage } from '../../languages/languagesContext';
//*components
import { WaitItemsSkelton } from '../loadingitems/services';
//*animation
import { descriptionWordsUP, serviceCardAosAnimation, servicesDescriptionAosAnimation, servicesSubtitleAosAnimation, servicesTitleAosAnimation, showObjectivesOnHover } from '../../animation/services';


export default function Services() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                title: content.services.title,
                subtitle: content.services.subtitle,
                description: content.services.description,
                buttons: {
                    readMore: content.services.buttons.readMore,
                }
            }
        } else {
            return servicesFirstContent;
        }
    })();
    
    const description = useRef();

    useEffect(() => {
        requestIdleCallback(() => {
            descriptionWordsUP(description);
        })
    }, []);

    return (
        <Box id="services" dir={defaultContent.direction} className="servicesSection" >
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

const ServiceCardGrid = memo(({ dir, language, readMoreButton }) => {

    const { isSuccess: servicesItems_isSuccess, isFetching: servicesItems_isFetching, data: servicesItems, isError: servicesItems_isError, error: servicesItems_error, refetch: servicesItems_refetch } = useGetServicesQuery();

    const servicesItemsGridCellInRow = useRef(3);

    const servicesItemsGrid = useMemo(() => {
        if (servicesItems) return Object.values(servicesItems).map((service, inx) => {
            return <ServiceCard key={ inx } dir={ dir } data={ service } language={language} readMoreButton={ readMoreButton } size={ 12 / servicesItemsGridCellInRow.current } aosAnimation={ serviceCardAosAnimation(inx + 1) } />
        });
    }, [servicesItems, servicesItems_isSuccess, servicesItemsGridCellInRow.current]);
    
    useUpdateEffect(() => {
        servicesItems_refetch()
    }, [language]);

    return (
        <>
            { servicesItems_isFetching && <WaitItemsSkelton cellInRow={ 3 } num={ 6 } /> }
            { (!servicesItems_isFetching && servicesItems_isSuccess) && servicesItemsGrid }
            { servicesItems_isError && <Typography variant={ "h6" } color="error">{ servicesItems_error.data.error }</Typography> }
        </>
    );
});

const ServiceCard = memo(({ dir, data, language, readMoreButton, size, aosAnimation }) => {

    if (!data || (data && Object.keys(data).length == 0)) return <></>;

    const itemObjectives = useRef();

    useEffect(() => {
        showObjectivesOnHover(itemObjectives);
    }, []);

    return (
        <Grid key={ data.id } size={ { md: size, xxxs: 6, xs: 12 } } { ...aosAnimation }>

            <Link to={ pages_routes(language, data.id, data.title.replaceAll(" ","-"))["service details"].link }>
                
                <Stack dir={ dir } direction={ 'column' } spacing={ 1 } className='serviceItemFace'>
                
                    <Stack direction={ 'row' } className='serviceItemHeader'>
                        <img src={ data.image } alt={ data.title } loading='lazy' className='serviceItemIcon' />
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

const servicesFirstContent = {
    direction: "ltr",
    language: defaultLanguage,
    title: "Our Services",
    subtitle: "Where quality meets innovation",
    description: "Nami Foundation provides integrated digital solutions for resale in website design And mobile applications. We resell upgraded products with the highest quality standards to meet your needs.",
    buttons: {
        readMore: "Read more",
    }
}