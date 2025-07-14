import React from 'react'
import { IconButton } from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import SubdirectoryArrowLeftIcon from '@mui/icons-material/SubdirectoryArrowLeft';

import "../sass/shared/downloadbutton.scss"

export default function DownloadButton({link,title,direction}) {
  return (
    <a href={link} target='_blank' dir={direction} className={'downloadButton'} data-aos="fade-up" data-aos-duration="600" data-aos-delay="0">
      <div dir={direction} className={"downloadButtonContent"}>
        <IconButton component="div" disableRipple="false" dir={direction} className='arrowIconContainer'>
          { direction == "ltr" ?
            <SubdirectoryArrowRightIcon fontSize="medium" /> :
            <SubdirectoryArrowLeftIcon fontSize="medium" />
          }
        </IconButton>
        <span className='downloadButtonTitle'>{ title }</span>
      </div>
    </a>
  )
}
