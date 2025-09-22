//*react
import React, { memo, useContext, useMemo } from 'react'
//*mui
import { Box, Container, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material';
//*swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
//*component
import SectionHeader from '../sectionheader';
import { ProjectCard } from './projectcard';
//*queries
import { useGetProjectsByCatQuery } from '../../redux/server state/projects';
//*scripts
import { Language } from '../../languages/languagesContext';
import { pages_routes } from '../../routes/routes';
import { useParams } from 'react-router';


export default function Portfolio() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        title : language_isSuccess ? language.projects.header.title : "Newest portfolio",
        subtitle : language_isSuccess ? language.projects.header.subtitle : "We bring your digital vision to life",
        buttons: {
            headerButton: language_isSuccess ? language.projects.header.buttons.headerButton : "Show all"
        }
    }), [language, language_isSuccess]);

    const { language: urlLang } = useParams();

  return (
    <Box id="Portfolio" dir={defaultContent.direction} className='portfolioSection'>
        <SectionHeader dir={defaultContent.direction} title={defaultContent.title} subtitle={defaultContent.subtitle} headerButtonTitle={defaultContent.buttons.headerButton} headerButtonUrl={pages_routes(urlLang)["Portfolio"].link}/>
          <Projects dir={ defaultContent.direction } />
    </Box>
  )
}

const Projects = memo(({ dir }) => {

    const { isSuccess: projects_isSuccess, data: projects, isError: projects_isError } = useGetProjectsByCatQuery({ cat: "all", count: 6, reset: true }, {
        selectFromResult: ({ isSuccess, isError, data }) => ({ isSuccess, isError, data })
    });
    
    const isMDSize = useMediaQuery('(max-width:992px)');
    const isXXXSSize = useMediaQuery('(max-width:600px)');

    const sliderLoopCase = useMemo(() => {
        if (projects_isSuccess)
            return Object.values(projects).length > visibleSlidePerSize(isXXXSSize, isMDSize);
        else
            return false;
    }, [isMDSize, isXXXSSize]);

    return (
        <Container maxWidth="lg">
            <Swiper key={"new-"+sliderLoopCase} dir={"ltr"} slidesPerView={ visibleSlidePerSize(isXXXSSize, isMDSize) } { ...projectsSliderSettings(dir, sliderLoopCase) } className='projectsSlider'>
                { !projects_isSuccess && WaitItemSkeleton(6) }
                { projects_isSuccess && Object.values(projects).map((project, inx) => {
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

const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]: "1000"
} 
const projectCardAosAnimation = (order)=>({
    ...aosAnimation,
    ["data-aos-delay"]: (100 * order).toString()
})

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

function WaitItemSkeleton(num = 1) { 
    const skeletonArray = [];
    for (let i = 0; i < num; i++) { 
        skeletonArray.push(
            <SwiperSlide key={ i }>
                <Stack width={ "100%" }>
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
            </SwiperSlide>
        )
    }
    return skeletonArray;
}

{/*shipping */ }