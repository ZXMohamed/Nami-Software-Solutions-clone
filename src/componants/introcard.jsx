//*react
import React from 'react'
//*mui
import { Skeleton, Stack, Typography } from '@mui/material'
//*styles
import "../sass/shared/introcard.scss"

export default function IntroCard({ dir, loading, icon, title, description, children = [] }) {
  
    if (!title) return <></>;

    return (
        <>
            { !loading &&
                <Stack dir={ dir } direction={ "column" } className='introCardCon'>
                    { icon && <img src={ icon } width={ 40 } height={ 40 } alt={ title + " service form nami" } className='introCardIcon' /> }
                    <Typography component={ "h1" } variant='h4' className='introCardTitle' { ...titleAosAnimation } >{ title }</Typography>
                    { description && <Typography className='introCardDescription' { ...descriptionAosAnimation } >{ description }</Typography> }
                    { children }
                </Stack>
            }
            { loading && <WaitItemsSkelton /> }
        </>
    )
}

function WaitItemsSkelton() { 
    return (
        <>
            <Stack direction={ "row" } justifyContent={ "space-between" } alignItems={ "center" }>
                <Skeleton variant="rounded" width={ 60 } height={ 60 } />
            </Stack>
            <Skeleton variant="rounded" width={ 200 } height={ 20 } />
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            <Skeleton variant="rounded" width={ "80%" } height={ 10 } />
        </>
    );
}

const aosAnimation = {
    ["data-aos"]: "fade-up",
    ["data-aos-duration"]: "1000",
}
// const cardAosAnimation = {
//     ...aosAnimation,
//     ["data-aos-delay"]: "50"
// }
const titleAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "100"
}
const descriptionAosAnimation = {
    ...aosAnimation,
    ["data-aos-delay"]: "150"
}