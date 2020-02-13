import { convertToPX, getSizeLimit, getParentContainerSize } from './';

/**
 * Get height for an image.
 *
 * Priority:
 * 1. image node param height
 * 2. image node image height
 * 3. image node inline styling
 * 4. parent node of image computed style height (up to body tag)
 *
 * @param {HTMLImageElement} props.imgNode - image node
 * @param {Object} props.config - plugin config
 * @param {Boolean} props.exactSize - a flag to use exact width/height params
 * @param {Number} props.imgNodeHeight - height of image node
 * @param {String} props.params - params of image node
 * @return {Number} height limit
 */
export const getHeight = props => {
  const { imgNode = null, config = {}, exactSize = false, imgNodeHeight = null, params = {}, size } = props;
  const crop = params.func === 'crop';

  if (size && size.params) {
    return size.params.h || size.params.height;
  }

  if (params.height || params.h) {
    return params.height || params.h;
  }

  if (imgNodeHeight) {
    return convertToPX(imgNodeHeight);
  }

  if ((params.func || config.params.func) !== 'crop') {
    return null;
  }

  const imgContainerHeight = getImgContainerHeight(imgNode);

  return crop ? imgContainerHeight : getSizeLimit(imgContainerHeight, exactSize);
};

/**
 * Get container height for an image.
 *
 * Priority:
 * 1. inline styling
 * 2. parent node computed style width (up to body tag)
 *
 * @param {HTMLImageElement} img - image node
 * @return {Number} width of image container
 */
export const getImgContainerHeight = (img) => {
  const imgStyleHeight = img && img.style && img.style.height;
  const imgHeight = convertToPX(imgStyleHeight);

  if (imgHeight) return parseInt(imgHeight, 10);

  return parseInt(getParentContainerSize(img, 'height'), 10);
};