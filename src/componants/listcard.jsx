import { Divider, Stack, Typography } from '@mui/material'
import React from 'react'
import "../sass/shared/listcard.scss"

export default function ListCard({ title, children = [] }) {
    if (!title) return <></>;

  return (
    <Stack direction={"column"} className='listCardCon'>
        <Typography component={ "h2" } variant='h6'>{ title }</Typography>
        <Divider />
        {children}
    </Stack>
  )
}
