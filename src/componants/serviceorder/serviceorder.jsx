import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import IntroCard from '../introcard'
import ListCard from '../listcard'
import ObjectivesList from '../objectiveslist'
import OrderService from './orderservice'

export default function ServiceOrder() {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={8}>
            <IntroCard dir={"ltr"} icon={""} title={"Design services"} description={"We offer a comprehensive range of design services that include graphic design and brand identity design. We work to create innovative designs that reflect the essence of your brand and attract the attention of your audience."}/>
          </Grid>
          <Grid size={4}>
            <ListCard dir={"ltr"} title={"Service objectives"}>
              <ObjectivesList dir={ "ltr" } data={ ["Graphic Design", "Brand identity design", "Logos design", "Marketing materials design", "User interface (UI) design"] } />
              <br />
              <OrderService />
              <br />
            </ListCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
