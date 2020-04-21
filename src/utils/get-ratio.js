export const getRatio = ({ imageNodeRatio, width, height, size, config, imageNodeWidth, imageNodeHeight }) => {
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

  if (!ignoreNodeImgSize && imageNodeRatio) {
    return imageNodeRatio;
  } else if (saveNodeImgRatio && imageNodeWidth && imageNodeHeight) {
    return imageNodeWidth / imageNodeHeight;
  } else if (width && height) {
    return width / height;
  }

  return null;
}