export let gUserConfig = {
    container_selector: ".dashboard-container",
    widgets_attribute_selector: "data-ode-flex-dash",
    layout_columns: 1,
    column_width: 20,
    gap: 14,
    griffbereich: 20,
    responsive: {
        breakPonits: {
            sm: 560,
            md: 924,
            lg: 1324,
        },
        columns: {
            sm: 1,
            md: 1,
            lg: 1,
        }
    }
};

export let gColWidth   = 0;
export let gLayout     = {
    layout: "",
    version: 1,
    widgets: []
};

export function setUserConfig(pNewValue) {
    for (const key in pNewValue) {
        const element = pNewValue[key];
        gUserConfig[key] = element;
    }
}

export function setLayoutWidgets(pNewValue) {
    gLayout.widgets = pNewValue;
}

export function addNewWidget(pNewWidget) {
    gLayout.widgets.push(pNewWidget);
}

export function deleteNewWidget(pTargetWidgetIndex) {
    gLayout.widgets.slice(pTargetWidgetIndex, 1);
}

export function setColWidth(pNewValue) {
    gColWidth = pNewValue;
}