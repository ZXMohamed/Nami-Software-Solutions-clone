//*react
import React from 'react'
//*mui
import { Container, Skeleton, Stack } from '@mui/material'


export function WaitItemSkeleton({ num = 1, }) { 
    const skeletonArray = [];
    for (let i = 0; i < num; i++) { 
        skeletonArray.push(
          <Stack key={i} width={ 390 }>
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
        )
    }
  return (
    <Container maxWidth="lg">
      <Stack flexWrap={ "wrap" } direction={ "row" } gap={ 5 } justifyContent={'center'} alignItems={'center'}>
        { skeletonArray }
      </Stack>
    </Container>
  );
}