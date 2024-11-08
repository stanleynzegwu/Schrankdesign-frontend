import ProductCard from "../../common/productCard"
import Config from "../../../config"
import useDimensionStore from "../../zustand/dimensionStore"
export default function Brackets() {
  const clothesRail = useDimensionStore.use.clothesRail()

  return (
    <div className="grid grid-cols-2 gap-4 mt-3">
      {clothesRail.value.stange && (
        <ProductCard
          imageUrl="/images/furnishing/clothes-rail.png"
          title="Kleiderstange"
          type={Config.furnishing.type.clothesRail}
          description={`Installation critieria:\nW 15-120 cm | D 40-120cm`}
        />
      )}
      {/* <ProductCard
        imageUrl="images/furnishing/Kleiderstange_ausziehbar.png"
        title = "Extendable Clothes Rail"
        description={`Installation critieria:\nW 30-120 cm | D 35-120cm`}
      /> */}
      {clothesRail.value.lift && (
        <ProductCard
          imageUrl="/images/furnishing/Moving Clothes rail.png"
          title="Kleiderlift"
          type={Config.furnishing.type.clothesLift}
          description={`Installation critieria:\nW 50-115 cm | D 40-120cm`}
        />
      )}
      {/* <ProductCard
        imageUrl="images/furnishing/trouser pullout.png"
        title="Pants Full Extension"
        description={`Installation critieria:\nW 61-120 cm | D 52-120cm`}
      /> */}
      {clothesRail.value.auszug && (
        <ProductCard
          imageUrl="/images/furnishing/Cross trousers pullout.png"
          title="Hosen-Auszug"
          type={Config.furnishing.type.pantsPullout}
          description={`Installation critieria:\nW 37-120 cm | D 48-120cm`}
        />
      )}
      {/* <ProductCard
        imageUrl="images/furnishing/Ties pullout.png"
        title="Ties and Belt Pullout"
        description={`Installation critieria:\nW 15-120 cm | D 40-120cm`}
      />
      <ProductCard
        imageUrl="images/furnishing/Schuhgitter.png"
        title="Shoe Grid"
        description={`Installation critieria:\nW 50-120 cm | D 35-120cm`}
      /> */}
    </div>
  )
}
