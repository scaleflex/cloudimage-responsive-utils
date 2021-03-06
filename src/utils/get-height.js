import { convertToPX } from '../utils/convert-to-px';
import { getParentContainerSize } from '../utils/get-parent-container-size';
import { isCrop } from '../utils/is-crop';


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
  const { imgNode = null, config = {}, imgNodeHeight = null, params = {}, size, width } = props;
  const { ignoreNodeImgSize: _ignoreNodeImgSize, ignoreStyleImgSize, imageSizeAttributes } = config;
  const ignoreNodeImgSize = typeof _ignoreNodeImgSize !== 'undefined' ?
      _ignoreNodeImgSize : imageSizeAttributes !== 'use';
  const crop = isCrop(params.func || config.params.func);
  const sizeParamsHeight = size && size.params && (size.params.h || size.params.height);
  const paramsRatio = size && size.params && (size.params.ratio || size.params.r);
  const paramsHeight = params.height || params.h;
  const imgNodeHeightPX = !ignoreNodeImgSize && imgNodeHeight && convertToPX(imgNodeHeight);
  const imageHeight = !ignoreStyleImgSize && getImageHeight(imgNode);
  const imageContainerHeight = !imageHeight && parseInt(getParentContainerSize(imgNode, 'height'), 10);

  if (size && size.params) {
    if (paramsRatio && width) {
      return width / paramsRatio;
    }

    return sizeParamsHeight;
  }

  if (paramsHeight) {
    return paramsHeight;
  }

  if (!ignoreNodeImgSize && imgNodeHeight) {
    return imgNodeHeightPX;
  }

  if (imageHeight) {
    return imageHeight;
  }

  if (!crop) {
    return null;
  }

  return imageContainerHeight;
};

/**
 * Get height for an image.
 *
 *
 * @param {HTMLImageElement} img - image node
 * @return {Number|null} height of image container
 */
export const getImageHeight = (img) => {
  const isImageStyleHeightInPX = img && img.style && img.style.height && !img.style.height.includes('%');
  const imageStyleHeight = isImageStyleHeightInPX && img.style.height;
  const imageHeight = convertToPX(imageStyleHeight);

  return imageHeight && parseInt(imageHeight, 10);
};
