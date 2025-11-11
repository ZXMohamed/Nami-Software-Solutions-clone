import { Grid, Skeleton, Stack } from "@mui/material";

export function WaitItemsSkelton({ cellInRow, num }) { 
    const skeltonArray = [];
    for (let i = 0; i < num; i++) { 
        skeltonArray.push(
            <Grid key={ i } size={ { md: 12 / cellInRow, sm: 12 / Math.abs(cellInRow - 1), xs: 12 } } >
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