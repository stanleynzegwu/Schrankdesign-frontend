import {
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react"
import Dimensions from "./dimensions"
import Furnishing from "./furnishing"
import Extra from "./extra"
import { useState } from "react"

export default function Sidebar() {
  const tab_data = [
    {
      label: "Maße",
      value: "dimensions",
    },
    {
      label: "Ausstattung",
      value: "furnishing",
    },
    {
      label: "Farben",
      value: "extra",
    },
  ]

  const [activeTab, setActiveTab] = useState(tab_data[0].value)

  return (
    <div className="w-[402px] h-full border-[1px] border-[#d9d9d9] border-l-0 border-b-0 flex-none bg-[#F5F5F5]">
      <Tabs value={activeTab}>
        <TabsHeader
          className="bg-[#E5E5E5] h-[49px] bg-opacity-100 rounded-none"
          indicatorProps={{
            className: "bg-[#456779] border rounded-md border-[#00000030]",
          }}
        >
          {tab_data.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              className={
                activeTab === value
                  ? "text-[#FFF] font-bold"
                  : "text-[#456779] font-bold"
              }
              onClick={() => setActiveTab(value)}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tab_data.map(({ value }) => (
            <TabPanel key={value} value={value} className="p-0">
              {value === "dimensions" ? (
                <Dimensions activeTab={activeTab} />
              ) : value === "furnishing" ? (
                <Furnishing />
              ) : (
                <Extra />
              )}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  )
}
