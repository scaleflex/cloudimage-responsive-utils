export const getParentContainerSize = (img, type = 'width') => {
  let parentNode = img;
  let size = 0;
  let maxCount = 0;

  do {
    parentNode = parentNode && parentNode.parentNode;
    size = typeof parentNode.getBoundingClientRect === 'function' ? parentNode.getBoundingClientRect()[type] : window.innerWidth;
    maxCount = maxCount + 1;
  } while (parentNode && !size && maxCount > 5)

  const leftPadding = (size && parentNode && parentNode.nodeType === 1) ? parseInt(window.getComputedStyle(parentNode).paddingLeft) : 0;
  const rightPadding = (size && parentNode && parentNode.nodeType === 1) ? parseInt(window.getComputedStyle(parentNode).paddingRight) : 0;

  if (!size) {
    size = window.innerWidth;
  }

  return size + (size ? (-leftPadding - rightPadding) : 0);
};
