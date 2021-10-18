import { generateURL } from '../utils/generate-url';
import { getBreakpoint } from '../utils/get-breakpoint';
import { getImgSRC } from '../utils/get-img-src';
import { getPreviewSRC } from '../utils/get-preview-src';
import { isLowQualityPreview } from '../utils/is-low-quality-preview';
import { processParams } from '../utils/process-params';
import { determineContainerProps } from '../utils/determine-container-props';
import { isServer } from './is-server';


export const processReactNode = (props, imgNode, isUpdate, windowScreenBecomesBigger, lowQualityPreview = true) => {
  const imgProps = getProps(props);
  const { imgNodeSRC, params, sizes, adaptive } = imgProps;
  const { config = {} } = props;
  const { baseURL, presets, minLowQualityWidth, devicePixelRatioList, params: configParams = {} } = config;

  if (!imgNodeSRC) return;

  let [src, svg] = getImgSRC(imgNodeSRC, baseURL);
  let previewCloudimgURL, size;
  
  if (adaptive) {
    size = getBreakpoint(sizes, presets);
    if(size){
      if(size.params.src){
        [src, svg] = getImgSRC(size.params.src, baseURL);
      }
    }
  } else {
    if (isUpdate && !windowScreenBecomesBigger) return;
  }

  const containerProps = determineContainerProps({ imgNode, config, size, ...imgProps });
  const { width } = containerProps;
  const preview = !isServer() ?
    lowQualityPreview && isLowQualityPreview(adaptive, width, svg, minLowQualityWidth) : null;
  const generateURLbyDPR = devicePixelRatio =>
    !adaptive && svg ?
      src :
      generateURL({ src, params, config, containerProps, devicePixelRatio });
  const cloudimgURL = !isServer() ?
    generateURLbyDPR(Number((window.devicePixelRatio).toFixed(1))) : null;
  const cloudimgSRCSET = !isServer() ?
    devicePixelRatioList.map(dpr => ({ dpr: dpr.toString(), url: generateURLbyDPR(dpr) })) : null;
  const operation = params.func || configParams.func;

  if (preview) {
    previewCloudimgURL = getPreviewSRC({ src, params, config, containerProps });
  }

  return {
    imgProps,
    cloudimgURL,
    previewCloudimgURL,
    cloudimgSRCSET,
    processed: true,
    preview,
    operation,
    ...containerProps
  };
};

const getProps = ({ src, width, height, ratio, params, sizes }) => ({
  imgNodeSRC: src || '',
  imgNodeWidth: width || null,
  imgNodeHeight: height || null,
  imgNodeRatio: ratio,
  params: processParams(params),
  sizes: sizes,
  adaptive: !!sizes
});

