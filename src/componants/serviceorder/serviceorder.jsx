import { Box, Container, Grid, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import IntroCard from '../introcard'
import ListCard from '../listcard'
import ObjectivesList from '../objectiveslist'
import OrderService from './orderservice'
import { useGetServicesQuery } from '../../redux/server state/services'


export default function ServiceOrder() {

  const { isSuccess: service_isSuccess, isError: service_isError, data: service } = useGetServicesQuery({ id: 1 });
  console.log(service);
  return (
    <Box>
      <Container maxWidth="lg">
        { service_isError && <Typography component={ "h1" } variant='h5' color={ "error" }>data not found !</Typography> }
        <Grid container spacing={2}>
          <Grid size={{md:8,xs:12}} {...introCardAosAnimation}>
            { service_isSuccess && <IntroCard dir={ "ltr" } icon={ service["id-1"].image } title={ service["id-1"].title } description={ service["id-1"].description } /> }
            { !service_isSuccess && <IntroCardWaitItemsSkelton/>}
          </Grid>
          <Grid size={{md:4,xs:12}} {...listCardAosAnimation}>
            <ListCard dir={ "ltr" } title={ "Service objectives" }>
              { service_isSuccess && <ObjectivesList dir={ "ltr" } data={ service["id-1"].objectives } />}
              { !service_isSuccess && <ListCardWaitItemsSkelton/>}
              { service_isSuccess && < OrderService />}
            </ListCard>
          </Grid>
        </Grid>
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