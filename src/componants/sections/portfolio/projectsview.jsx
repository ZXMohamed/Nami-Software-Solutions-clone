//*react
import React, { useContext, useEffect, useMemo, useRef } from 'react'
//*mui
import { Box, Button, Container, Typography } from '@mui/material'
//*components
import InfoCard, { infoCardEffects, typographyForm } from '../../shared/infocard'
import ProjectViewFilter from './projectviewfilter'
import ProjectViewer from './projectviewer'
import { WaitItemSkeleton } from '../../loadingitems/projectsview'
//*queries
import { useLazyGetNextProjectsByCatQuery } from '../../../redux/server state/projects'
//*hooks
import { useSelector } from 'react-redux'
import useUpdateEffect from '../../../hooks/useupdateeffect'
//*scripts
import { defaultLanguage, Language } from '../../../languages/languagesContext'



export default function ProjectsView() {

  const { isSuccess: language_isSuccess, data: language, requestId: language_RequestId } = useContext(Language);

  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
    language: language_isSuccess ? language.page.direction : defaultLanguage,
    subtitle: language_isSuccess ? language.header.subtitle : "We bring your digital vision to life",
    description: language_isSuccess ? language.header.description : "At Nami Corporation, we excel at providing innovative and advanced web and mobile solutions. We specialize inDesign and development of websites and mobile applications tailored to meet the needs of our customers unique. Explore how we can help you achieve your digital goals with the best quality and highest standards.",
    buttons: {
      loadMore: language_isSuccess ? language.buttons.loadMore : "Load more"
    }
  }), [language, language_isSuccess]);

  const viewerRef = useRef();

  
  const filterValues = useSelector((state) => state.portfolioFilter);
  
  const [projects_trigger, { isSuccess: projects_isSuccess, data: projects, isError: projects_isError, reset: projects_reset, isFetching: projects_isFetching }] = useLazyGetNextProjectsByCatQuery();

  useUpdateEffect(() => {
    projects_reset()
  }, [defaultContent.language]);

  useEffect(() => {
    const search = (filterValues.search != "" || filterValues.search != null) ? filterValues.search : null;
    projects_trigger({ cat: filterValues.cat, count: 9, reset: true, search: search });
  }, [filterValues.cat, filterValues.search, language_RequestId]);
  

  const handleLoadMore = () => {
    if (projects_isSuccess) {
      const search = filterValues.search != "" || filterValues.search != null ? filterValues.search : null;
      projects_trigger({ cat: filterValues.cat, count: 9, search: search });
      viewerRef.current.scrollTo({ scrollLeft: viewerRef.current.state.scrollLeft, scrollTop: viewerRef.current.state.scrollTop + 100 });
    }
  }

  const projects_isEmpty = projects ? Object.keys(projects).length == 0 : undefined;

  return (
    <Box id="Portfolio">
      <InfoCard dir={ defaultContent.direction } waveDir='right' subtitle={ defaultContent.subtitle } description={ defaultContent.description } animateDescription effects={ [infoCardEffects.sharpEffect] } typographyForm={ { subtitle: [typographyForm.subtitle.size.big] } } />
      
      <br />
      <br />

      <ProjectViewFilter resetProjectsCash={ projects_reset } />
      
      <br />
      <br />

      <Container maxWidth="lg">
        { projects_isError && <Typography color={ "error" } variant={ "h5" }>Data Not Found!</Typography> }
      </Container>

      { <ProjectViewer ref={ viewerRef } dir={ defaultContent.direction } data={ projects_isSuccess && projects } loadMore={ projects_trigger } isSuccess={ projects_isSuccess } isEmpty={ projects_isEmpty } /> }
      
      { projects_isFetching && <WaitItemSkeleton num={ 9 } /> }
      
      { !projects_isEmpty &&
        <Container Container maxWidth="lg" className='loadMoreCon'>
          <Button variant='text' onClick={ handleLoadMore }> {defaultContent.buttons.loadMore} </Button>
        </Container>}
    </Box>
  )
}