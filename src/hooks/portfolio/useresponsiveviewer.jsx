import { useMediaQuery } from "@mui/material";

export function useResponsiveViewer(columnCount, columnWidth, rowHeight, viewerWidth) {

    const dimensions = {
        columnCount,
        columnWidth,
        rowHeight,
        viewerWidth
    };

    const isLGSize = useMediaQuery('(min-width:1320px)');
    const isNLGSize = useMediaQuery('(max-width:1320px)');
    const isMDSize = useMediaQuery('(max-width:992px)');
    const isSMSize = useMediaQuery('(max-width:768px)');
    const isXXXSSize = useMediaQuery('(max-width:600px)');
    const isXXSSize = useMediaQuery('(max-width:500px)');
    const is360Size = useMediaQuery('(max-width:360px)');

    if (isLGSize) {
        dimensions.columnCount = 3
        dimensions.columnWidth = 432
        dimensions.viewerWidth = 1320
        dimensions.rowHeight = 555
    }
    else if (is360Size) {
        dimensions.columnCount = 1
        dimensions.columnWidth = 280
        dimensions.viewerWidth = 290
        dimensions.rowHeight = 390
    }
    else if (isXXSSize) {
        dimensions.columnCount = 1
        dimensions.columnWidth = 350
        dimensions.viewerWidth = 360
        dimensions.rowHeight = 460
    }
    else if (isXXXSSize) {
        dimensions.columnCount = 1
        dimensions.columnWidth = 450
        dimensions.viewerWidth = 460
        dimensions.rowHeight = 560
    }
    else if (isSMSize) {
        dimensions.columnCount = 2
        dimensions.columnWidth = 300
        dimensions.viewerWidth = 610
        dimensions.rowHeight = 415
    }
    else if (isMDSize) {
        dimensions.columnCount = 2
        dimensions.columnWidth = 370
        dimensions.viewerWidth = 750
        dimensions.rowHeight = 485
    }
    else if (isNLGSize) {
        dimensions.columnCount = 2
        dimensions.columnWidth = 460
        dimensions.viewerWidth = 930
        dimensions.rowHeight = 575
    }
    
    return dimensions;
}