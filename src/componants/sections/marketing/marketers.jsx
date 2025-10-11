//*react
import React from 'react'
//*mui
import { Box, Button, Container, Stack, Typography } from '@mui/material'
//*hooks
import { useContent } from '../../../languages/hooks/usecontent';
//*components
import MiniHeader from '../../shared/miniheader'
//*styles
import "../../../sass/shared/marketers.scss"
//*assets
import EG from "../../../assets/photo/marketing/EG.svg"
import SA from "../../../assets/photo/marketing/SA.svg"
import whatsapp from "../../../assets/photo/marketing/whatsapp.svg"
import call from "../../../assets/photo/marketing/call.svg"
import mailbox from "../../../assets/photo/marketing/mailbox.svg"

export default function Marketers() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                title: content.marketers.header.title,
                subtitle: content.marketers.header.subtitle,
                marketers: content.marketers.marketersList
            }
        } else {
            return firstContent;
        }
    })();
    
    return (
    <Box dir={defaultContent.direction} className="marketers">
        <MiniHeader dir={defaultContent.direction} title={defaultContent.title} subtitle={defaultContent.subtitle}/>
        <br/>
        <Container>
            <Stack direction={'row'} gap={2} flexWrap={"wrap"}>
                { defaultContent.marketers.map((marketer, inx) => <MarketerCard key={ inx } dir={defaultContent.direction} data={ marketer } />)}
            </Stack>
        </Container>
    </Box>
  )
}

export function MarketerCard({ dir, data }) {
  return (
    <Box dir={dir} className={"marketerCard"}>
        <Stack direction={"row"} className={"marketerCardHeader"}>
            <img src={data.country.icon} alt="" />
            <Typography>{data.country.title}</Typography>
        </Stack>
        <Typography className={"marketerCardName"}>{data.marketer.name}</Typography>
        <Stack direction={"row"} className={"marketerCardContact"}>
            <Button variant='outlined' color='primary'><img src={whatsapp} alt="" /></Button>
            <Button variant='outlined' color='error'><img src={mailbox} alt="" /></Button>
            <Button variant='outlined' color='info'><img src={call} alt="" /></Button>
        </Stack>
    </Box>
  )
}


const marketersList = [
    {
        country: { icon: SA, title: "Agent Saudi Arabia" },
        marketer: { name: "احمد ابوعتمان" }
    },
    {
        country: { icon: EG, title: "Agent Egypt" },
        marketer: { name: "محمد العشري" }
    }
]


const firstContent = {
    direction: "ltr",
    title: "Our certified marketers",
    subtitle: "Get to know the most prominent marketers who speak on behalf of our company",
    marketers: marketersList
}
