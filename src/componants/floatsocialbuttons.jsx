import React from 'react'
import { Box } from '@mui/material'
import { useGetSocialQuery } from '../redux/server state/social'

export default function FloatSocialButtons() {

    const { isSuccess, data: social } = useGetSocialQuery();
  
    return (
        isSuccess && 
            <Box className="floatSocialButtons">
                <a href={social.facebook.link} target='_blank' className='floatSocialButton'>
                    <div style={{backgroundImage:`url(${social.facebook.icon.fill})`}}></div>
                </a>
                <a href={social.linkedin.link} target='_blank' className='floatSocialButton'>
                    <div style={{backgroundImage:`url(${social.linkedin.icon.fill})`}}></div>
                </a>
                <a href={social.x.link} target='_blank' className='floatSocialButton'>
                    <div style={{backgroundImage:`url(${social.x.icon.fill})`}}></div>
                </a>
                <a href={social.instagram.link} target='_blank' className='floatSocialButton'>
                    <div style={{backgroundImage:`url(${social.instagram.icon.fill})`}}></div>
                </a>
                <a href={social.snapchat.link} target='_blank'  className='floatSocialButton'>
                    <div style={{backgroundImage:`url(${social.snapchat.icon.fill})`}}></div>
                </a>
                <div className='openFloatSocialButtons'></div>
            </Box>
  )
}
