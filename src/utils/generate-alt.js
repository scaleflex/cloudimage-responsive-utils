/**
 * Genrate alt from image src
 * The generated alt is relative to the image name
 *
 * @param {String} src - image src
 * @return {String} - The generated alt
 */

export const generateAlt = (src) => {
  if (!src) return;
  const removeConnectorsRegex = /\+|-|_|&/g;
  const parts = src.split('/');

  const imageName = (parts[parts.length - 1] || '')
    .replace(removeConnectorsRegex, ' ')
    .toLocaleLowerCase();

  const extensionIndex = imageName.indexOf('.');

  return imageName
  .slice(0, extensionIndex)
}