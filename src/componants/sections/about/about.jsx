//*react
import React, { memo, useEffect, useRef } from 'react'
//*mui
import { Box, Container, Grid, Typography, Stack } from '@mui/material'
//*hooks
import { useContent } from '../../../languages/hooks/usecontent';
import useUpdateEffect from '../../../hooks/useupdateeffect';
//*components
import DownloadButton from '../../shared/buttons/downloadbutton';
//*queries
import { useGetCompanyFileQuery } from '../../../redux/server state/companyfile';
//*assets
import aboutSideImg from "../../../assets/photo/about/aboutsideimg.webp";
//*scripts
import { defaultLanguage } from '../../../languages/languagesContext';
//*animation
import { aboutDescriptionAosAnimation, aboutTitleAosAnimation, descriptionLinesUp, establishmentCounterAosAnimation, establishmentDateAosAnimation, establishmentDateCountUp, imgMoveWithScroll, movingImgSideAosAnimation, subtitleBackgroundMoveWithScroll } from '../../../animation/about';


export default function About() {

  const { isSuccess: content_isSuccess, data: content } = useContent();
  const defaultContent = { direction: content_isSuccess ? content.page.direction : "ltr" };
  
  return (
    <Box id="aboutus" dir={defaultContent.direction} className="aboutSection">
      <Container maxWidth="lg" disableGutters>
        <Grid container>
          <Grid size={ { md: 6, xs: 12 } } className="aboutMovingImgSide" {...movingImgSideAosAnimation}>
            <SideImg/>
          </Grid>
          <Grid size={ { md: 6, xs: 12 } } className="aboutInfoSide">
            <Info/>
            <CompanyFile/>
            <Establishment/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

const SideImg = memo(() => {
  
  const sideImgContainer = useRef();
  const sideImg = useRef();

  useEffect(() => {
    requestIdleCallback(() => {
      imgMoveWithScroll(sideImgContainer, sideImg);
    });
  }, []);

  return (
    <Box ref={ sideImgContainer } className="aboutSideImgContainer">
      <img ref={ sideImg } src={ aboutSideImg } alt="Nami Software Solutions" loading='lazy' className="aboutMovingImg" />
    </Box>
  )
});

const Info = () => {

  const { isSuccess: content_isSuccess, data: content } = useContent();

  const defaultContent = (() => {
      if (content_isSuccess) {
        return {
          direction: content.page.direction,
          title: content.about.title,
          subtitle: content.about.subtitle,
          description: content.about.description,
        }
      } else {
          return infoFirstContent;
      }
  })();

  const subtitle = useRef();
  const description = useRef();

  useEffect(() => {
    requestIdleCallback(() => { 
      subtitleBackgroundMoveWithScroll(subtitle);
      descriptionLinesUp(description);
    });
  }, []);
  
  return (
  <>
    <Typography variant="h5" component="h1" className='aboutTitle' {...aboutTitleAosAnimation}><i>{defaultContent.title}</i></Typography>
    <Typography ref={subtitle} variant="h4" component="h2" className='aboutSubtitle'>{defaultContent.subtitle}</Typography>
    <Typography ref={description} className='aboutDescription' {...aboutDescriptionAosAnimation}>{defaultContent.description}</Typography>
  </>
  )
}
const CompanyFile = () => {

  const { isSuccess: content_isSuccess, data: content } = useContent();

  const defaultContent = (() => {
      if (content_isSuccess) {
        return {
          direction: content.page.direction,
          language: content.page.language,
          buttons: {
            companyFile: content.about.buttons.companyFile,
          }
        }
      } else {
        return companyFileFirstContent;
      }
  })();

  const { isSuccess: companyFile_isSuccess, data: companyFile, isError: companyFile_isError, error: companyFile_error, refetch: companyFile_refetch } = useGetCompanyFileQuery(undefined, {
    selectFromResult: ({ isSuccess, data, isError, error }) => ({ isSuccess, data, isError, error })
  });

  useUpdateEffect(() => {
    companyFile_refetch();
  }, [defaultContent.language]);
  
  return (
    <>
      <DownloadButton direction={defaultContent.direction} link={ companyFile?.url } title={ defaultContent.buttons.companyFile } />
      { companyFile_isError && <Typography color='error'>{ companyFile_error.data.error }</Typography> }
    </>
  );
}
const Establishment = () => {

  const { isSuccess: content_isSuccess, data: content } = useContent();

  const defaultContent = (() => {
      if (content_isSuccess) {
        return {
          direction: content.page.direction,
          establishment: {
            title: content.about.establishment.title,
            establishmentDate: content.about.establishment.establishmentDate
          }
        }
      } else {
        return establishmentFirstContent;
      }
  })();

  const establishment = useRef();
  const establishmentDate = useRef();

  useEffect(() => {
    requestIdleCallback(() => { 
      establishmentDateCountUp(establishmentDate, establishment, defaultContent.establishment.establishmentDate);
    });
  }, []);
  
  return (
    <Stack ref={establishment} direction="row" dir={defaultContent.direction} className='establishmentCounter' {...establishmentCounterAosAnimation}>
      <span className="establishmentTitle">{defaultContent.establishment.title}</span>
      <Typography ref={establishmentDate} variant='h1' component='h3' className="establishmentDate" {...establishmentDateAosAnimation}>0</Typography>
    </Stack>
  )
}

const infoFirstContent = {
  direction: "ltr",
  title: "Know about us ..",
  subtitle: "Nami is a company specialized in providing Integrated web services",
  description: "Starting from graphic design to programming and designing smart phone applications, Nami strivesAnd its work team from the day of its establishment until it became one of the most important Arab web development companies, and weWe know the path and we are walking on it with great strides.",
}
const companyFileFirstContent = {
  direction: "ltr",
  language: defaultLanguage,
  buttons: {
    companyFile: "Download the company file",
  }
}
const establishmentFirstContent = {
  direction: "ltr",
  establishment: {
    title: "Establishment",
    establishmentDate: "2017"
  }
};