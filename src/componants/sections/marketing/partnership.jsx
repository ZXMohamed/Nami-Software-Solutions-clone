//*react
import React from 'react'
//*mui
import { Box, Container, Stack, Typography } from '@mui/material';
//*components
import MiniHeader from '../../shared/miniheader';
//*styles
import "../../../sass/shared/partnership.scss";
//*assets
import companyLogo from "../../../assets/photo/global/namiicon.svg";
//*hooks
import { useContent } from '../../../languages/hooks/usecontent';

export default function Partnership() {
  
  const { isSuccess: content_isSuccess, data: content } = useContent();

  const defaultContent = (() => {
      if (content_isSuccess) {
        return {
          direction: content.page.direction,
          title: content.partnership.header.title,
          subtitle: content.partnership.header.subtitle,
          questions: content.partnership.questions
        }
      } else {
          return firstContent;
      }
  })();

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
        <img src={companyLogo} alt={data.Q} />
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

const firstContent = {
  direction: "ltr",
  title: "How to be our partner",
  subtitle: "Marketer partnership system",
  questions: questions
}