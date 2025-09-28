//*react
import React, { useContext, useMemo } from 'react'
//*mui
import { Box, Container, Grid, Skeleton, Stack, Typography } from '@mui/material'
//*components
import IntroCard from '../../shared/introcard'
import ListCard from '../../shared/listcard'
import ObjectivesList from '../../shared/objectiveslist'
import RoutesBar from '../../shared/routesbar'
import OrderService from './orderservice'
//*queries
import { useGetServicesQuery } from '../../../redux/server state/services'
//*scripts
import { Language } from '../../../languages/languagesContext'


export default function ServiceOrderDetails() {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
    language: language_isSuccess ? language.page.language : "en",
    objectivesList: {
      title: language_isSuccess ? language.serviceOrder.objectivesList.title : "Service objectives"
    }
  }), [language, language_isSuccess]);

  const { isSuccess: service_isSuccess, isError: service_isError, data: service } = useGetServicesQuery({ id: 1 });
  console.log(service);
  return (
    <Box dir={ defaultContent.direction }>
      { service_isSuccess && <RoutesBar title={ service["id-1"].title } storeTab={"Services"} /> }
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={{md:8,xs:12}} {...introCardAosAnimation}>
            { service_isSuccess && <IntroCard dir={defaultContent.direction} gutters icon={ service["id-1"].image } title={ service["id-1"].title } description={ service["id-1"].description } /> }
            { !service_isSuccess && <IntroCardWaitItemsSkelton/>}
          </Grid>
          <Grid size={{md:4,xs:12}} {...listCardAosAnimation}>
            <ListCard dir={defaultContent.direction} title={ defaultContent.objectivesList.title }>
              { service_isSuccess && <ObjectivesList dir={defaultContent.direction} data={ service["id-1"].objectives } />}
              { !service_isSuccess && <ListCardWaitItemsSkelton/>}
              { service_isSuccess && < OrderService />}
            </ListCard>
          </Grid>
        </Grid>
        { service_isError && <Typography component={ "h1" } variant='h5' color={ "error" }>data not found !</Typography> }
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