import { Stack } from '@mui/material'
import React from 'react'
import { useGetsocialQuery } from '../redux/server state/social'

export default function Contactbtns() {
    const { isSuccess, data: social } = useGetsocialQuery();console.log(social);
    return (<>
        { isSuccess && (<Stack className='contactbtns'>
            <a href={ social?.whatsapp.link } target='_blank'>
                <img src={ social?.whatsapp.icon.image } loading='lazy' alt="whatsapp number for Nami" width={"85%"}/>
            </a>
            <a href={ social?.phone.link } target='_blank'>
                <img src={ social?.phone.icon.image } loading='lazy' alt="whatsapp number for Nami" width={"85%"}/>
            </a>
        </Stack>) }
    </>
  )
}
