//*react
import React from 'react'
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
//*animation
import { introCardAosAnimation, listCardAosAnimation } from '../../../animation/ProductOrderDetails'
import { GalleryWaitItemsSkelton, IntroCardWaitItemsSkelton, ListCardWaitItemsSkelton } from '../../loadingitems/ProductOrderDetails'
import useUpdateEffect from '../../../hooks/useupdateeffect'


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

  const { isSuccess: product_isSuccess, isError: product_isError, data: product, isFetching: product_isFetching, refetch: product_refetch } = useGetProductsQuery({ id: 2 });

  useUpdateEffect(() => { 
    product_refetch();
  },[defaultContent.language])

  return (<>
    <Box dir={defaultContent.direction}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={ { md: 6, xs: 12 } } { ...introCardAosAnimation } className="productDetailsSide">

            { (!product_isFetching && product_isSuccess) && product["id-2"].image && <Gallery dir={ defaultContent.direction } data={ [product["id-2"].image] } /> }
            
            { product_isFetching && <GalleryWaitItemsSkelton /> }
            
            { (!product_isFetching && product_isSuccess) && 
              <IntroCard dir={ defaultContent.direction } title={ product["id-2"].title } description={ product["id-2"].description } >
                { (!product_isFetching && product_isSuccess && product["id-2"].serviceBadges) &&
                  <ServicesBadgesList dir={ defaultContent.direction } type={servicesBadgesListType.row}>
                    { product["id-2"].serviceBadges.map((tech) => <ServiceBadge key={tech.id} data={tech} size={serviceBadgeSize.big}/>) }
                  </ServicesBadgesList>
                }
                <DownloadButton direction={defaultContent.direction} title={defaultContent.buttons.downloadSystemFile} link={product["id-2"].document} />
              </IntroCard>
            }

            { product_isFetching && <IntroCardWaitItemsSkelton /> }
            
          </Grid>
          <Grid size={ { md: 6, xs: 12 } } { ...listCardAosAnimation } className="productListsSide">
            
            { (!product_isFetching && product_isSuccess && product["id-2"].objectives) &&
              <ListCard dir={ defaultContent.direction } title={ defaultContent.objectivesList.title }>
                <PointsList dir={ defaultContent.direction } data={ product["id-2"].objectives } />
              </ListCard>
            }
            { product_isFetching && <ListCardWaitItemsSkelton/>}
            
            { (!product_isFetching && product_isSuccess && product["id-2"].features) &&
              <ListCard dir={ defaultContent.direction } title={ defaultContent.featuresList.title }>
                <PointsList dir={ defaultContent.direction } data={ product["id-2"].features } />
              </ListCard>
            }
            { product_isFetching && <ListCardWaitItemsSkelton/>}

            { (!product_isFetching && product_isSuccess && product["id-2"].programmingLanguages) &&
              <ListCard dir={defaultContent.direction} title={ defaultContent.programmingLanguagesList.title }>
                <TechBadgesList dir={ defaultContent.direction } type={techBadgesListType.row}>
                  { product["id-2"].programmingLanguages.map((tech) => <TechBadge key={tech.id} data={tech} size={techBadgeSize.big}/>) }
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

        { product_isError && <Typography component={ "h1" } variant='h5' color={ "error" }>data not found !</Typography> }
      </Container>
    </Box>
    </>
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