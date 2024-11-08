import DropdownArrowMain from "/images/furniture_configurator/dropdown-arrow-main.png?url";
import DropdownCloseIcon from "/images/furniture_configurator/dropdown-close-icon.png?url";
// import DrawerTest from "/images/furniture_configurator/drawer-test.png?url";
import PlatesTest from "/images/furniture_configurator/plates-test.png?url";
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url";
// import Input from "../Input";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { HandlevalidationSchema } from "../../Formik/FormikFunctions";
import {
  CreateDrawer,
  DeleteDrawer,
  EditDrawer,
  UpdateList,
  AddDrawerList,
  DeleteVariation
} from "../../Functions-configurator/Function-configurator";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

import HandleImage from "/images/furniture_configurator/handlePositionImage.png?url";
import DirectImage from "/images/furniture_configurator/directImage.png?url";
import PositionControlImage from "/images/furniture_configurator/positionControlImage.svg?url";
import SettingIcon from "@src/assets/icons/setting.png";
// import CustomColorpicker from "./CustomColorPicker";
import { FileUpload } from "primereact/fileupload";

import CustomField from "./CustomField";

export const HandlesAccordianBefore = ({ handleToggle, viewdata }) => {
  // const baseUrl = import.meta.env.VITE_BACKEND_URL_img;
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
              viewdata?.images?.length > 0
                ? `${viewdata?.images[0]}`
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
            <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-2 whitespace-nowrap overflow-hidden text-ellipsis">
              {viewdata?.name}
            </span>
          </div>
        </div>
      </div>
      <div className="border-l-2 border-[#D9D9D9] flex-wrap px-6 py-1 flex flex-row items-center gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Config ID</h1>
        <div className="w-[170px]">
          <div className="relative">
            <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4 whitespace-nowrap overflow-hidden text-ellipsis">
              {viewdata?.configId}
            </span>
          </div>
        </div>
      </div>
      <div className="border-l-2 border-[#D9D9D9] flex-wrap px-6 py-1 flex flex-row items-center gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Price Einkauf</h1>
        <div className="w-[170px]">
          <div className="relative">
            <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4 whitespace-nowrap overflow-hidden text-ellipsis">
              {viewdata?.price_einkauf}
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
  // const baseUrl = import.meta.env.VITE_BACKEND_URL_img;
  const [Image, setImage] = useState();
  const [disabled, setdisabled] = useState(false);
  const fileInputRef = useRef(null);
  const colorInputRef = useRef(null);

  const addFileInputRef = useRef(null);
  const addColorInputRef = useRef(null)

  const variableFileInputRef = useRef(null);
  const variableColorInputRef = useRef(null)
  // const [colorPicker, setColorPicker] = useState(false);
  const [color, setColor] = useState();
  const [setting, setSetting] = useState(false);
  const [addVariation, setAddVariation] = useState(false);

  const [lists, setLists] = useState();
  const [AddImage, setAddImage] = useState();
  const [AddGltf, setAddGltf] = useState();
  const [AddColor, setAddColor] = useState()
  const [AddGltfTitle, setAddGltfTitle] = useState();

  const [variableImage, setVariableImage] = useState();
  const [variableVisible, setVariableVisible] = useState(-1);
  const [variableColor, setVariableColor] = useState()
  const [variableColorVisible, setVariableColorVisible] = useState()

  useEffect(() => {
    setLists(viewdata?.list);
  }, [viewdata?.list]);
  useEffect(() => {
    if (viewdata?.color)
      setColor(`${viewdata?.color}`);
  }, [viewdata?.color])
  useEffect(() => {
    if (viewdata?.images?.length > 0)
      setImage(`${viewdata?.images[0]}`);
  }, [viewdata?.images[0]]);

  const Handlesubmit = async (values, { resetForm }) => {
    setdisabled(true);
    if (createDrawer) {
      const { data, error } = await CreateDrawer(values, "createhandle");
      if (data) {
        resetForm();
        drawerlistUpdate(data?.data);
        toast.success(data?.message);
        setImage("");
        setdisabled(false);
        handleToggle(); // Close the form or accordion section
      } else {
        toast.error(error?.message);
        setdisabled(false);
      }
    } else {
      const id = localStorage.getItem("editDrawer_id");
      const { data, error } = await EditDrawer(values, id, "updatehandle");
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
  const addVariationSubmit = async (values) => {
    const id = localStorage.getItem("editDrawer_id");
    let formData = new FormData();
    formData.append("images", AddImage);
    formData.append("gltf", AddGltf);
    formData.append("gltf_title", AddGltfTitle)
    formData.append("name", values.addName);
    formData.append("price_einkauf", values.addPrice_einkauf);
    formData.append("color", AddColor)
    const { data, error } = await AddDrawerList(id, formData, "addList");
    if (data) {
      setLists(data?.data);
      setAddVariation(true);
      toast.success(data?.message);
    } else {
      toast.error(error?.message);
        setdisabled(false);
    }
  };
  const variationUpdateSubmit = async (values) => {
    const id = localStorage.getItem("editDrawer_id");
    let formdata = new FormData();
    formdata.append("index", values.index);
    formdata.append("name", values.name);
    formdata.append("price_einkauf", values.price_einkauf);
    formdata.append("images", variableImage);
    formdata.append("gltf", values.gltf);
    formdata.append("gltf_title", values.gltf_title)
    formdata.append("color", variableColor)
    const { data, error } = await UpdateList(id, formdata, "updateList");
    if (data) {
      setLists(data?.data);
      toast.success(data?.message);
    } else {
      toast.error(error?.message);
        setdisabled(false);
    }
  };

  const DeleteSelectedDrawer = async (id) => {
    setdisabled(true);
    const { data, error } = await DeleteDrawer(id, "deletehandle");
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
  const DeleteSelectedVariation = async (id, index) => {
    const { data, error } = await DeleteVariation(id, index, "deletevariation")
    if (data) {
      setLists(data?.data);
      toast.success(data?.message)
    } else {
      toast.error(error?.message);
        setdisabled(false);
    }
  }

  const DrawerinitialValues = {
    name: viewdata?.name || "",
    configId: viewdata?.configId || "",
    supplier_id: viewdata?.supplier_id || "",
    price_einkauf: viewdata?.price_einkauf || "",
    price_aufschlag: viewdata?.price_aufschlag || "",
    con_asset_time_pcs: viewdata?.con_asset_time_pcs || "",
    pack_asset_time_pcs: viewdata?.pack_asset_time_pcs || "",
    images: viewdata?.images[0] || "",
    gltf: viewdata?.gltf || "",
    standHeight: viewdata?.handle?.standardHeight || "",
    handleXH: viewdata?.handle?.horizontal?.handleX || "",
    handleYH: viewdata?.handle?.horizontal?.handleY || "",
    minLength: viewdata?.handle?.minLength || "",
    minHeight: viewdata?.handle?.minHeight || "",
    handleXV: viewdata?.handle?.vertical?.handleX || "",
    handleYV: viewdata?.handle?.vertical?.handleY || "",
    yOffset: viewdata?.yOffset || "",
    zOffset: viewdata?.zOffset || "",
    xOffset: viewdata?.xOffset || "",
    offSet: viewdata?.offSet || "",
    color: viewdata?.color || "",
    priority: viewdata?.priority || "",
    gltf_title: viewdata?.gltf_title || "",
    length: viewdata?.length || "",
    weight: viewdata?.weight || "",
    material: viewdata?.material || "",
    description: viewdata?.description || ""
  };
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (e, formik) => {
    const selectedFile = e.target.files[0];
    setImage(URL.createObjectURL(selectedFile));
    formik.setFieldValue("images", selectedFile);
  };
  const handleGltfChange = async (event, formik) => {
    const selectedFile = event.files[0];
    // setGltf(URL.createObjectURL(selectedFile));
    formik.setFieldValue("gltf", selectedFile);
    formik.setFieldValue("gltf_title", selectedFile.name)
  };
  const handleColorClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };
  const handleColorChange = (e, formik) => {
    const selectedFile = e.target.files[0];
    setColor(URL.createObjectURL(selectedFile));
    formik.setFieldValue("color", selectedFile);
  };
  ///add
  const handleAddImageClick = () => {
    if (addFileInputRef.current) {
      addFileInputRef.current.click();
    }
  };
  const handleAddFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setAddImage(selectedFile);
  };
  const handleAddGltfChange = async (event) => {
    const selectedFile = event.files[0];
    setAddGltf(selectedFile);
    setAddGltfTitle(selectedFile.name)
  };
  const handleAddColorClick = () => {
    if (addColorInputRef.current) {
      addColorInputRef.current.click();
    }
  }
  const handleAddColorChange = (e) => {
    const selectedFile = e.target.files[0];
    setAddColor(selectedFile);
  };

  ///variable
  const handleVariableImageClick = (index) => {
    if (variableFileInputRef.current) {
      variableFileInputRef.current.click();
      setVariableVisible(index);
    }
  };
  const handleVariableFileChange = (e, formik) => {
    const selectedFile = e.target.files[0];
    setVariableImage(selectedFile);
    formik.setFieldValue("images", selectedFile);
  };
  const handleVariableColorClick = (index) => {
    if (variableColorInputRef.current) {
      variableColorInputRef.current.click();
      setVariableColorVisible(index)
    }
  }
  const handleVariableColorChange = (e, formik) => {
    const selectedFile = e.target.files[0];
    setVariableColor(selectedFile);
    formik.setFieldValue("color", selectedFile)
  };
  return (
    <div className="w-full">
      <Formik
        initialValues={DrawerinitialValues}
        onSubmit={Handlesubmit}
        validationSchema={HandlevalidationSchema}
        enableReinitialize
      >
        {(formik) => (
          <Form className="w-full">
            <div className="flex justify-between flex-wrap py-5 pl-5 pr-16 relative">
              <div className="flex items-center justify-center h-full">
                <div
                  className="w-[182px] text-lg cursor-pointer h-48 bg-[#F6F6F6] flex items-center justify-center"
                  onClick={handleImageClick}
                >
                  {!Image && "upload image"}
                  {Image && (
                    <img
                      className="w-full h-full"
                      src={Image ? Image : viewdata.images[0]}
                      alt="Plates_TEst"
                    />
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept=".jpeg, .jpg, .png"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e, formik)}
                  />
                </div>
              </div>
              <div className="w-[2px] bg-[#D9D9D9] h-full" />
              <div className="flex flex-col items-center justify-between h-full">
                <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-medium">Name</h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
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
                </div>
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-medium">
                    Config ID
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"configId"}
                        name={"configId"}
                        disabled = {true}
                      />
                      <ErrorMessage
                        name={"configId"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-medium">
                    Supplier ID
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                        id={"supplier_id"}
                        name={"supplier_id"}
                      />
                      <ErrorMessage
                        name={"supplier_id"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-semibold">
                    Construction Time
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"con_asset_time_pcs"}
                        name={"con_asset_time_pcs"}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                        <p className="text-[18px] leading-[30px] font-[karla] font-normal">
                          min
                        </p>
                      </div>
                      <ErrorMessage
                        name={"con_asset_time_pcs"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-semibold">
                    Length
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"length"}
                        name={"length"}
                      />
                      <ErrorMessage
                        name={"length"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-semibold">
                    Weight
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"weight"}
                        name={"weight"}
                      />
                      <ErrorMessage
                        name={"weight"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[2px] bg-[#D9D9D9] h-full" />
              <div className="flex flex-col  items-start gap-[20px]">
                <div className="flex flex-row  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-medium">
                    Price Einkauf{" "}
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"price_einkauf"}
                        name={"price_einkauf"}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                        <p className="text-[16px] leading-[30px] font-[karla] font-normal">
                          €/pcs
                        </p>
                      </div>
                      <ErrorMessage
                        name={"price_einkauf"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-medium">
                    Price-Profit
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"price_aufschlag"}
                        name={"price_aufschlag"}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                        <p className="text-[16px] leading-[30px] font-[karla] font-normal">
                          %
                        </p>
                      </div>
                      <ErrorMessage
                        name={"price_aufschlag"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-semibold">
                    Packing Time
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"pack_asset_time_pcs"}
                        name={"pack_asset_time_pcs"}
                      />
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                        <p className="text-[18px] leading-[30px] font-[karla] font-normal">
                          min
                        </p>
                      </div>
                      <ErrorMessage
                        name={"pack_asset_time_pcs"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-semibold">
                    Priority
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"priority"}
                        name={"priority"}
                      />
                      <ErrorMessage
                        name={"priority"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row  justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-semibold">
                    Material
                  </h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <CustomField
                        className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                        id={"material"}
                        name={"material"}
                      />
                      <ErrorMessage
                        name={"material"}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[2px] bg-[#D9D9D9] h-full" />

              <div className="flex flex-row items-end gap-[25px] h-full mt-auto">
                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-[5px]">
                    <div className="flex flex-row justify-between gap-6">
                      <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                        Price selling:
                      </h1>
                      <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                        {(() => {
                          const price_einkauf =
                            +formik?.values?.price_einkauf || 0;
                          const price_aufschlag =
                            +formik?.values?.price_aufschlag || 0;
                          const totalSalePrice = parseFloat(
                            (
                              price_einkauf +
                              (price_einkauf * price_aufschlag) / 100
                            ).toFixed(2)
                          );

                          // Displaying the calculated total sale price
                          return `${totalSalePrice} €/pcs`; // Display the area in square meters
                        })()}
                      </h1>
                    </div>
                    <div className="flex flex-row justify-between gap-6">
                      <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                        Profit per pcs:
                      </h1>
                      <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                        {(() => {
                          const price_einkauf =
                            +formik?.values?.price_einkauf || 0;
                          const price_aufschlag =
                            +formik?.values?.price_aufschlag || 0;
                          const totalProfit = parseFloat(
                            ((price_einkauf * price_aufschlag) / 100).toFixed(2)
                          );

                          // Displaying the calculated total sale price
                          return `${totalProfit} €/pcs`; // Display the area in square meters
                        })()}
                      </h1>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
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
                        disabled={disabled}
                        type="submit"
                        className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button
                className="absolute right-5 top-5 w-[31px]"
                onClick={() => {
                  localStorage.removeItem("editDrawer_id");
                  handleToggle();
                }}
              >
                <img src={DropdownCloseIcon} alt="dropdown_arrow_main" />
              </button>
            </div>
            <div className="">
              <div className="flex float-right ml-[182px] mr-16">
                <div className="m-4">Handle Description</div>
                <div className="rounded-[5px]">
                  <Field component="textarea" className="outline-none w-[32.5rem] border border-black rounded-[5px] h-[100px]"  name="description"></Field>
                  <ErrorMessage
                    name={"description"}
                    component="div"
                    className="mt-2 text-red-500"
                  />
                </div>
              </div>
            </div>
            <div className="h-[90px]">
              <div className="flex float-right py-5 pl-5 pr-16">
                <div className="flex flex-col mb-2 gap-[20px]">
                  <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Color-Image
                    </h1>
                    <div className="w-[170px]">
                      <div
                        className="w-[100px] text-lg cursor-pointer h-10 bg-[#F6F6F6] flex items-center justify-center"
                        onClick={handleColorClick}
                      >
                        {!color && "upload image"}
                        {color && (
                          <img
                            className="w-full h-full"
                            src={color ? color : viewdata.images[0]}
                            alt="Plates_TEst"
                          />
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpeg, .jpg, .png"
                          ref={colorInputRef}
                          onChange={(e) => handleColorChange(e, formik)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center flex-row gap-[25px] h-full">
                  <div className="card flex justify-content-center">
                    <FileUpload
                      mode="basic"
                      id="gltf"
                      name="gltf"
                      accept="*.*"
                      // maxFileSize={1000000}
                      customUpload
                      chooseLabel={ DrawerinitialValues.gltf_title ? DrawerinitialValues.gltf_title : "Choose"}
                      onSelect={(event) => handleGltfChange(event, formik)}
                      className="bg-[#456779] text-white rounded-[5px] font-bold pl-5 pr-5 flex items-center justify-center"
                    />
                  </div>
                  {!createDrawer && (
                    <div className="gap-[25px]">
                      <button
                        disabled={disabled}
                        onClick={() => {
                          addVariation
                            ? setAddVariation(false)
                            : setAddVariation(true);
                          setSetting(false);
                        }}
                        type="button"
                        className="font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                      >
                        ADD - Variation
                      </button>
                    </div>
                  )}

                  <div className="left-0">
                    <button
                      disabled={disabled}
                      onClick={() => {
                        setting ? setSetting(false) : setSetting(true);
                        setAddVariation(false);
                      }}
                      type="button"
                      className="flex items-center font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                    >
                      <img
                        src={SettingIcon}
                        className="w-[20px] h-[20px] mx-2"
                        alt="Settings Icon"
                      />
                      <span>Settings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {setting && (
              <div className="w-full flex justify-between flex-wrap py-5 pl-5 pr-16 relative border-t-[3px] border-t-[#000000]">
                <div className="flex flex-col items-center justify-between h-full">
                  <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Standard Height =
                    </h1>
                    <div className="w-[100px]">
                      <div className="relative flex">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                          id={"standHeight"}
                          name={"standHeight"}
                        />
                        <ErrorMessage
                          name={"standHeight"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                        <h1>1</h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Handle X =
                    </h1>
                    <div className="w-[100px]">
                      <div className="relative flex">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                          id={"handleXH"}
                          name={"handleXH"}
                        />
                        <ErrorMessage
                          name={"handleXH"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                        <h1>2</h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Handle Y =
                    </h1>
                    <div className="w-[100px]">
                      <div className="relative flex">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-4"
                          id={"handleYH"}
                          name={"handleYH"}
                        />
                        <ErrorMessage
                          name={"handleYH"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                        <h1>3</h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Min Lenght =
                    </h1>
                    <div className="w-[100px]">
                      <div className="relative flex">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-3"
                          id={"minLength"}
                          name={"minLength"}
                        />
                        <ErrorMessage
                          name={"minLength"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                        <h1>4</h1>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Min Height =
                    </h1>
                    <div className="w-[100px]">
                      <div className="relative flex">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-3"
                          id={"minHeight"}
                          name={"minHeight"}
                        />
                        <ErrorMessage
                          name={"minHeight"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                        <h1>5</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center h-full">
                  <div className="w-[200px] text-lg cursor-pointer h-48 bg-[#F6F6F6] flex items-center justify-center">
                    <img
                      className="w-[200px] h-[200px]"
                      src={HandleImage}
                      alt="Plates_TEst"
                    />
                  </div>
                </div>
                <div className="w-[2px] bg-[#000000] mt-[-20px] h-auto" />
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-[160px] text-lg cursor-pointerbg-[#F6F6F6] flex items-center justify-center">
                    <img
                      className="w-[160px]"
                      src={DirectImage}
                      alt="Plates_TEst"
                    />
                  </div>
                  <div className="flex flex-row  justify-between w-full gap-[25px] mb-2">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      90° Function
                    </h1>
                    <div className="w-[100px]">
                      {/* <div className="relative">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                          id={"yOffset"}
                          name={"yOffset"}
                        />
                        <ErrorMessage
                          name={"yOffset"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                      </div> */}
                    </div>
                  </div>
                  <div className="flex flex-row  justify-between w-full gap-[25px] mb-2">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Handle X =
                    </h1>
                    <div className="w-[100px]">
                      <div className="relative">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-3"
                          id={"handleXV"}
                          name={"handleXV"}
                        />
                        <ErrorMessage
                          name={"handleXV"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row  justify-between w-full gap-[25px] mb-2">
                    <h1 className="font-[karla] text-[20px] font-medium">
                      Handle Y =
                    </h1>
                    <div className="w-[100px]">
                      <div className="relative">
                        <CustomField
                          className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-3"
                          id={"handleYV"}
                          name={"handleYV"}
                        />
                        <ErrorMessage
                          name={"handleYV"}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="w-[2px] bg-[#000000] mt-[-20px] h-auto" />
                <div className="flex mb-2  items-start gap-[20px]">
                  <div className="mt-10">
                    <img src={PositionControlImage} alt="Position Control" />
                  </div>
                  <div className="flex-col">
                    <div className="flex flex-row  justify-between w-full gap-[25px]">
                      <h1 className="font-[karla] text-[20px] font-bold">
                        Position Control
                      </h1>
                    </div>
                    <div className="flex flex-row  justify-between w-full gap-[25px] mb-2">
                      <h1 className="font-[karla] text-[20px] font-medium">
                        Y Offset
                      </h1>
                      <div className="w-[100px]">
                        <div className="relative">
                          <CustomField
                            className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-3"
                            id={"yOffset"}
                            name={"yOffset"}
                          />
                          <ErrorMessage
                            name={"yOffset"}
                            component="div"
                            className="mt-2 text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row  mb-2  justify-between w-full gap-[25px]">
                      <h1 className="font-[karla] text-[20px] font-medium">
                        Z Offset
                      </h1>
                      <div className="w-[100px]">
                        <div className="relative">
                          <CustomField
                            className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-3"
                            id={"zOffset"}
                            name={"zOffset"}
                          />
                          <ErrorMessage
                            name={"zOffset"}
                            component="div"
                            className="mt-2 text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                      <h1 className="font-[karla] text-[20px] font-medium">
                        X Offset
                      </h1>
                      <div className="w-[100px]">
                        <div className="relative">
                          <CustomField
                            className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-3"
                            id={"xOffset"}
                            name={"xOffset"}
                          />
                          <ErrorMessage
                            name={"xOffset"}
                            component="div"
                            className="mt-2 text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                      <h1 className="font-[karla] text-[20px] font-medium">
                        ° Offset
                      </h1>
                      <div className="w-[100px]">
                        <div className="relative">
                          <CustomField
                            className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-3"
                            id={"offSet"}
                            name={"offSet"}
                          />
                          <ErrorMessage
                            name={"offSet"}
                            component="div"
                            className="mt-2 text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Form>
        )}
      </Formik>
      {addVariation && (
        <div className="w-full">
          {lists.map((variation, index) => (
            <Formik
              key={index}
              initialValues={{
                index: index,
                name: variation.name,
                price_einkauf: variation.price_einkauf,
              }}
              onSubmit={variationUpdateSubmit}
            >
              {(formik) => (
                <Form>
                  <div className="w-full flex justify-between flex-wrap py-5 pl-5 pr-16 relative border-t-[2px] border-black">
                    <div className="flex items-center justify-center h-full">
                      <div
                        className="w-[182px] text-lg cursor-pointer h-48 bg-[#F6F6F6] flex items-center justify-center"
                        data-index={index}
                        onClick={() => handleVariableImageClick(index)}
                      >
                        <img
                          className="w-full h-full"
                          src={
                            variableImage && variableVisible == index
                              ? URL.createObjectURL(variableImage)
                              : variation.images[0]
                          }
                        />
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpeg, .jpg, .png"
                          ref={variableFileInputRef}
                          onChange={(e) => handleVariableFileChange(e, formik)}
                        />
                      </div>
                    </div>
                    <div className="w-[2px] bg-[#ffffff] h-auto" />
                    <div className="flex flex-col mb-2  items-start gap-[20px]">
                      <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                        <h1 className="font-[karla] text-[20px] font-medium">
                          Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </h1>
                        <div className="w-[170px]">
                          <div className="relative">
                            <CustomField
                              className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-2 whitespace-nowrap overflow-hidden text-ellipsis"
                              id={"name"}
                              name={"name"}
                            />
                            <Field
                              className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-2 whitespace-nowrap overflow-hidden text-ellipsis"
                              id={"index"}
                              name={"index"}
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[2px] bg-[#ffffff] h-auto" />
                    <div className="flex flex-col mb-2  items-start gap-[20px]">
                      <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                        <h1 className="font-[karla] text-[20px] font-medium">
                          Price Einkauf{" "}
                        </h1>
                        <div className="w-[170px]">
                          <div className="relative">
                            <CustomField
                              className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                              id={"price_einkauf"}
                              name={"price_einkauf"}
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                              <p className="text-[16px] leading-[30px] font-[karla] font-normal">
                                €/pcs
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[2px] bg-[#ffffff] h-auto" />
                    <div className="flex flex-row items-end gap-[25px] h-full mt-[30px]">
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex flex-col gap-[5px]">
                          <div className="flex flex-row justify-between gap-6">
                            <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </h1>
                            <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[90px]">
                    <div className="flex float-right py-5 pl-5 pr-16">
                      <div className="flex flex-col mb-2 gap-[20px]">
                        <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                          <h1 className="font-[karla] text-[20px] font-medium">
                            Color-Image
                          </h1>
                          <div className="w-[170px]">
                          <div
                            className="w-[100px] text-lg cursor-pointer h-10 bg-[#F6F6F6] flex items-center justify-center"
                            onClick={() => handleVariableColorClick(index)}
                          >
                              <img
                                className="w-full h-full"
                                src={
                                  variableColor && variableColorVisible == index
                                  ? URL.createObjectURL(variableColor) :
                                  variation.color}
                                alt="Plates_TEst"
                              />
                            <input
                              type="file"
                              className="hidden"
                              accept=".jpeg, .jpg, .png"
                              ref={variableColorInputRef}
                              onChange={(e) => handleVariableColorChange(e, formik)}
                            />
                          </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center flex-row gap-[25px] h-full">
                        <div className="card flex justify-content-center">
                          <FileUpload
                            mode="basic"
                            id="gltf"
                            name="gltf"
                            accept="*.*"
                            // maxFileSize={1000000}
                            customUpload
                            chooseLabel={variation.gltf_title ? variation.gltf_title : "Choose"}
                            onSelect={(event) =>
                              handleGltfChange(event, formik)
                            }
                            className="bg-[#456779] text-white rounded-[5px] font-bold pl-5 pr-5 flex items-center justify-center"
                          />
                        </div>
                        {!createDrawer && (
                          <div className="gap-[25px]">
                            {!createDrawer && (
                              <button
                                onClick={() =>
                                  DeleteSelectedVariation(viewdata?._id, index)
                                }
                                className="cursor-pointer"
                                type="button"
                              >
                                <img
                                  className="w-[28px]"
                                  src={DeleteIcon}
                                  alt="DeleteIcon"
                                />
                              </button>
                            )}
                          </div>
                        )}

                        <div className="left-0">
                          <button
                            type="submit"
                            className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          ))}
          {lists.length < 2 && (
            <Formik
              initialValues={{ addName: "", addPrice_einkauf: "" }}
              onSubmit={addVariationSubmit}
            >
              <Form>
                <div>
                  <div className="w-full flex justify-between flex-wrap py-5 pl-5 pr-16 relative border-t-[2px] border-black">
                    <div className="flex items-center justify-center h-full">
                      <div
                        className="w-[182px] text-lg cursor-pointer h-48 bg-[#F6F6F6] flex items-center justify-center"
                        onClick={handleAddImageClick}
                      >
                        {!AddImage && "upload image"}
                        {AddImage && (
                          <img
                            className="w-full h-full"
                            src={URL.createObjectURL(AddImage)}
                          />
                        )}
                        <input
                          type="file"
                          className="hidden"
                          accept=".jpeg, .jpg, .png"
                          ref={addFileInputRef}
                          onChange={(e) => handleAddFileChange(e)}
                        />
                      </div>
                    </div>
                    <div className="w-[2px] bg-[#ffffff] h-auto" />
                    <div className="flex flex-col mb-2  items-start gap-[20px]">
                      <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                        <h1 className="font-[karla] text-[20px] font-medium">
                          Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </h1>
                        <div className="w-[170px]">
                          <div className="relative">
                            <CustomField
                              className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-2 whitespace-nowrap overflow-hidden text-ellipsis"
                              id={"addName"}
                              name={"addName"}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[2px] bg-[#ffffff] h-auto" />
                    <div className="flex flex-col mb-2  items-start gap-[20px]">
                      <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                        <h1 className="font-[karla] text-[20px] font-medium">
                          Price Einkauf{" "}
                        </h1>
                        <div className="w-[170px]">
                          <div className="relative">
                            <CustomField
                              className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                              id={"addPrice_einkauf"}
                              name={"addPrice_einkauf"}
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                              <p className="text-[16px] leading-[30px] font-[karla] font-normal">
                                €/pcs
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-[2px] bg-[#ffffff] h-auto" />
                    <div className="flex flex-row items-end gap-[25px] h-full mt-[30px]">
                      <div className="flex flex-col gap-[10px]">
                        <div className="flex flex-col gap-[5px]">
                          <div className="flex flex-row justify-between gap-6">
                            <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </h1>
                            <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="h-[90px]">
                    <div className="flex float-right py-5 pl-5 pr-16">
                      <div className="flex flex-col mb-2 gap-[20px]">
                        <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                          <h1 className="font-[karla] text-[20px] font-medium">
                            Color-Image
                          </h1>
                          <div className="w-[170px]">
                          <div
                            className="w-[100px] text-lg cursor-pointer h-10 bg-[#F6F6F6] flex items-center justify-center"
                            onClick={handleAddColorClick}
                          >
                            {!AddColor && "upload image"}
                            {AddColor && (
                              <img
                                className="w-full h-full"
                                src={URL.createObjectURL(AddColor)}
                                alt="Plates_TEst"
                              />
                            )}
                            <input
                              type="file"
                              className="hidden"
                              accept=".jpeg, .jpg, .png"
                              ref={addColorInputRef}
                              onChange={(e) => handleAddColorChange(e)}
                            />
                          </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center flex-row gap-[25px] h-full">
                        <div className="card flex justify-content-center">
                          <FileUpload
                            mode="basic"
                            id="gltf"
                            name="gltf"
                            accept="*.*"
                            // maxFileSize={1000000}
                            customUpload
                            onSelect={(event) => handleAddGltfChange(event)}
                            className="bg-[#456779] text-white rounded-[5px] font-bold pl-5 pr-5 flex items-center justify-center"
                          />
                        </div>

                        <div className="left-0">
                          <button
                            type="submit"
                            className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            </Formik>
          )}
        </div>
      )}
    </div>
  );
};
