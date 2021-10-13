import { isServer } from './is-server';

export const getBreakpoint = (sizes, presets) => {
  const size = !isServer() ? getAdaptiveSize(sizes, presets) : [];

  return [...size].reverse().find(item => window.matchMedia(item.media).matches);
};

const getAdaptiveSize = (sizes, presets) => {
  const resultSizes = [];

  Object.keys(sizes).forEach(key => {
    const customMedia = key.indexOf(':') > -1;
    const media = customMedia ? key : presets[key];

    resultSizes.push({ media, params: normalizeSize(sizes[key]) });
  });

  return resultSizes;
};

const normalizeSize = (params = {}) => {
  let { w = params.width || '', h = params.height || '', r = params.r , src= params.src } = params;

  if ((w.toString()).indexOf('vw') > -1) {
    const percent = parseFloat(w);

    w = window.innerWidth * percent / 100;
  } else {
    w = parseFloat(w);
  }

  if ((h.toString()).indexOf('vh') > -1) {
    const percent = parseFloat(h);

    h = window.innerHeight * percent / 100;
  } else {
    h = parseFloat(h);
  }

  return { w, h, r, src };
};