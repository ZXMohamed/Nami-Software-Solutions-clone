import React from 'react'
import { CircularProgress, Stack } from '@mui/material'
import { useGetSocialQuery } from '../redux/server state/social'

import "../sass/shared/socialbuttons.scss"

export default function SocialButtons({ aosAnimation }) {
    const { isLoading, isSuccess, data : social } = useGetSocialQuery();

    return (
        <Stack direction="row" columnGap={ 1 } className="socialButtons" { ...aosAnimation } >
            { isLoading && <WaiteProgress num={4} variant="indeterminate" size={40} thickness={1} value={70} /> }
            {
                isSuccess &&
                    <>
                        <a href={social.facebook.link} target='_blank' className='SocialButton'>
                            <img src={social.facebook.icon.fill} alt={"Nami "+social.facebook.title+" account"} loading='lazy' width="16px" height="16px"/>
                        </a>
                        <a href={social.linkedin.link} target='_blank' className='SocialButton'>
                            <img src={social.linkedin.icon.fill} alt={"Nami "+social.linkedin.title+" account"} loading='lazy' width="16px" height="16px"/>
                        </a>
                        <a href={social.x.link} target='_blank' className='SocialButton'>
                            <img src={social.x.icon.fill} alt={"Nami "+social.x.title+" account"} loading='lazy' width="16px" height="16px"/>
                        </a>
                        <a href={social.instagram.link} target='_blank' className='SocialButton'>
                            <img src={social.instagram.icon.fill} alt={"Nami "+social.instagram.title+" account"} loading='lazy' width="16px" height="16px"/>
                        </a>
                        <a href={social.snapchat.link} target='_blank' className='SocialButton'>
                            <img src={social.snapchat.icon.fill} alt={"Nami "+social.snapchat.title+" account"} loading='lazy' width="16px" height="16px"/>
                        </a>
                    </>
            }
        </Stack>
    )
}


function WaiteProgress(props) {
    
    const progressSet = [];
    
    for (let i = 0; i <= props.num; i++) { 
        progressSet.push(<CircularProgress key={i} { ...props } />);
    }
    
    return progressSet;
}