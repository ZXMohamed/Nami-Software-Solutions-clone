//*react
import React, { memo, useMemo } from 'react'
//*route
import { pages_routes } from '../../../routes/routes';
import { useParams } from 'react-router';
//*mui
import { Box, Container, Typography, useMediaQuery } from '@mui/material';
//*swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
//*component
import SectionHeader from '../../shared/sectionheader';
import { ProjectCard } from '../../shared/projectcard';
import { WaitItemSkeleton } from '../../loadingitems/portfolio';
//*queries
import { useGetProjectsByCatQuery } from '../../../redux/server state/projects';
//*hooks
import { useContent } from '../../../languages/hooks/usecontent';
import useUpdateEffect from '../../../hooks/useupdateeffect';
//*scripts
import { defaultLanguage } from '../../../languages/languagesContext';
//*animation
import { projectCardAosAnimation } from '../../../animation/portfolio';


export default function Portfolio() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction ,
                language: content.page.language ,
                title: content.projects.header.title ,
                subtitle: content.projects.header.subtitle ,
                buttons: {
                    headerButton: content.projects.header.buttons.headerButton 
                }
            }
        } else {
            return portfolioFirstContent;
        }
    })();

    const { language: urlLang } = useParams();

  return (
    <Box id="portfolio" dir={defaultContent.direction} className='portfolioSection'>
        <SectionHeader dir={defaultContent.direction} title={defaultContent.title} subtitle={defaultContent.subtitle} headerButtonTitle={defaultContent.buttons.headerButton} headerButtonUrl={pages_routes(urlLang)["portfolio"].link}/>
          <Projects dir={ defaultContent.direction } language={defaultContent.language} />
    </Box>
  )
}

const Projects = memo(({ dir, language }) => {

    const { isSuccess: projects_isSuccess, isFetching: projects_isFetching, data: projects, isError: projects_isError, refetch: projects_refetch } = useGetProjectsByCatQuery({ cat: "all", count: 6, reset: true });
    
    const isMDSize = useMediaQuery('(max-width:992px)');
    const isXXXSSize = useMediaQuery('(max-width:600px)');

    const sliderLoopCase = useMemo(() => {
        if (projects_isSuccess)
            return Object.values(projects).length > visibleSlidePerSize(isXXXSSize, isMDSize);
        else
            return false;
    }, [isMDSize, isXXXSSize]);

    useUpdateEffect(() => {
        projects_refetch()
    }, [language]);

    return (
        <Container maxWidth="lg">
            <Swiper key={"new-"+sliderLoopCase} dir={"ltr"} slidesPerView={ visibleSlidePerSize(isXXXSSize, isMDSize) } { ...projectsSliderSettings(dir, sliderLoopCase) } className='projectsSlider'>
                { projects_isFetching && WaitItemSkeleton(6) }
                { (!projects_isFetching && projects_isSuccess) && Object.values(projects).map((project, inx) => {
                    return (
                        <SwiperSlide key={ project.id } className='projectsSlide'>
                            <ProjectCard dir={dir} bordered data={project} aosAnimation={ projectCardAosAnimation(inx + 1) } />
                        </SwiperSlide>
                    )
                }
                ) }
                { projects_isError && <Typography component={ "h1" } variant={ "h5" } color='error'>Data Not Found!</Typography> }
            </Swiper>
        </Container>
    )
});

const projectsSliderSettings = (direction, loop) => ({
    spaceBetween: 10,
    loop: loop,
    autoplay: { delay: 2000, disableOnInteraction: false, reverseDirection: (direction == "ltr" ? false : true) },
    modules: [Autoplay]
})

function visibleSlidePerSize(isXXXSSize, isMDSize) {
    //*from smaller size to bigger size
    if (isXXXSSize) {
        return 1;
    } else if (isMDSize) {
        return 2;
    }else{
        return 3;
    }
}

const portfolioFirstContent = {
    direction: "ltr",
    language: defaultLanguage,
    title: "Newest portfolio",
    subtitle: "We bring your digital vision to life",
    buttons: {
        headerButton: "Show all"
    }
}