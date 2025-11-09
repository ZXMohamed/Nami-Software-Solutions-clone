//*react
import React, { memo } from 'react'
//*mui
import { Box } from '@mui/material'
//*styles
import "../../sass/shared/infocard.scss"

export const WaveAnimation = memo(({ wave_dir }) => {
  return (
    <Box wave_dir={ wave_dir } className="infoCardWaveAnimation">
      <div></div>
      <div></div>
      <div></div>
    </Box>
  );
});
