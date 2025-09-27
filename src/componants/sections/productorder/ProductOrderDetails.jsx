//*react
import React, { useContext, useMemo } from 'react'
//*mui
import { Box, Container, Grid, Skeleton, Stack, Typography } from '@mui/material'
//*components
import IntroCard from '../../shared/introcard'
import ListCard from '../../shared/listcard'
import PointsList from '../../shared/pointslist'
import Gallery from '../../shared/gallery'
import { ServiceBadge, serviceBadgeSize, ServicesBadgesList, servicesBadgesListType } from '../../shared/servicesbadges'
import { TechBadge, techBadgeSize, TechBadgesList, techBadgesListType } from '../../shared/techbadges'
import DownloadButton from '../../shared/buttons/downloadbutton'
import OrderProduct from './orderproduct'
import RoutesBar from '../../shared/routesbar'
//*queries
import { useGetProductsQuery } from '../../../redux/server state/products'
//*scripts
import { Language } from '../../../languages/languagesContext'
import { pages_routes } from '../../../routes/routes'


export default function ProductOrderDetails() {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
    language: language_isSuccess ? language.page.language : "en",
    buttons:{
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
  return (<>
    <Box dir={ defaultContent.direction }>
      { product_isSuccess && <RoutesBar title={ product["id-2"].title } storeTab={"Our products"} /> }
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={ { md: 6, xs: 12 } } { ...introCardAosAnimation } className="productDetailsSide">

            { product_isSuccess && product["id-2"].image && <Gallery dir={ defaultContent.direction } data={ [product["id-2"].image] } /> }
            
            { !product_isSuccess && <GalleryWaitItemsSkelton /> }
            
            { product_isSuccess && 
              <IntroCard dir={ defaultContent.direction } title={ product["id-2"].title } description={ product["id-2"].description } >
                { product_isSuccess && product["id-2"].serviceBadges &&
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
            
            { product_isSuccess && product["id-2"].objectives &&
              <ListCard dir={ defaultContent.direction } title={ defaultContent.objectivesList.title }>
                <PointsList dir={ defaultContent.direction } data={ product["id-2"].objectives } />
              </ListCard>
            }
            { !product_isSuccess && <ListCardWaitItemsSkelton/>}
            
            { product_isSuccess && product["id-2"].features &&
              <ListCard dir={ defaultContent.direction } title={ defaultContent.featuresList.title }>
                <PointsList dir={ defaultContent.direction } data={ product["id-2"].features } />
              </ListCard>
            }
            { !product_isSuccess && <ListCardWaitItemsSkelton/>}

            { product_isSuccess && product["id-2"].programmingLanguages &&
              <ListCard dir={defaultContent.direction} title={ defaultContent.programmingLanguagesList.title }>
                <TechBadgesList dir={ defaultContent.direction } type={techBadgesListType.row}>
                  { product["id-2"].programmingLanguages.map((tech) => <TechBadge key={tech.id} data={tech} size={techBadgeSize.big}/>) }
                </TechBadgesList>
              </ListCard>
            }
            { !product_isSuccess && <ListCardWaitItemsSkelton /> }

          </Grid>
        </Grid>
        
        <br />
        <br />

        <Box className="orderProductCon">
          { product_isSuccess && <OrderProduct />}
        </Box>

        { product_isError && <Typography component={ "h1" } variant='h5' color={ "error" }>data not found !</Typography> }
      </Container>
    </Box>
    </>
  )
}

function GalleryWaitItemsSkelton() { 
    return (
        <>
          <Skeleton variant="rounded" width={ "100%" } height={ 500 } />
        </>
    );
}

function IntroCardWaitItemsSkelton() { 
    return (
        <>
            <Skeleton variant="rounded" width={ 200 } height={ 20 } />
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <Skeleton variant="rounded" width={ "80%" } height={ 10 } />
            <Stack direction={"row"} columnGap={2}>
              <Skeleton variant="rounded" width={ "20%" } height={ 40 } />
              <Skeleton variant="rounded" width={ "20%" } height={ 40 } />
              <Skeleton variant="rounded" width={ "20%" } height={ 40 } />
            </Stack>
            <Skeleton variant="rounded" width={ "50%" } height={ 60 } />
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
        <br/>
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