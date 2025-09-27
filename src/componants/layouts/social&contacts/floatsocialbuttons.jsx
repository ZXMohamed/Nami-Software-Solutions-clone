//*react
import React, { memo, useContext, useMemo } from 'react'
//*mui
import { Box } from '@mui/material'
//*styles
import "../../../sass/shared/floatsocialbuttons.scss"
//*query
import { useGetSocialQuery } from '../../../redux/server state/social'
//*scripts
import { Language } from '../../../languages/languagesContext';

const FloatSocialButtons = memo(() => {
  console.log("kkk");

  const { isSuccess: language_isSuccess, data: language } = useContext(Language);

  const defaultContent = useMemo(() => ({
    direction: language_isSuccess ? language.page.direction : "ltr",
  }), [language, language_isSuccess]);

  const { isSuccess: social_isSuccess, data: social } = useGetSocialQuery(undefined, {
    selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
  });

  return (
    social_isSuccess &&
    <Box dir={ defaultContent.direction } className="floatSocialButtons">
      <FloatSocialButton link={ social.facebook.link } icon={ social.facebook.icon.fill } title={ social.facebook.title } />
      <FloatSocialButton link={ social.linkedin.link } icon={ social.linkedin.icon.fill } title={ social.linkedin.title } />
      <FloatSocialButton link={ social.x.link } icon={ social.x.icon.fill } title={ social.x.title } />
      <FloatSocialButton link={ social.instagram.link } icon={ social.instagram.icon.fill } title={ social.instagram.title } />
      <FloatSocialButton link={ social.snapchat.link } icon={ social.snapchat.icon.fill } title={ social.snapchat.title } />
      <div className='openFloatSocialButtons'></div>
    </Box>
  )

});

export default FloatSocialButtons;

const FloatSocialButton = ({ link, icon, title }) => {
  if (!link && !icon) return <></>;
  return (
    <a href={ link } target='_blank' className='floatSocialButton'>
      <img src={ icon } width="16px" height="16px" alt={ "Nami " + title + " account" } loading='lazy' />
    </a>
  )
};