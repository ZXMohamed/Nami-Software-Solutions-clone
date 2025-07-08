import { Stack } from '@mui/material'
import React from 'react'
import { useGetSocialQuery } from '../redux/server state/social'

export default function ContactButtons() {
    const { isSuccess, data: social } = useGetSocialQuery();
    return (<>
        { isSuccess && (<Stack className='contactButtons'>
            <a href={ social?.whatsapp.link } target='_blank' className='contactButton'>
                <img src={ social?.whatsapp.icon.image } loading='lazy' alt="whatsapp number for Nami" className='contactIcon'/>
            </a>
            <a href={ social?.phone.link } target='_blank' className='contactButton'>
                <img src={ social?.phone.icon.image } loading='lazy' alt="phone number for Nami" className='contactIcon'/>
            </a>
        </Stack>) }
    </>
  )
}
