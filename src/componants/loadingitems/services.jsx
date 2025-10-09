import { Grid, Skeleton, Stack } from "@mui/material";

export function WaitItemsSkelton({ cellInRow, num }) { 
    const skeltonArray = [];
    for (let i = 0; i < num; i++) { 
        skeltonArray.push(
            <Grid key={i} size={ 12 / cellInRow }>
                <Stack direction={"row"} justifyContent={ "space-between" } alignItems={"center"}>
                    <Skeleton variant="rounded" width={ 60 } height={ 60 } />
                    <Skeleton variant="circular" width={ 45 } height={ 45 } />
                </Stack>
                <br/>
                <Skeleton variant="rounded" width={ "60%" } height={ 20 } />
                <br/>
                <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
                <br/>
                <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
                <br/>
                <Skeleton variant="rounded" width={ "100%" } height={ 10 } />
            </Grid>
        );
    }
    return skeltonArray;
}