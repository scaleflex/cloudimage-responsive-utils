export const getParentContainerSize = (img, type = 'width') => {
  let parentNode = null;
  let size = 0;

  do {
    parentNode = (parentNode && parentNode.parentNode) || img.parentNode;
    size = typeof parentNode.getBoundingClientRect === 'function' ? parentNode.getBoundingClientRect()[type] : window.innerWidth;
  } while (parentNode && !size)

  const leftPadding = (size && parentNode && parentNode.nodeType === 1) ? parseInt(window.getComputedStyle(parentNode).paddingLeft) : 0

  const rightPadding = (size && parentNode && parentNode.nodeType === 1) ? parseInt(window.getComputedStyle(parentNode).paddingRight) : 0

  return size + (size ? (-leftPadding - rightPadding) : 0);
};