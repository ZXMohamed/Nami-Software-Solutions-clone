import { Skeleton, Stack } from "@mui/material";
import { SwiperSlide } from "swiper/react";

export function waitItemSkeleton(num = 1) { 
    const skeletonArray = [];
    for (let i = 0; i < num; i++) {
        skeletonArray.push(
            <SwiperSlide key={ i } >
                <Stack width={"100%"} alignItems={"center"}>
                    <Skeleton width={ "100%" } height={ 400 } variant='rounded' />
                    <br />
                    <Skeleton width={ "30%" } height={ 20 } variant='rounded' />
                    <br />
                    <Skeleton width={ "80%" } height={ 10 } variant='rounded' />
                    <br />
                    <Skeleton width={ "80%" } height={ 10 } variant='rounded' />
                    <br />
                    <Stack direction={ "row" } spacing={3}>
                        <Skeleton width={ 100 } height={ 30 } variant='rounded' />
                        <Skeleton width={ 100 } height={ 30 } variant='rounded' />
                    </Stack>
                    <br />
                    <Stack direction={ "row" } spacing={3}>
                        <Skeleton width={ 100 } height={ 30 } variant='rounded'/>
                        <Skeleton width={ 100 } height={ 30 } variant='rounded' />
                    </Stack>
                </Stack>
            </SwiperSlide>
        )
    }
    return skeletonArray;
}