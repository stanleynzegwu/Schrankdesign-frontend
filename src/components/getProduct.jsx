import { GetConfiguratorData } from "@src/api/api";
import useColorStore from "../configurator/wardrobe/zustand/colorStore";
import useDimensionStore from "../configurator/wardrobe/zustand/dimensionStore";
import useFurnishingStore from "../configurator/wardrobe/zustand/furnishingStore";

export async function GetProduct(configId) {
  const setHandActive = useDimensionStore.use.setHandActive();
  const setFeetActive = useDimensionStore.use.setFeetActive();
  const setTextureActive = useDimensionStore.use.setTextureActive();
  const initDimentionActive = useDimensionStore.use.initDimentionActive();
  const initDimentionMain = useDimensionStore.use.initDimentionMain();
  const initFurnishing = useFurnishingStore.use.initFurnishing();
  const initColor = useColorStore.use.initColor();

  const { configuratorData: data } = await GetConfiguratorData(configId);
  const { handActive, feetActive, textureActive, configSet, configuratorData } = data;

  if (!configuratorData) return;

  if (handActive.length) setHandActive(handActive);
  if (feetActive.length) setFeetActive(feetActive);
  if (textureActive.length) setTextureActive(textureActive);
  if (configSet.length) initDimentionActive(configSet);

  const {
    maxHeight,
    originalBaseType,
    selectionInfo,
    totalSpace,
    ledAssets,
    platesInfo,
    furnishingAssets,
    doorAssets,
    griffAssets,
    width,
    height,
    manual,
    elementsWidths,
    elementsCount,
    baseType,
    enableFittingPanel,
    fittingType,
    korpusForm,
    korpusType,
    korpusMaterial,
    handle,
    handleIndex,
    handleListIndex,
    handleDirection,
    pushOpen,
    feet,
    feetIndex,
    feetListIndex,
    withOutFeet,
    withFeet,
    hanging,
    hangingSize,
    minLength,
    minHeight,
    bodyType,
    bodyTexture,
    bodyInfo,
    frontType,
    frontTexture,
    frontInfo,
  } = configuratorData;

  initFurnishing({
    maxHeight,
    originalBaseType,
    selectionInfo,
    totalSpace,
    ledAssets,
    platesInfo,
    furnishingAssets,
    doorAssets,
    griffAssets,
  });

  initDimentionMain({
    width,
    height,
    manual,
    elementsWidths,
    elementsCount,
    baseType,
    enableFittingPanel,
    fittingType,
    korpusForm,
    korpusType,
    korpusMaterial,
    handle,
    handleIndex,
    handleListIndex,
    handleDirection,
    pushOpen,
    feet,
    feetIndex,
    feetListIndex,
    withOutFeet,
    withFeet,
    hanging,
    hangingSize,
    minLength,
    minHeight,
  });

  initColor({
    bodyType,
    bodyTexture,
    bodyInfo,
    frontType,
    frontTexture,
    frontInfo,
  });
  return;
}
