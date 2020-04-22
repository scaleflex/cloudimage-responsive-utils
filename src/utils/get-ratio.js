export const getRatio = ({ imgNodeRatio, width, height, size, config, imgNodeWidth, imgNodeHeight }) => {
  const { saveNodeImgRatio, ignoreNodeImgSize } = config;

  if (size && size.params) {
    if (size.params.r || size.params.ratio) {
      return size.params.r || size.params.ratio;
    } else if ((size.params.w || size.params.width) && (size.params.h || size.params.height)) {
      return (size.params.w || size.params.width) / (size.params.h || size.params.height);
    } else {
      return null
    }
  }

  if (!ignoreNodeImgSize && imgNodeRatio) {
    return imgNodeRatio;
  } else if (saveNodeImgRatio && imgNodeWidth && imgNodeHeight) {
    return imgNodeWidth / imgNodeHeight;
  } else if (width && height) {
    return width / height;
  }

  return null;
}