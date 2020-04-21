/**
 * Get size limit for container/image.
 *
 * @param {Number} size - width/height of container/image
 * @param {Boolean} exactSize - a flag to use exact width/height params
 * @param {Number} limitFactor - limit factor
 * @return {Number} size limit
 */
export const getSizeLimit = (size, exactSize, limitFactor) => {
  if (exactSize) return Math.ceil(size);
  if (size <= 25) return 25;
  if (size <= 50) return 50;

  return Math.ceil(size / limitFactor) * limitFactor;
};