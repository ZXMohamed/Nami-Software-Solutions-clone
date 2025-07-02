import React from 'react'
import { IconButton } from '@mui/material';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';


export default function Downloadnutton({link}) {
  return (
    <a href={link} target='_blank' className='downloadbutton' data-aos="fade-up" data-aos-duration="600" data-aos-delay="0">
        <div>
        <IconButton component="div" disableRipple="false">
            <SubdirectoryArrowRightIcon fontSize="medium" />
        </IconButton>
        <span> Download the company file </span>
        </div>
    </a>
  )
}
