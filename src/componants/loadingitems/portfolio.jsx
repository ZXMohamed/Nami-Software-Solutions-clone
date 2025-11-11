//*react
import React from 'react'
//*mui
import { Skeleton, Stack } from '@mui/material';
//*swiper
import { SwiperSlide } from 'swiper/react';

export function WaitItemSkeleton(num = 1) { 
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