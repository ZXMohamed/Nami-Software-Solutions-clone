//*react
import React, { memo, useContext, useMemo } from 'react'
//*mui
import { Stack } from '@mui/material'
//*styles
import "../../sass/shared/contactbuttons.scss"
//*queries
import { useGetSocialQuery } from '../../redux/server state/social'
//*scripts
import { Language } from '../../languages/languagesContext';

const ContactButtons = memo(() => {console.log("cb");

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);
  
    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
    }), [language, language_isSuccess]);

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
