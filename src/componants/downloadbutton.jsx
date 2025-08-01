//*react
import React, { memo } from 'react'
//*mui
import { IconButton } from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';
//*styles
import "../sass/shared/downloadbutton.scss"

const aosAnimation = {
  ["data-aos"]: "fade-up",
  ["data-aos-duration"]: "600",
  ["data-aos-delay"]:"0"
}

const DownloadButton = memo(({ link, title, direction })=> {

  return (
    <a dir={ direction } href={ link } target='_blank' className={ 'downloadButton' } {...aosAnimation}>
      <div dir={ direction } className={ "downloadButtonContent" }>
        <IconButton component="div" dir={ direction } disableRipple="false" className='arrowIconContainer'>
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