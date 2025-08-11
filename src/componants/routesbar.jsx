//*react
import React from 'react'
//*mui
import { Breadcrumbs } from '@mui/material'
//*styles
import "../sass/shared/routesbar.scss"

export default function RoutesBar({dir, routes}) {
    return (
        <>
            <Breadcrumbs dir={ dir } separator={ dir=="ltr"?"↣":"↢"} className='routesBarContainer'>
                <span className='routBarTab'>Home</span>
                <span className='routBarTab'>Services</span>
                <span className='routBarTab activeRoutTab'>Design services</span>
            </Breadcrumbs>
        </>
  )
}
