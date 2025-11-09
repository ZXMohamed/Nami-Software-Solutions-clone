//*react
import React, { memo } from 'react'
//*mui
import { CircularProgress, Stack } from '@mui/material'
//*queries
import { useGetSocialQuery } from '../../../redux/server state/social'
//*styles
import "../../../sass/shared/socialbuttons.scss"

const SocialButtons = memo(({ aosAnimation }) => {
    const { isLoading, isSuccess, data: social } = useGetSocialQuery();

    return (
        <Stack direction="row" columnGap={ 1 } className="socialButtons" { ...aosAnimation } >
            { isLoading && <WaiteProgress num={ 4 } variant="indeterminate" size={ 40 } thickness={ 1 } value={ 70 } /> }
            {
                isSuccess &&
                <>
                    <SocialButton link={ social.facebook.link } icon={ social.facebook.icon.fill } title={ social.facebook.title } />
                    <SocialButton link={ social.linkedin.link } icon={ social.linkedin.icon.fill } title={ social.linkedin.title } />
                    <SocialButton link={ social.x.link } icon={ social.x.icon.fill } title={ social.x.title } />
                    <SocialButton link={ social.instagram.link } icon={ social.instagram.icon.fill } title={ social.instagram.title } />
                    <SocialButton link={ social.snapchat.link } icon={ social.snapchat.icon.fill } title={ social.snapchat.title } />
                </>
            }
        </Stack>
    )
});

export default SocialButtons;

const SocialButton = ({ link, icon, title }) => {
  if (!link && !icon) return <></>;
  return (
    <a href={ link } target='_blank' className='SocialButton'>
      <img src={ icon } width="16px" height="16px" alt={ "Nami " + title + " account" } loading='lazy' />
    </a>
  )
};

function WaiteProgress(props) {
    
    const progressSet = [];
    
    for (let i = 0; i <= props.num; i++) { 
        progressSet.push(<CircularProgress key={i} { ...props } />);
    }
    
    return progressSet;
}