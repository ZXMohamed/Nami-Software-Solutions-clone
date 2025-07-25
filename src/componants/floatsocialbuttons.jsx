import React, { useContext } from 'react'
import { Box } from '@mui/material'
import { useGetSocialQuery } from '../redux/server state/social'
import "../sass/shared/floatsocialbuttons.scss"
import { Language } from '../languages/languagesContext';
export default function FloatSocialButtons() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr",
    }
    
    const { isSuccess, data: social } = useGetSocialQuery();
  
    return (
        isSuccess && 
            <Box dir={defaultContent.direction} className="floatSocialButtons">
                <a href={social.facebook.link} target='_blank' className='floatSocialButton'>
                    <img src={social.facebook.icon.fill} alt={"Nami "+social.facebook.title+" account"} loading='lazy' width="16px" height="16px"/>
                </a>
                <a href={social.linkedin.link} target='_blank' className='floatSocialButton'>
                    <img src={social.linkedin.icon.fill} alt={"Nami "+social.linkedin.title+" account"} loading='lazy' width="16px" height="16px"/>
                </a>
                <a href={social.x.link} target='_blank' className='floatSocialButton'>
                    <img src={social.x.icon.fill} alt={"Nami "+social.x.title+" account"} loading='lazy' width="16px" height="16px"/>
                </a>
                <a href={social.instagram.link} target='_blank' className='floatSocialButton'>
                    <img src={social.instagram.icon.fill} alt={"Nami "+social.instagram.title+" account"} loading='lazy' width="16px" height="16px"/>
                </a>
                <a href={social.snapchat.link} target='_blank'  className='floatSocialButton'>
                    <img src={social.snapchat.icon.fill} alt={"Nami "+social.snapchat.title+" account"} loading='lazy' width="16px" height="16px"/>
                </a>
                <div className='openFloatSocialButtons'></div>
            </Box>
  )
}
