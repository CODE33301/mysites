(function(){
  const iframe = document.getElementById('fixed-iframe');
  const resizeHandle = document.getElementById('resize-handle');
  const content = document.getElementById('content');

  let isResizing = false;

  // Preferred minimum height for iframe in pixels
  const minHeight = 100;

  // pointerdown event to start resizing (works for both mouse and touch)
  resizeHandle.addEventListener('pointerdown', (e) => {
    // Prevent default behavior to avoid text selection
    e.preventDefault();
    isResizing = true;
    // Set pointer capture for the resize handle for smooth dragging
    resizeHandle.setPointerCapture(e.pointerId);
  });

  // pointermove event continues resizing
  window.addEventListener('pointermove', (e) => {
    if (!isResizing) return;
    let newHeight = e.clientY;

    // Enforce minimum height
    if (newHeight < minHeight) {
      newHeight = minHeight;
    }

    // Update iframe height
    iframe.style.height = newHeight + 'px';

    // Update the position of the resize handle and the margin for the content container.
    // In our layout, the handle remains directly below the iframe
    // and the content margin-top should equal iframe height + handle height.
    content.style.marginTop = (newHeight + resizeHandle.offsetHeight) + 'px';
  });

  // pointerup event to end resizing
  window.addEventListener('pointerup', (e) => {
    if (isResizing) {
      isResizing = false;
      resizeHandle.releasePointerCapture(e.pointerId);
    }
  });
})();