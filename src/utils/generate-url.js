import { DEVICE_PIXEL_RATIO_LIST } from '../constants';


export const generateURL = props => {
  const { src, params, config, containerProps, devicePixelRatio = 1 } = props;
  const size = containerProps && containerProps.sizes[DEVICE_PIXEL_RATIO_LIST.indexOf(devicePixelRatio)];
  const { width, height } = size || {};
  const { token, domain, doNotReplaceURL } = config;

  return [
    doNotReplaceURL ? '' : `https://${token}.${domain}/v7/`,
    src,
    src.includes('?') ? '&' : '?',
    getQueryString({ params: { ...config.params, ...params }, width, height, config })
  ].join('');
};

const getQueryString = props => {
  const { params = {}, width, height, config } = props;
  const { processOnlyWidth } = config;
  const [restParams, widthFromParam = null, heightFromParam] = processParamsExceptSizeRelated(params);
  const widthQ = width ? width : widthFromParam;
  const heightQ = height ? height : heightFromParam;
  const restParamsQ = Object
    .keys(restParams)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(restParams[key]))
    .join('&');

  return [
    widthQ ? `w=${widthQ}` : '',
    (heightQ && !processOnlyWidth) ? ((widthQ ? '&' : '') + `h=${heightQ}`) : '',
    restParamsQ ? '&' + restParamsQ : ''
  ].join('');
};

const processParamsExceptSizeRelated = params => {
  const { w, h, width, height, ...restParams } = params;

  return [restParams, w || width, h || height];
};