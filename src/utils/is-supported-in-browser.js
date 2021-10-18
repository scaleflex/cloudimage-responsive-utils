import { isServer } from './is-server';

export const isSupportedInBrowser = (isBlurHash) => {
  let support = true;

  if (isBlurHash && !isServer()) {
    try {
      new window.ImageData(new Uint8ClampedArray([0, 0, 0, 0]), 1, 1);
    } catch (e) {
      support = false
    }
  }

  return Element.prototype.hasOwnProperty('prepend') && support;
};