import { useState, useEffect } from "react";
import GriffCard from "../../common/GriffCard";
import GriffTextureCard from "../../common/GriffTextureCard";
import Config from "../../../config";
import useDimensionStore from "../../zustand/dimensionStore";
import useFurnishingStore from "../../zustand/furnishingStore";
import default_with_feet_image from "../../../../assets/icons/default-with-feet.png";
import { GetallDrawer } from "../../../../Functions-configurator/Function-configurator";

import { Tabs, TabsHeader, TabsBody, TabPanel, Tab } from "@material-tailwind/react";

export default function Feet() {
  const [feetlist, setFeetlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [xIndex, setXIndex] = useState(-1);
  const [colorIndex, setColorIndex] = useState(-1);
  const setFeet = useDimensionStore.use.setFeet();
  const setWithOutFeet = useDimensionStore.use.setWithOutFeet();
  const setWithFeet = useDimensionStore.use.setWithFeet();
  const setHanging = useDimensionStore.use.setHanging();
  const setHangingSize = useDimensionStore.use.setHangingSize();
  const setFeetIndex = useDimensionStore.use.setFeetIndex();
  const setFeetListIndex = useDimensionStore.use.setFeetListIndex();

  const hanging = useDimensionStore.use.hanging();
  const withOutFeet = useDimensionStore.use.withOutFeet();
  const withFeet = useDimensionStore.use.withFeet();

  const doorAssets = useFurnishingStore.use.doorAssets();
  const updateDoor = useFurnishingStore.use.updateDoor();
  const [flag, setFlag] = useState("none");

  const feets = useDimensionStore.use.feets();
  const feetActive = useDimensionStore.use.feetActive();

  const updateDoors = () => {
    doorAssets.map((door, index) => {
      if (door.bottomAsset === "none" && door.isPlint === false) {
        const { xIndex, position, scale, topAsset, bottomAsset } = door;
        const payload = {
          xIndex: xIndex,
          posY: position[1],
          position: [position[0], position[1] - Config.plate.plinthHeight / 2, position[2]],
          scale: [
            scale[0],
            scale[1] + Config.plate.plinthHeight / 2 + Config.plate.thickness * 2,
            scale[2],
          ],
          topAsset: topAsset,
          bottomAsset: bottomAsset,
          isPlint: true,
        };
        updateDoor(payload);
      }
      if (door.bottomAsset === "none" && door.isPlint === true) {
        const { xIndex, position, scale, topAsset, bottomAsset } = door;
        const payload = {
          xIndex: xIndex,
          posY: position[1],
          position: [position[0], position[1] + Config.plate.plinthHeight / 2, position[2]],
          scale: [
            scale[0],
            scale[1] - Config.plate.plinthHeight / 2 - Config.plate.thickness * 2,
            scale[2],
          ],
          topAsset: topAsset,
          bottomAsset: bottomAsset,
          isPlint: false,
        };
        updateDoor(payload);
      }
    });
  };
  useEffect(() => {
    if (flag !== "none") updateDoors();
  }, [flag]);
  const [tab_data, setTabData] = useState([]);
  const [activeTab, setActiveTab] = useState();

  useEffect(() => {
    let temp = [];
    if (feets.value.withFeet) temp.push({ label: "Mit Fuß", value: "with-feet" });
    if (feets.value.hanging) temp.push({ label: "Hängend", value: "hanging" });
    if (feets.value.withOutFeet) temp.push({ label: "Ohne Fuß", value: "without-feet" });

    setTabData(temp);
    setActiveTab(temp[0].value);
    if (temp.length < 1) return;

    if (temp[0].value === "with-feet") {
      setActiveTab(temp[0].value);
      if (!withFeet) setFlag(false);
    }

    if (temp[0].value === "hanging") {
      setActiveTab(temp[0].value);
      setHanging(true);
      if (!hanging) setFlag(true);
    } else {
      setHanging(false);
    }

    if (temp[0].value === "without-feet") {
      setActiveTab(temp[0].value);
      setWithOutFeet(true);
      if (!withOutFeet) setFlag(true);
    } else {
      setWithOutFeet(false);
    }

    setWithFeet(false);
    setXIndex(-1);
    setHangingSize(0);
  }, [feets]);

  useEffect(() => {
    const GetDrawer = async () => {
      const { data, error } = await GetallDrawer("getfeet");

      if (error) return setIsLoading(false);

      data.data.sort((a, b) => {
        let priorityA = a.priority !== undefined ? a.priority : 0;
        let priorityB = b.priority !== undefined ? b.priority : 0;
        return priorityB - priorityA;
      });
      if (feetActive.length > 0) {
        const filteredFeetList = data.data.filter((feet, index) => {
          return feetActive[index];
        });
        setFeetlist(filteredFeetList);
        setFeet(filteredFeetList);
      } else {
        setFeetlist(data.data);
        setFeet(data.data);
      }
      setIsLoading(false);
    };
    GetDrawer();
  }, [feetActive]);
  const colorIndexSet = (index) => {
    setColorIndex(index);
  };
  const xIndexSet = (index) => {
    setXIndex(index);
  };
  return (
    <>
      {activeTab && (
        <Tabs value={activeTab} className="py-4">
          <TabsHeader
            className="bg-[#BDBCBC] h-[35px] p-0 mx-6 bg-opacity-100 rounded-[10px] border-[1px] border-black"
            indicatorProps={{
              className: "bg-[#36695C] h-[33px] rounded-[10px]",
            }}
          >
            {tab_data.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                className="text-[#FFF] text-[16px]"
                onClick={() => {
                  if (value === "without-feet") {
                    setWithOutFeet(true);
                    if (!withOutFeet) setFlag(true);
                  } else setWithOutFeet(false);
                  if (value === "hanging") {
                    setHanging(true);
                    if (!hanging) setFlag(true);
                  } else setHanging(false);
                  if (value === "with-feet") {
                    if (!withFeet) setFlag(false);
                  }
                  setWithFeet(false);
                  setActiveTab(value);
                  setXIndex(-1);
                  setHangingSize(0);
                }}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="mt-5">
            {feets.value.withFeet && (
              <TabPanel key="hanging" value="hanging" className="py-1 px-0">
                <p className="text-[16px] text-black mt-5">................</p>
              </TabPanel>
            )}
            {feets.value.hanging && (
              <TabPanel key="without-feet" value="without-feet" className="py-1 px-0">
                <p className="text-[16px] text-black mt-5">................</p>
              </TabPanel>
            )}
            {feets.value.withOutFeet && (
              <TabPanel key="with-feet" value="with-feet" className="py-1 px-0">
                {feetlist?.length > 0 ? (
                  <div>
                    <div className="mx-auto w-[222px] h-[95px] border-solid rounded-[10px] border-[4px] border-[#456779]">
                      <div className="font-bold text-[24px] text-center">Farben</div>
                      <div className="flex flex-row gap-[20px]">
                        {feetlist[xIndex] && (
                          <div
                            className={`"w-[70px] h-[35px]  ml-auto mr-auto bg-[#F6F6F6] border border-solid ${
                              colorIndex == -1
                                ? "border-[#456779] rounded-[5px] border-[2px] cursor-pointer"
                                : "border-black rounded-[5px] border-[1px] cursor-pointer"
                            }  "`}
                            onClick={() => {
                              colorIndexSet(-1);
                              setFeetListIndex(-1);
                            }}
                          >
                            <img
                              src={feetlist[xIndex].color}
                              className="w-full h-full border border-solid rounded-[5px]"
                            />
                          </div>
                        )}
                        {feetlist[xIndex]?.list.map((list, index) => (
                          <div
                            key={index}
                            className={`"w-[70px] h-[35px]  ml-auto mr-auto bg-[#F6F6F6] border border-solid ${
                              colorIndex == index
                                ? "border-[#456779] rounded-[5px] border-[2px] cursor-pointer"
                                : "border-black rounded-[5px] border-[1px] cursor-pointer"
                            }  "`}
                            onClick={() => {
                              colorIndexSet(index);
                              setFeetListIndex(index);
                            }}
                          >
                            <img
                              src={list.color}
                              className="w-full h-full border border-solid rounded-[5px]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-full h-[1px] bg-[#000000] mt-[15px] mb-[15px]"></div>
                    <div className="grid grid-cols-3 gap-4">
                      <div
                        onClick={() => {
                          xIndexSet(-1);
                          colorIndexSet(-1);
                          setWithFeet(false);
                          setHangingSize(0);
                          // console.log("without feet")
                        }}
                      >
                        <GriffCard
                          className={` box-border ${
                            xIndex == -1
                              ? "border-[#456779] rounded-[10px] border-[2px]"
                              : "border-black rounded-[10px] border-[1px]"
                          }`}
                          imageUrl={default_with_feet_image}
                          type="griff"
                        />
                      </div>
                      {feetlist.map((handle, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            xIndexSet(index);
                            colorIndexSet(-1);
                            setWithFeet(true);
                            setFeetIndex(index);
                            setFeetListIndex(-1);
                          }}
                        >
                          <GriffCard
                            key={index}
                            className={` box-border ${
                              xIndex == index
                                ? "border-[#456779] rounded-[10px] border-[2px]"
                                : "border-black rounded-[10px] border-[1px]"
                            }`}
                            imageUrl={
                              colorIndex === -1
                                ? handle.images
                                : xIndex === index
                                ? handle.list[colorIndex]?.images
                                : handle.images
                            }
                            type="griff"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-4  mt-[15px]">
                      <GriffTextureCard
                        imageUrl="/images/furnishing/griff/texture-1.png"
                        type="g-texture-1"
                      />
                      <GriffTextureCard
                        imageUrl="/images/furnishing/griff/texture-2.png"
                        type="g-texture-1"
                      />
                      <GriffTextureCard
                        imageUrl="/images/furnishing/griff/texture-3.png"
                        type="g-texture-1"
                      />
                    </div>
                  </div>
                ) : (
                  <div>Es sind keine Daten zum Anzeigen vorhanden.</div>
                )}
              </TabPanel>
            )}
          </TabsBody>
        </Tabs>
      )}
    </>
  );
}
