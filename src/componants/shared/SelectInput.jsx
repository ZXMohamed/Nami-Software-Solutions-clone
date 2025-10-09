//*react
import { useState } from "react";
//*mui
import { MenuItem, Select } from "@mui/material";
//*queries
import { useGetOpenJobsQuery } from "../../redux/server state/openjobs";

function SelectInput(props) {

    const { data: openJobs, isSuccess: openJobs_isSuccess } = useGetOpenJobsQuery(undefined, {
        selectFromResult: ({ isSuccess, data }) => ({ isSuccess, data })
    });

    const [job, setJob] = useState("0");

    return (
        <Select variant='outlined' { ...props } defaultValue={ '0' } value={ job } onChange={ (e) => { props.onChange(e); setJob(e.target.value); }}>
            <MenuItem value={"0"}>{props.title}</MenuItem>
            {openJobs_isSuccess && Object.values(openJobs).map((openJob,inx) => <MenuItem key={openJob.id} value={openJob.title}>{openJob.title}</MenuItem>)}
        </Select>
    )
}

export default SelectInput;