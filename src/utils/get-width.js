import { convertToPX, getParentContainerSize } from '../';


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
 * @param {Number} props.imageNodeWidth - width of image node
 * @param {String} props.params - params of image node
 * @return {Array} [with, isLimit]
 */
export const getWidth = props => {
  const { imgNode, imageNodeWidth = null, params = {}, size, config } = props;
  const { ignoreNodeImgSize, ignoreStyleImgSize, detectImageNodeCSS } = config;
  const sizeParamsWidth = size && size.params && (size.params.w || size.params.width);
  const paramsWidth = params.width || params.w;
  const imageNodeWidthPX = !ignoreNodeImgSize && imageNodeWidth && convertToPX(imageNodeWidth);
  const imageWidth = !ignoreStyleImgSize && getImageWidth(imgNode, detectImageNodeCSS);
  const imageContainerWidth = !imageWidth && parseInt(getParentContainerSize(imgNode), 10);
  const resultWidth = imageWidth || imageContainerWidth;

  if (size && size.params) {
    if (size.params.r) {
      if (params.width || params.w) {
        return [paramsWidth];
      }

      if (!ignoreNodeImgSize && imageNodeWidth) {
        return [imageNodeWidthPX];
      }

      return [resultWidth]
    }

    return [sizeParamsWidth];
  }

  if (paramsWidth) {
    return [paramsWidth];
  }

  if (!ignoreNodeImgSize && imageNodeWidth) {
    return [imageNodeWidthPX];
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
  const imageCSSWidth = detectImageNodeCSS && getImageNodeCSS(img);

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