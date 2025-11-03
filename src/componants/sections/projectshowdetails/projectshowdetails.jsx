//*react
import React, { useEffect } from 'react'
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
import PageHead from '../../shared/pagehead'
//*queries
import { useGetProjectByIdQuery } from '../../../redux/server state/projects'
//*animation
import { introCardAosAnimation, listCardAosAnimation } from '../../../animation/projectshowdetails'
//*hooks
import useCashedImage from '../../../hooks/usecashedimage'
import { useParams } from 'react-router'
import { pages_routes } from '../../../routes/routes'



export default function ProjectShowDetails() {

  const { isSuccess: content_isSuccess, data: content } = useContent();
  
  const defaultContent = (() => {
    if (content_isSuccess) {
      return {
        direction: content.page.direction,
        language: content.page.language,
        logo: content.navBar.navLogo,
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

  const { id: projectId } = useParams();

  const { isSuccess: project_isSuccess, isError: project_isError, error: project_error, data: project, isFetching: project_isFetching, refetch: project_refetch } = useGetProjectByIdQuery({ id: projectId });

  useUpdateEffect(() => {
    project_refetch();
  },[defaultContent.language]);

  return (
  <>
    { project_isSuccess && <PageHead pageTitle={ project.title } title={ project.title } description={ project.description } language={ defaultContent.language } type='SoftwareApplication' image={ defaultContent.logo } url={pages_routes(defaultContent.language,projectId)["project details"].link} LD_Json={ 
        {
          "offers": {
            "@type": "SoftwareApplication",
            "name": project.title,
            "description": project.description
          }
        }
      } /> }
    <Box dir={ defaultContent.direction }>
      { project_isSuccess && <RoutesBar title={ project.title } storeTab={"Portfolio"} /> }
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid size={ { md: 8, xs: 12 } } { ...introCardAosAnimation } className="projectDetailsSide">

            { (!project_isFetching && project_isSuccess) &&
              <IntroCard dir={ defaultContent.direction } title={ project.title } description={ project.description } >
                { (!project_isFetching && project_isSuccess) && project.serviceBadges &&
                  <ServicesBadgesList dir={ defaultContent.direction } type={servicesBadgesListType.row}>
                    { project.serviceBadges.map((tech) => <ServiceBadge key={tech.id} data={tech} size={serviceBadgeSize.big}/>) }
                  </ServicesBadgesList>
                }
              </IntroCard>
            }

            { project_isFetching && <IntroCardWaitItemsSkelton /> }

            { (!project_isFetching && project_isSuccess) && (project.image || project?.gallery) && <CashedGallery dir={ defaultContent.direction } id={project.id} mainImage={project.image} data={ (project?.gallery || []) } alt={project.title} /> }

            { project_isFetching && <GalleryWaitItemsSkelton /> }

            { (!project_isFetching && project_isSuccess) && project.screens && <MobileScreens dir={defaultContent.direction} data={project.screens} alt={project.title}/>}
            
          </Grid>
          <Grid size={ { md: 4, xs: 12 } } { ...listCardAosAnimation } className="projectListsSide">
            
            { (!project_isFetching && project_isSuccess) && project.features &&
              <ListCard dir={ defaultContent.direction } title={ defaultContent.featuresList.title }>
                <PointsList dir={defaultContent.direction} data={ project.features } />
              </ListCard>
            }
            { project_isFetching && <ListCardWaitItemsSkelton/>}
            
            { (!project_isFetching && project_isSuccess) && project.programmingLanguages &&
              <ListCard dir={defaultContent.direction} title={ defaultContent.programmingLanguagesList.title }>
                  <TechBadgesList dir={ defaultContent.direction } type={techBadgesListType.row}>
                  { project.programmingLanguages.map((tech) => <TechBadge key={ tech.id } data={ tech } size={ techBadgeSize.big } />) }
                  </TechBadgesList>
              </ListCard>
            }
            { project_isFetching && <ListCardWaitItemsSkelton /> }

          </Grid>
        </Grid>

        { project_isError && <Typography component={ "h1" } variant='h5' color={ "error" }>{project_error.data.error}</Typography> }
      </Container>
    </Box>
  </>
  )
}


function CashedGallery({ dir, id, mainImage, data, alt }) {
  const [image, cashImage] = useCashedImage(mainImage, "portfolio", id);
  
  useEffect(() => {
    cashImage();
  },[])
console.log(dir,id,mainImage,data,image);
  return (
    <Gallery dir={ dir } sideThumbs data={ mainImage ? [image, ...data] : [...data] } alt={ alt } />
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