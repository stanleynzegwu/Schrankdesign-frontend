import Config from "../../../config"
import ProductCard from "../../common/productCard"
import useDimensionStore from "../../zustand/dimensionStore"
export default function Extras() {
  const extra = useDimensionStore.use.extra()
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {extra.value.led && (
        <ProductCard
          imageUrl="/images/furnishing/led_lighting.png"
          title="LED-Beleuchtung"
          type={Config.furnishing.type.ledLighting}
          description={`Installation critieria:\nW 15-120 cm | D 30-120cm`}
        />
      )}
      {extra.value.divide && (
        <ProductCard
          imageUrl="/images/furnishing/divider_page.png"
          title="Trennseite"
          type={Config.furnishing.type.divider}
          description={`Installation critieria:\nW 15-120 cm | D 30-120cm`}
        />
      )}
    </div>
  )
}
