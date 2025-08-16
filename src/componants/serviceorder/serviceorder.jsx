import { Box, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import IntroCard from '../introcard'
import ListCard from '../listcard'
import ObjectivesList from '../objectiveslist'
import OrderService from './orderservice'
import { useGetServicesQuery } from '../../redux/server state/services'

import x from "../../assets/photo/global/facebook.svg"

export default function ServiceOrder() {

  const { isSuccess: service_isSuccess, isError: service_isError, data: service } = useGetServicesQuery({ id: 1 });
  console.log(service);
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={{md:8,xs:12}} {...introCardAosAnimation}>
            { service_isSuccess && <IntroCard dir={ "ltr" } loading={!service_isSuccess} icon={ service["id-1"].image } title={ service["id-1"].title } description={ service["id-1"].description } /> }
            { service_isError && <Typography component={"h1"} variant='h4' color={"error"}>data not found !</Typography>}
          </Grid>
          <Grid size={{md:4,xs:12}} {...listCardAosAnimation}>
            { service_isSuccess && <ListCard dir={ "ltr" } loading={!service_isSuccess} title={ "Service objectives" }>
              <ObjectivesList dir={ "ltr" } data={ service["id-1"].objectives } />
              <OrderService />
            </ListCard> }
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
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