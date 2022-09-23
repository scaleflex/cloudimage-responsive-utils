export const getParentContainerSize = (img, type = 'width') => {
  let parentNode = img;
  let size = 0;
  let maxCount = 0;

  do {
    parentNode = parentNode && parentNode.parentNode;
    size = parentNode && typeof parentNode.getBoundingClientRect === 'function' ? parentNode.getBoundingClientRect()[type] : 0;
    maxCount = maxCount + 1;
  } while (parentNode && !size && maxCount <= 5)

  if (type === 'width') {
    if (!size) {
      size = window.innerWidth;
    } else if (parentNode.nodeType === 1) {
      const computedStyle = window.getComputedStyle(parentNode);
      const leftPadding = parseInt(computedStyle.paddingLeft) || 0;
      const rightPadding = parseInt(computedStyle.paddingRight) || 0;

      size -= leftPadding + rightPadding;
    }
  }

  return size;
};
