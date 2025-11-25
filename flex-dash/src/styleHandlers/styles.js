import { gUserConfig } from "../data/var.js";

export function handleStyling(pWidgets, from) {
    const container = document.querySelector(gUserConfig.container_selector);
    initStyle(pWidgets, container);
    // alert(from)
}

function initStyle(pWidgets, pContainer) {
    pContainer.classList.add("ode-flex-dash-container");
    pContainer.style.gap = gUserConfig.gap+"px";
    crateColSpanClasses();
    setDefaultColSpan(pWidgets);
}

function crateColSpanClasses() {
    let css = "";
    const cellWidth = 100 / parseInt(gUserConfig.layout_columns);

    css += `[data-col-span] {width: calc(${100}% - ${gUserConfig.gap}px)} \n`;

    for (let index = 1; index <= gUserConfig.layout_columns; index++) {
        css += `[data-col-span="${index}"] {width: calc(${cellWidth*index}% - ${gUserConfig.gap}px) !important;} \n`;
    }

    const style = document.getElementById("ode-flex-dash-styles") || document.createElement('style');
    style.id = "ode-flex-dash-styles";
    style.textContent = css;
    document.head.appendChild(style);
}

function setDefaultColSpan(pWidgets) {
    pWidgets.forEach(widgetElement => {
        if (!widgetElement.getAttribute("data-col-span")) {
            widgetElement.setAttribute("data-col-span", 1);
        }
    });
}