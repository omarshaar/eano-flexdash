import initFlexDash from "../flex-dash/index.js";
import { loadOrder } from "../flex-dash/src/dragHandlers/dragHandler.js";
import { temp1, temp2 } from "./tempHandler.js";

const config  = {
    container_selector: ".dashboard-container",
    widgets_attribute_selector: "data-ode-flex-dash",
    layout_columns: 3,
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
            md: 2,
            lg: 3,
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {initFlexDash(config) }, 0);
});


let currentTemplate = "1";
export function toggleTemplate() {
    if (currentTemplate == "1") {
        currentTemplate = "2";
        document.body.innerHTML = temp2;
        setTimeout(() => {
            initFlexDash(config);
            loadOrder();
        }, 100);
    } else {
        currentTemplate = "1";
        document.body.innerHTML = temp1;
        setTimeout(() => {
            initFlexDash(config);
            loadOrder();
        }, 100);
    }
}