import { processParams } from './';


export const generateURL = props => {
  const { src, params, config, width, height } = props;
  const { token, domain, doNotReplaceURL } = config;
  const configParams = processParams(config.params);

  return [
    doNotReplaceURL ? '' : `https://${token}.${domain}/v7/`,
    src,
    src.includes('?') ? '&' : '?',
    getQueryString({ params: { ...configParams, ...params }, width, height })
  ].join('');
};

const getQueryString = props => {
  const { params = {}, width, height } = props;
  const [restParams, widthFromParam = null, heightFromParam] = processParamsExceptSizeRelated(params);
  const widthQ = width ? updateSizeWithPixelRatio(width) : widthFromParam;
  const heightQ = height ? updateSizeWithPixelRatio(height) : heightFromParam;
  const restParamsQ = Object
    .keys(restParams)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(restParams[key]))
    .join('&');

  return [
    widthQ ? `w=${widthQ}` : '',
    heightQ ? ((widthQ ? '&' : '') + `h=${heightQ}`) : '',
    restParamsQ ? '&' + restParamsQ : ''
  ].join('');
};

const processParamsExceptSizeRelated = params => {
  const { w, h, width, height, ...restParams } = params;

  return [restParams, w || width, h || height];
};

/*
* possible size values: 200 | 200x400
* */
const updateSizeWithPixelRatio = (size) => {
  const splittedSizes = size.toString().split('x');
  const result = [];

  [].forEach.call(splittedSizes, size => {
    size ? result.push(Math.floor(size * (window.devicePixelRatio.toFixed(1) || 1))) : '';
  });

  return result.join('x');
};