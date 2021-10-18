import { convertToPX } from '../utils/convert-to-px';
import { getParentContainerSize } from '../utils/get-parent-container-size';
import { isServer } from './is-server';


/**
 * Get width for an image.
 *
 * Priority:
 * 1. image node param width
 * 2. image node image width
 * 3. image node inline styling
 * 4. parent node of image computed style width (up to body tag)
 *
 * @param {HTMLImageElement} props.imgNode - image node
 * @param {Number} props.imgNodeWidth - width of image node
 * @param {String} props.params - params of image node
 * @return {Array} [with, isLimit]
 */
export const getWidth = props => {
  const { imgNode, imgNodeWidth = null, params = {}, size, config = {} } = props;
  const { ignoreNodeImgSize: _ignoreNodeImgSize, ignoreStyleImgSize, imageSizeAttributes, detectImageNodeCSS } = config;
  const ignoreNodeImgSize = typeof _ignoreNodeImgSize !== 'undefined' ?
      _ignoreNodeImgSize : imageSizeAttributes !== 'use';
  const sizeParamsWidth = size && size.params && (size.params.w || size.params.width);
  const paramsWidth = params.width || params.w;
  const imgNodeWidthPX = !ignoreNodeImgSize && imgNodeWidth && convertToPX(imgNodeWidth);
  const imageWidth = !ignoreStyleImgSize && getImageWidth(imgNode, detectImageNodeCSS);
  const imageContainerWidth = !isServer() ?
    !imageWidth && parseInt(getParentContainerSize(imgNode), 10) : null;
  const resultWidth = imageWidth || imageContainerWidth;

  if (size && size.params) {
    if (size.params.r) {
      if (params.width || params.w) {
        return [paramsWidth];
      }

      if (!ignoreNodeImgSize && imgNodeWidth) {
        return [imgNodeWidthPX];
      }

      return [resultWidth]
    }

    return [sizeParamsWidth];
  }

  if (paramsWidth) {
    return [paramsWidth];
  }

  if (!ignoreNodeImgSize && imgNodeWidth) {
    return [imgNodeWidthPX];
  }

  return [resultWidth, true];
};

/**
 * Get width for an image.
 *
 *
 * @param {HTMLImageElement} img - image node
 * @param {Boolean} detectImageNodeCSS - detect width of image node
 * @return {Number} width of image container
 */
const getImageWidth = (img, detectImageNodeCSS) => {
  const isImageStyleWidthInPX = img && img.style && img.style.width && !img.style.width.includes('%');
  const imageStyleWidth = isImageStyleWidthInPX && img.style.width;
  const imageWidth = imageStyleWidth && convertToPX(imageStyleWidth);
  const imageCSSWidth =!isServer() ? detectImageNodeCSS && getImageNodeCSS(img) : false;

  return detectImageNodeCSS && imageCSSWidth ? imageCSSWidth : imageWidth && parseInt(imageWidth, 10);
}

const getImageNodeCSS = img => {
  let width;
  const preDisplayValue = img.style.display;

  img.style.display = 'inline-block';
  width = img.getBoundingClientRect().width;
  img.style.display = preDisplayValue;

  return width;
}
