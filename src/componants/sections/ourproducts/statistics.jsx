//*react
import React from 'react'
//*mui
import { Box, Typography } from '@mui/material'
//*component
import InfoCard, { typographyForm } from '../../shared/infoCard'
import { StatisticsList, StatisticsBox } from './statisticsbox'
import { WaitStatisticProgress } from '../../loadingitems/statistics'
//*queries
import { useGetStatisticsQuery } from '../../../redux/server state/statistics'
//*hooks
import useUpdateEffect from '../../../hooks/useupdateeffect'
import { useContent } from '../../../languages/hooks/usecontent'
//*scripts
import { defaultLanguage } from '../../../languages/languagesContext'


export function Statistics() {

    const { isSuccess: content_isSuccess, data: content } = useContent();

    const defaultContent = (() => {
        if (content_isSuccess) {
            return {
                direction: content.page.direction,
                language: content.page.language,
                title: content.statistics.title,
                subtitle: content.statistics.subtitle,
            }
        } else {
            return statisticsFirstContent;
        }
    })();

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

    const { isError: statistic_isError, error: statistic_error, isSuccess: statistic_isSuccess, isFetching: statistic_isFetching, data: statistics, refetch: statistic_refetch } = useGetStatisticsQuery();

    useUpdateEffect(() => {
        statistic_refetch()
    }, [language]);

    return (
        <>
            {statistic_isFetching && <WaitStatisticProgress num={5} />}
            {(!statistic_isFetching && statistic_isSuccess) && Object.values(statistics).map((statistic) => <StatisticsBox key={statistic.id} data={statistic} />) }
            { statistic_isError && <Typography variant='h6' color='error'>{ statistic_error.data.error }</Typography>}
        </>
    )
}

const statisticsFirstContent = {
    direction: "ltr",
    language: defaultLanguage,
    title: "Statistics",
    subtitle: "Good planning is not enough Great callings require the extraordinary!",
}