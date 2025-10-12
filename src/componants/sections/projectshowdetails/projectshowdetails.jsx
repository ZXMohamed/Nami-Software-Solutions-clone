//*react
import React from 'react'
//*mui
import { Box, Container, Grid, Typography } from '@mui/material'
//*hooks
import { useContent } from '../../../languages/hooks/usecontent'
import useUpdateEffect from '../../../hooks/useupdateeffect'
//*components
import RoutesBar from '../../shared/routesbar'
import IntroCard from '../../shared/introcard'
import ListCard from '../../shared/listcard'
import Gallery from '../../shared/gallery'
import PointsList from '../../shared/pointslist'
import MobileScreens from '../../shared/mobilescreens'
import { ServiceBadge, serviceBadgeSize, ServicesBadgesList, servicesBadgesListType } from '../../shared/servicesbadges'
import { TechBadge, techBadgeSize, TechBadgesList, techBadgesListType } from '../../shared/techbadges'
import { GalleryWaitItemsSkelton, IntroCardWaitItemsSkelton, ListCardWaitItemsSkelton } from '../../loadingitems/projectshowdetails'
//*queries
import { useGetProjectByIdQuery } from '../../../redux/server state/projects'
//*animation
import { introCardAosAnimation, listCardAosAnimation } from '../../../animation/projectshowdetails'


export default function ProjectShowDetails() {

  const { isSuccess: content_isSuccess, data: content } = useContent();
  
  const defaultContent = (() => {
    if (content_isSuccess) {
      return {
        direction: content.page.direction,
        language: content.page.language,
        featuresList: {
          title: content.featuresList.title
        },
        programmingLanguagesList: {
          title: content.programmingLanguagesList.title
        }
      }
    } else {
      return firstContent
    }
  }
  )()

  const { isSuccess: project_isSuccess, isError: project_isError, data: project, isFetching: project_isFetching, refetch: project_refetch } = useGetProjectByIdQuery({ id: 1 });

  useUpdateEffect(() => {
    project_refetch();
  },[defaultContent.language]);

  return (
    <Box dir={ defaultContent.direction }>
      { project_isSuccess && <RoutesBar title={ project["id-1"].title } storeTab={"Portfolio"} /> }
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={ { md: 8, xs: 12 } } { ...introCardAosAnimation } className="projectDetailsSide">

            { (!project_isFetching && project_isSuccess) &&
              <IntroCard dir={ defaultContent.direction } title={ project["id-1"].title } description={ project["id-1"].description } >
                { (!project_isFetching && project_isSuccess) && project["id-1"].serviceBadges &&
                  <ServicesBadgesList dir={ defaultContent.direction } type={servicesBadgesListType.row}>
                    { project["id-1"].serviceBadges.map((tech) => <ServiceBadge key={tech.id} data={tech} size={serviceBadgeSize.big}/>) }
                  </ServicesBadgesList>
                }
              </IntroCard>
            }

            { project_isFetching && <IntroCardWaitItemsSkelton /> }

            { (!project_isFetching && project_isSuccess) && project["id-1"].image && <Gallery dir={ defaultContent.direction } sideThumbs data={ [project["id-1"].image, ...(project["id-1"]?.gallery || [])] } /> }

            { project_isFetching && <GalleryWaitItemsSkelton /> }

            { (!project_isFetching && project_isSuccess) && project["id-1"].screens && <MobileScreens dir={defaultContent.direction} data={project["id-1"].screens} />}
            
          </Grid>
          <Grid size={ { md: 4, xs: 12 } } { ...listCardAosAnimation } className="projectListsSide">
            
            { (!project_isFetching && project_isSuccess) && project["id-1"].features &&
              <ListCard dir={ defaultContent.direction } title={ defaultContent.featuresList.title }>
                <PointsList dir={defaultContent.direction} data={ project["id-1"].features } />
              </ListCard>
            }
            { project_isFetching && <ListCardWaitItemsSkelton/>}
            
            { (!project_isFetching && project_isSuccess) && project["id-1"].programmingLanguages &&
              <ListCard dir={defaultContent.direction} title={ defaultContent.programmingLanguagesList.title }>
                  <TechBadgesList dir={ defaultContent.direction } type={techBadgesListType.row}>
                  { project["id-1"].programmingLanguages.map((tech) => <TechBadge key={ tech.id } data={ tech } size={ techBadgeSize.big } />) }
                  </TechBadgesList>
              </ListCard>
            }
            { project_isFetching && <ListCardWaitItemsSkelton /> }

          </Grid>
        </Grid>

        { project_isError && <Typography component={ "h1" } variant='h5' color={ "error" }>data not found !</Typography> }
      </Container>
    </Box>
  )
}

const firstContent = {
  direction: "ltr",
  language: "en",
  featuresList: {
    title: "System features"
  },
  programmingLanguagesList: {
    title: "Programming languages used"
  }
}