//*react
import React from 'react'
//*routs
import { pages_routes } from '../../../routes/routes'
import { useParams } from 'react-router'
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

  const { id: serviceId } = useParams(); 

  const { isSuccess: service_isSuccess, isError: service_isError, error: service_error, data: service, isFetching: service_isFetching, refetch: service_refetch } = useGetServicesQuery({ id: serviceId });

  useUpdateEffect(() => {
    service_refetch();
  },[defaultContent.language]);
  
  return (
    <>
      { service_isSuccess && <PageHead pageTitle={ service.title } title={ service.title } description={ service.description } language={ defaultContent.language } type={ "Service" } image={ service.image } url={ pages_routes(defaultContent.language,serviceId,service.title)["service details"].link } LD_Json={ {
        "offers": {
          "@type": "Service",
          "name": service.title,
          "description": service.description
        }
      } } /> }
      <Box dir={defaultContent.direction} className="serviceOrderDetailsCon">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid size={{md:8,xs:12}} {...introCardAosAnimation}>
              { (!service_isFetching && service_isSuccess) && <IntroCard dir={defaultContent.direction} icon={ service.image } gutters title={ service.title } description={ service.description } /> }
              { service_isFetching && <IntroCardWaitItemsSkelton/>}
            </Grid>
            <Grid size={{md:4,xs:12}} {...listCardAosAnimation}>
              { (!service_isFetching && service_isSuccess) &&
              <ListCard dir={ defaultContent.direction } title={ defaultContent.objectivesList.title }>
                <ObjectivesList dir={defaultContent.direction} data={ service.objectives } />
                <OrderService />
              </ListCard>}
              { service_isFetching && <ListCardWaitItemsSkelton/>}
            </Grid>
          </Grid>
          { service_isError && <Typography component={ "h1" } variant='h5' color={ "error" }>{service_error.data.error}</Typography> }
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