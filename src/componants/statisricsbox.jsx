import React from 'react'
import { Stack, Typography } from '@mui/material'

export function Statisricslist({children}) {
  return (
    <Stack direction={ 'row' } spacing={ 2.5 }>
        {children}
    </Stack>
    
  )
}

export function Statisticsbox({value,title,type}) {
  return (
    <Stack direction={'column'} spacing={2} justifyContent={'center'} alignItems={'center'} className='statisticsbox'>
        {value && <Typography variant='h4' component={'h4'}>{value} {type}</Typography>}
        {title && <Typography variant='h6' component={'h3'}>{ title }</Typography>}
    </Stack>
  )
}
