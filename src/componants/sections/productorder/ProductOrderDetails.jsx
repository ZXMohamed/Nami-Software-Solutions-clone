//*react
import React, { useEffect } from 'react'
//*routes
import { pages_routes } from '../../../routes/routes'
import { useParams } from 'react-router'
//*mui
import { Box, Container, Grid, Typography } from '@mui/material'
//*scripts
import { defaultLanguage } from '../../../languages/languagesContext'
//*hooks
import { useContent } from '../../../languages/hooks/usecontent'
import { useGetProductsQuery } from '../../../redux/server state/products'
//*components
import IntroCard from '../../shared/introcard'
import ListCard from '../../shared/listcard'
import Gallery from '../../shared/gallery'
import PointsList from '../../shared/pointslist'
import { TechBadge, techBadgeSize, TechBadgesList, techBadgesListType } from '../../shared/techbadges'
import { ServiceBadge, serviceBadgeSize, ServicesBadgesList, servicesBadgesListType } from '../../shared/servicesbadges'
import DownloadButton from '../../shared/buttons/downloadbutton'
import OrderProduct from './orderproduct'
import RoutesBar from '../../shared/routesbar'
import PageHead from '../../shared/pagehead'
//*animation
import { introCardAosAnimation, listCardAosAnimation } from '../../../animation/ProductOrderDetails'
import { GalleryWaitItemsSkelton, IntroCardWaitItemsSkelton, ListCardWaitItemsSkelton } from '../../loadingitems/ProductOrderDetails'
import useUpdateEffect from '../../../hooks/useupdateeffect'
//*hooks
import useCashedImage from '../../../hooks/usecashedimage'


export default function ProductOrderDetails() {

  const { isSuccess: content_isSuccess, data: content } = useContent();

  const defaultContent = (() => {
      if (content_isSuccess) {
        return {
          direction: content.page.direction,
          language: content.page.language,
          buttons: {
            downloadSystemFile: content.buttons.downloadSystemFile
          },
          objectivesList: {
            title: content.objectivesList.title
          },
          featuresList: {
            title: content.featuresList.title
          },
          programmingLanguagesList: {
            title: content.programmingLanguagesList.title
          }
        }
      } else {
          return firstContent;
      }
  })();

  const { id: productId } = useParams();

  const { isSuccess: product_isSuccess, isError: product_isError, error: product_error, data: product, isFetching: product_isFetching, refetch: product_refetch } = useGetProductsQuery({ id: productId });

  useUpdateEffect(() => { 
    product_refetch();
  },[defaultContent.language])

  return (
    <>
      { product_isSuccess && <PageHead pageTitle={ product.title } title={ product.title } description={ product.description } language={ defaultContent.language } type='Product' url={pages_routes(defaultContent.language,productId,product.title)["product details"].link} image={ product.image } LD_Json={ {
        "offers": {
          "@type": "Product",
          "name": product.title,
          "description": product.description
        }
      } } /> }
      <Box dir={ defaultContent.direction } className={"productOrderDetails"}>
        { (!product_isFetching && product_isSuccess) && <RoutesBar title={ product.title } storeTab={"Our products"} /> }
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid size={ { md: 6, xs: 12 } } { ...introCardAosAnimation } className="productDetailsSide">

              { (!product_isFetching && product_isSuccess) && product.image && <CashedGallery dir={ defaultContent.direction } id={ product.id } mainImage={ product.image } alt={ product.title } /> }
              
              { product_isFetching && <GalleryWaitItemsSkelton /> }
              
              { (!product_isFetching && product_isSuccess) && 
                <IntroCard dir={ defaultContent.direction } title={ product.title } description={ product.description } >
                  { 
                    <ServicesBadgesList dir={ defaultContent.direction } type={servicesBadgesListType.row}>
                      { product.serviceBadges.map((tech) => <ServiceBadge key={tech.id} data={tech} size={serviceBadgeSize.big}/>) }
                    </ServicesBadgesList>
                  }
                  
                  {product.document && <DownloadButton direction={ defaultContent.direction } title={ defaultContent.buttons.downloadSystemFile } link={ product.document } />}
                </IntroCard>
              }

              { product_isFetching && <IntroCardWaitItemsSkelton /> }
              
            </Grid>
            <Grid size={ { md: 6, xs: 12 } } { ...listCardAosAnimation } className="productListsSide">
              
              { (!product_isFetching && product_isSuccess && product.objectives) &&
                <ListCard dir={ defaultContent.direction } title={ defaultContent.objectivesList.title }>
                  <PointsList dir={ defaultContent.direction } data={ product.objectives } />
                </ListCard>
              }
              { product_isFetching && <ListCardWaitItemsSkelton/>}
              
              { (!product_isFetching && product_isSuccess && product.features) &&
                <ListCard dir={ defaultContent.direction } title={ defaultContent.featuresList.title }>
                  <PointsList dir={ defaultContent.direction } data={ product.features } />
                </ListCard>
              }
              { product_isFetching && <ListCardWaitItemsSkelton/>}

              { (!product_isFetching && product_isSuccess && product.programmingLanguages) &&
                <ListCard dir={defaultContent.direction} title={ defaultContent.programmingLanguagesList.title }>
                  <TechBadgesList dir={ defaultContent.direction } type={techBadgesListType.row}>
                    { product.programmingLanguages.map((tech) => <TechBadge key={tech.id} data={tech} size={techBadgeSize.big}/>) }
                  </TechBadgesList>
                </ListCard>
              }
              { product_isFetching && <ListCardWaitItemsSkelton /> }

            </Grid>
          </Grid>
          
          <br />
          <br />

          <Box className="orderProductCon">
            { (!product_isFetching && product_isSuccess) && <OrderProduct />}
          </Box>

          { product_isError && <Typography component={ "h1" } variant='h5' color={ "error" }>{ product_error.data.error }</Typography> }
        </Container>
      </Box>
    </>
  )
}

function CashedGallery({dir, id, mainImage, alt}) {
  
  const [image, cashImage] = useCashedImage(mainImage, "products", id);
  useEffect(() => {
    cashImage();
  },[]);

  return (
    <Gallery dir={ dir } data={ [image] } alt={alt}/> 
  )
}

const firstContent = {
  direction: "ltr",
  language: defaultLanguage,
  buttons: {
    downloadSystemFile: "Download the system file"
  },
  objectivesList: {
    title: "System objectives"
  },
  featuresList: {
    title: "System features"
  },
  programmingLanguagesList: {
    title: "Programming languages used"
  }
}