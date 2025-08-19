import { Box, Container, Grid, Skeleton, Stack, Typography } from '@mui/material'
import React, { useContext, useMemo } from 'react'
import IntroCard from '../introcard'
import ListCard from '../listcard'
// import OrderProduct from './orderproduct'
import { Language } from '../../languages/languagesContext'
import { useGetProductsQuery } from '../../redux/server state/products'
import Gallery from '../gallery'
import PointsList from '../pointslist'
import { TechBadge, techBadgeSize, TechBadgesList, techBadgesListType } from '../techbadges'
import { ServiceBadge, serviceBadgeSize, ServicesBadgesList, servicesBadgesListType } from '../servicesbadges'
import DownloadButton from '../buttons/downloadbutton'


export default function ProductOrderDetails() {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
    language: language_isSuccess ? language.page.language : "en",
    buttons:{
      // orderProduct: language_isSuccess ? language.productOrder.buttons.orderProduct : "Request a trial version",
      downloadSystemFile: language_isSuccess ? language.buttons.downloadSystemFile : "Download the system file"
    },
    objectivesList: {
      title: language_isSuccess ? language.objectivesList.title : "System objectives"
    },
    featuresList:{
      title: language_isSuccess ? language.featuresList.title : "System features"
    },
    programmingLanguagesList:{
      title: language_isSuccess ? language.programmingLanguagesList.title : "Programming languages used"
    }
  }), [language, language_isSuccess]);

  const { isSuccess: product_isSuccess, isError: product_isError, data: product } = useGetProductsQuery({ id: 2 });
  console.log(product);
  return (
    <Box dir={defaultContent.direction}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={ { md: 6, xs: 12 } } { ...introCardAosAnimation } className="productDetailsSide">

            { product_isSuccess && <Gallery dir={ defaultContent.direction } data={ [product["id-2"].image] } /> }
            
            { product_isSuccess &&
              <IntroCard dir={ defaultContent.direction } title={ product["id-2"].title } description={ product["id-2"].description } >
                { product_isSuccess &&
                  <ServicesBadgesList dir={ defaultContent.direction } type={servicesBadgesListType.row}>
                    { product["id-2"].serviceBadges.map((tech) => <ServiceBadge key={tech.id} data={tech} size={serviceBadgeSize.big}/>) }
                  </ServicesBadgesList>
                }
                <DownloadButton direction={defaultContent.direction} title={defaultContent.buttons.downloadSystemFile} link={product["id-2"].document} />
              </IntroCard>
            }

            { !product_isSuccess && <IntroCardWaitItemsSkelton /> }
            
          </Grid>
          <Grid size={ { md: 6, xs: 12 } } { ...listCardAosAnimation } className="productListsSide">
            
            <ListCard dir={defaultContent.direction} title={ defaultContent.objectivesList.title }>
              { product_isSuccess && <PointsList dir={defaultContent.direction} data={ product["id-2"].objectives } />}
              { !product_isSuccess && <ListCardWaitItemsSkelton/>}
            </ListCard>
            
            <ListCard dir={defaultContent.direction} title={ defaultContent.featuresList.title }>
              { product_isSuccess && <PointsList dir={defaultContent.direction} data={ product["id-2"].features } />}
              { !product_isSuccess && <ListCardWaitItemsSkelton/>}
            </ListCard>

            <ListCard dir={defaultContent.direction} title={ defaultContent.programmingLanguagesList.title }>
              { product_isSuccess &&
                <TechBadgesList dir={ defaultContent.direction } type={techBadgesListType.row}>
                  { product["id-2"].programmingLanguages.map((tech) => <TechBadge key={tech.id} data={tech} size={techBadgeSize.big}/>) }
                </TechBadgesList>
              }
              { !product_isSuccess && <ListCardWaitItemsSkelton/>}
            </ListCard>

          </Grid>
        </Grid>
        {/* { product_isSuccess && <OrderProduct />} */}
        { product_isError && <Typography component={ "h1" } variant='h5' color={ "error" }>data not found !</Typography> }
      </Container>
    </Box>
  )
}

function IntroCardWaitItemsSkelton() { 
    return (
        <>
            <Stack direction={ "row" } justifyContent={ "space-between" } alignItems={ "center" }>
                <Skeleton variant="rounded" width={ 60 } height={ 60 } />
            </Stack>
            <br/>
            <Skeleton variant="rounded" width={ 200 } height={ 20 } />
            <br/>
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <br/>
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <br/>
            <Skeleton variant="rounded" width={ "80%" } height={ 10 } />
        </>
    );
}

function ListCardWaitItemsSkelton() { 
    return (
      <Box>
        <Skeleton variant="rounded" width={ "100%" } height={ 15 } />
        <br/>
        <Skeleton variant="rounded" width={ "90%" } height={ 15 } />
        <br/>
        <Skeleton variant="rounded" width={ "100%" } height={ 15 } />
        <br/>
        <Skeleton variant="rounded" width={ "60%" } height={ 15 } />
        <br/>
        <Skeleton variant="rounded" width={ "80%" } height={ 15 } />
        <br/>
        <br />
        <Skeleton variant="rounded" width={ "100%" } height={ 50 } />
        
      </Box>
    );
}

const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]: "1000",
}
const introCardAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "50"
}
const listCardAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "150"
}