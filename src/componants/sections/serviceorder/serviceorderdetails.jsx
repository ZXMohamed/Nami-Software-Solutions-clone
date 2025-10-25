//*react
import React from 'react'
//*mui
import { Box, Container, Grid, Typography } from '@mui/material'
//*hooks
import useUpdateEffect from '../../../hooks/useupdateeffect'
import { useContent } from '../../../languages/hooks/usecontent'
//*components
import IntroCard from '../../shared/introcard'
import ListCard from '../../shared/listcard'
import ObjectivesList from '../../shared/objectiveslist'
import OrderService from './orderservice'
import { IntroCardWaitItemsSkelton, ListCardWaitItemsSkelton } from '../../loadingitems/serviceorderdetails'
import PageHead from '../../shared/pagehead'
//*queries
import { useGetServicesQuery } from '../../../redux/server state/services'
//*animation
import { introCardAosAnimation, listCardAosAnimation } from '../../../animation/serviceorderdetails'


export default function ServiceOrderDetails() {

  const { isSuccess: content_isSuccess, data: content } = useContent();

  const defaultContent = (() => {
      if (content_isSuccess) {
          return {
            direction: content.page.direction,
            language: content.page.language,
            objectivesList: {
              title: content.serviceOrder.objectivesList.title
            }
          }
      } else {
          return firstContent;
      }
  })();

  const { isSuccess: service_isSuccess, isError: service_isError, data: service, isFetching: service_isFetching, refetch: service_refetch } = useGetServicesQuery({ id: 1 });

  useUpdateEffect(() => {
    service_refetch();
  },[defaultContent.language]);
  
  return (
    <>
      { service_isSuccess && <PageHead pageTitle={ service["id-1"].title } title={ service["id-1"].title } description={ service["id-1"].description } language={ defaultContent.language } type={ "Service" } image={ service["id-1"].image } url='/' LD_Json={ {
        "offers": {
          "@type": "Service",
          "name": service["id-1"].title,
          "description": service["id-1"].description
        }
      } } /> }
      <Box dir={defaultContent.direction}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid size={{md:8,xs:12}} {...introCardAosAnimation}>
              { (!service_isFetching && service_isSuccess) && <IntroCard dir={defaultContent.direction} icon={ service["id-1"].image } gutters title={ service["id-1"].title } description={ service["id-1"].description } /> }
              { service_isFetching && <IntroCardWaitItemsSkelton/>}
            </Grid>
            <Grid size={{md:4,xs:12}} {...listCardAosAnimation}>
              <ListCard dir={defaultContent.direction} title={ defaultContent.objectivesList.title }>
                { (!service_isFetching && service_isSuccess) && <ObjectivesList dir={defaultContent.direction} data={ service["id-1"].objectives } />}
                { (!service_isFetching && service_isSuccess) && <OrderService />}
                { service_isFetching && <ListCardWaitItemsSkelton/>}
              </ListCard>
            </Grid>
          </Grid>
          { service_isError && <Typography component={ "h1" } variant='h5' color={ "error" }>data not found !</Typography> }
        </Container>
      </Box>
    </>
  )
}


const firstContent = {
  direction: "ltr",
  language: "en",
  objectivesList: {
    title: "Service objectives"
  }
}