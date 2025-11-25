import { gColWidth, gUserConfig } from "../data/var.js";
import { getWidgetElements } from "../index.js";
import { cancelSelection } from "../ultis/index.js";

window.changeColumnSpan = changeColumnSpan;
let gInitX, gTargetElemet, gElementInitSpans;

export function changeColumnSpan(pEvent) {
    const targetElement = pEvent.currentTarget.parentNode;
    gInitX = pEvent.clientX;
    gTargetElemet = targetElement;
    gElementInitSpans = (1 * parseInt(gTargetElemet.getAttribute("data-col-span"))) - 1;

    cancelSelection();
    document.addEventListener("mousemove", handleOnResize)
    document.addEventListener("mouseup", onResizeEnd)
}

function handleOnResize(pEvent) {
    cancelSelection();
    const currentX = pEvent.clientX - gInitX;
    const va = currentX > 0 ? Math.ceil(currentX / gColWidth) : Math.floor(currentX / gColWidth);

    const spans = Math.min(
        Math.max(
            va + 1 + gElementInitSpans,
            1
        ),
        gUserConfig.layout_columns
    );

    gTargetElemet.setAttribute("data-col-span", spans);
}

function onResizeEnd() {
    handleSaveNewSpans();
    document.removeEventListener("mousemove", handleOnResize)
    document.removeEventListener("mouseup", onResizeEnd)
}

export function handleSaveNewSpans() {
    const widgets = getWidgetElements();
    const newData = [];
    widgets.forEach(widget => {
        newData.push({
            widget: widget.getAttribute("data-widget-position"),
            span: widget.getAttribute("data-col-span")
        });
    });

    localStorage.setItem("widgetSpans", JSON.stringify(newData));
}

export function setSpansOnLoad() {
    const savedSpans = localStorage.getItem("widgetSpans");
    if (savedSpans) {
        JSON.parse(savedSpans).forEach(spanItem => {
            document.querySelector(`[data-widget-position='${spanItem.widget}']`).setAttribute("data-col-span", spanItem.span);
        });
    }
}