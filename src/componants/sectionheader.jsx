import { Box, Container, Grid, Typography } from "@mui/material";

export default function Sectionheader({title,subtitle,showallurl}) { 

    return (
        <Box className="sectionheader">
            <Container maxWidth="lg">
                <Typography variant="h5" component="h2" textAlign={{sm:"left",xs:"center"}} data-aos="fade-up" data-aos-duration="600" data-aos-delay="50"><i>{subtitle}</i></Typography>
                <Grid container>
                    <Grid size={ { sm: 10, xs: 12 } } justifyContent={ { sm: 'flex-start', xs: 'center' } } display={ 'flex' } data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                        <Typography variant="h4" component="h1">{title}</Typography>
                    </Grid>
                    <Grid size={ { sm: 2, xs: 12 } } justifyContent={ { sm: 'flex-end', xs: 'center' }} display={'flex'} data-aos="fade-up" data-aos-duration="600" data-aos-delay="100">
                        <a href={ showallurl }>Show all<Box></Box></a>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}