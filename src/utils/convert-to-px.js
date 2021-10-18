import { isServer } from './is-server';

export const convertToPX = (size = '') => {
  size = (size || '').toString();

  if (size.indexOf('px') > -1) {
    return parseInt(size);
  } else if (size.indexOf('%') > -1) {
    // todo calculate container width * %
    // todo could be the potenial problem when the plugin set 100% width and on update it can calculate wrong value
    return null;
  } else if (size.indexOf('vw') > -1) {
    return !isServer() ? window.innerWidth * parseInt(size) / 100 : null;
  } else if (size.indexOf('vh') > -1) {
    return !isServer() ? window.innerHeight * parseInt(size) / 100 : null;
  }

  return parseInt(size) || '';
};
