import { isCrop } from './is-crop'
import { getWidth } from './get-width'
import { getHeight } from './get-height'
import { getRatio } from './get-ratio'
import { DEVICE_PIXEL_RATIO_LIST } from '../constants'
import { getSizeLimit } from './get-size-limit'


export const determineContainerProps = props => {
  const { imgNode, config = {}, imgNodeWidth, imgNodeHeight, imgNodeRatio, params, size } = props;
  const { exactSize, limitFactor, params: configParams = {} } = config;
  let ratio = null;
  const crop = isCrop(params.func || configParams.func);
  let [width, isLimit] = getWidth({
    imgNode, config, exactSize, imgNodeWidth, params: { ...configParams, ...params }, size
  });
  let height = getHeight({
    imgNode,
    config,
    exactSize,
    imgNodeHeight,
    imgNodeWidth,
    imgNodeRatio,
    params: { ...configParams, ...params },
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
