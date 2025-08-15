//*react
import React from 'react'
//*mui
import { Divider, Stack, Typography } from '@mui/material'
//*styles
import "../sass/shared/listcard.scss"

export default function ListCard({ dir, title, children = [] }) {
    if (!title) return <></>;

  return (
    <Stack dir={dir} direction={"column"} className='listCardCon'>
        <Typography component={ "h2" } variant='h6' className='listCardTitle'>{ title }</Typography>
        <Divider />
        {children}
    </Stack>
  )
}
