import {
  Tabs,
  TabsHeader,
  TabsBody,
  TabPanel,
  Tab,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import RotateIcon from "../../../../assets/icons/fa_rotate-left.svg";
import GriffCard from "../../common/GriffCard";
import GriffTextureCard from "../../common/GriffTextureCard";
import { GetallDrawer } from "../../../../Functions-configurator/Function-configurator";
import useDimensionStore from "../../zustand/dimensionStore";

export default function Griffes() {
  const [handlelist, setHandlelist] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [xIndex, setXIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(-1);
  const setHandle = useDimensionStore.use.setHandle();
  const handleDirection = useDimensionStore.use.handleDirection();
  const setHandleDirection = useDimensionStore.use.setHandleDirection();
  const setHandleIndex = useDimensionStore.use.setHandleIndex();
  const setHandleListIndex = useDimensionStore.use.setHandleListIndex();
  // const pushOpen = useDimensionStore.use.pushOpen()
  const setPushOpen = useDimensionStore.use.setPushOpen()

  const griffe = useDimensionStore.use.griffe()
  const handActive = useDimensionStore.use.handActive()
  const [tab_data, setTabData] = useState([])
  const [activeTab, setActiveTab] = useState();
  // const tab_data = [
  //   { label: "Push to open", value: "push_to_open" },
  //   { label: "Mit Griff", value: "griff" },
  // ];

  // const griff_tab_data = [
  //   { label: "Edelstahl", value: "stainless_steel" },
  //   { label: "Weiß", value: "white" },
  //   { label: "Schwarz", value: "black" },
  // ];
  useEffect(() => {
    let temp = []
    if (griffe.value.push) {
      temp.push({ label: "Push to open", value: "push_to_open" })
    }
    if (griffe.value.mit) {
      temp.push({ label: "Mit Griff", value: "griff" })
    }
    setTabData(temp)
    setActiveTab(temp[0]?.value)
  }, [griffe])
  useEffect(() => {
    const GetDrawer = async () => {
      const { data, error } = await GetallDrawer("gethandle");
      if (data) {
        data.data.sort((a, b) => {
          let priorityA = a.priority !== undefined ? a.priority : 0;
          let priorityB = b.priority !== undefined ? b.priority : 0;
          return priorityB - priorityA;
        })
        if ( handActive.length > 0) {
          const filteredHandleList = data.data.filter((handle, index) => {
            return handActive[index]
          })
          setHandlelist(filteredHandleList);
          setHandle(filteredHandleList);
        } else {
          setHandlelist(data.data);
          setHandle(data.data);
        }
        // setIsLoading(false);
      }
      if (error) {
        // setIsLoading(false);
      }
    };
    GetDrawer();
  }, [handActive]);

  const colorIndexSet = (index) => {
    setColorIndex(index);
  };
  const xIndexSet = (index) => {
    setXIndex(index);
  };
  // const [griffActiveTab, setGriffActiveTab] = useState(griff_tab_data[0].value);
  return (
    <>
      {activeTab && (
        <Tabs value={activeTab} className="py-4">
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
                onClick={() => {
                  setActiveTab(value)
                  if (value === "push_to_open") {
                    setPushOpen(true)
                  }
                  if (value === "griff") {
                    setPushOpen(false)
                  }
                }}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="mt-5">
            {griffe.value.push && (
              <TabPanel key="push_to_open" value="push_to_open" className="py-1 px-0">
                <p className="text-[16px] text-black mt-5">
                  Unsere Möbel sind standardmäßig mit einem Push-to-Open-System
                  ausgestattet. Ein kurzes Antippen öffnet die Tür leicht, sodass sie
                  greif- und öffnbar wird.
                  <br />
                  <br />
                  Optional ist auch die Wahl eines Griffs möglich.
                </p>
              </TabPanel>
            )}
            {griffe.value.mit && (
              <TabPanel key="griff" value="griff" className="py-1 px-0">
                {handlelist?.length > 0 ? (
                  <div>
                    <div className="flex flex-row">
                      <div className="flex justify-center items-center mr-[15px]">
                        <img src={RotateIcon} 
                          className="cursor-pointer"
                          onClick={() => {
                            handleDirection === "V" ? setHandleDirection("H") : setHandleDirection("V")
                          }}
                        />
                      </div>
                      <div className="w-[222px] h-[95px] border-solid rounded-[10px] border-[4px] border-[#456779]">
                        <div className="font-bold text-[24px] text-center">
                          Farben
                        </div>
                        <div className="flex flex-row gap-[20px]">
                          {handlelist[xIndex] && (
                            <div
                              className={`"w-[70px] h-[35px]  ml-auto mr-auto bg-[#F6F6F6] border border-solid ${
                                colorIndex == -1
                                  ? "border-[#456779] rounded-[5px] border-[2px] cursor-pointer"
                                  : "border-black rounded-[5px] border-[1px] cursor-pointer"
                              }  "`}
                              onClick={() => {
                                colorIndexSet(-1)
                                setHandleListIndex(-1)
                              }}
                            >
                              <img
                                src={handlelist[xIndex].color}
                                className="w-full h-full border border-solid rounded-[5px]"
                              />
                            </div>
                          )}
                          {handlelist[xIndex]?.list.map((list, index) => (
                            <div
                              key={index}
                              className={`"w-[70px] h-[35px]  ml-auto mr-auto bg-[#F6F6F6] border border-solid ${
                                colorIndex == index
                                  ? "border-[#456779] rounded-[5px] border-[2px] cursor-pointer"
                                  : "border-black rounded-[5px] border-[1px] cursor-pointer"
                              }  "`}
                              onClick={() => {
                                colorIndexSet(index)
                                setHandleListIndex(index)
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
                    </div>
                    <div className="w-full h-[1px] bg-[#000000] mt-[15px] mb-[15px]"></div>
                    <div className="grid grid-cols-3 gap-4">
                      {handlelist.map((handle, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            xIndexSet(index);
                            colorIndexSet(-1);
                            setHandleIndex(index)
                            setHandleListIndex(-1)
                          }}
                        >
                          <GriffCard
                            className={`box-border rounded-[10px] h-[99px] ${
                              xIndex === index
                                ? "border-[#456779] border-[2px]"
                                : "border-black border-[1px]"
                            }`}
                            key={index}
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
