import {
  generateURL,
  getBreakpoint,
  getHeight,
  getImgSRC,
  getPreviewSRC,
  getRatio,
  getWidth,
  isLowQualityPreview,
  processParams
} from './';


export const processReactNode = (props, imgNode, isUpdate, windowScreenBecomesBigger) => {
  const imgProps = getProps(props);
  const { imgNodeSRC, params, sizes, adaptive } = imgProps;
  const { config } = props;
  const { baseURL, presets } = config;

  if (!imgNodeSRC) return;

  const [src, svg] = getImgSRC(imgNodeSRC, baseURL);
  let previewCloudimgURL, size;

  if (adaptive) {
    size = getBreakpoint(sizes, presets);
  } else {
    if (isUpdate && !windowScreenBecomesBigger) return;
  }

  const containerProps = determineContainerProps({ imgNode, config, size, ...imgProps });
  const { width, height } = containerProps;
  const preview = isLowQualityPreview(adaptive, width, svg);
  const cloudimgURL = !adaptive && svg ? src : generateURL({ src, params, config, width, height });

  if (preview) {
    previewCloudimgURL = getPreviewSRC({ src, params, config, ...containerProps });
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
  const { imgNode, config, imgNodeWidth, imgNodeHeight, imgNodeRatio, params, size } = props;
  const { exactSize } = config;
  let width = getWidth({ imgNode, exactSize, imgNodeWidth, params, size });
  let height = getHeight({ imgNode, config, exactSize, imgNodeHeight, params, size });
  let ratio = getRatio({ imgNodeRatio, width, height, size });

  if (!height && width && ratio) {
    height = Math.floor(width / ratio);
  }

  if (!width && height && ratio) {
    width = Math.floor(height * ratio);
  }

  return { width, height, ratio };
};