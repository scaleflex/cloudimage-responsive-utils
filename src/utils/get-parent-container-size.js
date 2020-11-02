export const getParentContainerSize = (img, type = 'width') => {
  let parentNode = null;
  let size = 0;

  do {
    parentNode = (parentNode && parentNode.parentNode) || img.parentNode;
    size = typeof window.document.getBoundingClientRect === 'function' ? parentNode.getBoundingClientRect()[type] : window.innerWidth;
  } while (parentNode && !size)

  const leftPadding = size && parentNode && parseInt(window.getComputedStyle(parentNode).paddingLeft);
  const rightPadding = parseInt(window.getComputedStyle(parentNode).paddingRight)

  return size + (size ? (-leftPadding - rightPadding) : 0);
};