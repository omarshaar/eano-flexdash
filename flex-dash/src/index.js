import { gUserConfig, setUserConfig } from "./data/var.js";
import { changeColumnSpan, handleSaveNewSpans, setSpansOnLoad } from "./dragHandlers/columnsSpans.js";
import { loadOrder, makeDraggable } from "./dragHandlers/dragHandler.js";
import { handleOnWindowResize } from "./styleHandlers/responsive.js";
import { handleStyling } from "./styleHandlers/styles.js";

let initApp = false;

export function initFlexDash(pConfig, pOptions) {
  if (!pConfig || typeof pConfig !== "object") {
    console.error("Invalid configuration object provided.");
    return;
  }

  // Set global variables
  setUserConfig(pConfig);

  // Get widgets
  const widgetItems = getWidgetElements();

  if (!widgetItems.length) {
    console.warn("No widgets found for initialization.");
    return;
  }

  // Init styles
  // handleStyling(widgetItems); // called from responsive design

  // Make widgets sortable
  // makeSortable(widgetItems); // Jquery
  makeDraggable(widgetItems);

  // Make widgets resizable
  makeResizable(widgetItems);

  if (!initApp) {
    // handle place-holder 
    handlePlaceHolder(widgetItems);  
  }

  // responsive grid
  window.addEventListener("resize", handleOnWindowResize);

  initApp = true;
}

export function getWidgetElements() {
  const attribute = gUserConfig.widgets_attribute_selector;
  if (!attribute) {
    console.error("No widgets_attribute_selector defined in config.");
    return [];
  }
  return document.querySelectorAll(`[${attribute}]`);
}

function makeSortable(pWidgetItems) {
  if (typeof $ === "undefined" || !$.fn.sortable) {
    console.error("jQuery or jQuery UI Sortable is not loaded.");
    return;
  }

  $(document).ready(function () {
    $(".dashboard-container").sortable({
      items: ".widget",
      handle: ".widget-handle",
      placeholder: "widget-placeholder",
      tolerance: "pointer",
      revert: 200,
      cursor: "grabbing",
      update: function (event, ui) {
        const data = $(this).sortable("toArray");
        console.log("New order:", data);
      },
    });
  });
}

function handlePlaceHolder(pWidgetItems) {
  pWidgetItems.forEach(widgetElement => {
    widgetElement.addEventListener("mousedown", ()=> {
      const style = document.getElementById("ode-flex-dash-placeholder") || document.createElement('style');
      style.id = "ode-flex-dash-placeholder";
      const width = widgetElement.getBoundingClientRect().width;
      const height = widgetElement.getBoundingClientRect().height;

      style.textContent = `.widget-placeholder {height: ${height}px; width: ${width}px;}`
      document.head.appendChild(style);
    })
  });
}

function onPageLoad() {
  setSpansOnLoad();
  handleOnWindowResize();
  loadOrder();
  handleSaveNewSpans();
}

window.onPageLoad = onPageLoad;

function makeResizable() {
  const handles = document.querySelectorAll(".widget-span-handle");
  handles.forEach(hand => {
    hand.addEventListener("mousedown", changeColumnSpan)
  });
}