//*react
import React, { useContext, useMemo } from 'react'
//*mui
import { Box, CircularProgress, Typography } from '@mui/material'
//*component
import InfoCard from '../infoCard'
import { StatisticsList, StatisticsBox } from './statisticsbox'
//*queries
import { useGetStatisticsQuery } from '../../redux/server state/statistics'
//*scripts
import { Language } from '../../languages/languagesContext'


export function Statistics() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        title: language_isSuccess ? language.statistics.title : "Statistics",
        subtitle: language_isSuccess ? language.statistics.subtitle : "Good planning is not enough Great callings require the extraordinary!",
    }), [language, language_isSuccess]);
    
    const { isError: statistic_isError, isSuccess: statistic_isSuccess, data: statistics } = useGetStatisticsQuery(undefined, {
        selectFromResult: ({ isSuccess, data, isError }) => ({ isSuccess, data, isError })
    });
    
    return (
        <Box className='infoCardSection'>
            <InfoCard dir={defaultContent.direction} title={ defaultContent.title } subtitle={ defaultContent.subtitle }>
                <StatisticsList>
                    {!statistic_isSuccess && <WaitStatisticProgress num={5} />}
                    {statistic_isSuccess && Object.values(statistics).map((statistic) => <StatisticsBox key={statistic.id} data={statistic} />) }
                    {statistic_isError && <Typography variant='h6' color='error'>Data Not Found !</Typography>}
                </StatisticsList>
            </InfoCard>
        </Box>
  )
}

function WaitStatisticProgress({ num = 1 }) { 
    const progressArray = [];
    for (let i = 0; i < num; i++) { 
        progressArray.push(<CircularProgress key={i} variant="indeterminate" color='secondary' size={40} thickness={2}/>)
    }
    return progressArray;
}