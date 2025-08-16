import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'
import "../sass/shared/objectiveslist.scss"

export default function ObjectivesList({ dir, loading, data }) {

    if (!data || !Array.isArray(data)) return <></>;

    return (
        <>
            { !loading &&
                <Stack dir={ dir } direction={ 'column' } className='objectivesList'>
                    <ul className='serviceItemObjectives'>
                        { data.map((objective, inx) => <li key={ inx }>{ objective }</li>) }
                    </ul>
                </Stack>
            }
            {loading && <WaitItemsSkelton/>}
        </>
    )
}



function WaitItemsSkelton() { 
    return (
      <Box>
        <Skeleton variant="rounded" width={ "100%" } height={ 15 } />
        <br/>
        <Skeleton variant="rounded" width={ "90%" } height={ 15 } />
        <br/>
        <Skeleton variant="rounded" width={ "100%" } height={ 15 } />
        <br/>
        <Skeleton variant="rounded" width={ "60%" } height={ 15 } />
        <br/>
        <Skeleton variant="rounded" width={ "80%" } height={ 15 } />
        <br/>
      </Box>
    );
}