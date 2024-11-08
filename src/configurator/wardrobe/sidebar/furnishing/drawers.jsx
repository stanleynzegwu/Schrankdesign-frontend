import ProductCard from "../../common/productCard"
import Config from "../../../config"
import { useEffect, useState } from "react"
import {
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
  Tab,
} from "@material-tailwind/react"
import useDimensionStore from "../../zustand/dimensionStore"

export default function Drawers() {
  const drawer = useDimensionStore.use.drawer()

  const [tab_data, setTabData] = useState([])

  const [activeTab, setActiveTab] = useState()
  useEffect(() => {
    let temp = []
    if (drawer.drawer.active) {
      temp.push({ label: "Schublade", value: "outer" })
    }
    if (drawer.innerDrawer.active) {
      temp.push({ label: "Innenschublade", value: "inner" })
    }
    setTabData(temp)
    setActiveTab(temp[0].value)
  }, [])
  return (
    <>
      {activeTab && (
        <Tabs value={activeTab} className="py-2">
          <TabsHeader
            className="bg-[#BDBCBC] h-[35px] p-0 mx-10 bg-opacity-100 rounded-[10px] border-[1px] border-black"
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
            {drawer.drawer.active && (
              <TabPanel key="outer" value="outer" className="p-0">
                <div className="grid grid-cols-2 gap-4">
                  {drawer.drawer.value.drawer1 && (
                    <ProductCard
                      imageUrl="/images/furnishing/Drawer.png"
                      title="Schublade Klein"
                      type={Config.furnishing.type.drawer}
                      drawerHeight={Config.furnishing.drawer.defaultHeight[0]}
                      drawerType={Config.furnishing.drawer.type.drawer8}
                      description={`Installation critieria:\nW 30-120 cm | D 30-120cm`}
                    />
                  )}
                  {drawer.drawer.value.drawer2 && (
                    <ProductCard
                      imageUrl="/images/furnishing/Drawer.png"
                      title="Schublade Mittel"
                      type={Config.furnishing.type.drawer}
                      drawerHeight={Config.furnishing.drawer.defaultHeight[1]}
                      drawerType={Config.furnishing.drawer.type.drawer16}
                      description={`Installation critieria:\nW 30-120 cm | D 30-120cm`}
                    />
                  )}
                  {drawer.drawer.value.drawer3 && (
                    <ProductCard
                      imageUrl="/images/furnishing/Drawer.png"
                      title="Schublade Groß"
                      type={Config.furnishing.type.drawer}
                      drawerHeight={Config.furnishing.drawer.defaultHeight[2]}
                      drawerType={Config.furnishing.drawer.type.drawer24}
                      description={`Installation critieria:\nW 30-120 cm | D 30-120cm`}
                    />
                  )}
                  {drawer.drawer.value.customDrawer && (
                    <ProductCard
                      imageUrl="/images/furnishing/Drawer.png"
                      title="Maß-Schublade"
                      type={Config.furnishing.type.drawer}
                      drawerHeight={Config.furnishing.drawer.defaultHeight[3]}
                      drawerType={Config.furnishing.drawer.type.customDrawer}
                      description={`Installation critieria:\nW 30-120 cm | D 30-120cm`}
                    />
                  )}
                </div>
              </TabPanel>
            )}
            {drawer.innerDrawer.active && (
              <TabPanel key="inner" value="inner" className="p-0">
                <div className="grid grid-cols-2 gap-4">
                  {drawer.innerDrawer.value.drawer1 && (
                    <ProductCard
                      imageUrl="/images/furnishing/inner_drawer.png"
                      title="Schublade Klein"
                      type={Config.furnishing.type.internalDrawer}
                      drawerHeight={Config.furnishing.drawer.defaultHeight[0]}
                      drawerType={Config.furnishing.drawer.type.drawer8}
                      description={`Installation critieria:\nW 30-120 cm | D 42-120cm`}
                    />
                  )}
                  {drawer.innerDrawer.value.drawer2 && (
                    <ProductCard
                      imageUrl="/images/furnishing/inner_drawer.png"
                      title="Schublade Mittel"
                      type={Config.furnishing.type.internalDrawer}
                      drawerHeight={Config.furnishing.drawer.defaultHeight[1]}
                      drawerType={Config.furnishing.drawer.type.drawer16}
                      description={`Installation critieria:\nW 30-120 cm | D 42-120cm`}
                    />
                  )}
                  {drawer.innerDrawer.value.drawer3 && (
                    <ProductCard
                      imageUrl="/images/furnishing/inner_drawer.png"
                      title="Schublade Groß"
                      type={Config.furnishing.type.internalDrawer}
                      drawerHeight={Config.furnishing.drawer.defaultHeight[2]}
                      drawerType={Config.furnishing.drawer.type.drawer24}
                      description={`Installation critieria:\nW 30-120 cm | D 42-120cm`}
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
