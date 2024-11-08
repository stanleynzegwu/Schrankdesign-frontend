/* eslint-disable react/no-unknown-property */
import React, { useMemo } from "react"
import Config from "../../../config"
import useColorStore from "../../zustand/colorStore"
import ColorMaterial from "./colorMaterial"
import WoodMaterial from "./woodMaterial"

const CustomMaterial = React.memo(function CustomMaterial({ category, type }) {
  const bodyType = useColorStore.use.bodyType()
  const frontType = useColorStore.use.frontType()
  const bodyTexture = useColorStore.use.bodyTexture()
  const frontTexture = useColorStore.use.frontTexture()

  const selectedType = useMemo(
    () => (category === Config.color.category.body ? bodyType : frontType),
    [category, bodyType, frontType]
  )
  const selectedMaterialName = useMemo(
    () =>
      category === Config.color.category.body ? bodyTexture : frontTexture,
    [category, bodyTexture, frontTexture]
  )
  return (
    <>
      {selectedType === Config.color.type.color && (
        <ColorMaterial mName={selectedMaterialName} type={type} />
      )}
      {selectedType === Config.color.type.venner && (
        <WoodMaterial mName={selectedMaterialName} type={type} />
      )}
      {selectedType === Config.color.type.wood && (
        <WoodMaterial mName={selectedMaterialName} type={type} />
      )}
      {selectedType === Config.color.type.special && (
        <WoodMaterial mName={selectedMaterialName} type={type} />
      )}
    </>
  )
})

export default CustomMaterial
