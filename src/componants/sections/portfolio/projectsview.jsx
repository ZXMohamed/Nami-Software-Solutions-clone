//*react
import React, { useEffect, useRef } from 'react'
//*routes
import { pages_routes } from '../../../routes/routes'
//*mui
import { Box, Button, Container, Typography } from '@mui/material'
//*components
import InfoCard, { infoCardEffects, typographyForm } from '../../shared/infocard'
import ProjectViewFilter from './projectviewfilter'
import ProjectViewer from './projectviewer'
import { WaitItemSkeleton } from '../../loadingitems/projectsview'
import PageHead from '../../shared/pagehead'
//*queries
import { useLazyGetNextProjectsByCatQuery } from '../../../redux/server state/projects'
//*hooks
import { useSelector } from 'react-redux'
import useUpdateEffect from '../../../hooks/useupdateeffect'
import { useContent } from '../../../languages/hooks/usecontent'
//*scripts
import { defaultLanguage } from '../../../languages/languagesContext'
//*assets
import logo from "../../../assets/photo/global/namilogo.svg"



export default function ProjectsView() {

  const { isSuccess: content_isSuccess, data: content, requestId: content_RequestId } = useContent();

  const defaultContent = (() => {
    if (content_isSuccess) {
      return {
        direction: content.page.direction,
        language: content.page.language,
        pageTitle: content.page.title,
        meta: {
          title: content.page.meta.title,
          description: content.page.meta.description,
          image: content.page.meta.image
        },
        subtitle: content.header.subtitle,
        description: content.header.description,
        buttons: {
          loadMore: content.buttons.loadMore
        }
      }
    } else {
        return projectsViewFirstContent;
    }
  })();

  const viewerRef = useRef();

  const filterValues = useSelector((state) => state.portfolioFilter);
  
  const [projects_trigger, { isSuccess: projects_isSuccess, data: projects, isError: projects_isError, error: projects_error, reset: projects_reset, isLoading: projects_isLoading }] = useLazyGetNextProjectsByCatQuery();

  useEffect(() => { 
    //*reset cash on unmount to start from first on mount 
    return ()=> projects_reset();
  },[]);

  useUpdateEffect(() => {
    projects_reset();
  }, [content_RequestId]);

  useEffect(() => {
    const search = (filterValues.search != "" || filterValues.search != null) ? filterValues.search : null;
    projects_trigger({ cat: filterValues.cat, count: 9, reset: true, search: search });
  }, [filterValues.cat, filterValues.search, content_RequestId]);
  

  const handleLoadMore = () => {
    if (projects_isSuccess) {
      const search = filterValues.search != "" || filterValues.search != null ? filterValues.search : null;
      projects_trigger({ cat: filterValues.cat, count: 9, search: search });
      viewerRef.current.scrollTo({ scrollLeft: viewerRef.current.state.scrollLeft, scrollTop: viewerRef.current.state.scrollTop + 100 });
    }
  }

  const projects_isEmpty = projects ? Object.keys(projects).length == 0 : undefined;

  return (
    <>
      <PageHead pageTitle={defaultContent.pageTitle} title={defaultContent.meta.title} description={defaultContent.meta.description} image={defaultContent.meta.image} type='portfolio' language={defaultContent.language} url={pages_routes(defaultContent.language)["portfolio"].link} />
      <Box id="Portfolio">
        <InfoCard dir={ defaultContent.direction } waveDir='right' subtitle={ defaultContent.subtitle } description={ defaultContent.description } animateDescription effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle: [typographyForm.subtitle.size.big] } } />
        
        <br />
        <br />

        <ProjectViewFilter resetProjectsCash={ projects_reset } />
        
        <br />
        <br />

        <Container maxWidth="lg">
          { projects_isError && <Typography color={ "error" } variant={ "h5" }>{ projects_error.data.error }</Typography> }
        </Container>

        { <ProjectViewer ref={ viewerRef } dir={ defaultContent.direction } data={ projects_isSuccess && projects } loadMore={ projects_trigger } isSuccess={ projects_isSuccess } isEmpty={ projects_isEmpty } /> }
        
        { projects_isLoading && <WaitItemSkeleton num={ 9 } /> }
        
        { !projects_isEmpty &&
          <Container maxWidth="lg" className='loadMoreCon'>
            <Button variant='text' onClick={ handleLoadMore }> {defaultContent.buttons.loadMore} </Button>
          </Container>}
      </Box>
    </>
  )
}

const projectsViewFirstContent = {
  direction: "ltr",
  Language: defaultLanguage,
  pageTitle: "Our Portfolio | Web Design, Mobile Apps & Branding Projects",
  meta: {
    title: "Our Portfolio | Nami Software Solutions",
    description: "At Nami Corporation, we excel at providing innovative and advanced web and mobile solutions. We specialize inDesign and development of websites and mobile applications tailored to meet the needs of our customers unique. Explore how we can help you achieve your digital goals with the best quality and highest standards.",
    image: logo
  },
  subtitle: "We bring your digital vision to life",
  description: "At Nami Corporation, we excel at providing innovative and advanced web and mobile solutions. We specialize inDesign and development of websites and mobile applications tailored to meet the needs of our customers unique. Explore how we can help you achieve your digital goals with the best quality and highest standards.",
  buttons: {
    loadMore: "Load more"
  }
}