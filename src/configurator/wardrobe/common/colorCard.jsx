// import { useCallback } from "react";
// import InfoIcon from "../../../assets/icons/info_icon.svg";
// import useColorStore from "../zustand/colorStore";
// import Config from "../../config";
// import { GetSingleTexture } from "../../../Functions-configurator/Function-configurator";

// export default function ColorCard(props) {
//   const { imageUrl, type, category, textureId, bodyInfo, name } = props;
//   const setBodyType = useColorStore.use.setBodyType();
//   const setFrontType = useColorStore.use.setFrontType();
//   const setBodyInfo = useColorStore.use.setBodyInfo();
//   const setBodyTexture = useColorStore.use.setBodyTexture();
//   const setFrontTexture = useColorStore.use.setFrontTexture();
//   const setFrontInfo = useColorStore.use.setFrontInfo();

//   const handleClick = useCallback(async () => {
//     const { data, error } = await GetSingleTexture(textureId);
//     if (data) {
//       const texture = data.data[0];
//       if (category === Config.color.category.body) {
//         setBodyInfo(bodyInfo);
//         setBodyType(type);
//         setBodyTexture({
//           map: texture.map?.file,
//           normalMap: texture.normalMap?.file,
//           aoMap: texture.aoMap?.file,
//           metalnessMap: texture.metalnessMap?.file,
//           roughnessMap: texture.roughnessMap?.file,
//           property: {
//             aoMapIntensity: texture.displacementScale ? texture.displacementScale?.value : 1.65,
//             normalScale: texture.normalScale
//               ? [texture.normalScale?.value?.x, texture.normalScale?.value?.x]
//               : [0.45, 0.45],
//             ior: texture.ior ? texture.ior?.value : 1.46,
//             roughness: texture.roughness ? texture.roughness?.value : 1.35,
//             metalness: texture.metalness ? texture.metalness?.value : 0.005,
//             reflectivity: texture.reflectivity ? texture.reflectivity?.value : 0.005,
//             specularIntensity: texture.transparent ? texture.transparent?.value : 0.25,
//             envMapIntensity: texture.clearcoatRoughness ? texture.clearcoatRoughness?.value : 0.5,
//             clearcoat: texture.clearcoat ? texture.clearcoat?.value : 0.5,
//             emissiveIntensity: texture.emissiveIntensity ? texture.emissiveIntensity?.value : 0.5,
//           },
//         });
//       } else if (category === Config.color.category.front) {
//         // console.log(bodyInfo)
//         setFrontInfo(bodyInfo);
//         setFrontType(type);
//         setFrontTexture({
//           map: texture.map?.file,
//           normalMap: texture.normalMap?.file,
//           aoMap: texture.aoMap?.file,
//           metalnessMap: texture.metalnessMap?.file,
//           roughnessMap: texture.roughnessMap?.file,
//           property: {
//             aoMapIntensity: texture.displacementScale ? texture.displacementScale?.value : 1.65,
//             normalScale: texture.normalScale
//               ? [texture.normalScale?.value?.x, texture.normalScale?.value?.x]
//               : [0.45, 0.45],
//             ior: texture.ior ? texture.ior?.value : 1.46,
//             roughness: texture.roughness ? texture.roughness?.value : 1.35,
//             metalness: texture.metalness ? texture.metalness?.value : 0.005,
//             reflectivity: texture.reflectivity ? texture.reflectivity?.value : 0.005,
//             specularIntensity: texture.transparent ? texture.transparent?.value : 0.25,
//             envMapIntensity: texture.clearcoatRoughness ? texture.clearcoatRoughness?.value : 0.5,
//             clearcoat: texture.clearcoat ? texture.clearcoat?.value : 0.5,
//             emissiveIntensity: texture.emissiveIntensity ? texture.emissiveIntensity?.value : 0.5,
//           },
//         });
//       }
//     }
//   }, [type, category, textureId, bodyInfo]);

//   return (
//     <div
//       className="w-[100px]  cursor-pointer max-h-36 relative m-auto"
//       onClick={() => {
//         handleClick();
//       }}
//     >
//       <img
//         src={imageUrl}
//         draggable={false}
//         className="border border-black rounded-[12px] rounded-tr-none shadow-lg"
//       />
//       <div className="absolute right-0 top-0 cursor-target">
//         <img src={InfoIcon} />
//       </div>
//       <div className="flex justify-center items-center font-[karla] font-bold">{name}</div>
//     </div>
//   );
// }

import { useCallback } from "react";
import InfoIcon from "../../../assets/icons/info_icon.svg";
import useColorStore from "../zustand/colorStore";
import Config from "../../config";
import { GetSingleTexture } from "../../../Functions-configurator/Function-configurator";

export default function ColorCard(props) {
  const { imageUrl, type, category, textureId, bodyInfo, name, activeTexture, setActiveTexture } =
    props;
  const setBodyType = useColorStore.use.setBodyType();
  const setFrontType = useColorStore.use.setFrontType();
  const setBodyInfo = useColorStore.use.setBodyInfo();
  const setBodyTexture = useColorStore.use.setBodyTexture();
  const setFrontTexture = useColorStore.use.setFrontTexture();
  const setFrontInfo = useColorStore.use.setFrontInfo();

  const handleClick = useCallback(async () => {
    const { data, error } = await GetSingleTexture(textureId);
    if (data) {
      const texture = data.data[0];
      if (category === Config.color.category.body) {
        setBodyInfo(bodyInfo);
        setBodyType(type);
        setBodyTexture({
          map: texture.map?.file,
          normalMap: texture.normalMap?.file,
          aoMap: texture.aoMap?.file,
          metalnessMap: texture.metalnessMap?.file,
          roughnessMap: texture.roughnessMap?.file,
          property: {
            aoMapIntensity: texture.displacementScale ? texture.displacementScale?.value : 1.65,
            normalScale: texture.normalScale
              ? [texture.normalScale?.value?.x, texture.normalScale?.value?.x]
              : [0.45, 0.45],
            ior: texture.ior ? texture.ior?.value : 1.46,
            roughness: texture.roughness ? texture.roughness?.value : 1.35,
            metalness: texture.metalness ? texture.metalness?.value : 0.005,
            reflectivity: texture.reflectivity ? texture.reflectivity?.value : 0.005,
            specularIntensity: texture.transparent ? texture.transparent?.value : 0.25,
            envMapIntensity: texture.clearcoatRoughness ? texture.clearcoatRoughness?.value : 0.5,
            clearcoat: texture.clearcoat ? texture.clearcoat?.value : 0.5,
            emissiveIntensity: texture.emissiveIntensity ? texture.emissiveIntensity?.value : 0.5,
          },
        });
      } else if (category === Config.color.category.front) {
        // console.log(bodyInfo)
        setFrontInfo(bodyInfo);
        setFrontType(type);
        setFrontTexture({
          map: texture.map?.file,
          normalMap: texture.normalMap?.file,
          aoMap: texture.aoMap?.file,
          metalnessMap: texture.metalnessMap?.file,
          roughnessMap: texture.roughnessMap?.file,
          property: {
            aoMapIntensity: texture.displacementScale ? texture.displacementScale?.value : 1.65,
            normalScale: texture.normalScale
              ? [texture.normalScale?.value?.x, texture.normalScale?.value?.x]
              : [0.45, 0.45],
            ior: texture.ior ? texture.ior?.value : 1.46,
            roughness: texture.roughness ? texture.roughness?.value : 1.35,
            metalness: texture.metalness ? texture.metalness?.value : 0.005,
            reflectivity: texture.reflectivity ? texture.reflectivity?.value : 0.005,
            specularIntensity: texture.transparent ? texture.transparent?.value : 0.25,
            envMapIntensity: texture.clearcoatRoughness ? texture.clearcoatRoughness?.value : 0.5,
            clearcoat: texture.clearcoat ? texture.clearcoat?.value : 0.5,
            emissiveIntensity: texture.emissiveIntensity ? texture.emissiveIntensity?.value : 0.5,
          },
        });
      }
    }
  }, [type, category, textureId, bodyInfo]);

  return (
    <div
      className="w-[100px]  cursor-pointer max-h-36 relative m-auto"
      onClick={() => {
        handleClick();
        setActiveTexture(textureId);
      }}
    >
      <img
        src={imageUrl}
        draggable={false}
        className={`border-[1.5px] ${
          activeTexture === textureId ? "border-gray-500" : "border-black"
        }  rounded-[12px] rounded-tr-none shadow-lg`}
      />
      <div className="absolute right-0 top-0 cursor-target">
        <img src={InfoIcon} />
      </div>
      <div className="flex justify-center items-center font-[karla] font-bold">{name}</div>
    </div>
  );
}
