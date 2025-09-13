import { Box, Button, Container, Skeleton, Stack, Typography } from '@mui/material'
import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import InfoCard, { infoCardEffects, typographyForm } from '../infocard'
import ProjectViewFilter from './projectviewfilter'
import ProjectViewer from './projectviewer'
import { useLazyGetNextProjectsByCatQuery } from '../../redux/server state/projects'
import { useSelector } from 'react-redux'
import { Language } from '../../languages/languagesContext'
import useUpdateEffect from '../../hooks/useupdateeffect'

export default function ProjectsView() {

  const { isSuccess: language_isSuccess, data: language, requestId: language_RequestId } = useContext(Language);

  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
    subtitle: language_isSuccess ? language.header.subtitle : "We bring your digital vision to life",
    description: language_isSuccess ? language.header.description : "At Nami Corporation, we excel at providing innovative and advanced web and mobile solutions. We specialize inDesign and development of websites and mobile applications tailored to meet the needs of our customers unique. Explore how we can help you achieve your digital goals with the best quality and highest standards.",
    buttons: {
      loadMore: language_isSuccess ? language.buttons.loadMore : "Load more"
    }
  }), [language, language_isSuccess]);

  const viewerRef = useRef();

  
  const filterValues = useSelector((state) => state.portfolioFilter);
  
  const [projects_trigger, { isSuccess: projects_isSuccess, data: projects, isError: projects_isError, reset: projects_reset }] = useLazyGetNextProjectsByCatQuery(undefined, {
    selectFromResult: ({ isSuccess, isError, data }) => ({ isSuccess, isError, data }),
  });

  useUpdateEffect(() => {
    projects_reset()
  }, [language_RequestId]);

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
    <Box>
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
      
      { !projects_isSuccess && <WaitItemSkeleton num={ 9 } /> }
      
      { !projects_isEmpty &&
        <Container Container maxWidth="lg" className='loadMoreCon'>
          <Button variant='text' onClick={ handleLoadMore }> Load more </Button>
        </Container>}
    </Box>
  )
}




function WaitItemSkeleton({ num = 1, }) { 
    const skeletonArray = [];
    for (let i = 0; i < num; i++) { 
        skeletonArray.push(
          <Stack width={ 390 }>
              <Stack direction={ "row" } justifyContent={"space-between"} alignItems={"center"}>
                  <Skeleton width={ "30%" } height={ 20 } variant='rounded' />
                  <Skeleton width={40} height={40} variant='circular'/>
              </Stack>
              <br />
              <Skeleton width={ "100%" } height={ 10 } variant='rounded' />
              <br/>
              <Skeleton width={ "100%" } height={ 10 } variant='rounded' />
              <br />
              <Skeleton width={ "100%" } height={ 350 } variant='rounded' />
          </Stack>
        )
    }
  return (
    <Container maxWidth="lg">
      <Stack flexWrap={ "wrap" } direction={ "row" } gap={ 5 } justifyContent={'center'} alignItems={'center'}>
        { skeletonArray }
      </Stack>
    </Container>
  );
}