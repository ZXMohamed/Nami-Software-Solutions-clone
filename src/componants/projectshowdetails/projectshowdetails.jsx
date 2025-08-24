import React, { useContext, useMemo } from 'react'
import { Box, Container, Grid, Skeleton, Stack, Typography } from '@mui/material'
import IntroCard from '../introcard'
import ListCard from '../listcard'
import { Language } from '../../languages/languagesContext'
import { useGetProjectByIdQuery } from '../../redux/server state/projects'
import Gallery from '../gallery'
import PointsList from '../pointslist'
import { TechBadge, techBadgeSize, TechBadgesList, techBadgesListType } from '../techbadges'
import { ServiceBadge, serviceBadgeSize, ServicesBadgesList, servicesBadgesListType } from '../servicesbadges'
import MobileScreens from '../mobilescreens'
// import DownloadButton from '../buttons/downloadbutton'
// import Orderproject from './orderproject'


export default function ProjectShowDetails() {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
    language: language_isSuccess ? language.page.language : "en",
    buttons:{
      // orderproject: language_isSuccess ? language.projectOrder.buttons.orderproject : "Request a trial version",
      downloadSystemFile: language_isSuccess ? language.buttons.downloadSystemFile : "Download the system file"
    },
    objectivesList: {
      title: language_isSuccess ? language.objectivesList.title : "System objectives"
    },
    featuresList:{
      title: language_isSuccess ? language.featuresList.title : "System features"
    },
    programmingLanguagesList:{
      title: language_isSuccess ? language.programmingLanguagesList.title : "Programming languages used"
    }
  }), [language, language_isSuccess]);

  const { isSuccess: project_isSuccess, isError: project_isError, data: project } = useGetProjectByIdQuery({ id: 1 });
  console.log(project);
  return (
    <Box dir={defaultContent.direction}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={ { md: 8, xs: 12 } } { ...introCardAosAnimation } className="projectDetailsSide">

            { project_isSuccess &&
              <IntroCard dir={ defaultContent.direction } title={ project["id-1"].title } description={ project["id-1"].description } >
                { project_isSuccess &&
                  <ServicesBadgesList dir={ defaultContent.direction } type={servicesBadgesListType.row}>
                    { project["id-1"].serviceBadges.map((tech) => <ServiceBadge key={tech.id} data={tech} size={serviceBadgeSize.big}/>) }
                  </ServicesBadgesList>
                }
              </IntroCard>
            }

            { !project_isSuccess && <IntroCardWaitItemsSkelton /> }

            { project_isSuccess && <Gallery dir={ defaultContent.direction } sideThumbs data={ [project["id-1"].image, ...(project["id-1"]?.gallery || [])] } /> }
            
            { !project_isSuccess && <GalleryWaitItemsSkelton /> }

            { project_isSuccess && <MobileScreens dir={defaultContent.direction} data={project["id-1"].screens} />}
            
          </Grid>
          <Grid size={ { md: 4, xs: 12 } } { ...listCardAosAnimation } className="projectListsSide">
            
            <ListCard dir={defaultContent.direction} title={ defaultContent.featuresList.title }>
              { project_isSuccess && <PointsList dir={defaultContent.direction} data={ project["id-1"].features } />}
              { !project_isSuccess && <ListCardWaitItemsSkelton/>}
            </ListCard>

            <ListCard dir={defaultContent.direction} title={ defaultContent.programmingLanguagesList.title }>
              { project_isSuccess &&
                <TechBadgesList dir={ defaultContent.direction } type={techBadgesListType.row}>
                  { project["id-1"].programmingLanguages.map((tech) => <TechBadge key={tech.id} data={tech} size={techBadgeSize.big}/>) }
                </TechBadgesList>
              }
              { !project_isSuccess && <ListCardWaitItemsSkelton/>}
            </ListCard>

          </Grid>
        </Grid>

        { project_isError && <Typography component={ "h1" } variant='h5' color={ "error" }>data not found !</Typography> }
      </Container>
    </Box>
  )
}

function GalleryWaitItemsSkelton() { 
    return (
      <Stack direction={ "row" } spacing={3}>
          <Box>
            <Skeleton variant="rounded" width={ 120 } height={ 110 } />
            <br/>
            <Skeleton variant="rounded" width={ 120 } height={ 110 } />
            <br/>
            <Skeleton variant="rounded" width={ 120 } height={ 110 } />
            <br/>
            <Skeleton variant="rounded" width={ 120 } height={ 100 } />
            <br/>
          </Box>
          <Skeleton variant="rounded" width={ "100%" } height={ 500 } />
        </Stack>
    );
}

function IntroCardWaitItemsSkelton() { 
    return (
        <>
            {/* <br/> */}
            <Skeleton variant="rounded" width={ 200 } height={ 20 } />
            {/* <br/> */}
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            {/* <br/> */}
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            {/* <br/> */}
            <Skeleton variant="rounded" width={ "80%" } height={ 10 } />
            {/* <br /> */}
            <Stack direction={"row"} columnGap={2}>
              <Skeleton variant="rounded" width={ "20%" } height={ 40 } />
              <Skeleton variant="rounded" width={ "20%" } height={ 40 } />
              <Skeleton variant="rounded" width={ "20%" } height={ 40 } />
            </Stack>
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