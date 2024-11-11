import { Button } from "@material-tailwind/react"
import settingIcon from "../../../assets/icons/setting.png";
import DropdownCloseIcon from "/images/furniture_configurator/dropdown-close-icon.png";
import { useEffect, useState } from "react";

import useDimensionStore from "../zustand/dimensionStore";
import { ConfigSetting, setActive } from "../../../api/api";
import { ErrorMessage, Field, Form, Formik } from "formik"
import { toast } from "react-hot-toast";
import { GetallDrawer, GetTexture, GetallPlates } from "../../../Functions-configurator/Function-configurator";
import ImageTooltip from "../../../components/common/ImageTooltip";
import { ConfigSetvalidationSchema } from "../../../Formik/FormikFunctions"
// const baseUrl = 'https://storage.googleapis.com/schrankdesign-uploads/textures/';
const baseUrl = import.meta.env.VITE_BACKEND_URL_img

export default function Settings(props) {
  const {slug} = props
    const storedUser = localStorage.getItem("schrankdesign-app-user");
    const auth = JSON.parse(storedUser);
    const [show, setShow] = useState(false)
    const [showFeet, setShowFeet] = useState(false)
    const [showHandle, setShowHandle] = useState(false)
    const [showTexture, setShowTexture] = useState(false)
    const [handleList, setHandleList] = useState([])
    const [feetList, setFeetList] = useState([])
    const [handleActive, setHandleActive] = useState([])
    const [feetActive, setFeetActive] = useState([])
    const [textureList, setTextureList] = useState([])
    const [textureActive, setTextureActive] = useState([])
    
    const minWidthC = useDimensionStore.use.minWidthC()
    const maxWidthC = useDimensionStore.use.maxWidthC()
    const minHeightC = useDimensionStore.use.minHeightC()
    const maxHeightC = useDimensionStore.use.maxHeightC()
    const minDepthC = useDimensionStore.use.minDepthC()
    const maxDepthC = useDimensionStore.use.maxDepthC()       
    const baseCutout = useDimensionStore.use.baseCutout()
    const externalPanel = useDimensionStore.use.externalPanel()
    const korpusFormA = useDimensionStore.use.korpusFormA()
    const bodyColor = useDimensionStore.use.bodyColor()
    const frontColor = useDimensionStore.use.frontColor()
    const individualColor = useDimensionStore.use.individualColor()
    const shelf = useDimensionStore.use.shelf()
    const drawer = useDimensionStore.use.drawer()
    const clothesRail = useDimensionStore.use.clothesRail()
    const griffe = useDimensionStore.use.griffe()
    const door = useDimensionStore.use.door()
    const extra = useDimensionStore.use.extra()
    const feets = useDimensionStore.use.feets()

    const handActiveS = useDimensionStore.use.handActive()
    const feetActiveS = useDimensionStore.use.feetActive()
    const textureActiveS = useDimensionStore.use.textureActive()
    const setHandActiveS = useDimensionStore.use.setHandActive()
    const setFeetActiveS = useDimensionStore.use.setFeetActive()
    const setTextureActiveS = useDimensionStore.use.setTextureActive()

    const setMinWidthC = useDimensionStore.use.setMinWidthC()
    const setMaxWidthC = useDimensionStore.use.setMaxWidthC()
    const setMinHeightC = useDimensionStore.use.setMinHeightC()
    const setMaxHeightC = useDimensionStore.use.setMaxHeightC()
    const setMinDepthC = useDimensionStore.use.setMinDepthC()
    const setMaxDepthC = useDimensionStore.use.setMaxDepthC()  
    const setBaseCutout = useDimensionStore.use.setBaseCutout()
    const setExternalPanel = useDimensionStore.use.setExternalPanel()
    const setKorpusFormA = useDimensionStore.use.setKorpusFormA()
    const setBodyColor = useDimensionStore.use.setBodyColor()
    const setFrontColor = useDimensionStore.use.setFrontColor()
    const setIndividualColor = useDimensionStore.use.setIndividualColor()
    const setShelf = useDimensionStore.use.setShelf()
    const setDrawer = useDimensionStore.use.setDrawer()
    const setClothesRail = useDimensionStore.use.setClothesRail()
    const setGriffe = useDimensionStore.use.setGriffe()
    const setDoor = useDimensionStore.use.setDoor()
    const setExtra = useDimensionStore.use.setExtra()
    const setFeets = useDimensionStore.use.setFeets()

    const width = useDimensionStore.use.width()
    const height = useDimensionStore.use.height()
    const depth = useDimensionStore.use.depth()
  const handleSubmit = async (values, { resetForm }) => {
    if (values.minDepth > depth) {
      values.minDepth = depth
    }
    if (values.maxDepth < depth) {
      values.maxDepth = depth
    }
    const { status } = await ConfigSetting(slug, values)
    // console.log(status)
    if (status.status) {
      setShow(false)
      const {
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
        minDepth,
        maxDepth,
        baseCutout,
        externalPanel,
        korpusForm,
        wardrobe,
        outer,
        top,
        uShape,
        inner,
        fullInner,
        bodyColor,
        bodyColor_color,
        bodyColor_wood,
        bodyColor_venner,
        bodyColor_solid,
        frontColor,
        frontColor_color,
        frontColor_wood,
        frontColor_venner,
        frontColor_solid,
        individualColor,
        individualColor_color,
        individualColor_wood,
        individualColor_venner,
        individualColor_solid,
        shelf,
        shelfG,
        fold,
        glass,
        shoe,
        drawer,
        drawerG,
        drawerG1,
        drawerG2,
        drawerG3,
        drawerGC,
        drawerI,
        drawerI1,
        drawerI2,
        drawerI3,
        clothesRail,
        stange,
        lift,
        auszug,
        griffe,
        push,
        mit,
        door,
        revolving,
        revolvingLeft,
        revolvingRight,
        revolvingDouble,
        mirror,
        mirrorLeft,
        mirrorRight,
        mirrorDouble,
        sliding,
        sliding1,
        sliding2,
        flap,
        flapDown,
        flapUp,
        extra,
        led,
        divide,
        feets,
        withFeet,
        hanging,
        withOutFeet
      } = values
      const configSet = {
        minWidth: minWidth,
        maxWidth: maxWidth,
        minHeight: minHeight,
        maxHeight: maxHeight,
        minDepth: minDepth,
        maxDepth: maxDepth,
        baseCutout: baseCutout,
        externalPanel: externalPanel,
        korpusForm: {
          active: korpusForm,
          value: {
            wardrobe: wardrobe,
            outer: outer,
            top: top,
            uShape: uShape,
            inner: inner,
            fullInner: fullInner
          }
        },
        bodyColor: {
          active: bodyColor,
          value: {
            color: bodyColor_color,
            wood: bodyColor_wood,
            venner: bodyColor_venner,
            solid: bodyColor_solid
          }
        },
        frontColor: {
          active: frontColor,
          value: {
            color: frontColor_color,
            wood: frontColor_wood,
            venner: frontColor_venner,
            solid: frontColor_solid
          }
        },
        individualColor: {
          active: individualColor,
          value: {
            color: individualColor_color,
            wood: individualColor_wood,
            venner: individualColor_venner,
            solid: individualColor_solid
          }
        },
        shelf: {
          active: shelf,
          value: {
            shelf: shelfG,
            fold: fold,
            glass: glass,
            shoe: shoe
          }
        },
        drawer: {
          active: drawer,
          drawer: {
            active: drawerG,
            value: {
              drawer1: drawerG1,
              drawer2: drawerG2,
              drawer3: drawerG3,
              customDrawer: drawerGC
            }
          },
          innerDrawer: {
            active: drawerI,
            value: {
              drawer1: drawerI1,
              drawer2: drawerI2,
              drawer3: drawerI3
            }
          }
        },
        clothesRail: {
          active: clothesRail,
          value: {
            stange: stange,
            lift: lift,
            auszug: auszug
          }
        },
        griffe: {
          active: griffe,
          value: {
            push: push,
            mit: mit
          }
        },
        door: {
          active: door,
          revolving: {
            active: revolving,
            value: {
              left: revolvingLeft,
              right: revolvingRight,
              double: revolvingDouble
            },
          },
          mirror: {
            active: mirror,
            value: {
              left: mirrorLeft,
              right: mirrorRight,
              double: mirrorDouble
            }
          },
          sliding: {
            active: sliding,
            value: {
              sliding1: sliding1,
              sliding2: sliding2
            }
          },
          flap: {
            active: flap,
            value: {
              down: flapDown,
              up: flapUp
            }
          }
        },
        extra: {
          active: extra,
          value: {
            led: led,
            divide: divide
          }
        },
        feets: {
          active: feets,
          value: {
            withFeet: withFeet,
            hanging: hanging,
            withOutFeet: withOutFeet
          }
        },
      }
      setMinWidthC(configSet.minWidth)
      setMaxWidthC(configSet.maxWidth)
      setMinHeightC(configSet.minHeight)
      setMaxHeightC(configSet.maxHeight)
      setMinDepthC(configSet.minDepth)
      setMaxDepthC(configSet.maxDepth)
      setBaseCutout(configSet.baseCutout)
      setExternalPanel(configSet.externalPanel)
      setKorpusFormA(configSet.korpusForm)
      setBodyColor(configSet.bodyColor)
      setFrontColor(configSet.frontColor)
      setIndividualColor(configSet.individualColor)
      setShelf(configSet.shelf)
      setDrawer(configSet.drawer)
      setClothesRail(configSet.clothesRail)
      setGriffe(configSet.griffe)
      setDoor(configSet.door)
      setExtra(configSet.extra)
      setFeets(configSet.feets)
      toast.success("Set Successfully!");
    } else {
      toast.error("Set failure!");
    }
  }

  const handleFeetSubmit = async () => {
    const { status } = await setActive(slug, feetActive, "feetActive")
    if (status.status) {
      setShowFeet(false)
      setFeetActiveS(feetActive)
      toast.success("Set Successfully!")
    } else {
      toast.error("set failure!")
    }
  }

  const handleHandSubmit = async () => {

    const { status } = await setActive(slug, handleActive, "handActive")
    if (status.status) {
      setShowHandle(false)
      setHandActiveS(handleActive)
      toast.success("Set Successfully!")
    } else {
      toast.error("set failure!")
    }
  }

  const handleTextureSubmit = async () => {
    const { status } = await setActive(slug, textureActive, "textureActive")
    if (status.status) {
      setShowTexture(false)
      toast.success("Set Successfully!")
      
      
      setTextureActiveS(textureActive)
    } else {
      toast.error("set failure!")
    }
  }
  

  const initailValues = {
    minWidth: minWidthC,
    maxWidth: maxWidthC,
    minHeight: minHeightC,
    maxHeight: maxHeightC,
    minDepth: minDepthC,
    maxDepth: maxDepthC,
    baseCutout: baseCutout,
    externalPanel: externalPanel,
    korpusForm: korpusFormA.active,
    wardrobe: korpusFormA.value.wardrobe,
    outer: korpusFormA.value.outer,
    top: korpusFormA.value.top,
    uShape: korpusFormA.value.uShape,
    inner: korpusFormA.value.inner,
    fullInner: korpusFormA.value.fullInner,
    bodyColor: bodyColor.active,
    bodyColor_color: bodyColor.value.color,
    bodyColor_wood: bodyColor.value.wood,
    bodyColor_venner: bodyColor.value.venner,
    bodyColor_solid: bodyColor.value.solid,
    frontColor: frontColor.active,
    frontColor_color: frontColor.value.color,
    frontColor_wood: frontColor.value.wood,
    frontColor_venner: frontColor.value.venner,
    frontColor_solid: frontColor.value.solid,
    individualColor: individualColor.active,
    individualColor_color: individualColor.value.color,
    individualColor_wood: individualColor.value.wood,
    individualColor_venner: individualColor.value.venner,
    individualColor_solid: individualColor.value.solid,
    shelf: shelf.active,
    shelfG: shelf.value.shelf,
    fold: shelf.value.fold,
    glass: shelf.value.glass,
    shoe: shelf.value.shoe,
    drawer: drawer.active,
    drawerG: drawer.drawer.active,
    drawerG1: drawer.drawer.value.drawer1,
    drawerG2: drawer.drawer.value.drawer2,
    drawerG3: drawer.drawer.value.drawer3,
    drawerGC: drawer.drawer.value.customDrawer,
    drawerI: drawer.innerDrawer.active,
    drawerI1: drawer.innerDrawer.value.drawer1,
    drawerI2: drawer.innerDrawer.value.drawer2,
    drawerI3: drawer.innerDrawer.value.drawer3,
    clothesRail: clothesRail.active,
    stange: clothesRail.value.stange,
    lift: clothesRail.value.lift,
    auszug: clothesRail.value.auszug,
    griffe: griffe.active,
    push: griffe.value.push,
    mit: griffe.value.mit,
    door: door.active,
    revolving: door.revolving.active,
    revolvingLeft: door.revolving.value.left,
    revolvingRight: door.revolving.value.right,
    revolvingDouble: door.revolving.value.double,
    mirror: door.mirror.active,
    mirrorLeft: door.mirror.value.left,
    mirrorRight: door.mirror.value.right,
    mirrorDouble: door.mirror.value.double,
    sliding: door.sliding.active,
    sliding1: door.sliding.value.sliding1,
    sliding2: door.sliding.value.sliding2,
    flap: door.flap.active,
    flapDown: door.flap.value.down,
    flapUp: door.flap.value.up,
    extra: extra.active,
    led: extra.value.led,
    divide: extra.value.divide,
    feets: feets.active,
    withFeet: feets.value.withFeet,
    hanging: feets.value.hanging,
    withOutFeet: feets.value.withOutFeet
  }

  useEffect(() => {
    // const getHandle = async () => {
    //   const { data, error } = await GetallDrawer("gethandle");
    //   if (data) {
    //     data.data.sort((a, b) => {
    //       let priorityA = a.priority !== undefined ? a.priority : 0;
    //       let priorityB = b.priority !== undefined ? b.priority : 0;
    //       return priorityB - priorityA;
    //     })
    //     setHandleList(data.data)
    //   }
    //   if (error) {
    //     console.log(error?.message);
    //   }
    // };
    // const getFeet = async () => {
    //   const { data, error } = await GetallDrawer("getfeet");
    //   if (data) {
    //     data.data.sort((a, b) => {
    //       let priorityA = a.priority !== undefined ? a.priority : 0;
    //       let priorityB = b.priority !== undefined ? b.priority : 0;
    //       return priorityB - priorityA;
    //     })
    //     setFeetList(data.data)
    //   }
    //   if (error) {
    //     console.log(error?.message);
    //   }
    // };
    // const getTexture = async () => {
    //   const { data, error } = await GetTexture();
    //   if (data) {
    //     setTextureList(data.data)
    //   }
    //   if (error) {
    //     console.log(error?.message);
    //   }
    // };
    // const GetPlates = async () => {
    //   const { data, error } = await GetallPlates()
    //   if (data) {
    //     // console.log(data.data)
    //     setTextureList(data.data)
    //   }
    //   if (error) {
    //     // setIsLoading(false)
    //     console.log(error?.message)
    //   }
    // }
    // getFeet();
    // getHandle();
    // GetPlates();
    // getTexture();
  }, [])

  useEffect(() => {
    if (textureActiveS.length > 0)
      setTextureActive(textureActiveS)
    else {
      setTextureActive(new Array(textureList.length).fill(false));
      // setTextureActiveS(new Array(textureList.length).fill(true))
    }

    if (feetActiveS.length > 0)
      setFeetActive(feetActiveS)
    else {
      setFeetActive(new Array(feetList.length).fill(false));
      // setFeetActiveS(new Array(feetList.length).fill(true))
    }

    if (handActiveS.length > 0)
      setHandleActive(handActiveS)
    else {
      setHandleActive(new Array(handleList.length).fill(false))
      // setHandActiveS(new Array(handleList.length).fill(true))
    }

  }, [handActiveS, feetActiveS, textureActiveS, handleList, feetList, textureList])

  const activeHandle = (index, type) => {
    if (type === "feet") {
      const updateFeetActive = [...feetActive];
      updateFeetActive[index] = !updateFeetActive[index];
      setFeetActive(updateFeetActive);
    }
    if (type === "handle") {
      const updateHandActive = [...handleActive]
      updateHandActive[index] = !updateHandActive[index]
      setHandleActive(updateHandActive)
    }
    if (type === "texture") {
      const updateTextureActive = [...textureActive]
      updateTextureActive[index] = !updateTextureActive[index]
      setTextureActive(updateTextureActive)
    }
  }
  return (
    <>
      <div className="absolute left-[1133px] top-[20px] ">
        {(import.meta.env.MODE === 'development' || auth?.role) == 1 && (
          <Button
            className=" bg-[#ffffff] border border-black text-[#000000] normal-case text-[14px] flex items-center gap-2 rounded-[2px] pl-[10px] pr-[6px] h-[39px]"
            onClick={() => {
              setShow(true)
            }}
          >
            <img src={settingIcon}></img>
            Settings
          </Button>
        )}
      </div>   
      {show && (
        <Formik
          initialValues={initailValues}
          onSubmit={handleSubmit}
          validationSchema={ConfigSetvalidationSchema}
          enableReinitialize
          key={"show"}
        >
          {(formik) => (
            <Form>
              <div className="fixed inset-0 flex items-center justify-center z-50" style={{zIndex: 10000000000000000}}>
              <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-[#cec7c7] rounded-lg shadow-lg p-6 h-screen w-[80%] overflow-auto z-50">
                  <div className="flex items-center mb-2 relative">
                    <div className="w-[100%]">
                      <div className="flex justify-center text-xl md:text-2xl lg:text-2xl mx-auto font-semibold">
                        Configurator Settings
                      </div>
                    </div>
                    <div className="absolute right-0 flex items-center justify-end gap-2">
                      <button type="submit"
                        className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                      >
                        Save
                      </button>
                      <button
                        className="w-[31px]"
                        onClick={() => {
                          setShow(false)
                        }}
                      >
                        <img src={DropdownCloseIcon} alt="dropdown_arrow_main" />
                      </button>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-[33%] mr-auto">
                      <div className="border border-white p-2 mb-2">
                        <div className="flex justify-center text-[#456779] font-bold">Maße</div>
                        <div className="border border-[#456779] mb-2">
                          <div className="flex gap-4 px-2 py-1">
                            <div className="text-[#456779] font-bold w-10">Breite</div>
                            <div className="flex gap-2">
                              <div>min</div>
                              <div ><Field className="lg:w-[100px] border border-black outline-none" id={"minWidth"} name={"minWidth"}></Field></div>
                            </div>
                            <div className="flex gap-2">
                              <div>max</div>
                              <div><Field className="lg:w-[100px] border border-black outline-none" id={"maxWidth"} name={"maxWidth"}></Field></div>
                            </div>
                          </div>
                          <div className="flex gap-4 px-2 py-1">
                            <div className="text-[#456779] font-bold w-10">Höhe</div>
                            <div className="flex gap-2">
                              <div>min</div>
                              <div ><Field className="lg:w-[100px] border border-black outline-none" id={"minHeight"} name={"minHeight"}></Field></div>
                            </div>
                            <div className="flex gap-2">
                              <div>max</div>
                              <div><Field className="lg:w-[100px] border border-black outline-none" id={"maxHeight"} name={"maxHeight"}></Field></div>
                            </div>
                          </div>
                          <div className="flex gap-4 px-2 py-1">
                            <div className="text-[#456779] font-bold w-10">Tiefe</div>
                            <div className="flex gap-2">
                              <div>min</div>
                              <div ><Field className="lg:w-[100px] border border-black outline-none" id={"minDepth"} name={"minDepth"}></Field></div>
                            </div>
                            <div className="flex gap-2">
                              <div>max</div>
                              <div><Field className="lg:w-[100px] border border-black outline-none" id={"maxDepth"} name={"maxDepth"}></Field></div>
                            </div>
                          </div>
                        </div>
                        <div className="border border-[#456779] mb-2">
                          <div className="flex gap-4 px-2">
                            <div className="text-[#456779] font-bold w-36">Sockel-Ausschnitt</div>
                            <div>
                              <Field
                                id={"baseCutout"}
                                name={"baseCutout"}
                                type="checkbox"
                              />
                              </div>
                          </div>
                          <div className="flex gap-4 px-2">
                            <div className="text-[#456779] font-bold w-36">Außen-Blenden</div>
                            <div><Field type="checkbox" id={"externalPanel"} name={"externalPanel"}/></div>
                          </div>
                        </div>
                        <div className="border border-[#456779]">
                          <div className="flex gap-4 p-2">
                            <div className="text-[#456779] font-bold w-36">Korpus Form</div>
                            <div><Field type="checkbox" id={"korpusForm"} name={"korpusForm"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className="w-36">1. Wardrob-Shape</div>
                            <div><Field type="checkbox" id={"wardrobe"} name={"wardrobe"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">2. Outer-Shape</div>
                            <div><Field type="checkbox" id={"outer"} name={"outer"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">3. Top-Shape</div>
                            <div><Field type="checkbox" id={"top"} name={"top"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">4. U-Shape</div>
                            <div><Field type="checkbox" id={"uShape"} name={"uShape"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">5. Inner-Shape</div>
                            <div><Field type="checkbox" id={"inner"} name={"inner"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">6. Full-Inner-Shape</div>
                            <div><Field type="checkbox" id={"fullInner"} name={"fullInner"}></Field></div>
                          </div>
                        </div>
                      </div>
                      <div className="border border-white p-2">
                        <div className="flex justify-center text-[#456779] font-bold">Farben</div>
                        <div className="border border-[#456779]">
                          <div className="flex gap-4 p-2">
                            <div className="text-[#456779] font-bold w-36">Korpus Farbe</div>
                            <div><Field type="checkbox" id={"bodyColor"} name={"bodyColor"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className="w-36">1. Farben</div>
                            <div><Field type="checkbox" id={"bodyColor_color"} name={"bodyColor_color"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">2. Holzdekor</div>
                            <div><Field type="checkbox" id={"bodyColor_wood"} name={"bodyColor_wood"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">3. Furnier</div>
                            <div><Field type="checkbox" id={"bodyColor_venner"} name={"bodyColor_venner"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">4. Massivholz</div>
                            <div><Field type="checkbox" id={"bodyColor_solid"} name={"bodyColor_solid"}></Field></div>
                          </div>
                          <div className="flex gap-4 p-2">
                            <div className="text-[#456779] font-bold w-36">Front Farbe</div>
                            <div><Field type="checkbox" id={"frontColor"} name={"frontColor"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className="w-36">1. Farben</div>
                            <div><Field type="checkbox" id={"frontColor_color"} name={"frontColor_color"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">2. Holzdekor</div>
                            <div><Field type="checkbox" id={"frontColor_wood"} name={"frontColor_wood"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">3. Furnier</div>
                            <div><Field type="checkbox" id={"frontColor_venner"} name={"frontColor_venner"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">4. Massivholz</div>
                            <div><Field type="checkbox" id={"frontColor_solid"} name={"frontColor_solid"}></Field></div>
                          </div>
                          <div className="flex gap-4 p-2">
                            <div className="text-[#456779] font-bold w-36">Individuelle Farbe</div>
                            <div><Field type="checkbox" id={"individualColor"} name={"individualColor"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className="w-36">1. Farben</div>
                            <div><Field type="checkbox" id={"individualColor_color"} name={"individualColor_color"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">2. Holzdekor</div>
                            <div><Field type="checkbox" id={"individualColor_wood"} name={"individualColor_wood"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">3. Furnier</div>
                            <div><Field type="checkbox" id={"individualColor_venner"} name={"individualColor_venner"}></Field></div>
                          </div>
                          <div className="flex gap-2 px-1">
                            <div className=" w-36">4. Massivholz</div>
                            <div><Field type="checkbox" id={"individualColor_solid"} name={"individualColor_solid"}></Field></div>
                          </div>
                          <div className="flex justify-center mb-1">
                          <button type="button"
                            onClick={() => setShowTexture(true)}
                            className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                          >
                            Farbauswahl
                          </button>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                    <div className="w-[66%] m1-auto">
                      <div className="border border-white p-2">
                        <div className="flex justify-center text-[#456779] font-bold">Ausstattung</div>
                        <div className="flex gap-2">
                          <div className="w-[50%] ">
                            <div className="border border-[#456779] mb-2">
                              <div className="flex gap-4 p-2">
                                <div className="text-[#456779] font-bold w-36">Fächer & Böden</div>
                                <div><Field type="checkbox" id={"shelf"} name={"shelf"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className="w-36">1. Einlegeboden</div>
                                <div><Field type="checkbox" id={"shelfG"} name={"shelfG"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">2. Fester Boden</div>
                                <div><Field type="checkbox" id={"fold"} name={"fold"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">3. Glas Boden</div>
                                <div><Field type="checkbox" id={"glass"} name={"glass"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">4. Schuh Boden</div>
                                <div><Field type="checkbox" id={"shoe"} name={"shoe"}></Field></div>
                              </div>
                            </div>
                            <div className="border border-[#456779] mb-2">
                              <div className="flex gap-4 p-2">
                                <div className="text-[#456779] font-bold w-36">Schubladen</div>
                                <div><Field type="checkbox" id={"drawer"} name={"drawer"}></Field></div>
                              </div>
                              <div className="flex gap-2 p-1">
                                <div className="text-[#456779] w-36">Schublade</div>
                                <div><Field type="checkbox" id={"drawerG"} name={"drawerG"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className="w-36">1. Schublade Klein</div>
                                <div><Field type="checkbox" id={"drawerG1"} name={"drawerG1"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">2. Schublade Mittel</div>
                                <div><Field type="checkbox" id={"drawerG2"} name={"drawerG2"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">3. Schublade Groß</div>
                                <div><Field type="checkbox" id={"drawerG3"} name={"drawerG3"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">4. Maß-Schublade</div>
                                <div><Field type="checkbox" id={"drawerGC"} name={"drawerGC"}></Field></div>
                              </div>
                              <div className="flex gap-2 p-1">
                                <div className="text-[#456779] w-36">Innenschublade</div>
                                <div><Field type="checkbox" id={"drawerI"} name={"drawerI"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className="w-36">1. Schublade Klein</div>
                                <div><Field type="checkbox" id={"drawerI1"} name={"drawerI1"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">2. Schublade Mittel</div>
                                <div><Field type="checkbox" id={"drawerI2"} name={"drawerI2"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">3. Schublade Groß</div>
                                <div><Field type="checkbox" id={"drawerI3"} name={"drawerI3"}></Field></div>
                              </div>
                            </div>
                            <div className="border border-[#456779] mb-2">
                              <div className="flex gap-4 p-2">
                                <div className="text-[#456779] font-bold w-36">Kleiderstange</div>
                                <div><Field type="checkbox" id={"clothesRail"} name={"clothesRail"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className="w-36">1. Kleiderstange</div>
                                <div><Field type="checkbox" id={"stange"} name={"stange"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">2. Kleiderlift</div>
                                <div><Field type="checkbox" id={'lift'} name={"lift"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">3. Hosen-Auszug</div>
                                <div><Field type="checkbox" id={"auszug"} name={"auszug"}></Field></div>
                              </div>
                            </div>
                            <div className="border border-[#456779] mb-2">
                              <div className="flex gap-4 p-2">
                                <div className="text-[#456779] font-bold w-36">Griffe</div>
                                <div><Field type="checkbox" id={"griffe"} name={"griffe"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className="w-36">Push to open</div>
                                <div><Field type="checkbox" id={"push"} name={"push"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">Mit Griff</div>
                                <div><Field type="checkbox" id={"mit"} name={"mit"}></Field></div>
                              </div>
                              <div className="flex justify-center mb-1">
                                <button type="button"
                                  onClick={() => {
                                    setShowHandle(true)
                                  }}
                                  className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                                >
                                  Griffauswahl
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="w-[50%] ">
                            <div className="border border-[#456779] mb-2">
                              <div className="flex gap-4 p-2">
                                <div className="text-[#456779] font-bold w-36">Türen</div>
                                <div><Field type="checkbox" id={"door"} name={"door"}></Field></div>
                              </div>
                              <div className="flex gap-2 p-1">
                                <div className="text-[#456779] w-36">Drehtür</div>
                                <div><Field type="checkbox" id={"revolving"} name={"revolving"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className="w-36">1. Linke Tür</div>
                                <div><Field type="checkbox" id={"revolvingLeft"} name={"revolvingLeft"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">2. Rechte Tür</div>
                                <div><Field type="checkbox" id={"revolvingRight"} name={"revolvingRight"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">3. Flügeltür</div>
                                <div><Field type="checkbox" id={"revolvingDouble"} name={"revolvingDouble"}></Field></div>
                              </div>
                              <div className="flex gap-2 p-1">
                                <div className="text-[#456779] w-36">Spiegeltür</div>
                                <div><Field type="checkbox" id={"mirror"} name={"mirror"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className="w-36">1. Linke Spiegeltür</div>
                                <div><Field type="checkbox" id={"mirrorLeft"} name={"mirrorLeft"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">2. Rechte Spiegeltür</div>
                                <div><Field type="checkbox" id={"mirrorRight"} name={"mirrorRight"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">3. Spiegel-Flügeltür</div>
                                <div><Field type="checkbox" id={"mirrorDouble"} name={"mirrorDouble"}></Field></div>
                              </div>
                              <div className="flex gap-2 p-1">
                                <div className="text-[#456779] w-36">Schiebetür</div>
                                <div><Field type="checkbox" id={"sliding"} name={"sliding"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className="w-36">1. Schiebetür 2-Türen</div>
                                <div><Field type="checkbox" id={"sliding1"} name={"sliding1"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">2. Schiebetür 3-Türen</div>
                                <div><Field type="checkbox" id={"sliding2"} name={"sliding2"}></Field></div>
                              </div>
                              <div className="flex gap-2 p-1">
                                <div className="text-[#456779] w-36">Klappen</div>
                                <div><Field type="checkbox" id={"flap"} name={"flap"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className="w-36">1. Klapptür unten</div>
                                <div><Field type="checkbox" id={"flapDown"} name={"flapDown"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">2. Klapptür oben</div>
                                <div><Field type="checkbox" id={"flapUp"} name={"flapUp"}></Field></div>
                              </div>
                            </div>
                            <div className="border border-[#456779] mb-2">
                              <div className="flex gap-4 p-2">
                                <div className="text-[#456779] font-bold w-36">Extras</div>
                                <div><Field type="checkbox" id={"extra"} name={"extra"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className="w-36">1. LED-Beleuchtung</div>
                                <div><Field type="checkbox" id={"led"} name={"led"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">2. Trennseite</div>
                                <div><Field type="checkbox" id={"divide"} name={"divide"}></Field></div>
                              </div>
                            </div>
                            <div className="border border-[#456779] mb-2">
                              <div className="flex gap-4 p-2">
                                <div className="text-[#456779] font-bold w-36">Füße</div>
                                <div><Field type="checkbox" id={"feets"} name={"feets"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className="w-36">Hängend</div>
                                <div><Field type="checkbox" id={"withFeet"} name={"withFeet"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">Ohne Fuß</div>
                                <div><Field type="checkbox" id={"hanging"} name={"hanging"}></Field></div>
                              </div>
                              <div className="flex gap-2 px-1">
                                <div className=" w-36">Mit Fuß</div>
                                <div><Field type="checkbox" id={"withOutFeet"} name={"withOutFeet"}></Field></div>
                              </div>
                              <div className="flex justify-center mb-1">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowFeet(true)
                                  }}
                                  // disabled={true}
                                  className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                                >
                                  Fußauswahl
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              
            </Form>
          )}
        </Formik>
      )}

      {showHandle && (
        <Formik
          initialValues={initailValues}
          onSubmit={handleHandSubmit}
          // validationSchema={DrawervalidationSchema}
          enableReinitialize
          key={"handle"}
        >
          {(formik) => (
            <Form>
              <div className="fixed inset-0 flex items-center justify-center z-50" style={{zIndex: 100000000000000000}}>
              <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-[#cec7c7] rounded-lg shadow-lg p-6  w-[50%] z-50 ">
                  <div className="flex items-center mb-2 relative">
                    <div className="w-[100%]">
                      <div className="flex justify-center text-xl md:text-2xl lg:text-2xl mx-auto font-semibold">
                        Griffauswahl
                      </div>
                    </div>
                    <div className="absolute right-0 flex items-center justify-end gap-2">
                      <button type="submit"
                        className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                      >
                        Save
                      </button>
                      <button
                        className="w-[31px]"
                        onClick={() => {
                          setShowHandle(false)
                        }}
                      >
                        <img src={DropdownCloseIcon} alt="dropdown_arrow_main" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="m-3 grid grid-cols-2 gap-5 border border-[#456779] p-2">
                    
                    {handleList.map((handle, index) => (
                      <div key={index} className="flex justify-between">
                        <div className="">{handle.name}</div>
                        <div className="flex gap-2">
                          <div className="w-[24px] h-[24px] tooltip bg-white rounded-[3px]">
                            <img src={handle.images[0]} className="w-full h-full"></img>
                            <ImageTooltip imageUrl={handle.images[0]}/>
                          </div>
                          <div>
                            <input type="checkbox" checked={handleActive[index]} onChange={() => activeHandle(index, "handle")}></input>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
            </Form>
          )}
        </Formik>
      )}

      {showFeet && (
        <Formik
          // initialValues={initailValues}
          // onSubmit={handleFeetSubmit}
          // validationSchema={DrawervalidationSchema}
          enableReinitialize
          key={"feet"}
        >
          {(formik) => (
            <Form>
              <div className="fixed inset-0 flex items-center justify-center z-50" style={{zIndex: 100000000000000000}}>
              <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-[#cec7c7] rounded-lg shadow-lg p-6  w-[50%] z-50 ">
                  <div className="flex items-center mb-2 relative">
                    <div className="w-[100%]">
                      <div className="flex justify-center text-xl md:text-2xl lg:text-2xl mx-auto font-semibold">
                        Fußauswahl
                      </div>
                    </div>
                    <div className="absolute right-0 flex items-center justify-end gap-2">
                      <button type="button"
                        onClick={() => handleFeetSubmit()}
                        className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                      >
                        Save
                      </button>
                      <button
                        className="w-[31px]"
                        onClick={() => {
                          setShowFeet(false)
                        }}
                      >
                        <img src={DropdownCloseIcon} alt="dropdown_arrow_main" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="m-3 grid grid-cols-2 gap-5 border border-[#456779] p-2">
                    
                    {feetList.map((handle, index) => (
                      <div key={index} className="flex justify-between">
                        <div className="">{handle.name}</div>
                        <div className="flex gap-2">
                          <div className="w-[24px] h-[24px] tooltip bg-white rounded-[3px]">
                            <img src={handle.images[0]} className="w-full h-full"></img>
                            <ImageTooltip imageUrl={handle.images[0]}/>
                          </div>
                          <div>
                            <input type="checkbox" checked={feetActive[index]}
                              onChange={() => activeHandle(index, "feet")}
                            ></input>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
            </Form>
          )}
        </Formik>
      )}

      {showTexture && (
        <Formik
          // initialValues={initailValues}
          // onSubmit={handleTextureSubmit}
          // validationSchema={DrawervalidationSchema}
          enableReinitialize
          key={"texture"}
        >
          {(formik) => (
            <Form>
              <div className="fixed inset-0 flex items-center justify-center z-50" style={{zIndex: 100000000000000000}}>
              <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="bg-[#cec7c7] rounded-lg shadow-lg p-6  w-[50%] z-50 ">
                  <div className="flex items-center mb-2 relative">
                    <div className="w-[100%]">
                      <div className="flex justify-center text-xl md:text-2xl lg:text-2xl mx-auto font-semibold">
                        Farbauswahl
                      </div>
                    </div>
                    <div className="absolute right-0 flex items-center justify-end gap-2">
                      <button type="button"
                        onClick={() => handleTextureSubmit()}
                        className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                      >
                        Save
                      </button>
                      <button
                        className="w-[31px]"
                        onClick={() => {
                          setShowTexture(false)
                        }}
                      >
                        <img src={DropdownCloseIcon} alt="dropdown_arrow_main" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="m-3 grid grid-cols-4 gap-2">
                    <div className="border border-[#456779] p-2">
                      <div className="text-[#456779] flex justify-center text-[20px]">Farben</div>
                      {textureList.map((texture, index) => (
                        <div key={index}>
                          {texture.plate_sort === "Farben" && (
                            <div className="flex justify-between">
                              <div className="">{texture.name}</div>
                              <div className="flex gap-2">
                                <div className="w-[24px] h-[24px] tooltip">         
                                  <img src={baseUrl + texture?.images[0]}></img>
                                  <ImageTooltip imageUrl={baseUrl + texture?.images[0]}/>
                                </div>
                                <div>
                                  <input type="checkbox" checked={textureActive[index]}
                                    onChange={() => activeHandle(index, "texture")}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="border border-[#456779] p-2">
                    <div className="text-[#456779] flex justify-center text-[20px]">Holz</div>
                      {textureList.map((texture, index) => (
                        <div key={index}>
                          {texture.plate_sort === "Holz" && (
                            <div className="flex justify-between">
                              <div className="">{texture.name}</div>
                              <div className="flex gap-2">
                                <div className="w-[24px] h-[24px] tooltip">         
                                  <img src={baseUrl + texture?.images[0]}></img>
                                  <ImageTooltip imageUrl={baseUrl + texture?.images[0]}/>
                                </div>
                                <div>
                                  <input type="checkbox" checked={textureActive[index]}
                                    onChange={() => activeHandle(index, "texture")}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="border border-[#456779] p-2">
                      <div className="text-[#456779] flex justify-center text-[20px]">Holzdekor</div>
                      {textureList.map((texture, index) => (
                        <div key={index}>
                          {texture.plate_sort === "Holzdekor" && (
                            <div className="flex justify-between my-1">
                              <div className="">{texture.name}</div>
                              <div className="flex gap-2">
                                <div className="w-[24px] h-[24px] tooltip">         
                                  <img src={baseUrl + texture?.images[0]}></img>
                                  <ImageTooltip imageUrl={baseUrl + texture?.images[0]}/>
                                </div>
                                <div>
                                  <input type="checkbox" checked={textureActive[index]}
                                    onChange={() => activeHandle(index, "texture")}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="border border-[#456779] p-2">
                      <div className="text-[#456779] flex justify-center text-[20px]">Furnier</div>
                      {textureList.map((texture, index) => (
                        <div key={index}>
                          {texture.plate_sort === "Furnier" && (
                            <div className="flex justify-between">
                              <div className="">{texture.name}</div>
                              <div className="flex gap-2">
                                <div className="w-[24px] h-[24px] tooltip">         
                                  <img src={baseUrl + texture?.images}></img>
                                  <ImageTooltip imageUrl={baseUrl + texture?.images[0]}/>
                                </div>
                                <div>
                                  <input type="checkbox" checked={textureActive[index]}
                                    onChange={() => activeHandle(index, "texture")}
                                  ></input>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}
