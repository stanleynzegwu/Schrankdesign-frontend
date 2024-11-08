import ProductCard from "../../common/productCard"
import Config from "../../../config"
import { useState } from "react"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
  Tab,
} from "@material-tailwind/react"
import useDimensionStore from "../../zustand/dimensionStore"
import { useEffect } from "react"
export default function Doors() {
  const door = useDimensionStore.use.door()
  const [tab_data, setTabData] = useState([])
  // const tab_data = [
  //   { label: "Drehtür", value: "revolving" },
  //   { label: "Spiegeltür", value: "mirror" },
  //   { label: "Schiebetür", value: "sliding" },
  //   { label: "Klappen", value: "flap" },
  // ]
  // const [activeTab, setActiveTab] = useState(
  //   door.revolving.active ? "revolving"
  //     : door.mirror.active ? "mirror"
  //       : door.sliding.active ? "sliding"
  //         : "flap"
  // )
  const [activeTab, setActiveTab] = useState()
  useEffect(() => {
    let temp = []
    if (door.revolving.active) {
      temp.push({ label: "Drehtür", value: "revolving" })
    }
    if (door.mirror.active) {
      temp.push({ label: "Spiegeltür", value: "mirror" })
    }
    if (door.sliding.active) {
      temp.push({ label: "Schiebetür", value: "sliding" })
    }
    if (door.flap.active) {
      temp.push({ label: "Klappen", value: "flap" })
    }
    setTabData(temp)
    setActiveTab(temp[0].value)
  }, [door])
  return (
    <>
      {activeTab && (
        <Tabs value={activeTab} className="py-2">
          <TabsHeader
            className="bg-[#BDBCBC] h-[35px] p-0 bg-opacity-100 rounded-[10px] border-[1px] border-black"
            indicatorProps={{
              className: "bg-[#36695C] h-[33px] rounded-[10px]",
            }}
          >
            {tab_data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                className="text-[#FFF] text-[16px]"
                onClick={() => setActiveTab(value)}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="mt-5">
            {door.revolving.active && (
              <TabPanel key="revolving" value="revolving" className="px-6 py-1">
                <div className="grid grid-cols-2 gap-4">
                  {door.revolving.value.left && (
                    <ProductCard
                      imageUrl="/images/furnishing/revolving_left.png"
                      type={Config.furnishing.type.door}
                      door_type={Config.door.type.revolving_left}
                      description={`Installation critieria:\nW 30-120 cm | H 30-260cm`}
                    />
                  )}
                  {door.revolving.value.right && (
                    <ProductCard
                      imageUrl="/images/furnishing/revolving_right.png"
                      type={Config.furnishing.type.door}
                      door_type={Config.door.type.revolving_right}
                      description={`Installation critieria:\nW 30-120 cm | H 30-260cm`}
                    />
                  )}
                  {door.revolving.value.double && (
                    <ProductCard
                      imageUrl="/images/furnishing/revolving_double.png"
                      type={Config.furnishing.type.door}
                      door_type={Config.door.type.revolving_double}
                      description={`Installation critieria:\nW 30-120 cm | D 30-260cm`}
                    />
                  )}
                </div>
              </TabPanel>
            )}
            {door.mirror.active && (
              <TabPanel key="mirror" value="mirror" className="px-6 py-1">
                <div className="grid grid-cols-2 gap-4">
                  {door.mirror.value.left && (
                    <ProductCard
                      imageUrl="/images/furnishing/mirror_left.png"
                      type={Config.furnishing.type.door}
                      door_type={Config.door.type.mirror_left}
                      description={`Installation critieria:\nW 30-120 cm | H 30-260cm`}
                    />
                  )}
                  {door.mirror.value.right && (
                    <ProductCard
                      imageUrl="/images/furnishing/mirror_right.png"
                      type={Config.furnishing.type.door}
                      door_type={Config.door.type.mirror_right}
                      description={`Installation critieria:\nW 30-120 cm | H 30-260cm`}
                    />
                  )}
                  {door.mirror.value.double && (
                    <ProductCard
                      imageUrl="/images/furnishing/mirror_double.png"
                      type={Config.furnishing.type.door}
                      door_type={Config.door.type.mirror_double}
                      description={`Installation critieria:\nW 30-120 cm | D 30-260cm`}
                    />
                  )}
                </div>
              </TabPanel>
            )}
            {door.sliding.active && (
              <TabPanel key="sliding" value="sliding" className="p-0">
                <div className="gap-y-3 flex flex-col items-center">
                  {door.sliding.value.sliding1 && (
                    <ProductCard
                      imageUrl="/images/furnishing/sliding_double.png"
                      type={Config.furnishing.type.door}
                      door_type={Config.door.type.sliding_double}
                      title="Schiebetür 2-Türen"
                      description={`Installation critieria:\nW 30-120 cm | H 30-260cm`}
                    />
                  )}
                  {door.sliding.value.sliding2 && (
                    <ProductCard
                      imageUrl="/images/furnishing/sliding_double.png"
                      type={Config.furnishing.type.door}
                      door_type={Config.door.type.sliding_triple}
                      title="Schiebetür 3-Türen"
                      description={`Installation critieria:\nW 30-120 cm | H 30-260cm`}
                    />
                  )}
                </div>
              </TabPanel>
            )}
            {door.flap.active && (
              <TabPanel key="flap" value="flap" className="px-6 py-1">
                <div className="grid grid-cols-2 gap-4">
                  {door.flap.value.down && (
                    <ProductCard
                      imageUrl="/images/furnishing/klapptur_unten.png"
                      type={Config.furnishing.type.flap}
                      flap_type={Config.door.type.flap_down}
                      description={`Installation critieria:\nW 26-75 cm | H 20-45cm`}
                    />
                  )}
                  {door.flap.value.up && (
                    <ProductCard
                      imageUrl="/images/furnishing/klapptur_oben.png"
                      type={Config.furnishing.type.flap}
                      flap_type={Config.door.type.flap_up}
                      description={`Installation critieria:\nW 26-75 cm | H 20-45cm`}
                    />
                  )}
                </div>
              </TabPanel>
            )}
          </TabsBody>
        </Tabs>
      )}
    </>
  )
}
