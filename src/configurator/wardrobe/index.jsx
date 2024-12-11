// import R3F from "./r3f";
// import * as THREE from "three";
// import Sidebar from "./sidebar";
// import Door from "./corner/door";
// import { useCallback } from "react";
// import Advisor from "./corner/advisor";
// import Settings from "./corner/settings";
// import { Canvas } from "@react-three/fiber";
// import ViewOption from "./corner/viewOption";
// import useDndStore from "./zustand/dndStore";
// import { useParams } from "react-router-dom";
// import TextureOption from "./corner/textureOption";
// import ConfiguratorID from "./corner/configuratorID";
// import { GetProduct } from "../../components/getProduct";
// import ConfiguratorSave from "./corner/configuratorSave";

// export default function Wardrobe() {
//   const setProductDragging = useDndStore.use.setProductDragging();
//   const pathname = useParams();
//   const slug = pathname.slug ?? "SIDEBOARD";
//   const configId = pathname.configId ?? "P0006";

//   GetProduct(configId);

//   const onDragOver = useCallback((e) => e.preventDefault(), []);
//   const onDrop = useCallback((e) => e.preventDefault(), []);

//   const onDragEnd = useCallback((e) => {
//     e.preventDefault();
//     setProductDragging(false);
//   }, []);

//   return (
//     <div className="flex flex-col h-screen bg-Sv3n-grey" onDragEnd={onDragEnd}>
//       <div className="flex-1 flex relative canvas-height">
//         <Sidebar />

//         <Canvas
//           onDragOver={onDragOver}
//           onDrop={onDrop}
//           shadows={true}
//           gl={{
//             antialias: true,
//             toneMapping: THREE.ACESFilmicToneMapping,
//             toneMappingExposure: 1.45,
//             preserveDrawingBuffer: true,
//           }}
//         >
//           <R3F />
//         </Canvas>

//         <Advisor />
//         <ConfiguratorSave slug={configId} />
//         <ConfiguratorID configId={configId} slug={slug} />
//         <Settings slug={configId} />
//         <Door />
//         <ViewOption />
//         <TextureOption />
//       </div>
//     </div>
//   );
// }

// import { useCallback, useEffect } from "react";
// import * as THREE from "three";

// import Header from "../../Layouts/AppLayout/Header";
// import LayoutFooter from "../../Layouts/AppLayout/Footer";
// import Sidebar from "./sidebar";
// import { Canvas } from "@react-three/fiber";
// import R3F from "./r3f";
// // import Corner from "./corner"
// import Footer from "./footer";
// import ConfiguratorSave from "./corner/configuratorSave";
// import ConfiguratorID from "./corner/configuratorID";
// import Settings from "./corner/settings";
// import Door from "./corner/door";
// import Advisor from "./corner/advisor";
// import ViewOption from "./corner/viewOption";
// import RatingReview from "./corner/ratingReview";

// import useDndStore from "./zustand/dndStore";
// import { CalcInfo } from "../../api/api";
// import useCalcStore from "./zustand/calcStore";

// import { useParams } from "react-router-dom";
// import ConfigComponent from "./config/index";
// import useFurnishingStore from "./zustand/furnishingStore";
// import useDimensionStore from "./zustand/dimensionStore";
// import useColorStore from "./zustand/colorStore";
// import { GetConfiguratorData } from "../../api/api";
// // import toast from "react-hot-toast"
// import Config from "../config";
// import { GetallDrawer } from "../../Functions-configurator/Function-configurator";
// import TextureOption from "./corner/textureOption";
// const baseUrl = import.meta.env.VITE_BACKEND_URL_img;
// export default function Wardrobe() {
//   const setProductDragging = useDndStore.use.setProductDragging();
//   const setCalcInfo = useCalcStore.use.setCalcInfo();

//   const pathname = useParams();
//   const slug = pathname?.slug;
//   const configId = pathname?.configId;
//   const setMaxHeight = useFurnishingStore.use.setMaxHeight();
//   const setOriginalBaseType = useFurnishingStore.use.setOriginalBaseType();
//   const setSelectionInfo = useFurnishingStore.use.setSelectionInfo();
//   const setTotalSpace = useFurnishingStore.use.setTotalSpace();
//   const setLedAssets = useFurnishingStore.use.setLedAssets();
//   const  = useFurnishingStore.use.setPlatesInfo();
//   const setFurnishingAssets = useFurnishingStore.use.setFurnishingAssets();
//   const setDoorAssets = useFurnishingStore.use.setDoorAssets();
//   const setGriffAssets = useFurnishingStore.use.setGriffAssets();

//   const setWidth = useDimensionStore.use.setWidth();
//   const setHeight = useDimensionStore.use.setHeight();
//   const setDepth = useDimensionStore.use.setDepth();
//   const setManual = useDimensionStore.use.setManual();
//   const setElementsWidths = useDimensionStore.use.setElementsWidths();
//   const setElementsCount = useDimensionStore.use.setElementsCount();
//   const setBaseType = useDimensionStore.use.setBaseType();
//   const setEnableFittingPanel = useDimensionStore.use.setEnableFittingPanel();
//   const setFittingType = useDimensionStore.use.setFittingType();
//   const setKorpusForm = useDimensionStore.use.setKorpusForm();
//   const setKorpusType = useDimensionStore.use.setKorpusType();
//   const setKorpusMaterial = useDimensionStore.use.setKorpusMaterial();
//   const setHandle = useDimensionStore.use.setHandle();
//   const setHandleIndex = useDimensionStore.use.setHandleIndex();
//   const setHandleListIndex = useDimensionStore.use.setHandleListIndex();
//   const setHandleDirection = useDimensionStore.use.setHandleDirection();
//   const setPushOpen = useDimensionStore.use.setPushOpen();
//   const setFeet = useDimensionStore.use.setFeet();
//   const setFeetIndex = useDimensionStore.use.setFeetIndex();
//   const setFeetListIndex = useDimensionStore.use.setFeetListIndex();
//   const setWithOutFeet = useDimensionStore.use.setWithOutFeet();
//   const setWithFeet = useDimensionStore.use.setWithFeet();
//   const setHanging = useDimensionStore.use.setHanging();
//   const setHangingSize = useDimensionStore.use.setHangingSize();
//   const setMinLength = useDimensionStore.use.setMinLength();
//   const setMinHeight = useDimensionStore.use.setMinHeight();

//   const setBaseCutout = useDimensionStore.use.setBaseCutout();
//   const setExternalPanel = useDimensionStore.use.setExternalPanel();
//   // const setKorpusFormA = useDimensionStore.use.setKorpusFormA()
//   const setBodyColor = useDimensionStore.use.setBodyColor();
//   const setFrontColor = useDimensionStore.use.setFrontColor();
//   const setIndividualColor = useDimensionStore.use.setIndividualColor();
//   const setShelf = useDimensionStore.use.setShelf();
//   const setDrawer = useDimensionStore.use.setDrawer();
//   const setClothesRail = useDimensionStore.use.setClothesRail();
//   const setGriffe = useDimensionStore.use.setGriffe();
//   const setDoor = useDimensionStore.use.setDoor();
//   const setExtra = useDimensionStore.use.setExtra();
//   const setFeets = useDimensionStore.use.setFeets();

//   const setHandActive = useDimensionStore.use.setHandActive();
//   const setFeetActive = useDimensionStore.use.setFeetActive();
//   const setTextureActive = useDimensionStore.use.setTextureActive();

//   const setBodyType = useColorStore.use.setBodyType();
//   const setBodyTexture = useColorStore.use.setBodyTexture();
//   const setBodyInfo = useColorStore.use.setBodyInfo();
//   const setFrontType = useColorStore.use.setFrontType();
//   const setFrontTexture = useColorStore.use.setFrontTexture();
//   const setFrontInfo = useColorStore.use.setFrontInfo();

//   const setDrawerInfo = useColorStore.use.setDrawerInfo();

//   const initDimentionActive = useDimensionStore.use.initDimentionActive();
//   const initDimentionMain = useDimensionStore.use.initDimentionMain();
//   const initFurnishing = useFurnishingStore.use.initFurnishing();
//   const initColor = useColorStore.use.initColor();
//   const GetConfiguratureFunc = async () => {
//     const { configuratorData } = await GetConfiguratorData(configId);
//     if (configuratorData?.handActive) {
//       setHandActive(configuratorData?.handActive);
//     }
//     if (configuratorData?.feetActive) {
//       setFeetActive(configuratorData.feetActive);
//     }
//     if (configuratorData?.textureActive) {
//       setTextureActive(configuratorData?.textureActive);
//     }
//     if (configuratorData?.configSet) {
//       initDimentionActive(configuratorData.configSet);
//     } else {
//       setBaseCutout(true);
//       setExternalPanel(true);
//       setKorpusForm({
//         active: true,
//         value: {
//           wardrobe: true,
//           outer: true,
//           top: true,
//           uShape: true,
//           inner: true,
//           fullInner: true,
//         },
//       });
//       setBodyColor({
//         active: true,
//         value: {
//           color: true,
//           wood: true,
//           venner: true,
//           solid: true,
//         },
//       });
//       setFrontColor({
//         active: true,
//         value: {
//           color: true,
//           wood: true,
//           venner: true,
//           solid: true,
//         },
//       });
//       setIndividualColor({
//         active: true,
//         value: {
//           color: true,
//           wood: true,
//           venner: true,
//           solid: true,
//         },
//       });
//       setShelf({
//         active: true,
//         value: {
//           shelf: true,
//           fold: true,
//           glass: true,
//           shoe: true,
//         },
//       });
//       setDrawer({
//         active: true,
//         drawer: {
//           active: true,
//           value: {
//             drawer1: true,
//             drawer2: true,
//             drawer3: true,
//             customDrawer: true,
//           },
//         },
//         innerDrawer: {
//           active: true,
//           value: {
//             drawer1: true,
//             drawer2: true,
//             drawer3: true,
//           },
//         },
//       });
//       setClothesRail({
//         active: true,
//         value: {
//           stange: true,
//           lift: true,
//           auszug: true,
//         },
//       });
//       setGriffe({
//         active: true,
//         value: {
//           push: true,
//           mit: true,
//         },
//       });
//       setDoor({
//         active: true,
//         revolving: {
//           active: true,
//           value: {
//             left: true,
//             right: true,
//             double: true,
//           },
//         },
//         mirror: {
//           active: true,
//           value: {
//             left: true,
//             right: true,
//             double: true,
//           },
//         },
//         sliding: {
//           active: true,
//           value: {
//             sliding1: true,
//             sliding2: true,
//           },
//         },
//         flap: {
//           active: true,
//           value: {
//             down: true,
//             up: true,
//           },
//         },
//       });
//       setExtra({
//         active: true,
//         value: {
//           led: true,
//           divide: true,
//         },
//       });
//       setFeets({
//         active: true,
//         value: {
//           withFeet: true,
//           hanging: true,
//           withOutFeet: true,
//         },
//       });
//     }
//     if (configuratorData?.configuratorData) {
//       const {
//         maxHeight,
//         originalBaseType,
//         selectionInfo,
//         totalSpace,
//         ledAssets,
//         platesInfo,
//         furnishingAssets,
//         doorAssets,
//         griffAssets,
//         width,
//         height,
//         depth,
//         manual,
//         elementsWidths,
//         elementsCount,
//         baseType,
//         enableFittingPanel,
//         fittingType,
//         korpusForm,
//         korpusType,
//         korpusMaterial,
//         handle,
//         handleIndex,
//         handleListIndex,
//         handleDirection,
//         pushOpen,
//         feet,
//         feetIndex,
//         feetListIndex,
//         withOutFeet,
//         withFeet,
//         hanging,
//         hangingSize,
//         minLength,
//         minHeight,
//         bodyType,
//         bodyTexture,
//         bodyInfo,
//         frontType,
//         frontTexture,
//         frontInfo,
//       } = configuratorData.configuratorData;

//       initFurnishing({
//         maxHeight,
//         originalBaseType,
//         selectionInfo,
//         totalSpace,
//         ledAssets,
//         platesInfo,
//         furnishingAssets,
//         doorAssets,
//         griffAssets,
//       });
//       initDimentionMain({
//         width,
//         height,
//         depth,
//         manual,
//         elementsWidths,
//         elementsCount,
//         baseType,
//         enableFittingPanel,
//         fittingType,
//         korpusForm,
//         korpusType,
//         korpusMaterial,
//         handle,
//         handleIndex,
//         handleListIndex,
//         handleDirection,
//         pushOpen,
//         feet,
//         feetIndex,
//         feetListIndex,
//         withOutFeet,
//         withFeet,
//         hanging,
//         hangingSize,
//         minLength,
//         minHeight,
//       });
//       initColor({
//         bodyType,
//         bodyTexture,
//         bodyInfo,
//         frontType,
//         frontTexture,
//         frontInfo,
//       });
//     } else {
//       setMaxHeight(Config.plate.minHeight);
//       setOriginalBaseType(Config.baseType.panel);
//       setSelectionInfo({});
//       setTotalSpace([]);
//       setLedAssets([]);
//       setPlatesInfo([]);
//       setFurnishingAssets([]);
//       setDoorAssets([]);
//       setGriffAssets([]);
//       setWidth(Config.plate.width);
//       setHeight(Config.plate.height);
//       setDepth(Config.plate.depth);
//       setManual(false);
//       setElementsWidths([]);
//       setElementsCount(0);
//       setBaseType(Config.baseType.panel);
//       setEnableFittingPanel(false);
//       setFittingType(Config.fittingType.all);
//       setKorpusForm(false);
//       setKorpusType(Config.korpusType.empty);
//       setKorpusMaterial(false);
//       setHandle([]);
//       setHandleIndex(0);
//       setHandleListIndex(-1);
//       setHandleDirection(Config.furnishing.default.handleDirection);
//       setPushOpen(true);
//       setFeet([]);
//       setFeetIndex(0);
//       setFeetListIndex(-1);
//       setWithOutFeet(false);
//       setWithFeet(false);
//       setHanging(false);
//       setHangingSize(0);
//       setMinLength(30);
//       setMinHeight(40);
//       setBodyInfo({
//         name: "Farb-Dekorplatte Back",
//         thickness: 19,
//         surface: "Matt",
//         coating: "Melaminbeschisjd",
//         thumbnail: "/images/configurator/textures/wood/wtype0.jpg",
//         description:
//           "Unsere zertifizierten Spanplatten sind 18 mm dick und somit besonders robust. So hängen deine Möbel auch nach jahrelanger Nutzung nicht durch. Die Kanten sind mit einem eleganten Kunststoff-Finish ummantelt, das für einen harmonischen, einfarbigen Look sorgt.",
//       });
//       setBodyTexture({
//         map: Config.color.wood.type0.map,
//         normalMap: Config.color.wood.type0.normalMap,
//         aoMap: Config.color.wood.type0.aoMap,
//         metalnessMap: Config.color.wood.type0.metalnessMap,
//         roughnessMap: Config.color.wood.type0.roughnessMap,
//         property: { ...Config.material["wtype0"] },
//         initial: true,
//       });
//       setBodyType(Config.color.type.wood);
//       setFrontInfo({
//         name: "Farb-Dekorplatte Back",
//         thickness: 19,
//         surface: "Matt",
//         coating: "Melaminbeschisjd",
//         thumbnail: "/images/configurator/textures/wood/wtype0.jpg",
//         description:
//           "Unsere zertifizierten Spanplatten sind 18 mm dick und somit besonders robust. So hängen deine Möbel auch nach jahrelanger Nutzung nicht durch. Die Kanten sind mit einem eleganten Kunststoff-Finish ummantelt, das für einen harmonischen, einfarbigen Look sorgt.",
//       });
//       setFrontTexture({
//         map: Config.color.wood.type0.map,
//         normalMap: Config.color.wood.type0.normalMap,
//         aoMap: Config.color.wood.type0.aoMap,
//         metalnessMap: Config.color.wood.type0.metalnessMap,
//         roughnessMap: Config.color.wood.type0.roughnessMap,
//         property: { ...Config.material["wtype0"] },
//         initial: true,
//       });
//       setFrontType(Config.color.type.wood);
//     }
//   };

//   useEffect(() => {
//     const getCalcInfo = async () => {
//       const { data } = await CalcInfo();
//       if (data) {
//         setCalcInfo(data?.data);
//       }
//       await GetConfiguratureFunc();
//     };
//     const getDrawer = async () => {
//       const { data, error } = await GetallDrawer("getDrawers");
//       if (data) {
//         const tempDrawerInfo = data.data[0];
//         setDrawerInfo({
//           name: tempDrawerInfo.name,
//           thickness: 16,
//           surface: "Matt",
//           coating: "Metaminbeschichtet",
//           weight: tempDrawerInfo.weight,
//           thumbnail: baseUrl + tempDrawerInfo.images[0],
//           description: tempDrawerInfo.description,
//         });
//       }
//       if (error) {
//         setDrawerInfo(Config.initialTexture.drawerInfo);
//       }
//     };
//     getCalcInfo();
//     getDrawer();
//   }, []);

//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   }, []);

//   const onDrop = useCallback((event) => {
//     event.preventDefault();
//   }, []);

//   const onDragEnd = useCallback((event) => {
//     event.preventDefault();
//     setProductDragging(false);
//   }, []);

//   return (
//     <div className="flex flex-col h-screen" onDragEnd={onDragEnd}>
//       <Header className={"z-100000000"} id="header" />
//       <div className="flex-1 flex relative canvas-height">
//         <Sidebar />

//         <Canvas
//           onDragOver={onDragOver}
//           onDrop={onDrop}
//           shadows={true}
//           gl={{
//             antialias: true,
//             // stencil: false,
//             // alpha: true,
//             // depth: false,
//             // toneMapping: THREE.ReinhardToneMapping,
//             toneMapping: THREE.ACESFilmicToneMapping,
//             toneMappingExposure: 1.45,
//             preserveDrawingBuffer: true,
//           }}
//         >
//           <R3F />
//         </Canvas>
//         <Advisor />
//         <ConfiguratorSave slug={configId} />
//         <ConfiguratorID configId={configId} slug={slug} />
//         <Settings slug={configId} />
//         <Door />
//         <RatingReview />
//         <ViewOption />
//         <TextureOption />
//       </div>
//       {/* <Corner /> */}
//       <Footer />

//       <ConfigComponent configId={configId} slug={slug} />
//       <LayoutFooter />
//     </div>
//   );
//}

import { useCallback, useEffect } from "react";
import * as THREE from "three";

import Header from "../../Layouts/AppLayout/Header";
import LayoutFooter from "../../Layouts/AppLayout/Footer";
import Sidebar from "./sidebar";
import { Canvas } from "@react-three/fiber";
import R3F from "./r3f";
// import Corner from "./corner"
import Footer from "./footer";
import ConfiguratorSave from "./corner/configuratorSave";
import ConfiguratorID from "./corner/configuratorID";
import Settings from "./corner/settings";
import Door from "./corner/door";
import Advisor from "./corner/advisor";
import ViewOption from "./corner/viewOption";
import RatingReview from "./corner/ratingReview";

import useDndStore from "./zustand/dndStore";
import { CalcInfo } from "../../api/api";
import useCalcStore from "./zustand/calcStore";

import { useParams } from "react-router-dom";
import ConfigComponent from "./config/index";
import useFurnishingStore from "./zustand/furnishingStore";
import useDimensionStore from "./zustand/dimensionStore";
import useColorStore from "./zustand/colorStore";
import { GetConfiguratorData } from "../../api/api";
// import toast from "react-hot-toast"
import Config from "../config";
import { GetallDrawer } from "../../Functions-configurator/Function-configurator";
import TextureOption from "./corner/textureOption";
import FrontPlateVisibilityToggle from "./corner/frontPlateVisibilityToggle";
const baseUrl = import.meta.env.VITE_BACKEND_URL_img;
export default function Wardrobe() {
  const setProductDragging = useDndStore.use.setProductDragging();
  const setCalcInfo = useCalcStore.use.setCalcInfo();

  const pathname = useParams();
  const slug = pathname?.slug;
  const configId = pathname?.configId;
  const setMaxHeight = useFurnishingStore.use.setMaxHeight();
  const setOriginalBaseType = useFurnishingStore.use.setOriginalBaseType();
  const setSelectionInfo = useFurnishingStore.use.setSelectionInfo();
  const setTotalSpace = useFurnishingStore.use.setTotalSpace();
  const setLedAssets = useFurnishingStore.use.setLedAssets();
  const setPlatesInfo = useFurnishingStore.use.setPlatesInfo();
  const setFurnishingAssets = useFurnishingStore.use.setFurnishingAssets();
  const setDoorAssets = useFurnishingStore.use.setDoorAssets();
  const setGriffAssets = useFurnishingStore.use.setGriffAssets();

  const setWidth = useDimensionStore.use.setWidth();
  const setHeight = useDimensionStore.use.setHeight();
  const setDepth = useDimensionStore.use.setDepth();
  const setManual = useDimensionStore.use.setManual();
  const setElementsWidths = useDimensionStore.use.setElementsWidths();
  const setElementsCount = useDimensionStore.use.setElementsCount();
  const setBaseType = useDimensionStore.use.setBaseType();
  const setEnableFittingPanel = useDimensionStore.use.setEnableFittingPanel();
  const setFittingType = useDimensionStore.use.setFittingType();
  const setKorpusForm = useDimensionStore.use.setKorpusForm();
  const setKorpusType = useDimensionStore.use.setKorpusType();
  const setKorpusMaterial = useDimensionStore.use.setKorpusMaterial();
  const setHandle = useDimensionStore.use.setHandle();
  const setHandleIndex = useDimensionStore.use.setHandleIndex();
  const setHandleListIndex = useDimensionStore.use.setHandleListIndex();
  const setHandleDirection = useDimensionStore.use.setHandleDirection();
  const setPushOpen = useDimensionStore.use.setPushOpen();
  const setFeet = useDimensionStore.use.setFeet();
  const setFeetIndex = useDimensionStore.use.setFeetIndex();
  const setFeetListIndex = useDimensionStore.use.setFeetListIndex();
  const setWithOutFeet = useDimensionStore.use.setWithOutFeet();
  const setWithFeet = useDimensionStore.use.setWithFeet();
  const setHanging = useDimensionStore.use.setHanging();
  const setHangingSize = useDimensionStore.use.setHangingSize();
  const setMinLength = useDimensionStore.use.setMinLength();
  const setMinHeight = useDimensionStore.use.setMinHeight();

  const setBaseCutout = useDimensionStore.use.setBaseCutout();
  const setExternalPanel = useDimensionStore.use.setExternalPanel();
  // const setKorpusFormA = useDimensionStore.use.setKorpusFormA()
  const setBodyColor = useDimensionStore.use.setBodyColor();
  const setFrontColor = useDimensionStore.use.setFrontColor();
  const setIndividualColor = useDimensionStore.use.setIndividualColor();
  const setShelf = useDimensionStore.use.setShelf();
  const setDrawer = useDimensionStore.use.setDrawer();
  const setClothesRail = useDimensionStore.use.setClothesRail();
  const setGriffe = useDimensionStore.use.setGriffe();
  const setDoor = useDimensionStore.use.setDoor();
  const setExtra = useDimensionStore.use.setExtra();
  const setFeets = useDimensionStore.use.setFeets();

  const setHandActive = useDimensionStore.use.setHandActive();
  const setFeetActive = useDimensionStore.use.setFeetActive();
  const setTextureActive = useDimensionStore.use.setTextureActive();

  const setBodyType = useColorStore.use.setBodyType();
  const setBodyTexture = useColorStore.use.setBodyTexture();
  const setBodyInfo = useColorStore.use.setBodyInfo();
  const setFrontType = useColorStore.use.setFrontType();
  const setFrontTexture = useColorStore.use.setFrontTexture();
  const setFrontInfo = useColorStore.use.setFrontInfo();

  const setDrawerInfo = useColorStore.use.setDrawerInfo();
  const initDimentionActive = useDimensionStore.use.initDimentionActive();
  const initDimentionMain = useDimensionStore.use.initDimentionMain();
  const initFurnishing = useFurnishingStore.use.initFurnishing();
  const initColor = useColorStore.use.initColor();
  const GetConfiguratureFunc = async () => {
    const { configuratorData } = await GetConfiguratorData(configId);
    if (configuratorData?.handActive) {
      setHandActive(configuratorData?.handActive);
    }
    if (configuratorData?.feetActive) {
      setFeetActive(configuratorData.feetActive);
    }
    if (configuratorData?.textureActive) {
      setTextureActive(configuratorData?.textureActive);
    }
    if (configuratorData?.configSet) {
      initDimentionActive(configuratorData.configSet);
    } else {
      setBaseCutout(true);
      setExternalPanel(true);
      setKorpusForm({
        active: true,
        value: {
          wardrobe: true,
          outer: true,
          top: true,
          uShape: true,
          inner: true,
          fullInner: true,
        },
      });
      setBodyColor({
        active: true,
        value: {
          color: true,
          wood: true,
          venner: true,
          solid: true,
        },
      });
      setFrontColor({
        active: true,
        value: {
          color: true,
          wood: true,
          venner: true,
          solid: true,
        },
      });
      setIndividualColor({
        active: true,
        value: {
          color: true,
          wood: true,
          venner: true,
          solid: true,
        },
      });
      setShelf({
        active: true,
        value: {
          shelf: true,
          fold: true,
          glass: true,
          shoe: true,
        },
      });
      setDrawer({
        active: true,
        drawer: {
          active: true,
          value: {
            drawer1: true,
            drawer2: true,
            drawer3: true,
            customDrawer: true,
          },
        },
        innerDrawer: {
          active: true,
          value: {
            drawer1: true,
            drawer2: true,
            drawer3: true,
          },
        },
      });
      setClothesRail({
        active: true,
        value: {
          stange: true,
          lift: true,
          auszug: true,
        },
      });
      setGriffe({
        active: true,
        value: {
          push: true,
          mit: true,
        },
      });
      setDoor({
        active: true,
        revolving: {
          active: true,
          value: {
            left: true,
            right: true,
            double: true,
          },
        },
        mirror: {
          active: true,
          value: {
            left: true,
            right: true,
            double: true,
          },
        },
        sliding: {
          active: true,
          value: {
            sliding1: true,
            sliding2: true,
          },
        },
        flap: {
          active: true,
          value: {
            down: true,
            up: true,
          },
        },
      });
      setExtra({
        active: true,
        value: {
          led: true,
          divide: true,
        },
      });
      setFeets({
        active: true,
        value: {
          withFeet: true,
          hanging: true,
          withOutFeet: true,
        },
      });
    }
    if (configuratorData?.configuratorData) {
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
        depth,
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
      } = configuratorData.configuratorData;

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
        depth,
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
    } else {
      setMaxHeight(Config.plate.minHeight);
      setOriginalBaseType(Config.baseType.panel);
      setSelectionInfo({});
      setTotalSpace([]);
      setLedAssets([]);
      setPlatesInfo([]);
      setFurnishingAssets([]);
      setDoorAssets([]);
      setGriffAssets([]);
      setWidth(Config.plate.width);
      setHeight(Config.plate.height);
      setDepth(Config.plate.depth);
      setManual(false);
      setElementsWidths([]);
      setElementsCount(0);
      setBaseType(Config.baseType.panel);
      setEnableFittingPanel(false);
      setFittingType(Config.fittingType.all);
      setKorpusForm(false);
      setKorpusType(Config.korpusType.empty);
      setKorpusMaterial(false);
      setHandle([]);
      setHandleIndex(0);
      setHandleListIndex(-1);
      setHandleDirection(Config.furnishing.default.handleDirection);
      setPushOpen(true);
      setFeet([]);
      setFeetIndex(0);
      setFeetListIndex(-1);
      setWithOutFeet(false);
      setWithFeet(false);
      setHanging(false);
      setHangingSize(0);
      setMinLength(30);
      setMinHeight(40);
      setBodyInfo({
        name: "Farb-Dekorplatte Back",
        thickness: 19,
        surface: "Matt",
        coating: "Melaminbeschisjd",
        thumbnail: "/images/configurator/textures/wood/wtype0.jpg",
        description:
          "Unsere zertifizierten Spanplatten sind 18 mm dick und somit besonders robust. So hängen deine Möbel auch nach jahrelanger Nutzung nicht durch. Die Kanten sind mit einem eleganten Kunststoff-Finish ummantelt, das für einen harmonischen, einfarbigen Look sorgt.",
      });
      setBodyTexture({
        map: Config.color.wood.type0.map,
        normalMap: Config.color.wood.type0.normalMap,
        aoMap: Config.color.wood.type0.aoMap,
        metalnessMap: Config.color.wood.type0.metalnessMap,
        roughnessMap: Config.color.wood.type0.roughnessMap,
        property: { ...Config.material["wtype0"] },
        initial: true,
      });
      setBodyType(Config.color.type.wood);
      setFrontInfo({
        name: "Farb-Dekorplatte Back",
        thickness: 19,
        surface: "Matt",
        coating: "Melaminbeschisjd",
        thumbnail: "/images/configurator/textures/wood/wtype0.jpg",
        description:
          "Unsere zertifizierten Spanplatten sind 18 mm dick und somit besonders robust. So hängen deine Möbel auch nach jahrelanger Nutzung nicht durch. Die Kanten sind mit einem eleganten Kunststoff-Finish ummantelt, das für einen harmonischen, einfarbigen Look sorgt.",
      });
      setFrontTexture({
        map: Config.color.wood.type0.map,
        normalMap: Config.color.wood.type0.normalMap,
        aoMap: Config.color.wood.type0.aoMap,
        metalnessMap: Config.color.wood.type0.metalnessMap,
        roughnessMap: Config.color.wood.type0.roughnessMap,
        property: { ...Config.material["wtype0"] },
        initial: true,
      });
      setFrontType(Config.color.type.wood);
    }
  };

  useEffect(() => {
    const getCalcInfo = async () => {
      const { data } = await CalcInfo();
      if (data) {
        setCalcInfo(data?.data);
      }
      await GetConfiguratureFunc();
    };
    const getDrawer = async () => {
      const { data, error } = await GetallDrawer("getDrawers");
      if (data) {
        const tempDrawerInfo = data.data[0];
        setDrawerInfo({
          name: tempDrawerInfo.name,
          thickness: 16,
          surface: "Matt",
          coating: "Metaminbeschichtet",
          weight: tempDrawerInfo.weight,
          thumbnail: baseUrl + tempDrawerInfo.images[0],
          description: tempDrawerInfo.description,
        });
      }
      if (error) {
        setDrawerInfo(Config.initialTexture.drawerInfo);
      }
    };
    getCalcInfo();
    getDrawer();
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onDragEnd = useCallback((event) => {
    event.preventDefault();
    setProductDragging(false);
  }, []);
  return (
    <div className="flex flex-col h-screen" onDragEnd={onDragEnd}>
      <Header className={"z-100000000"} id="header" />
      <div className="flex-1 flex relative canvas-height">
        <Sidebar />

        <Canvas
          onDragOver={onDragOver}
          onDrop={onDrop}
          shadows={true}
          gl={{
            antialias: true,
            // stencil: false,
            // alpha: true,
            // depth: false,
            // toneMapping: THREE.ReinhardToneMapping,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.45,
            preserveDrawingBuffer: true,
          }}
        >
          <R3F />
        </Canvas>
        <Advisor />
        <ConfiguratorSave slug={configId} />
        <ConfiguratorID configId={configId} slug={slug} />
        <Settings slug={configId} />
        <Door />
        <RatingReview />
        <ViewOption />
        <TextureOption />
        <FrontPlateVisibilityToggle />
      </div>
      {/* <Corner /> */}
      <Footer />

      <ConfigComponent configId={configId} slug={slug} />
      <LayoutFooter />
    </div>
  );
}
