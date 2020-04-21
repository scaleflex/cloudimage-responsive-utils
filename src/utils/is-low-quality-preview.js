export const isLowQualityPreview = (adaptive, width, svg, minLowQualityWidth) =>
  adaptive ?
    width > minLowQualityWidth
    :
    width > minLowQualityWidth && !svg;