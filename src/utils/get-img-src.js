import { isSVG } from '../utils/is-svg';
import { isServer } from './is-server';


export const getImgSRC = (src, baseURL = '') => {
  const relativeURLPath = isRelativeUrlPath(src);

  if (src.indexOf('//') === 0) {
    src = (!isServer() ? window.location.protocol : 'https:') + src;
  }

  if (relativeURLPath) {
    src = relativeToAbsolutePath(baseURL, src);
  }

  return [src, isSVG(src)];
};

const relativeToAbsolutePath = (base, relative) => {
  const root = relative[0] === '/';
  const resultBaseURL = getBaseURL(root, base);
  const stack = resultBaseURL.split('/');
  const parts = relative.split('/');

  stack.pop(); // remove current file name (or empty string)
               // (omit if 'base' is the current folder without trailing slash)
  if (root) {
    parts.shift();
  }

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '.')
      continue;
    if (parts[i] === '..')
      stack.pop();
    else
      stack.push(parts[i]);
  }

  return stack.join('/');
};

const getBaseURL = (root, base) => {
  if (root) {
    return (base ? extractBaseURLFromString(base) : (!isServer() ? window.location.origin : '')) + '/';
  } else {
    return base ? base : (!isServer() ? document.baseURI : 'http://localhost:3000/');
  }
};

const extractBaseURLFromString = (path = '') => {
  const pathArray = path.split('/');
  const protocol = pathArray[0];
  const host = pathArray[2];

  return protocol + '//' + host;
};

const isRelativeUrlPath = src => {
  if (!src) return false;

  if (src.indexOf('//') === 0) {
    src = (!isServer() ? window.location.protocol : 'https:') + src;
  }

  return src.indexOf('http://') !== 0 && src.indexOf('https://') !== 0 && src.indexOf('//') !== 0;
};