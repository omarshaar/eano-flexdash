import { gUserConfig } from "../data/var.js";
import { getWidgetElements } from "../index.js";
import { cancelSelection, throttle } from "../ultis/index.js";
let gDraggedElement;
let gDragOverElement;
let initClientX, initClientY; 
let initElementX, initElementY; 
let containerLeft, containerTop; 
let gDragPosition = "beforebegin" // [afterend, beforebegin];
let lastWidgetIndex = 0;

export function makeDraggable() {
    const container       = document.querySelector(gUserConfig.container_selector);
    const widgetHandles   = document.querySelectorAll(".widget-handle");
    const widgetList      = getWidgetElements();
    const throttledOnDrag = throttle(onDrag, 150);

    function onDragStart(pEvent) {
        const widgetList = getWidgetElements();
        cancelSelection();
        gDraggedElement = pEvent.currentTarget.parentNode;
        ["mousemove", "touchmove"].map(pEventName => {
            document.addEventListener(pEventName, throttledOnDrag);
            document.addEventListener(pEventName, handleMoveElement);
        }); 
        ["mouseup", "touchend", "touchcancel"].map(pEventName => 
            document.addEventListener(pEventName, onDragEnd)
        );

        const {x, y}            = getClientsOnStart(pEvent);
        const contClientRect    = container.getBoundingClientRect();
        const elementClientRect = gDraggedElement.getBoundingClientRect();

        initClientX   = x;
        initClientY   = y;
        initElementX  = elementClientRect.left;
        initElementY  = elementClientRect.top;
        containerLeft = contClientRect.left;
        containerTop  = contClientRect.top;

        widgetList?.forEach((widget, index) => {
            widget.setAttribute("data-index", index);
        });

        lastWidgetIndex = gDraggedElement.dataset.index;
    }

    function onDrag(pEvent) {
        cancelSelection();
        updateDraggedElementDOMPosition(getWidgetElements());
    }

    function onDragEnd(pEvent) {
        ["mousemove", "touchmove"].map(pEventName => document.removeEventListener(pEventName, throttledOnDrag)); 
        ["mousemove", "touchmove"].map(pEventName => document.removeEventListener(pEventName, handleMoveElement));
        ["mouseup", "touchend", "touchcancel"].map(pEventName => document.removeEventListener(pEventName, onDragEnd));

        initClientY  = 0;
        initClientX  = 0;
        initElementY = 0;
        initElementX = 0;
        lastWidgetIndex = 0;

        handleMoveBackDragedElement(gDraggedElement, container);

        widgetList.forEach((widget) => {
            widget.removeAttribute("data-index");
        });

        saveOrder();
    }

    widgetHandles.forEach(widgetHandle => {
        ["mousedown", "touchstart"].map(pEventName => widgetHandle.addEventListener(pEventName, onDragStart));
    });

    widgetList.forEach((widget) => {
        widget.addEventListener("pointerenter", getDragOverElement);
    });
}

function getClientsOnStart(e) {
    let x, y;
    if (e.type === 'mousedown') {
      x = e.clientX;
      y = e.clientY;
    } else if (e.type === 'touchstart') {
      e.preventDefault();
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }
    return {x, y}
}

function getClientsOnMove(e) {
    let x, y;
    if (e.type === 'mousemove') {
      x = e.clientX;
      y = e.clientY;
    } else if (e.type === 'touchmove') {
      e.preventDefault();
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }

    return {x, y}
}

function handleMoveElement_(pEvent) {
    if (!(initClientX > -1 && initClientY > -1) || !gDraggedElement) { return }
    handlePlaceHolder(gDraggedElement);

    const {x, y} = getClientsOnMove(pEvent);

    let newTop  = Math.max((initElementY - containerTop) - (initClientY - y), 0);
    let newLeft = Math.max((initElementX - containerLeft) - (initClientX - x), 0);

    gDraggedElement.style.position      = "absolute";
    gDraggedElement.style.left          = newLeft+"px";
    gDraggedElement.style.top           = newTop+"px";
    gDraggedElement.style.zIndex        = "9999";
    gDraggedElement.style.pointerEvents = "none";
}

function autoScroll(mouseY) {
    const edgeThreshold = 50;
    const scrollSpeed = 10;
    const viewportHeight = window.innerHeight;
  
    if (mouseY < edgeThreshold) {
      window.scrollBy(0, -scrollSpeed);
    } else if (mouseY > viewportHeight - edgeThreshold) {
      window.scrollBy(0, scrollSpeed);
    }
}
  
function handleMoveElement(pEvent) {
    if (!(initClientX > -1 && initClientY > -1) || !gDraggedElement) { return; }
    handlePlaceHolder(gDraggedElement);
  
    const { x, y } = getClientsOnMove(pEvent);
  
    let newTop  = Math.max((initElementY - containerTop) - (initClientY - y), 0);
    let newLeft = Math.max((initElementX - containerLeft) - (initClientX - x), 0);
  
    gDraggedElement.style.position      = "absolute";
    gDraggedElement.style.left          = newLeft + "px";
    gDraggedElement.style.top           = newTop + "px";
    gDraggedElement.style.zIndex        = "9999";
    gDraggedElement.style.pointerEvents = "none";

    autoScroll(pEvent.clientY);
}

function handlePlaceHolder(pDraggedElement) {
    const newDiv = document.querySelector('.widget-placeholder') || document.createElement("div");
    newDiv.classList.add("widget-placeholder");
    newDiv.style.width = pDraggedElement?.getBoundingClientRect().width + "px";
    newDiv.style.height = pDraggedElement?.getBoundingClientRect().height + "px";
    pDraggedElement?.parentNode.insertBefore(newDiv, pDraggedElement);
}

function handleMoveBackDragedElement(pDraggedElement, pContainer) {
    if (!pDraggedElement) {
        return
    }
    const placeholder = document.querySelector(".widget-placeholder");
    const newTop = placeholder?.getBoundingClientRect().top - pContainer.getBoundingClientRect().top;
    const newLeft = placeholder?.getBoundingClientRect().left - pContainer.getBoundingClientRect().left;
    pDraggedElement.style.transition = "0.3s";
    
    setTimeout(() => {
        pDraggedElement.style.top = newTop+"px";
        pDraggedElement.style.left = newLeft+"px";
    }, 0);
    
    setTimeout(() => {
        pDraggedElement.style.removeProperty("transition");
        pDraggedElement.style.removeProperty("position");
        pDraggedElement.style.removeProperty("top");
        pDraggedElement.style.removeProperty("left");
        pDraggedElement.style.removeProperty("pointer-events");
        pDraggedElement.style.removeProperty("z-index");
        placeholder?.remove();
    }, 290);
}

function saveOrder() {
    const order = Array.from(getWidgetElements()).map(el => el.dataset.widgetPosition).filter(el => el);
    localStorage.setItem("widgetsPositions", JSON.stringify(order));
}

export function loadOrder() {
    const container = document.querySelector(gUserConfig.container_selector);
    const savedOrder = JSON.parse(localStorage.getItem("widgetsPositions"));
    const items = [];
    if (savedOrder) {
        savedOrder.forEach(orderIndex =>{
            items.push(document.querySelector("[data-widget-position='"+orderIndex+"']"));
        });
        container.innerHTML = "";
        items.forEach(item => {
            item.style.opacity = "1";
            container.appendChild(item);
        })
    }else {
        const widgets = getWidgetElements();
        widgets.forEach(item => {
            item.style.opacity = "1";            
        })

        saveOrder();
    }
}

function updateDraggedElementDOMPosition(pWidgetList) {
    gDragOverElement.insertAdjacentElement(gDragPosition, gDraggedElement);

    pWidgetList.forEach((widget, index) => {
        widget.setAttribute("data-index", index);
    });
}

function getDragOverElement(pEvent) {
    gDragOverElement = pEvent.currentTarget;
    let currentIndex = parseInt(gDragOverElement.dataset.index) || 0;
    
    if (currentIndex > lastWidgetIndex) {
        gDragPosition = "afterend";
    } else if (currentIndex < lastWidgetIndex) {
        gDragPosition = "beforebegin";
    } else {
        gDragPosition = (gDragPosition === "afterend") ? "beforebegin" : "afterend";
    }

    lastWidgetIndex = currentIndex;
}