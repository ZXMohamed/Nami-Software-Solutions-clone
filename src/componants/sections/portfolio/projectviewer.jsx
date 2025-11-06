//*react
import React from 'react'
//*mui
import { Box, Container, Stack } from '@mui/material'
//*components
import { ProjectCard } from '../../shared/projectcard'
import { FixedSizeGrid } from 'react-window'
//*hooks
import { useResponsiveViewer } from '../../../hooks/portfolio/useResponsiveViewer';


let rowCount = 0;
let viewerHeight = (rowCount) => rowCount < 2 ? 555 : 1200;

export default function ProjectViewer({ ref, dir, data = [] }) {

  const responsiveDimensions = useResponsiveViewer(3, 435, 555, 1320);

  rowCount = Math.ceil(Object.keys(data).length / responsiveDimensions.columnCount);

  return (
    <Box>
      <Container maxWidth={ 'lg' } disableGutters className='projectViewerCon'>
        <FixedSizeGrid
          ref={ ref }
          direction={dir}
          itemData={ data }
          
          columnCount={ responsiveDimensions.columnCount }
          rowCount={ rowCount }

          columnWidth={ responsiveDimensions.columnWidth }
          rowHeight={ responsiveDimensions.rowHeight }
          
          height={ data.length == 0 ? 0 : viewerHeight(rowCount) }
          width={ responsiveDimensions.viewerWidth }
          
          className={ "projectViewer" }
        >
          {
            (props) => {
              const nextItemIndex = props.rowIndex * responsiveDimensions.columnCount + props.columnIndex;
              const data = props.data[nextItemIndex];
              return (
                <Stack sx={ {...props.style } } className='viewerCell'>
                  <ProjectCard dir={dir} data={ data } />
                </Stack>
              )
            }
          }
        </FixedSizeGrid>
      </Container>
    </Box>
  )
}