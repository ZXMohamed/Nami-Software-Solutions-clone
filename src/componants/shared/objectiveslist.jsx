//*react
import React from 'react'
//*mui
import { Stack } from '@mui/material'
//*styles
import "../../sass/shared/objectiveslist.scss"

export default function ObjectivesList({ dir, data }) {

    if (!data || !Array.isArray(data)) return <></>;

    return (
        <Stack dir={ dir } direction={ 'column' } className='objectivesList'>
            <ul className='itemObjectives'>
                { data.map((objective, inx) => <li key={ inx }>{ objective }</li>) }
            </ul>
        </Stack>    
    )
}
