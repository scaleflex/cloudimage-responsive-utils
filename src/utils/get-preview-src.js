import { generateURL } from '../index';


export const getPreviewSRC = ({ config, width, height, params, src }) => {
  const { previewQualityFactor } = config;
  const previewParams = { ...params, ci_info: '' };
  const lowQualitySize = getLowQualitySize({ width, height }, previewQualityFactor);

  return generateURL({ src, config, params: { ...previewParams, ...lowQualitySize } });
};

const getLowQualitySize = (params = {}, factor) => {
  let { width, height } = params;

  width = width ? Math.floor(width / factor) : null;
  height = height ? Math.floor(height / factor) : null;

  return { width, w: width, height, h: height };
};