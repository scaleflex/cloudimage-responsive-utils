import { generateURL } from '../utils/generate-url';
import { getBreakpoint } from '../utils/get-breakpoint';
import { getHeight } from '../utils/get-height';
import { getImgSRC } from '../utils/get-img-src';
import { getPreviewSRC } from '../utils/get-preview-src';
import { getRatio } from '../utils/get-ratio';
import { getWidth } from '../utils/get-width';
import { getSizeLimit } from '../utils/get-size-limit';
import { isLowQualityPreview } from '../utils/is-low-quality-preview';
import { isCrop } from '../utils/is-crop';
import { processParams } from '../utils/process-params';
import { DEVICE_PIXEL_RATIO_LIST } from '../constants';


export const processReactNode = (props, imgNode, isUpdate, windowScreenBecomesBigger, lowQualityPreview = true) => {
  const imgProps = getProps(props);
  const { imgNodeSRC, params, sizes, adaptive } = imgProps;
  const { config } = props;
  const { baseURL, presets, minLowQualityWidth, devicePixelRatioList } = config;

  if (!imgNodeSRC) return;

  const [src, svg] = getImgSRC(imgNodeSRC, baseURL);
  let previewCloudimgURL, size;

  if (adaptive) {
    size = getBreakpoint(sizes, presets);
  } else {
    if (isUpdate && !windowScreenBecomesBigger) return;
  }

  const containerProps = determineContainerProps({ imgNode, config, size, ...imgProps });
  const { width } = containerProps;
  const preview = lowQualityPreview && isLowQualityPreview(adaptive, width, svg, minLowQualityWidth);
  const generateURLbyDPR = devicePixelRatio =>
    !adaptive && svg ?
      src :
      generateURL({ src, params, config, containerProps, devicePixelRatio });
  const cloudimgURL = generateURLbyDPR();
  const cloudimgSRCSET = devicePixelRatioList.map(dpr => ({ dpr: dpr.toString(), url: generateURLbyDPR(dpr) }));

  if (preview) {
    previewCloudimgURL = getPreviewSRC({ src, params, config, containerProps });
  }

  return {
    cloudimgURL,
    previewCloudimgURL,
    cloudimgSRCSET,
    processed: true,
    preview,
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

const determineContainerProps = props => {
  const { imgNode, config = {}, imgNodeWidth, imgNodeHeight, imgNodeRatio, params, size } = props;
  const { ignoreNodeImgSize } = config;
  let ratio = null;
  const crop = isCrop(params.func || config.params.func);
  const { exactSize, limitFactor } = config;
  let [width, isLimit] = getWidth({
    imgNode, config, exactSize, imgNodeWidth, params: { ...config.params, ...params }, size
  });
  let height = getHeight({
    imgNode,
    config,
    exactSize,
    imgNodeHeight,
    imgNodeWidth,
    imgNodeRatio,
    params: { ...config.params, ...params },
    size,
    width
  });
  ratio = getRatio({ imgNodeRatio, width, height, size, config, imgNodeWidth, imgNodeHeight });

  const sizes = DEVICE_PIXEL_RATIO_LIST.map(dpr => {
    let widthWithDPR, heightWithDRP;

    widthWithDPR = width && (width * dpr);

    widthWithDPR = crop ?
      widthWithDPR
      :
      isLimit ?
        getSizeLimit(widthWithDPR, exactSize, limitFactor)
        :
        widthWithDPR;

    heightWithDRP = height && (height * dpr);

    if (!heightWithDRP && widthWithDPR && ratio) {
      heightWithDRP = Math.floor(widthWithDPR / ratio);
    }

    if (!widthWithDPR && heightWithDRP && ratio) {
      widthWithDPR = Math.floor(heightWithDRP * ratio);
    }

    return { width: widthWithDPR, height: heightWithDRP, ratio };
  });


  return { sizes, ratio, width, height };
};