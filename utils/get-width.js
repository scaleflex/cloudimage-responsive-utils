import { convertToPX, getSizeLimit, getParentContainerSize } from './';

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
 * @param {Boolean} props.exactSize - a flag to use exact width/height params
 * @param {Number} props.imgNodeWidth - width of image node
 * @param {String} props.params - params of image node
 * @return {Number} width limit
 */
export const getWidth = props => {
  const { imgNode = null, exactSize = false, imgNodeWidth = null, params = {}, size } = props;
  const crop = params.func === 'crop';

  if (size && size.params) {
    return size.params.w || size.params.width;
  }

  if (params.width || params.w) {
    return params.width || params.w;
  }

  if (imgNodeWidth) {
    return convertToPX(imgNodeWidth);
  }

  const ImgContainerWidth = getImgContainerWidth(imgNode);

  return crop ? ImgContainerWidth : getSizeLimit(ImgContainerWidth, exactSize);
};

/**
 * Get container width for an image.
 *
 * Priority:
 * 1. inline styling
 * 2. parent node computed style width (up to body tag)
 *
 * @param {HTMLImageElement} img - image node
 * @return {Number} width of image container
 */
const getImgContainerWidth = (img) => {
  const imgStyleWidth = img && img.style && img.style.width;
  const imgWidth = imgStyleWidth && convertToPX(imgStyleWidth);

  if (imgWidth) return parseInt(imgWidth, 10);

  return parseInt(getParentContainerSize(img), 10);
};