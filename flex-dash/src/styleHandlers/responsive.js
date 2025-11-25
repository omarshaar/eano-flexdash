import { gUserConfig, setColWidth, setUserConfig } from "../data/var.js";
import { getWidgetElements } from "../index.js";
import { handleStyling } from "./styles.js";

let gCurrentBreakPoint = "";

export function handleOnWindowResize() {
    const windowWidth = window.innerWidth;
    const breakPoints = gUserConfig.responsive.breakPonits;
    const breakPointsCols = gUserConfig.responsive.columns;
    let currentBreakPoint = "";

    const sortedBreakPoints = Object.entries(breakPoints).sort(
        ([, a], [, b]) => a - b
    );
    
    for (const [key, value] of sortedBreakPoints) {
        if (windowWidth <= value) {
          currentBreakPoint = key;
          break;
        }
    }
    
    if (!currentBreakPoint && sortedBreakPoints.length > 0) {
        currentBreakPoint = sortedBreakPoints[sortedBreakPoints.length - 1][0];
    }
    
    if (gCurrentBreakPoint != currentBreakPoint) {
        gCurrentBreakPoint = currentBreakPoint;
        handleChangeGridColumns(breakPointsCols[currentBreakPoint]);
    }

    const container = document.querySelector(gUserConfig.container_selector);
    setColWidth(container.getBoundingClientRect().width / gUserConfig.layout_columns);
}

function handleChangeGridColumns() {
    const columns = gUserConfig.responsive.columns[gCurrentBreakPoint];
    gUserConfig.layout_columns = columns;
    setUserConfig(gUserConfig);
    handleStyling(getWidgetElements(), "responsive");
}