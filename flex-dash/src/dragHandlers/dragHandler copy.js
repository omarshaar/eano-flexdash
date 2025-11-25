import { gUserConfig } from "../data/var.js";
import { getWidgetElements } from "../index.js";
import { throttle } from "../ultis/index.js";

export function makeDraggable(widgets) {
    const container     = document.querySelector(gUserConfig.container_selector);
    const widgetHandles = document.querySelectorAll(".widget-handle");
    const widgetList    = Array.from(widgets);
    let draggedElement  = null;
    let initElementLeft = 0;
    let initX           = 0;

    const onDragStart = (event) => {
        draggedElement = event.currentTarget.parentNode;
        if (!event.dataTransfer) { return }
        event.dataTransfer.effectAllowed = "move";
        const ghostImage = new Image();
        ghostImage.src = "";
        event.dataTransfer.setDragImage(ghostImage, 0, 0);

        initElementLeft = draggedElement.getBoundingClientRect().left;
        const {x,y} = getClientsOnStart(event);
        initX = x;
    };

    const onDragEnter = (event) => {
        event.preventDefault();
        const targetElement = event.currentTarget;
        if (draggedElement && draggedElement !== targetElement) {
            swapElements(draggedElement, targetElement);
        }
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };

    const onDragEnd = () => {
        handleMoveBackDragedElement(draggedElement, container);
        draggedElement = null;
        initElementLeft = 0;
        initX = 0;
        saveOrder();
    };

    const onTouchMove = (event) => {
        onDrag(event);
        if (!draggedElement) return;
        const touch = event.touches[0];
        const elementAtPoint = document.elementFromPoint(
            touch.clientX,
            touch.clientY
        );
        let dropTarget = null;
        for (const widget of widgetList) {
            if (widget.contains(elementAtPoint)) {
            dropTarget = widget;
            break;
            }
        }
        if (dropTarget && dropTarget !== draggedElement) {
            swapElements(draggedElement, dropTarget);
        }
        event.preventDefault();
    };

    function onDrag(event) {
        const containerTop  = container.getBoundingClientRect().top;
        const containerLeft = container.getBoundingClientRect().left; 
        const {x, y} = getClientsOnMove(event);
        handleMoveElement(draggedElement, (x - containerLeft) - (initX- initElementLeft), (y-containerTop));
    }

    const throttledOnDragEnter = throttle(onDragEnter, 100);

    widgetHandles.forEach(widgetHandle => {
        widgetHandle.setAttribute("draggable", true);
        widgetHandle.addEventListener("dragstart", onDragStart);
        widgetHandle.addEventListener("touchstart", onDragStart);
    })

    widgetList.forEach((widget) => {
      widget.addEventListener("dragenter", throttledOnDragEnter);
      widget.addEventListener("dragover", onDragOver);

      widget.addEventListener("drag", onDrag);
      widget.addEventListener("touchmove", onTouchMove);

      widget.addEventListener("touchcancel", onDragEnd);
      widget.addEventListener("dragend", onDragEnd);
      widget.addEventListener("touchend", onDragEnd);
    });
}

function swapElements(a, b) {
    const aParent = a.parentNode;
    const bParent = b.parentNode;
    const aNext = a.nextSibling;
    const bNext = b.nextSibling;
  
    if (aNext === b) {
      aParent.insertBefore(b, a);
    } else if (bNext === a) {
      bParent.insertBefore(a, b);
    } else {
      aParent.insertBefore(b, aNext);
      bParent.insertBefore(a, bNext);
    }
}

function getClientsOnStart(e) {
    let x, y;
    if (e.type === 'dragstart') {
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
    if (e.type === 'drag') {
      x = e.clientX;
      y = e.clientY;
    } else if (e.type === 'touchmove') {
      e.preventDefault();
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }

    return {x, y}
}

function handleMoveElement(pDraggedElement, x, y) {
    if (!(x > 0 && y > 0) || !pDraggedElement) { return }
    handlePlaceHolder(pDraggedElement);
    pDraggedElement.style.pointerEvents = "none";
    pDraggedElement.style.zIndex = "9999";
    pDraggedElement.style.position = "absolute";
    pDraggedElement.style.left = x+"px";
    pDraggedElement.style.top = y+"px";
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

