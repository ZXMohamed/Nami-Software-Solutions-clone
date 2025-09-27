//*react
import React from 'react'
//*mui
import { Stack } from '@mui/material'
//*style
import "../../sass/shared/objectiveslist.scss"

export default function ObjectivesList({ dir, data }) {

    if (!data || !Array.isArray(data)) return <></>;

    return (
        <Stack dir={ dir } direction={ 'column' } className='objectivesList'>
            <ul className='serviceItemObjectives'>
                { data.map((objective, inx) => <li key={ inx }>{ objective }</li>) }
            </ul>
        </Stack>    
    )
}
