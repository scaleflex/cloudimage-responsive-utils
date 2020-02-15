export const getRatio = ({ imgNodeRatio, width, height, size }) => {
  if (size && size.params) {
    if (size.params.ratio) {
      return size.params.ratio
    } else if ((size.params.w || size.params.width) && (size.params.h || size.params.height)) {
      return (size.params.w || size.params.width) / (size.params.h || size.params.height);
    } else {
      return null
    }
  }

  if (imgNodeRatio) {
    return imgNodeRatio;
  } else if (width && height) {
    return width / height;
  }

  return null;
};