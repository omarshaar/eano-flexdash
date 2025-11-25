import { toggleTemplate } from "./app.js";

window.addRechtsvorhabenRow = addRechtsvorhabenRow;
window.removeItem           = removeItem;
window.addStandRow          = addStandRow;
window.addAbonnRow          = addAbonnRow;
window.toggleTemplate       = toggleTemplate;

document.addEventListener("DOMContentLoaded", crateCalender);

function addRechtsvorhabenRow(pEvent) {
    const container = document.querySelector("#widget-item-rech");
    container.innerHTML += `
        <div class="data-row-1" onclick='removeItem(event)'>
            <div class="cod-conta"> <span class="cod">EU</span> <span class="cod cod-1">Richline</span> <span class="cod cod-2">Nachhaltigkeit</span> </div>
            <p class="sub-title">Rechtsvorhaben ${container.children.length + 1}</p>
        </div>
    `;
}

function removeItem(pEvent) {
    const target = pEvent.currentTarget;
    if (target) {
        target.remove();
    }
}

function addStandRow() {
    const container = document.querySelector("#widget-item-stand");
    container.innerHTML += `
        <div class="data-row-1" onclick="removeItem(event)">
            <div class="chksbxs-conta">
                <span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span><span class="chksbxspan"></span>
            </div>
            <p class="sub-title">Rechtsvorhaben ${container.children.length + 1}</p>
        </div>
    `;
}

function addAbonnRow() {
    const container = document.querySelector("#widget-item-apo");
    container.innerHTML += `
        <li onclick="removeItem(event)"><p>Verteiler ${container.children.length + 1}</p> <span>...</span></li>
    `;
}

function crateCalender() {
    const container = document.querySelector(".calender-conta");
    if (!container) { return }
    let dateDay = 28;
    let newMonth = false;

    for (let index = 0; index < 35; index++) {
        container.innerHTML += `<span class="calender-cell"> ${dateDay} <span>`
        
        dateDay++;
        
        if (dateDay > 31) {
            dateDay = 1;
            newMonth = true;
        }
        if (newMonth && dateDay > 30) {
            dateDay = 1;
        }
    }
}


