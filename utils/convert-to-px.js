export const convertToPX = (size = '') => {
  size = size.toString();

  if (size.indexOf('px') > -1) {
    return parseInt(size);
  } else if (size.indexOf('%') > -1) {
    // todo calculate container width * %
  } else if (size.indexOf('vw') > -1) {
    return window.innerWidth * parseInt(size) / 100;
  } else if (size.indexOf('vh') > -1) {
    return window.innerHeight * parseInt(size) / 100;
  }

  return parseInt(size) || null;
};