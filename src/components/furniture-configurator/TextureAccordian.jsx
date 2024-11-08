import DropdownArrowMain from "/images/furniture_configurator/dropdown-arrow-main.png?url";
import DropdownCloseIcon from "/images/furniture_configurator/dropdown-close-icon.png?url";
import PlatesTest from "/images/furniture_configurator/plates-test.png?url";
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url";
// import Input from "../Input";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TexturevalidationSchema } from "../../Formik/FormikFunctions";
import {
  CreateTexture,
  EditTexture,
  DeleteTexture
} from "../../Functions-configurator/Function-configurator";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";

// import CustomColorpicker from "./CustomColorPicker"

// const baseUrl = 'https://storage.googleapis.com/schrankdesign-uploads/textures/';

export const HandlesAccordianBefore = ({ handleToggle, viewdata }) => {
  const HandleEdit = (id) => {
    localStorage.setItem("editDrawer_id", id);
    handleToggle();
  };
  return (
    <div className="flex flex-col sm:flex-row items-center gap-[15px] w-full flex-wrap justify-between">
      <div>
        <div className="w-[76px] h-[50px]">
          <img
            className="w-[76px] h-[50px]"
            src={
              viewdata?.map?.file
                ? viewdata?.map?.file
                : PlatesTest
            }
            alt="Plates_Test"
          />
        </div>
      </div>
      <div className="border-l-2 border-[#D9D9D9] flex-wrap px-6 py-1 flex flex-row items-center gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Name</h1>
        <div className="w-[170px]">
          <div className="relative">
            <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4">
              {viewdata?.name}
            </span>
          </div>
        </div>
      </div>
      <div className="border-l-2 border-[#D9D9D9] flex-wrap px-6 py-1 flex flex-row items-center gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Config ID</h1>
        <div className="w-[170px]">
          <div className="relative">
            <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4">
              {viewdata?.configId}
            </span>
          </div>
        </div>
      </div>
      <button
        className="w-[31px] shrink-0"
        onClick={() => HandleEdit(viewdata._id)}
      >
        <img src={DropdownArrowMain} alt="dropdown_arrow_main" />
      </button>
    </div>
  );
};

export const HandlesAccordianAfter = ({
  handleToggle,
  drawerlistUpdate,
  createDrawer,
  viewdata,
}) => {
  // const [Image, setImage] = useState();
  const [disabled, setdisabled] = useState(false);

  const [map, setMap] = useState();
  const [mapName, setMapName] = useState();
  const [normalMap, setNormalMap] = useState();
  const [normalMapName, setNormalMapName] = useState();
  const [aoMap, setAoMap] = useState();
  const [aoMapName, setAoMapName] = useState();
  const [roughnessMap, setRoughnessMap] = useState();
  const [roughnessMapName, setRoughnessMapName] = useState();
  const [metalnessMap, setMetalnessMap] = useState();
  const [metalnessMapName, setMetalnessMapName] = useState();
  const [displacementMap, setDisplacementMap] = useState();
  const [displacementMapName, setDisplacementMapName] = useState();

  // const [sheenPicker, setSheenPicker] = useState(false);
  const [sheen, setSheen] = useState("#ffffff");
  // const [colorPicker, setColorPicker] = useState(false);
  const [color, setColor] = useState("#ffffff");
  // const [emissivePicker, setEmissivePicker] = useState(false);
  const [emissive, setEmissive] = useState("#000000");

  const Handlesubmit = async (values, { resetForm }) => {
    setdisabled(true);
    
    let formdata = new FormData();
    for (const key in values) {
      switch (key) {
        case "color" :
          formdata.append(key, color)
          break
        case "emissive" :
          formdata.append(key, emissive)
          break
        case "sheen" :
          formdata.append(key, sheen)
          break
        case "map" :
          formdata.append(key, map)
          break
        case "mapName" :
          formdata.append(key, mapName)
          break
        case "normalMap" :
          formdata.append(key, normalMap)
          break
        case "normalMapName" :
          formdata.append(key, normalMapName)
          break
        case "aoMap" :
          formdata.append(key, aoMap)
          break
        case "aoMapName" :
          formdata.append(key, aoMapName)
          break
        case "displacementMap" :
          formdata.append(key, displacementMap)
          break
        case "displacementMapName" :
          formdata.append(key, displacementMapName)
          break
        case "metalnessMap" :
          formdata.append(key, metalnessMap)
          break
        case "metalnessMapName" :
          formdata.append(key, metalnessMapName)
          break
        case "roughnessMap" :
          formdata.append(key, roughnessMap)
          break
        case "roughnessMapName" :
          formdata.append(key, roughnessMapName)
          break
        default:
          formdata.append(key, values[key]);
          break
      }
    }
    if (createDrawer) {
      if (!map || !normalMap || !aoMap || !roughnessMap || !metalnessMap) {
        toast.error("Please select all the Maps");
      } else {
        const { data, error } = await CreateTexture(formdata);
        if (data) {
          resetForm();
          drawerlistUpdate(data?.data);
          toast.success(data?.message);
          // setImage("");
          setdisabled(false);
          handleToggle(); // Close the form or accordion section
        } else {
          toast.error(error?.message);
          setdisabled(false);
        }
      }
    } else {
      const id = localStorage.getItem("editDrawer_id");
      const { data, error } = await EditTexture(formdata, id)
      if (data) {
        toast.success(data?.message);
        drawerlistUpdate(data?.data);
        setdisabled(false);
        handleToggle(); // Close the form or accordion section
      } else {
        toast.error(error?.message);
        setdisabled(false);
      }
    }
  };

  const DeleteSelectedDrawer = async (id) => {
    setdisabled(true);
    const { data, error } = await DeleteTexture(id)
    if (data) {
      toast.success(data?.message);
      drawerlistUpdate(data?.data);
      setdisabled(false);
      handleToggle(); // Close the form or accordion section
    } else {
      toast.error(error?.message);
      setdisabled(false);
    }
  };
  useEffect(() => {
    if (viewdata?.map) {
      setMapName(viewdata?.map?.name)
      setMap(viewdata?.map?.file)
    }
  }, [viewdata?.map])
  useEffect(() => {
    if (viewdata?.normalMap) {
      setNormalMapName(viewdata?.normalMap?.name)
      setNormalMap(viewdata?.normalMap?.file)
    }
  }, [viewdata?.normalMap])
  useEffect(() => {
    if (viewdata?.aoMap) {
      setAoMapName(viewdata?.aoMap?.name)
      setAoMap(viewdata?.aoMap?.file)
    }
  }, [viewdata?.aoMap])
  useEffect(() => {
    if (viewdata?.displacementMap) {
      setDisplacementMapName(viewdata?.displacementMap?.name)
      setDisplacementMap(viewdata?.displacementMap?.file)
    }
  }, [viewdata?.displacementMap])
  useEffect(() => {
    if (viewdata?.metalnessMap) {
      setMetalnessMapName(viewdata?.metalnessMap?.name)
      setMetalnessMap(viewdata?.metalnessMap?.file)
    }
  }, [viewdata?.metalnessMap])
  useEffect(() => {
    if (viewdata?.roughnessMap) {
      setRoughnessMapName(viewdata?.roughnessMap?.name)
      setRoughnessMap(viewdata?.roughnessMap?.file)
    }
  }, [viewdata?.roughnessMap])
  useEffect(() => {
    if(viewdata?.color) {
      setColor(viewdata?.color.value)
    }
  }, [viewdata?.color])
  useEffect(() => {
    if(viewdata?.emissive) {
      setEmissive(viewdata?.emissive.value)
    }
  }, [viewdata?.emissive])
  useEffect(() => {
    if(viewdata?.sheen) {
      setSheen(viewdata?.sheen.value)
    }
  }, [viewdata?.sheen])

  const DrawerinitialValues = {
    name: viewdata?.name || "",
    configId: viewdata?.configId || "",

    map: viewdata?.map?.file || "",
    mapName: viewdata?.map?.name || "",
    normalMap: viewdata?.normalMap?.file || "",
    normalMapName: viewdata?.normalMap?.name || "",
    aoMap: viewdata?.aoMap?.file || "",
    aoMapName: viewdata?.aoMap?.name,
    displacementMap: viewdata?.displacementMap?.file || "",
    displacementMapName: viewdata?.displacementMap?.name || "",
    metalnessMap: viewdata?.metalnessMap?.file || "",
    metalnessMapName: viewdata?.metalnessMap?.name || "",
    roughnessMap: viewdata?.roughnessMap?.file || "",
    roughnessMapName: viewdata?.roughnessMap?.name || "",

    roughness: viewdata?.roughness?.value || "",
    roughnessActive: viewdata?.roughness?.active || false,
    metalness: viewdata?.metalness?.value || "",
    metalnessActive: viewdata?.metalness?.active || false,
    normalScaleX: viewdata?.normalScale?.value?.x || "",
    normalScaleY: viewdata?.normalScale?.value?.y || "",
    normalScaleActive: viewdata?.normalScale?.active || false,
    displacementScale: viewdata?.displacementScale?.value || "",
    displacementScaleActive: viewdata?.displacementScale?.active || false,
    color: viewdata?.color?.value || "",
    colorActive: viewdata?.color?.active || false,
    emissive: viewdata?.emissive?.value || "",
    emissiveActive: viewdata?.emissive?.active || false,
    emissiveIntensity: viewdata?.emissiveIntensity?.value || "",
    emissiveIntensityActive: viewdata?.emissiveIntensity?.active || false,

    clearcoat: viewdata?.clearcoat?.value,
    clearcoatActive: viewdata?.clearcoat?.active || false,
    clearcoatRoughness: viewdata?.clearcoatRoughness?.value || "",
    clearcoatRoughnessActive: viewdata?.clearcoatRoughness?.active || false,
    reflectivity: viewdata?.reflectivity?.value|| "",
    reflectivityActive: viewdata?.reflectivity?.active || false,
    transparent: viewdata?.transparent?.value || "",
    transparentActive: viewdata?.transparent?.active || false,
    opacity: viewdata?.opacity?.value || "",
    opacityActive: viewdata?.opacity?.active || false,
    ior: viewdata?.ior?.value || "",
    iorActive: viewdata?.ior?.active || false,
    sheen: viewdata?.sheen?.value || "",
    sheenActive: viewdata?.sheen?.active || false,
  };

  const setMapFunction = (e, type, formik) => {
    const tempFile = e.target.files[0];
    switch (type) {
      case "map":
        setMap(tempFile);
        setMapName(tempFile.name);
        formik.setFieldValue("map", tempFile);
        break;
      case "normalMap":
        setNormalMap(tempFile);
        setNormalMapName(tempFile.name);
        break;
      case "aoMap":
        setAoMap(tempFile);
        setAoMapName(tempFile.name);
        break;
      case "displacementMap":
        setDisplacementMap(tempFile);
        setDisplacementMapName(tempFile.name);
        break;
      case "metalnessMap":
        setMetalnessMap(tempFile);
        setMetalnessMapName(tempFile.name);
        break;
      case "roughnessMap":
        setRoughnessMap(tempFile);
        setRoughnessMapName(tempFile.name);
        break;
    }
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={DrawerinitialValues}
        onSubmit={Handlesubmit}
        validationSchema={TexturevalidationSchema}
        enableReinitialize
      >
        {(formik) => (
          <Form className="w-full">
            <div className="flex px-5 pt-5">
              <div className="mr-auto flex items-center gap-2">
                <div>
                  <div className="flex">Name: </div>
                  <div className="w-[150px]">
                    <Field
                      className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                      id={"name"}
                      name={"name"}
                    />
                    <ErrorMessage
                      name={"name"}
                      component="div"
                      className="mt-2 text-red-500"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex">Texture-ID: </div>
                  <div className="w-[150px]">
                    <Field
                      className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                      id={"configId"}
                      name={"configId"}
                      disabled
                    />
                    <ErrorMessage
                      name={"configId"}
                      component="div"
                      className="mt-2 text-red-500"
                    />
                  </div>
                </div>
              </div>
              <div className="m-auto font-bold" style={{ fontSize: "25px" }}>
                Texture
              </div>
              <div className="ml-auto">
                <button
                  className="w-[31px]"
                  onClick={() => {
                    localStorage.removeItem("editDrawer_id");
                    handleToggle();
                  }}
                >
                  <img src={DropdownCloseIcon} alt="dropdown_arrow_main" />
                </button>
              </div>
            </div>
            <div className="flex px-5">
              <div
                className="mr-auto"
                style={{ fontSize: "25px", color: "#456779" }}
              >
                Mapping
              </div>
              <div
                className="mr-auto"
                style={{ fontSize: "25px", color: "#456779" }}
              >
                Settings
              </div>
              <div className="ml-auto flex gap-2">
                {!createDrawer && (
                  <button
                    disabled={disabled}
                    onClick={() => DeleteSelectedDrawer(viewdata?._id)}
                    className="cursor-pointer"
                  >
                    <img
                      className="w-[28px]"
                      src={DeleteIcon}
                      alt="DeleteIcon"
                    />
                  </button>
                )}
                <div>
                  <button
                    // disabled={disabled}
                    type="submit"
                    className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <div className="flex px-5">
              <div className="w-[30%] mr-auto">
                <div className="flex justify-between items-center my-2">
                  <div>Map</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[200px] relative">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"mapName"}
                        name={"mapName"}
                        value={mapName}
                      />
                      <ErrorMessage
                        name={"mapName"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0"
                        onChange={(e) => {
                          setMapFunction(e, "map", formik);
                        }}
                      ></input>
                    </div>
                    <div className="h-[30px] w-[30px] flex items-center bg-[#C4C4C4] border-[1px] border-black rounded-[5px]">
                      {map ? (
                        <img 
                          src={ typeof map === 'string' ? map : URL.createObjectURL(map)} 
                        />
                      ) : (
                        <img
                          src="/images/furniture_configurator/map.png"
                          className="h-[19px] w-[19px] m-auto"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center my-2">
                  <div>NormalMap</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[200px] relative">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"normalMapName"}
                        name={"normalMapName"}
                        value={normalMapName}
                      />
                      <ErrorMessage
                        name={"normalMapName"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0"
                        onChange={(e) => {
                          setMapFunction(e, "normalMap");
                        }}
                      ></input>
                    </div>
                    <div className="h-[30px] w-[30px] flex items-center bg-[#C4C4C4] border-[1px] border-black rounded-[5px]">
                      {normalMap ? (
                        <img 
                        src={ typeof normalMap === 'string' ? normalMap : URL.createObjectURL(normalMap)} 
                      />
                      ) : (
                        <img
                          src="/images/furniture_configurator/map.png"
                          className="h-[19px] w-[19px] m-auto"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center my-2">
                  <div>AoMap</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[200px] relative">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"aoMapName"}
                        name={"aoMapName"}
                        value={aoMapName}
                      />
                      <ErrorMessage
                        name={"aoMapName"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0"
                        onChange={(e) => {
                          setMapFunction(e, "aoMap");
                        }}
                      ></input>
                    </div>
                    <div className="h-[30px] w-[30px] flex items-center bg-[#C4C4C4] border-[1px] border-black rounded-[5px]">
                      {aoMap ? (
                        <img 
                        src={ typeof aoMap === 'string' ? aoMap : URL.createObjectURL(aoMap)} 
                      />
                      ) : (
                        <img
                          src="/images/furniture_configurator/map.png"
                          className="h-[19px] w-[19px] m-auto"
                        />
                      )}
                    </div>
                  </div>
                </div>
                {/* <div className="flex justify-between items-center my-2">
                  <div>DisplacementMap</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[200px] relative">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"displacementMapName"}
                        name={"displacementMapName"}
                        value={displacementMapName}
                      />
                      <ErrorMessage
                        name={"displacementMapName"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0"
                        onChange={(e) => {
                          setMapFunction(e, "displacementMap");
                        }}
                      ></input>
                    </div>
                    <div className="h-[30px] w-[30px] flex items-center bg-[#C4C4C4] border-[1px] border-black rounded-[5px]">
                      {displacementMap ? (
                        <img 
                        src={ typeof displacementMap === 'string' ? displacementMap : URL.createObjectURL(displacementMap)} 
                      />
                      ) : (
                        <img
                          src="/images/furniture_configurator/map.png"
                          className="h-[19px] w-[19px] m-auto"
                        />
                      )}
                    </div>
                  </div>
                </div> */}
                <div className="flex justify-between items-center my-2">
                  <div>MetalnessMap</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[200px] relative">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"metalnessMapName"}
                        name={"metalnessMapName"}
                        value={metalnessMapName}
                      />
                      <ErrorMessage
                        name={"metalnessMapName"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0"
                        onChange={(e) => {
                          setMapFunction(e, "metalnessMap");
                        }}
                      ></input>
                    </div>
                    <div className="h-[30px] w-[30px] flex items-center bg-[#C4C4C4] border-[1px] border-black rounded-[5px]">
                      {metalnessMap ? (
                        <img 
                        src={ typeof metalnessMap === 'string' ? metalnessMap : URL.createObjectURL(metalnessMap)} 
                      />
                      ) : (
                        <img
                          src="/images/furniture_configurator/map.png"
                          className="h-[19px] w-[19px] m-auto"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center my-2">
                  <div>RoughnessMap</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[200px] relative">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"roughnessMapName"}
                        name={"roughnessMapName"}
                        value={roughnessMapName}
                      />
                      <ErrorMessage
                        name={"roughnessMapName"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                      <input
                        type="file"
                        className="absolute inset-0 opacity-0"
                        onChange={(e) => {
                          setMapFunction(e, "roughnessMap");
                        }}
                      ></input>
                    </div>
                    <div className="h-[30px] w-[30px] flex items-center bg-[#C4C4C4] border-[1px] border-black rounded-[5px]">
                      {roughnessMap ? (
                        <img 
                        src={ typeof roughnessMap === 'string' ? roughnessMap : URL.createObjectURL(roughnessMap)} 
                      />
                      ) : (
                        <img
                          src="/images/furniture_configurator/map.png"
                          className="h-[19px] w-[19px] m-auto"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[2px] bg-[#D9D9D9] h-auto " />
              <div className="w-[30%] m-auto">
                <div className="flex justify-between items-center my-2">
                  <div>roughness</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[150px]">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"roughness"}
                        name={"roughness"}
                      />
                      <ErrorMessage
                        name={"roughness"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                    {/* <div>
                      <Field
                        id={"roughnessActive"}
                        name={"roughnessActive"}
                        type="checkbox"
                      />
                    </div> */}
                  </div>
                </div>
                <div className="flex justify-between items-center my-2">
                  <div>metalness</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[150px]">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"metalness"}
                        name={"metalness"}
                      />
                      <ErrorMessage
                        name={"metalness"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                    {/* <div>
                      <Field
                        id={"metalnessActive"}
                        name={"metalnessActive"}
                        type="checkbox"
                      />
                    </div> */}
                  </div>
                </div>
                <div className="flex justify-between items-center my-2">
                  <div>normalScale</div>
                  <div className="flex items-center gap-4">
                    <div className=" ">
                      <div className="relative flex w-[150px] h-[32px] items-center border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4">
                        <div>{"("}</div>
                        <div className="px-2">
                          <Field
                            className="w-[30px] h-[24px] outline-none border-b border-solid border-black "
                            id={"normalScaleX"}
                            name={"normalScaleX"}
                          />
                        </div>
                        <div>{","}</div>
                        <div className=" px-2">
                          <Field
                            className="w-[30px] h-[24px] outline-none border-b border-solid border-black"
                            id={"normalScaleY"}
                            name={"normalScaleY"}
                          />
                        </div>
                        <div>{")"}</div>
                      </div>
                      {/* <div> */}
                        <ErrorMessage
                          name={"normalScaleX"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                        <ErrorMessage
                          name={"normalScaleY"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                      {/* </div> */}
                    </div>
                    {/* <div>
                      <Field
                        id={"normalScaleActive"}
                        name={"normalScaleActive"}
                        type="checkbox"
                      />
                    </div> */}
                  </div>
                </div>
                <div className="flex justify-between items-center my-2">
                  <div>aoMapIntensity</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[150px]">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"displacementScale"}
                        name={"displacementScale"}
                      />
                      <ErrorMessage
                        name={"displacementScale"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                    {/* <div>
                      <Field
                        id={"displacementScaleActive"}
                        name={"displacementScaleActive"}
                        type="checkbox"
                      />
                    </div> */}
                  </div>
                </div>
                {/* <div className="flex justify-between items-center my-2">
                  <div>color</div>
                  <div className="flex items-center gap-4 relative">
                    <div
                      className="w-[150px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setColorPicker(true);
                      }}
                    >
                      <Field
                        className="block cursor-pointer text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"color"}
                        name={"color"}
                        value={color}
                      />
                      <ErrorMessage
                        name={"color"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                    <div>
                      <Field
                        id={"colorActive"}
                        name={"colorActive"}
                        type="checkbox"
                      />
                    </div>
                    {colorPicker && (
                      <CustomColorpicker
                        color={color}
                        setColor={setColor}
                        setColorPicker={setColorPicker}
                      />
                    )}
                  </div>
                </div> */}
                {/* <div className="flex justify-between items-center my-2">
                  <div>emissive</div>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-[150px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEmissivePicker(true);
                      }}
                    >
                      <Field
                        className="block cursor-pointer text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"emissive"}
                        name={"emissive"}
                        value={emissive}
                      />
                      <ErrorMessage
                        name={"emissive"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                    <div>
                      <Field
                        id={"emissiveActive"}
                        name={"emissiveActive"}
                        type="checkbox"
                      />
                    </div>
                    {emissivePicker && (
                      <CustomColorpicker
                        color={emissive}
                        setColor={setEmissive}
                        setColorPicker={setEmissivePicker}
                      />
                    )}
                  </div>
                </div> */}
                <div className="flex justify-between items-center my-2">
                  <div>emissiveIntensity</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[150px]">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"emissiveIntensity"}
                        name={"emissiveIntensity"}
                      />
                      <ErrorMessage
                        name={"emissiveIntensity"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                    {/* <div>
                      <Field
                        id={"emissiveIntensityActive"}
                        name={"emissiveIntensityActive"}
                        type="checkbox"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
              <div className="w-[2px] bg-[#D9D9D9] h-auto " />
              <div className="w-[30%] ml-auto">
                <div className="flex justify-between items-center my-2">
                  <div>clearcoat</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[150px]">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"clearcoat"}
                        name={"clearcoat"}
                      />
                      <ErrorMessage
                        name={"clearcoat"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                    {/* <div>
                      <Field
                        id={"clearcoatActive"}
                        name={"clearcoatActive"}
                        type="checkbox"
                      />
                    </div> */}
                  </div>
                </div>
                <div className="flex justify-between items-center my-2">
                  <div>envMapIntensity</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[150px]">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"clearcoatRoughness"}
                        name={"clearcoatRoughness"}
                      />
                      <ErrorMessage
                        name={"clearcoatRoughness"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                    {/* <div>
                      <Field
                        id={"clearcoatRoughnessActive"}
                        name={"clearcoatRoughnessActive"}
                        type="checkbox"
                      />
                    </div> */}
                  </div>
                </div>
                <div className="flex justify-between items-center my-2">
                  <div>reflectivity</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[150px]">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"reflectivity"}
                        name={"reflectivity"}
                      />
                      <ErrorMessage
                        name={"reflectivity"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                    {/* <div>
                      <Field
                        id={"reflectivityActive"}
                        name={"reflectivityActive"}
                        type="checkbox"
                      />
                    </div> */}
                  </div>
                </div>
                <div className="flex justify-between items-center my-2">
                  <div>specularIntensity</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[150px]">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"transparent"}
                        name={"transparent"}
                      />
                      <ErrorMessage
                        name={"transparent"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                    {/* <div>
                      <Field
                        id={"transparentActive"}
                        name={"transparentActive"}
                        type="checkbox"
                      />
                    </div> */}
                  </div>
                </div>
                {/* <div className="flex justify-between items-center my-2">
                  <div>opacity</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[150px]">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"opacity"}
                        name={"opacity"}
                      />
                      <ErrorMessage
                        name={"opacity"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div> */}
                <div className="flex justify-between items-center my-2">
                  <div>ior</div>
                  <div className="flex items-center gap-4">
                    <div className="w-[150px]">
                      <Field
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"ior"}
                        name={"ior"}
                      />
                      <ErrorMessage
                        name={"ior"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                    {/* <div>
                      <Field
                        id={"iorActive"}
                        name={"iorActive"}
                        type="checkbox"
                      />
                    </div> */}
                  </div>
                </div>
                {/* <div className="flex justify-between items-center my-2">
                  <div>sheen</div>
                  <div className="flex items-center gap-4 relative">
                    <div
                      className="w-[150px] cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSheenPicker(true);
                      }}
                    >
                      <Field
                        className="block cursor-pointer text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"sheen"}
                        name={"sheen"}
                        value={sheen}
                      />
                      <ErrorMessage
                        name={"sheen"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                    <div>
                      <Field
                        id={"sheenActive"}
                        name={"sheenActive"}
                        type="checkbox"
                      />
                    </div>
                    {sheenPicker && (
                      <CustomColorpicker
                        color={sheen}
                        setColor={setSheen}
                        setColorPicker={setSheenPicker}
                      />
                    )}
                  </div>
                </div> */}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
