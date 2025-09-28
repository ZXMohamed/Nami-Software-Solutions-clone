//*react
import React, { memo, useContext } from 'react'
//*mui
import { Stack } from '@mui/material'
//*queries
import { useGetSocialQuery } from '../../../redux/server state/social'
//*scripts
import { Language } from '../../../languages/languagesContext';
//*styles
import "../../../sass/shared/contactbuttons.scss"

const ContactButtons = memo(() => {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
  
    const defaultContent = {
        direction: language_isSuccess ? language.page.direction : "ltr"
    }

    const { isSuccess, data: social } = useGetSocialQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });

    return (<>
        { isSuccess && (<Stack dir={defaultContent.direction} className='contactButtons'>
            <ContactButton link={social?.whatsapp.link} icon={ social?.whatsapp.icon.image } title={ social?.whatsapp.title }/>
            <ContactButton link={social?.phone.link} icon={ social?.phone.icon.image } title={ social?.phone.title }/>
        </Stack>) }
    </>
    )
});

export default ContactButtons;

const ContactButton = memo(({link,icon,title}) => {
    
    return (
        <a href={ link } target='_blank' className='contactButton'>
            <img src={ icon } loading='lazy' alt={ title + " for Nami" } className='contactIcon' />
        </a>
    )
})
