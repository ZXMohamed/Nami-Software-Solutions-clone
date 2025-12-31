//*react
import React, { memo } from 'react'
//*mui
import { IconButton } from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
//*styles
import "../../../sass/shared/downloadbutton.scss"
//*animation
import { aosAnimation } from '../../../animation/downloadbutton';


const DownloadButton = memo(({ link, title, direction })=> {

  return (
    <a dir={ direction } href={ link } target='_blank' className={ 'downloadButton' } {...aosAnimation}>
      <div dir={ direction } className={ "downloadButtonContent" }>
        <IconButton component="div" dir={ direction } disableRipple="false" className='arrowIconContainer' aria-label="Download company file">
          { direction == "ltr" ?
            <SubdirectoryArrowRightIcon fontSize="medium" /> :
            <SubdirectoryArrowLeftIcon fontSize="medium" />
          }
        </IconButton>
        <span className='downloadButtonTitle'>{ title }</span>
      </div>
    </a>
  )
});

export default DownloadButton;