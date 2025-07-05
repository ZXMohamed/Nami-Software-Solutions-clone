import React from 'react'
import { CircularProgress, Stack } from '@mui/material'
import { useGetSocialQuery } from '../redux/server state/social'

export default function SocialButtons({ aosAnimation }) {
    const { isLoading, isSuccess, data : social, isError, error } = useGetSocialQuery();

    return (
        <Stack direction="row" spacing={ 1 } className="socialButtons" { ...aosAnimation } >
            { isLoading && <WaiteProgress num={4} variant="indeterminate" size={40} thickness={1} value={70} /> }
            {
                isSuccess &&
                    <>
                        <a href={social.facebook.link} target='_blank'>
                            <div style={{backgroundImage:`url(${social.facebook.icon.fill})`}}></div>
                        </a>
                        <a href={social.linkedin.link} target='_blank'>
                            <div style={{backgroundImage:`url(${social.linkedin.icon.fill})`}}></div>
                        </a>
                        <a href={social.x.link} target='_blank'>
                            <div style={{backgroundImage:`url(${social.x.icon.fill})`}}></div>
                        </a>
                        <a href={social.instagram.link} target='_blank'>
                            <div style={{backgroundImage:`url(${social.instagram.icon.fill})`}}></div>
                        </a>
                        <a href={social.snapchat.link} target='_blank'>
                            <div style={{backgroundImage:`url(${social.snapchat.icon.fill})`}}></div>
                        </a>
                    </>
            }
{/*//$is error*/}
        </Stack>
    )
}


function WaiteProgress(props) {
    
    const createProgress = (props) => {
        const progressSet = [];
        for (let i = 0; i <= props.num; i++) { 
            progressSet.push(<CircularProgress key={i} { ...props } />);
        }
        return progressSet;
    }

    return createProgress(props);
}