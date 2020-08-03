export const processParams = (params) => {
  let resultParams = {};

  if (typeof params === 'object') {
    return params;
  }

  try {
    resultParams = JSON.parse('{"' + decodeURI(params.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
  } catch (e) {}

  if (!resultParams) {
    resultParams = params;
  }

  return resultParams;
};