import { generateURL } from '../utils/generate-url';


export const getPreviewSRC = ({ config = {}, containerProps: _containerProps, params, src, devicePixelRatio }) => {
  const { width, height, sizes, ...restContainerProps } = _containerProps;
  const { previewQualityFactor } = config;
  const lowQualitySize = getLowQualitySize({ width, height }, previewQualityFactor);

  return generateURL({
      src,
      config,
      containerProps: restContainerProps,
      params: { ...params, ...lowQualitySize },
      devicePixelRatio
    });
};

const getLowQualitySize = (params = {}, factor) => {
  let { width, height } = params;

  width = width ? Math.floor(width / factor) : null;
  height = height ? Math.floor(height / factor) : null;

  return { width, w: width, height, h: height };
};