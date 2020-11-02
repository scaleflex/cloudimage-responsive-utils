export const getParamsFromURL = (url) => {
  const queryIndex = url.indexOf('?');

  if (queryIndex === -1) return;

  return processParams(url.slice(queryIndex + 1));
};


const processParams = (params) => {
  let resultParams = undefined;

  try {
    let temp = params.replace(/(\w+:)|(\w+ :)/g, function (matchedStr) {
      return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
    });

    resultParams = JSON.parse(temp);
  } catch (e) { }

  if (!resultParams) {
    try {
      resultParams = JSON.parse('{"' + decodeURI(params.replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}');
    } catch (e) { }
  }
  return resultParams;
};