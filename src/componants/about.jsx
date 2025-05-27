import { Box, Container, Grid } from '@mui/material'
import React from 'react'

export default function About() {
  return (
    <Box>
        <Container maxWidth="lg" disableGutters="true">
            <Grid container spacing={0}>
                <Grid size={6}>image</Grid>
                <Grid size={6}>text</Grid>
            </Grid>
        </Container>
    </Box>
  )
}
