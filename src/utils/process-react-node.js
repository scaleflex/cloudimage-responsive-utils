import {
  generateURL,
  getBreakpoint,
  getHeight,
  getImgSRC,
  getPreviewSRC,
  getRatio,
  getWidth,
  getSizeLimit,
  isLowQualityPreview,
  isCrop,
  processParams
} from '../';


export const processReactNode = (props, imgNode, isUpdate, windowScreenBecomesBigger, lowQualityPreview = true) => {
  const imgProps = getProps(props);
  const { imgNodeSRC, params, sizes, adaptive } = imgProps;
  const { config } = props;
  const { baseURL, presets, minLowQualityWidth } = config;

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
  const cloudimgURL = !adaptive && svg ? src : generateURL({ src, params, config, containerProps });

  if (preview) {
    previewCloudimgURL = getPreviewSRC({ src, params, config, containerProps });
  }

  return {
    cloudimgURL,
    previewCloudimgURL,
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
  const { imgNode, config = {}, imageNodeWidth, imageNodeHeight, imageNodeRatio, params, size } = props;
  const { ignoreNodeImgSize } = config;
  let ratio = null;
  const crop = isCrop(params.func || config.params.func);
  const { exactSize, limitFactor } = config;
  let [width, isLimit] = getWidth({
    imgNode, config, exactSize, imageNodeWidth, params: { ...config.params, ...params }, size
  });
  let height = getHeight({
    imgNode,
    config,
    exactSize,
    imageNodeHeight,
    imageNodeWidth,
    imageNodeRatio,
    params: { ...config.params, ...params },
    size,
    width
  });
  ratio = getRatio({ imageNodeRatio, width, height, size, config, imageNodeWidth, imageNodeHeight });

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