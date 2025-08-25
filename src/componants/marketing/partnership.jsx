import React, { useContext, useMemo } from 'react'
import MiniHeader from '../miniheader';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Language } from '../../languages/languagesContext';

import "../../sass/shared/partnership.scss"

import companyLogo from "../../assets/photo/global/namiicon.svg"

export default function Partnership() {

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);
  
  const defaultContent = useMemo(() => ({
      direction: language_isSuccess ? language.page.direction : "ltr",
      title: language_isSuccess ? language.partnership.header.title : "How to be our partner",
      subtitle: language_isSuccess ? language.partnership.header.subtitle : "Marketer partnership system",
      questions:language_isSuccess ? language.partnership.questions : questions
  }), [language, language_isSuccess]);

  return (
  <Box className="partnership">
    <MiniHeader dir={ defaultContent.direction } title={ defaultContent.title } subtitle={ defaultContent.subtitle } />
    <br />
    <br />
    <Container>
        <Box>
          { defaultContent.questions.map((question, inx) => {
            if (inx % 2 == 0) {
              var dir = defaultContent.direction;
            } 
            else if(defaultContent.direction=="ltr") {
              var dir = "rtl";
            } else {
              var dir = "ltr";
            }
            return <QuestionCard key={ inx } contentDir={defaultContent.direction} dir={ dir } data={ question } />
          }) }
        </Box>
    </Container>
  </Box>
  )
}

export function QuestionCard({ dir, contentDir, data }) {
  return (
    <Stack direction={"row"} dir={dir} className={"questionCardCon"}>
      <Stack dir={contentDir} className={"questionCard"}>
        <img src={companyLogo} alt="" />
        <Typography component={"h6"} className={"questionCard-Q"}>{ data.Q }</Typography>
        <Typography className={"questionCard-A"}>{ data.A }</Typography>
      </Stack>
      <div className={"questionCardCubeBar"}></div>
      <div className={"questionCardBar"}></div>
    </Stack>
  )
}


const questions = [
  {
      "Q":"What is my role if I want to join this system?",
      "A":"The sole role is to find clients for Nami. Start by searching for people in your network or on the internet and social media platforms who need websites or mobile apps. If the client you bring requests a service from Nami, you have now become a partner of Nami."
  },
  {
      "Q":"What is my role if I want to join this system?",
      "A":"Nami has introduced a new system called the \"Marketer Partnership Program,\" designed for those working in marketing and anyone looking to increase their income during their spare time."
  }
]