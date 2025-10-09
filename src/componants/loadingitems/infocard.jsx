//*react
import React from 'react'
//*mui
import { Box } from '@mui/material'

//*styles
import "../../sass/shared/infocard.scss"

export const WaveAnimation = ({ wave_dir }) => {
  return (
    <Box wave_dir={wave_dir} className="infoCardWaveAnimation">
        <div></div>
        <div></div>
        <div></div>
    </Box>
  );
}