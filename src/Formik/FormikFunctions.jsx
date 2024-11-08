import * as Yup from "yup";
import useDimensionStore from "../configurator/wardrobe/zustand/dimensionStore";
// plates functions
export const platesvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value) => value.trim())
    .min(3, "Too Short")
    .required("required* "),
  plate_cost: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  price_increase: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  supplier_id: Yup.string()
    .transform((value) => value.trim())
    .required("required* "),
  plate_length: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  plate_width: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  plate_thickness: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  BackP_Id_match: Yup.string()
    .transform((value) => value.trim())
    .required("required* "),
  plate_sort: Yup.string()
    .transform((value) => value.trim())
    .required("required* "),
  detailPictureOder: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  material_order: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  surface_structure: Yup.string()
    .transform((value) => value.trim())
    .required("Required*"),
  weight: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  coating: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  description: Yup.string()
    .transform((value) => value.trim())
    .required("Required*"),
  texture_id: Yup.string()
    .transform((value) => value.trim())
    .required("Required*"),
});

export const EdgevalidationSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value) => value.trim())
    .min(3, "Too Short")
    .required("required* "),
  edge_cost: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  price_aufschlag: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  supplier_id: Yup.string()
    .transform((value) => value.trim())
    .required("required* "),
  plate_Id_match: Yup.string()
    .transform((value) => value.trim())
    .required("required* "),
  edge_width: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  edge_thickness: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
});

export const DrawervalidationSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value) => value.trim())
    .min(3, "Too Short")
    .required("required* "),
  supplier_id: Yup.string()
    .transform((value) => value.trim())
    .required("required* "),
  price_einkauf: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  price_aufschlag: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  con_asset_time_pcs: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  pack_asset_time_pcs: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  // length: Yup.string()
  //   .transform((value) => value.trim())
  //   .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
  //   .required("Required*"),
  weight: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  plateMaterialId: Yup.string()
    .transform((value) => value.trim())
    .required("Required*"),
  description: Yup.string()
    .transform((value) => value.trim())
    .required("Required*"),
});

export const HandlevalidationSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value) => value.trim())
    .min(3, "Too Short")
    .required("required* "),
  supplier_id: Yup.string()
    .transform((value) => value.trim())
    .required("required* "),
  price_einkauf: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  price_aufschlag: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  con_asset_time_pcs: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  pack_asset_time_pcs: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  length: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  weight: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  description: Yup.string()
    .transform((value) => value.trim())
    .required("Required*"),
  priority: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  material: Yup.string()
    .transform((value) => value.trim())
    .required("Required*"),
});

export const FeetvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value) => value.trim())
    .min(3, "Too Short")
    .required("required* "),
  supplier_id: Yup.string()
    .transform((value) => value.trim())
    .required("required* "),
  price_einkauf: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  price_aufschlag: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  con_asset_time_pcs: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  length: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  weight: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  pack_asset_time_pcs: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  priority: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  material: Yup.string()
    .transform((value) => value.trim())
    .required("Required*"),
  description: Yup.string()
    .transform((value) => value.trim())
    .required("Required*"),
});

export const fittingvalidationSchema = Yup.object().shape({
  name: Yup.string()
    .transform((value) => value.trim())
    .min(3, "Too Short")
    .required("required* "),
  supplier_id: Yup.string()
    .transform((value) => value.trim())
    .required("required* "),
  price_einkauf: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  price_aufschlag: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  con_asset_time_pcs: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  pack_asset_time_pcs: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  weight: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
});

export const TexturevalidationSchema = Yup.object().shape({
  name: Yup.string()
  .transform((value) => value.trim())
  .min(3, "Too Short")
  .required("required* "),
  roughness: Yup.number()
    .transform((value) => (value === "" ? undefined : parseFloat(value)))
    .typeError("Must be a number")
    .min(0, "Must be at least 0")
    .max(1, "Must be at most 1")
    .required("Required*"),
  metalness: Yup.number()
    .transform((value) => (value === "" ? undefined : parseFloat(value)))
    .typeError("Must be a number")
    .min(0, "Must be at least 0")
    .max(1, "Must be at most 1")
    .required("Required*"),
  normalScaleX: Yup.number()
    .transform((value) => (value === "" ? undefined : parseFloat(value)))
    .typeError("Must be a number")
    .min(0, "Must be at least 0")
    .max(1, "Must be at most 1")
    .required("Required*"),
  normalScaleY: Yup.number()
    .transform((value) => (value === "" ? undefined : parseFloat(value)))
    .typeError("Must be a number")
    .min(0, "Must be at least 0")
    .max(1, "Must be at most 1")
    .required("Required*"),
  displacementScale: Yup.number()
  .transform((value) => (value === "" ? undefined : parseFloat(value)))
    .typeError("Must be a number")
    .min(0, "Must be at least 0")
    .max(1, "Must be at most 1")
    .required("Required*"),
  clearcoatRoughness: Yup.number()
    .transform((value) => (value === "" ? undefined : parseFloat(value)))
    .typeError("Must be a number")
    .min(0, "Must be at least 0")
    .max(1, "Must be at most 1")
    .required("Required*"),
  reflectivity: Yup.number()
    .transform((value) => (value === "" ? undefined : parseFloat(value)))
    .typeError("Must be a number")
    .min(0, "Must be at least 0")
    .max(1, "Must be at most 1")
    .required("Required*"),
  transparent: Yup.number()
    .transform((value) => (value === "" ? undefined : parseFloat(value)))
    .typeError("Must be a number")
    .min(0, "Must be at least 0")
    .max(1, "Must be at most 1")
    .required("Required*"),
  ior: Yup.number()
    .transform((value) => (value === "" ? undefined : parseFloat(value)))
    .typeError("Must be a number")
    .min(0, "Must be at least 0")
    .max(2.333, "Must be at most 2.333")
    .required("Required*"),
  emissiveIntensity: Yup.number()
    .transform((value) => (value === "" ? undefined : parseFloat(value)))
    .typeError("Must be a number")
    .min(0, "Must be at least 0")
    .max(2.333, "Must be at most 1")
    .required("Required*"),
  // opacity: Yup.number()
  //   .transform((value) => (value === "" ? undefined : parseFloat(value)))
  //   .typeError("Must be a number")
  //   .min(0, "Must be at least 0")
  //   .max(2.333, "Must be at most 1")
  //   .required("Required*"),
  clearcoat: Yup.number()
    .transform((value) => (value === "" ? undefined : parseFloat(value)))
    .typeError("Must be a number")
    .min(0, "Must be at least 0")
    .max(2.333, "Must be at most 1")
    .required("Required*"),
});

export const ConfigSetvalidationSchema = Yup.object().shape({
  minWidth: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  maxWidth: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  minHeight: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  maxHeight: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  minDepth: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
  maxDepth: Yup.string()
    .transform((value) => value.trim())
    .matches(/^\d*\.?\d+$/, "Must be a number or a decimal")
    .required("Required*"),
});
