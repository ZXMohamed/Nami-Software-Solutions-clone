//*react
import React from 'react'
//*mui
import { Box, Stack, Typography } from '@mui/material'
//*styles
import "../../sass/shared/pointslist.scss"
//*components
import { WaitItemsSkelton } from '../loadinitems/pointslist'

export default function PointsList({ dir, loading, data=[] }) {
  return (
    <Box dir={dir}>
      {!loading && data.map((point,inx) => <Point key={ inx } title={ point } />) }
      {loading && <WaitItemsSkelton/>}
    </Box>
  )
}

function Point({title}) {
    
    return (
        <Stack direction={"row"} className='pointCon'>
            <Typography component={"span"} className='pointTitle'>{ title }</Typography>
        </Stack>
    )
}