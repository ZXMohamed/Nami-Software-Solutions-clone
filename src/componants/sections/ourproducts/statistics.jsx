//*react
import React, { useContext, useMemo } from 'react'
//*mui
import { Box, CircularProgress, Typography } from '@mui/material'
//*component
import InfoCard, { infoCardEffects, typographyForm } from '../../shared/infoCard'
import { StatisticsList, StatisticsBox } from './statisticsbox'
//*queries
import { useGetStatisticsQuery } from '../../../redux/server state/statistics'
//*hooks
import useUpdateEffect from '../../../hooks/useupdateeffect'
//*scripts
import { defaultLanguage, Language } from '../../../languages/languagesContext'


export function Statistics() {

    const { isSuccess: language_isSuccess, data: language } = useContext(Language);

    const defaultContent = useMemo(() => ({
        direction: language_isSuccess ? language.page.direction : "ltr",
        language: language_isSuccess ? language.page.language : defaultLanguage,
        title: language_isSuccess ? language.statistics.title : "Statistics",
        subtitle: language_isSuccess ? language.statistics.subtitle : "Good planning is not enough Great callings require the extraordinary!",
    }), [language, language_isSuccess]);

    return (
        <Box className='infoCardSection'>
            <InfoCard dir={defaultContent.direction} wave_dir={ "left" } typographyForm={ { subtitle : [typographyForm.subtitle.size.small] }} title={ defaultContent.title } subtitle={ defaultContent.subtitle }>
                <StatisticsList>
                    <StatisticsBoxRow language={ defaultContent.language } />
                </StatisticsList>
            </InfoCard>
        </Box>
  )
}

function StatisticsBoxRow({language}) {

    const { isError: statistic_isError, isSuccess: statistic_isSuccess, data: statistics, refetch: statistic_refetch } = useGetStatisticsQuery(undefined, {
        selectFromResult: ({ isSuccess, data, isError }) => ({ isSuccess, data, isError })
    });

    useUpdateEffect(() => {
        statistic_refetch()
    }, [language]);

    return (
        <>
            {!statistic_isSuccess && <WaitStatisticProgress num={5} />}
            {statistic_isSuccess && Object.values(statistics).map((statistic) => <StatisticsBox key={statistic.id} data={statistic} />) }
            {statistic_isError && <Typography variant='h6' color='error'>Data Not Found !</Typography>}
        </>
    )
}


function WaitStatisticProgress({ num = 1 }) { 
    const progressArray = [];
    for (let i = 0; i < num; i++) { 
        progressArray.push(<CircularProgress key={i} variant="indeterminate" color='secondary' size={40} thickness={2}/>)
    }
    return progressArray;
}