import { useState, useEffect } from "react";
import Config from "../../../config";
import ColorCard from "../../common/colorCard";
import useDimensionStore from "../../zustand/dimensionStore";
import { GetallPlates, GetTexture } from "../../../../Functions-configurator/Function-configurator";
import { Tabs, TabsHeader, TabsBody, TabPanel, Tab } from "@material-tailwind/react";

const baseUrl = import.meta.env.VITE_BACKEND_URL_img;

export default function BodyColors() {
  const bodyColor = useDimensionStore.use.bodyColor();
  const textureActive = useDimensionStore.use.textureActive();
  const [tab_data, setTabData] = useState([]);
  const [textureList, setTextureList] = useState([]);
  const [farbenList, setFarbenList] = useState([]);
  const [holzList, setHolzList] = useState([]);
  const [holzdekor, setHolzdekor] = useState([]);
  const [furnierList, setFurnierList] = useState([]);

  const getTexture = async () => {
    const { data } = await GetTexture();
    if (!data) return;
    if (textureActive.length < 1) return setTextureList(data.data);
    const filteredTextureList = data.data.filter((texture, index) => textureActive[index]);
    setTextureList(filteredTextureList);
  };

  const GetPlates = async () => {
    const { data } = await GetallPlates();
    if (!data) return;
    const farben = data.data.filter(
      (item, index) => item.plate_sort === "Farben" && textureActive[index]
    );
    const holz = data.data.filter(
      (item, index) => item.plate_sort === "Holz" && textureActive[index]
    );
    const holzdek = data.data.filter(
      (item, index) => item.plate_sort === "Holzdekor" && textureActive[index]
    );
    const furnier = data.data.filter(
      (item, index) => item.plate_sort === "Furnier" && textureActive[index]
    );
    setHolzdekor(holzdek);
    setHolzList(holz);
    setFarbenList(farben);
    setFurnierList(furnier);
  };

  useEffect(() => {
    let temp = [];
    if (bodyColor.value.color) temp.push({ label: "Farben", value: "color" });
    if (bodyColor.value.wood) temp.push({ label: "Holz", value: "woodDecor" });
    if (bodyColor.value.venner) temp.push({ label: "Holzdekor", value: "wood" });
    if (bodyColor.value.solid) temp.push({ label: "Furnier", value: "special" });
    setTabData(temp);
  }, [bodyColor]);

  useEffect(() => {
    GetPlates();
    getTexture();
  }, [textureActive]);

  const [activeTab, setActiveTab] = useState(
    bodyColor.value.color
      ? "color"
      : bodyColor.value.wood
      ? "woodDecor"
      : bodyColor.value.venner
      ? "wood"
      : "special"
  );

  return (
    <Tabs value={activeTab} className="py-4">
      <TabsHeader
        className="bg-[#BDBCBC] h-[35px] p-0 mx-3 bg-opacity-100 rounded-[10px] border-[1px] border-black"
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
        {bodyColor.value.color && (
          <TabPanel key="color" value="color" className="py-1 px-0">
            {farbenList.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {farbenList.map((item, index) => (
                  <ColorCard
                    key={index}
                    name={item.name}
                    imageUrl={baseUrl + item.images[0]}
                    hoverImage={baseUrl + item.thumbnail}
                    type={Config.color.type.color}
                    textureId={item.texture_id}
                    textureType={Config.color.color.type0}
                    category={Config.color.category.body}
                    bodyInfo={{
                      name: item.name,
                      thickness: item.plate_thickness,
                      surface: item.surface_structure,
                      coating: item.coating,
                      thumbnail: baseUrl + item.images[0],
                      description: item.description,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div>There is no data</div>
            )}
          </TabPanel>
        )}
        {bodyColor.value.venner && (
          <TabPanel key="woodDecor" value="woodDecor" className="py-1 px-0">
            {holzList.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {holzList.map((item, index) => (
                  <ColorCard
                    key={index}
                    name={item.name}
                    imageUrl={baseUrl + item.images[0]}
                    hoverImage={baseUrl + item.thumbnail}
                    type={Config.color.type.venner}
                    textureId={item.texture_id}
                    category={Config.color.category.body}
                    bodyInfo={{
                      name: item.name,
                      thickness: item.plate_thickness,
                      surface: item.surface_structure,
                      coating: item.coating,
                      thumbnail: baseUrl + item.images[0],
                      description: item.description,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div>There is no data</div>
            )}
          </TabPanel>
        )}
        {bodyColor.value.wood && (
          <TabPanel key="wood" value="wood" className="py-1 px-0">
            {holzdekor.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {holzdekor.map((item, index) => (
                  <ColorCard
                    key={index}
                    name={item.name}
                    imageUrl={baseUrl + item.images[0]}
                    hoverImage={baseUrl + item.thumbnail}
                    type={Config.color.type.wood}
                    textureId={item.texture_id}
                    category={Config.color.category.body}
                    bodyInfo={{
                      name: item.name,
                      thickness: item.plate_thickness,
                      surface: item.surface_structure,
                      coating: item.coating,
                      thumbnail: baseUrl + item.images[0],
                      description: item.description,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div>There is no data</div>
            )}
          </TabPanel>
        )}
        {bodyColor.value.solid && (
          <TabPanel key="special" value="special" className="py-1 px-0">
            {furnierList.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {furnierList.map((item, index) => (
                  <ColorCard
                    key={index}
                    name={item.name}
                    imageUrl={baseUrl + item.images[0]}
                    hoverImage={baseUrl + item.thumbnail}
                    type={Config.color.type.special}
                    textureType={Config.color.special.type0}
                    textureId={item.texture_id}
                    category={Config.color.category.body}
                    bodyInfo={{
                      name: item.name,
                      thickness: item.plate_thickness,
                      surface: item.surface_structure,
                      coating: item.coating,
                      thumbnail: baseUrl + item.images[0],
                      description: item.description,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div>There is no data</div>
            )}
          </TabPanel>
        )}
      </TabsBody>
    </Tabs>
  );
}
