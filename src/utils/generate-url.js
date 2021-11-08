import { DEVICE_PIXEL_RATIO_LIST } from '../constants';


export const generateURL = props => {
  const { src, params, config = {}, containerProps, devicePixelRatio = 1, processURL, processQueryString, service } = props;
  const size = containerProps && containerProps.sizes[DEVICE_PIXEL_RATIO_LIST.indexOf(devicePixelRatio)];
  const { width, height } = size || {};
  const { token, domain, doNotReplaceURL, customDomain, apiVersion } = config;

  const finalDomain = customDomain ? domain : token + '.' + domain;
  const finalApiVersion = apiVersion ? apiVersion + '/' : '';

  const url =[
      doNotReplaceURL ? '' : `https://${finalDomain}/${finalApiVersion}`,
      src,
      src.includes('?') ? '&' : '?'
  ].join('');

  return [
    processURL ? processURL({ url, token, domain, service }) : url,
    getQueryString({
      params: { ...(config.params || {}), ...params },
      width,
      height,
      config,
      processQueryString,
      devicePixelRatio,
      service
    })
  ].join('');
};

const getQueryString = props => {
  const { params = {}, width, height, config = {}, processQueryString, devicePixelRatio, service } = props;
  const { processOnlyWidth } = config;
  const [restParams, widthFromParam = null, heightFromParam] = processParamsExceptSizeRelated(params);
  const widthQ = width ? width : widthFromParam;
  const heightQ = height ? height : heightFromParam;
  const restParamsQ = Object
    .keys(restParams)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(restParams[key]))
    .join('&');
  const query = [
    widthQ ? `w=${widthQ}` : '',
    (heightQ && !processOnlyWidth) ? ((widthQ ? '&' : '') + `h=${heightQ}`) : '',
    restParamsQ ? '&' + restParamsQ : ''
  ].join('');

  return processQueryString ?
      processQueryString({ query, widthQ, heightQ, restParamsQ, processOnlyWidth, devicePixelRatio, service }) :
      query;
};

const processParamsExceptSizeRelated = params => {
  const { w, h, width, height, ...restParams } = params;

  return [restParams, w || width, h || height];
};
