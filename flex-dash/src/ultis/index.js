export function cancelSelection() {
    // reset all selections
    if (window.getSelection) {
        // Modern browsers
        const selection = window.getSelection();
        if (selection) {
            selection.removeAllRanges();
        }
    } else if (document.selection) {
        // For older IE versions
        document.selection.empty();
    }
}

export function throttle(callback, limit) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        callback(...args);
      }
    };
}