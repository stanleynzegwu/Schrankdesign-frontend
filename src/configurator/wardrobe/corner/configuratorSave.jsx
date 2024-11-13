// import { Button } from "@material-tailwind/react";
// import configuratorSaveIcon from "../../../assets/icons/configuratorSvae.png";
// import useFurnishingStore from "../zustand/furnishingStore";
// import React, { useCallback, useMemo } from "react";
// import { SaveConfigurator } from "../../../api/api";
// import { toast } from "react-hot-toast";
// import useDimensionStore from "../zustand/dimensionStore";
// import useColorStore from "../zustand/colorStore";

// const ConfiguratorSave = React.memo(function ConfiguratorSave({ slug }) {
//   const maxHeight = useFurnishingStore.use.maxHeight();
//   const originalBaseType = useFurnishingStore.use.originalBaseType();
//   const selectionInfo = useFurnishingStore.use.selectionInfo();
//   const totalSpace = useFurnishingStore.use.totalSpace();
//   const ledAssets = useFurnishingStore.use.ledAssets();
//   const platesInfo = useFurnishingStore.use.platesInfo();
//   const furnishingAssets = useFurnishingStore.use.furnishingAssets();
//   const doorAssets = useFurnishingStore.use.doorAssets();
//   const griffAssets = useFurnishingStore.use.griffAssets();

//   const width = useDimensionStore.use.width();
//   const height = useDimensionStore.use.height();
//   const manual = useDimensionStore.use.manual();
//   const elementsWidths = useDimensionStore.use.elementsWidths();
//   const elementsCount = useDimensionStore.use.elementsCount();
//   const baseType = useDimensionStore.use.baseType();
//   const enableFittingPanel = useDimensionStore.use.enableFittingPanel();
//   const fittingType = useDimensionStore.use.fittingType();
//   const isCornerView = useDimensionStore.use.isCornerView();
//   const korpusForm = useDimensionStore.use.korpusForm();
//   const korpusType = useDimensionStore.use.korpusType();
//   const korpusMaterial = useDimensionStore.use.korpusMaterial();
//   const handle = useDimensionStore.use.handle();
//   const handleIndex = useDimensionStore.use.handleIndex();
//   const handleListIndex = useDimensionStore.use.handleListIndex();
//   const handleDirection = useDimensionStore.use.handleDirection();
//   const pushOpen = useDimensionStore.use.pushOpen();
//   const feet = useDimensionStore.use.feet();
//   const feetIndex = useDimensionStore.use.feetIndex();
//   const feetListIndex = useDimensionStore.use.feetListIndex();
//   const withOutFeet = useDimensionStore.use.withOutFeet();
//   const withFeet = useDimensionStore.use.withFeet();
//   const hanging = useDimensionStore.use.hanging();
//   const hangingSize = useDimensionStore.use.hangingSize();
//   const minLength = useDimensionStore.use.minLength();
//   const minHeight = useDimensionStore.use.minHeight();

//   const bodyTexture = useColorStore.use.bodyTexture();
//   const bodyType = useColorStore.use.bodyType();
//   const bodyInfo = useColorStore.use.bodyInfo()
//   const frontType = useColorStore.use.frontType();
//   const frontTexture = useColorStore.use.frontTexture();
//   const frontInfo = useColorStore.use.frontInfo();

//   const storedUser = localStorage.getItem("schrankdesign-app-user");
//   const auth = JSON.parse(storedUser);
//   const _id = slug;

//   const saveFun = useCallback(async () => {
//     const configuratorData = {
//       maxHeight,
//       originalBaseType,
//       selectionInfo,
//       totalSpace,
//       ledAssets,
//       platesInfo,
//       furnishingAssets,
//       doorAssets,
//       griffAssets,
//       width,
//       height,
//       manual,
//       elementsWidths,
//       elementsCount,
//       baseType,
//       enableFittingPanel,
//       fittingType,
//       isCornerView,
//       korpusForm,
//       korpusType,
//       korpusMaterial,
//       handle,
//       handleIndex,
//       handleListIndex,
//       handleDirection,
//       pushOpen,
//       feet,
//       feetIndex,
//       feetListIndex,
//       withOutFeet,
//       withFeet,
//       hanging,
//       hangingSize,
//       minLength,
//       minHeight,
//       bodyType,
//       bodyTexture,
//       bodyInfo,
//       frontType,
//       frontTexture,
//       frontInfo
//     };

//     // ! we need to clean what is not needed
//     // loop over all spaces, get xIndex as unique then remove all furnishingAssets that not match

//     // console.log(configuratorData)

//     const { status } = await SaveConfigurator(_id, configuratorData);
//     if (status.status) {
//       toast.success("Save Successfully!");
//     } else {
//       toast.error("Save failure!");
//     }
//   }, [
//     maxHeight,
//     originalBaseType,
//     selectionInfo,
//     totalSpace,
//     ledAssets,
//     platesInfo,
//     furnishingAssets,
//     doorAssets,
//     griffAssets,
//     width,
//     height,
//     manual,
//     elementsWidths,
//     elementsCount,
//     baseType,
//     enableFittingPanel,
//     fittingType,
//     isCornerView,
//     korpusForm,
//     korpusType,
//     korpusMaterial,
//     handle,
//     handleIndex,
//     handleListIndex,
//     handleDirection,
//     pushOpen,
//     feet,
//     feetIndex,
//     feetListIndex,
//     withOutFeet,
//     withFeet,
//     hanging,
//     hangingSize,
//     minLength,
//     minHeight,
//     bodyType,
//     bodyTexture,
//     bodyInfo,
//     frontType,
//     frontTexture,
//     frontInfo
//   ]);

//   return (
//     <div className="absolute left-[623px] top-[20px] ">
//       {(import.meta.env.MODE === 'development' || auth?.role == 1) && (
//         <Button
//           className=" bg-[#ffffff] border border-black text-[#000000] normal-case text-[14px] flex items-center gap-2 rounded-[2px] pl-[10px] pr-[6px] h-[39px]"
//           onClick={() => {
//             saveFun();
//           }}
//         >
//           <img src={configuratorSaveIcon}></img>
//           Konfigurator speichern
//         </Button>
//       )}
//     </div>
//   );
// });

// export default ConfiguratorSave;

import { Button } from "@material-tailwind/react";
import configuratorSaveIcon from "../../../assets/icons/configuratorSvae.png";
import useFurnishingStore from "../zustand/furnishingStore";
import React, { useCallback, useMemo } from "react";
import { SaveConfigurator } from "../../../api/api";
import { toast } from "react-hot-toast";
import useDimensionStore from "../zustand/dimensionStore";
import useColorStore from "../zustand/colorStore";

const ConfiguratorSave = React.memo(function ConfiguratorSave({ slug }) {
  const maxHeight = useFurnishingStore.use.maxHeight();
  const originalBaseType = useFurnishingStore.use.originalBaseType();
  const selectionInfo = useFurnishingStore.use.selectionInfo();
  const totalSpace = useFurnishingStore.use.totalSpace();
  const ledAssets = useFurnishingStore.use.ledAssets();
  const platesInfo = useFurnishingStore.use.platesInfo();
  const furnishingAssets = useFurnishingStore.use.furnishingAssets();
  const doorAssets = useFurnishingStore.use.doorAssets();
  const griffAssets = useFurnishingStore.use.griffAssets();

  const width = useDimensionStore.use.width();
  const height = useDimensionStore.use.height();
  const depth = useDimensionStore.use.depth();
  const manual = useDimensionStore.use.manual();
  const elementsWidths = useDimensionStore.use.elementsWidths();
  const elementsCount = useDimensionStore.use.elementsCount();
  const baseType = useDimensionStore.use.baseType();
  const enableFittingPanel = useDimensionStore.use.enableFittingPanel();
  const fittingType = useDimensionStore.use.fittingType();
  const isCornerView = useDimensionStore.use.isCornerView();
  const korpusForm = useDimensionStore.use.korpusForm();
  const korpusType = useDimensionStore.use.korpusType();
  const korpusMaterial = useDimensionStore.use.korpusMaterial();
  const handle = useDimensionStore.use.handle();
  const handleIndex = useDimensionStore.use.handleIndex();
  const handleListIndex = useDimensionStore.use.handleListIndex();
  const handleDirection = useDimensionStore.use.handleDirection();
  const pushOpen = useDimensionStore.use.pushOpen();
  const feet = useDimensionStore.use.feet();
  const feetIndex = useDimensionStore.use.feetIndex();
  const feetListIndex = useDimensionStore.use.feetListIndex();
  const withOutFeet = useDimensionStore.use.withOutFeet();
  const withFeet = useDimensionStore.use.withFeet();
  const hanging = useDimensionStore.use.hanging();
  const hangingSize = useDimensionStore.use.hangingSize();
  const minLength = useDimensionStore.use.minLength();
  const minHeight = useDimensionStore.use.minHeight();

  const bodyTexture = useColorStore.use.bodyTexture();
  const bodyType = useColorStore.use.bodyType();
  const bodyInfo = useColorStore.use.bodyInfo();
  const frontType = useColorStore.use.frontType();
  const frontTexture = useColorStore.use.frontTexture();
  const frontInfo = useColorStore.use.frontInfo();

  const storedUser = localStorage.getItem("schrankdesign-app-user");
  const auth = JSON.parse(storedUser);
  const _id = slug;

  const saveFun = useCallback(async () => {
    //Get the selected feet else return null when there is no selected feet
    // const selectedFeet = withFeet ? feet[feetIndex] : null;
    // const selectedHandle = pushOpen ? null : handle[handleIndex];

    const configuratorData = {
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
      depth,
      manual,
      elementsWidths,
      elementsCount,
      baseType,
      enableFittingPanel,
      fittingType,
      isCornerView,
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
    };

    // ! we need to clean what is not needed
    // loop over all spaces, get xIndex as unique then remove all furnishingAssets that not match

    // console.log(configuratorData);
    // return;
    const { status } = await SaveConfigurator(_id, configuratorData);
    if (status.status) {
      toast.success("Save Successfully!");
    } else {
      toast.error("Save failure!");
    }
  }, [
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
    isCornerView,
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
  ]);

  return (
    <div className="absolute left-[623px] top-[20px] ">
      {(import.meta.env.MODE === "development" || auth?.role == 1) && (
        <Button
          className=" bg-[#ffffff] border border-black text-[#000000] normal-case text-[14px] flex items-center gap-2 rounded-[2px] pl-[10px] pr-[6px] h-[39px]"
          onClick={() => {
            saveFun();
          }}
        >
          <img src={configuratorSaveIcon}></img>
          Konfigurator speichern
        </Button>
      )}
    </div>
  );
});

export default ConfiguratorSave;
