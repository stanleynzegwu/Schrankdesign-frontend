import ProductCard from "../../common/productCard"
import Config from "../../../config"
import useDimensionStore from "../../zustand/dimensionStore"
export default function Floors() {
  const shelf = useDimensionStore.use.shelf()
  return (
    <div>
      <div className="text-[#000] font-[16px] px-[26px] mb-5">
        Hier können Sie verschiedenen Böden
        in das Möbel ziehen und dabei je nach
        Bedarf unterschiedliche stärken wählen.
      </div>
      <div className="grid grid-cols-2 gap-4">
        {shelf.value.shelf && (
          <ProductCard
            imageUrl="/images/furnishing/Inlay shelf.png"
            title="Einlegeboden"
            type={Config.furnishing.type.shelf}
            // description={`Installation critieria:\nW 15-120 cm | D 30-120cm`}
          />
        )}
        {shelf.value.fold && (
          <ProductCard
            imageUrl="/images/furnishing/Inlay shelf.png"
            title="Fester Boden"
            type={Config.furnishing.type.foldBottom}
            // description={`Installation critieria:\nW 15-120 cm | D 30-120cm`}
          />
        )}
        {shelf.value.glass && (
          <ProductCard
            imageUrl="/images/furnishing/Glas shelf.png"
            title="Glasboden"
            type={Config.furnishing.type.glassBottom}
            // description={`Installation critieria:\nW 15-120 cm | D 30-120cm`}
          />
        )}
        {shelf.value.shoe && (
          <ProductCard
            imageUrl="/images/furnishing/Shelf for shoes.png"
            title="Schuh Boden"
            type={Config.furnishing.type.slopingFloor}
            // description={`Installation critieria:\nW 30-120 cm | D 52-70cm`}
          />
        )}
      </div>
    </div>
  )
}
