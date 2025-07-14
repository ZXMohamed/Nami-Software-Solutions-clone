import React from 'react'
import { IconButton } from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';

import "../sass/shared/downloadbutton.scss"

export default function DownloadButton({link,title}) {
  return (
    <a href={link} target='_blank' className='downloadButton' data-aos="fade-up" data-aos-duration="600" data-aos-delay="0">
        <div>
          <IconButton component="div" disableRipple="false" className='arrowIconContainer'>
              <SubdirectoryArrowRightIcon fontSize="medium" />
          </IconButton>
          <span className='downloadButtonTitle'>{ title }</span>
        </div>
    </a>
  )
}
