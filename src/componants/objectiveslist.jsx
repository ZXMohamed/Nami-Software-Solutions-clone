import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'
import "../sass/shared/objectiveslist.scss"

export default function ObjectivesList({ dir, data }) {

    if (!data || !Array.isArray(data)) return <></>;

    return (
        <>
            <Stack dir={ dir } direction={ 'column' } className='objectivesList'>
                <ul className='serviceItemObjectives'>
                    { data.map((objective, inx) => <li key={ inx }>{ objective }</li>) }
                </ul>
            </Stack>
        </>
    )
}
