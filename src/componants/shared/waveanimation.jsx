//*react
import React, { memo } from 'react'
//*mui
import { Box } from '@mui/material'
//*styles
import "../../sass/shared/waveanimation.scss"

export const WaveAnimation = memo(({ dir, wave_dir }) => {
  return (
    <Box dir={dir} className="waveAnimationCon">
      <Box dir={dir} wave_dir={ wave_dir } className="waveAnimation">
        <div></div>
        <div></div>
        <div></div>
      </Box>
    </Box>
  );
});
