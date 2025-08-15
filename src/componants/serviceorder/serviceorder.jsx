import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import IntroCard from '../introcard'
import ListCard from '../listcard'
import ObjectivesList from '../objectiveslist'
import OrderService from './orderservice'

import x from "../../assets/photo/global/facebook.svg"

export default function ServiceOrder() {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={{md:8,xs:12}} {...introCardAosAnimation}>
            <IntroCard dir={"ltr"} icon={x} title={"Design services"} description={"We offer a comprehensive range of design services that include graphic design and brand identity design. We work to create innovative designs that reflect the essence of your brand and attract the attention of your audience."}/>
          </Grid>
          <Grid size={{md:4,xs:12}} {...listCardAosAnimation}>
            <ListCard dir={"ltr"} title={"Service objectives"}>
              <ObjectivesList dir={ "ltr" } data={ ["Graphic Design", "Brand identity design", "Logos design", "Marketing materials design", "User interface (UI) design"] } />
              <OrderService />
            </ListCard>
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