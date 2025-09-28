//*react
import { memo } from "react";
//*mui
import { Box } from "@mui/material";


const FallingBackground = () => {
    console.log("fB");
    return (
        <Box className="fallingBackground">
            <div className="fallingBackgroundDelay-5"></div>
            <div className="fallingBackgroundDelay-3"></div>
            <div className="fallingBackgroundDelay-2"></div>
            <div className="fallingBackgroundDelay-4"></div>
            <div className="fallingBackgroundDelay-3"></div>
            <div className="fallingBackgroundDelay-5"></div>
            <div className="fallingBackgroundDelay-4"></div>
        </Box>
    )
};

export default FallingBackground;
