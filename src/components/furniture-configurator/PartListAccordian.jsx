import DropdownArrowMain from "/images/furniture_configurator/dropdown-arrow-main.png?url";
import DropdownCloseIcon from "/images/furniture_configurator/dropdown-close-icon.png?url";
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url";
// import Dropdown from "../dropdown";
// import AddDistance from "./AddDistance";
import { Field, Form, Formik } from "formik"; // v
// import { IoSettings } from "react-icons/io5";
import PlatesTest from "/images/furniture_configurator/plates-test.png?url";
// import IconButton from '@mui/material/IconButton';

import settingsIcon from '/images/furniture_configurator/settings-icon.png?url';
import { useState } from "react";
import { CreatePartList, SearchPartList_ConfigID } from "../../Functions-configurator/Function-configurator";
import { toast } from "react-hot-toast";
import { MenuItem, Select } from "@mui/material";
import PartListFunctionComponent from "./PartListFunctionComponent";

const baseUrl = import.meta.env.VITE_BACKEND_URL_img;

export const PartListAccordianBefore = ({ handleToggle, viewdata }) => {
  return (
    <div className="flex flex-row items-center flex-wrap justify-between w-full">
      <div className="w-[50px] h-[50px]">
        <img
          className="w-[50px] h-[50px]"
          src={viewdata?.images?.length > 0 ? `${baseUrl}${viewdata?.images[0]}` : PlatesTest}
          alt="Plates_Test"
        />
      </div>
      <div className="border-l-2 border-[#D9D9D9] px-4 flex flex-row items-center flex-wrap gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Name</h1>
        <div className="px-[12px] text-ellipsis  h-[30px] sm:w-[170px] border border-solid border-black bg-[#F6F6F6] rounded-[3px]">
          <p className="text-[20px] text-ellipsis leading-[30px] font-[karla] font-bold ">{viewdata?.name}</p>
        </div>
      </div>
      <div className="border-l-2 border-[#D9D9D9] px-4 flex flex-row items-center flex-wrap gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Config ID</h1>
        <div className="px-[12px] h-[30px] sm:w-[170px] border border-solid border-black bg-[#F6F6F6] rounded-[3px]">
          <p className="text-[20px] leading-[30px] font-[karla] font-bold ">{viewdata?.configId}</p>
        </div>
      </div>
      <div className="border-l-2 border-[#D9D9D9] px-4 flex flex-row items-center flex-wrap gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Supplier ID</h1>
        <div className="px-[12px] h-[30px] sm:w-[170px] border border-solid border-black bg-[#F6F6F6] rounded-[3px]">
          <p className="text-[20px] leading-[30px] font-[karla] font-bold ">{viewdata?.price_einkauf ? viewdata?.price_einkauf : viewdata?.plate_cost}</p>
        </div>
      </div>
      <button className="w-[31px] shrink-0" onClick={handleToggle}>
        <img src={DropdownArrowMain} alt="dropdown_arrow_main" />
      </button>
    </div>
  );
};

export const PartListAccordianAfter = ({ handleToggle, viewdata }) => {
  const [PartListArray, setPartListArray] = useState(Array.isArray(viewdata?.list) && viewdata?.list?.length > 0 ? viewdata?.list : []);
  const [ParlistFunctionOpen, setParlistFunctionOpen] = useState(false);

  const handleSettingsIconClick = (itemId) => {
    event.preventDefault();
    event.stopPropagation();
    setParlistFunctionOpen(currentOpenId =>
      currentOpenId === itemId ? null : itemId
    );
  };

  const dropdownOptionsEdge = [
    { label: "Add-Distance", icon: <div> <img onClick={() => setParlistFunctionOpen(!ParlistFunctionOpen)} width={20} height={20} src={settingsIcon} alt="setting-icon" /> </div > },
    { label: "Add-Qty", icon: null },
    { label: "Add-Edge", icon: null },
  ]

  const PartlistinitialValues = {
    name: "",
    configId: "",
    function: ""
  }

  const HandleAddList = () => {
    // setPartFunctionopen(false)
    let id = PartListArray?.length;
    setPartListArray([
      ...PartListArray,
      {
        _id: id + 1,
        name: "",
        configId: "",
        images: ""
      },
    ])
  }

  const HandleDelete = (item) => {
    const filteritem = PartListArray?.filter((filter) => item?._id != filter?._id)
    setPartListArray(filteritem);
  }


  const HandleConfigIdSearch = async (search, index) => {
    const updatedObject = { ...PartListArray[index], configId: search.target.value };
    const updatedListss = [...PartListArray];
    updatedListss[index] = updatedObject;
    setPartListArray(updatedListss);
    const { data, error } = await SearchPartList_ConfigID(search.target.value)
    if (data) {
      const clonepartlist = [...PartListArray];
      if ((data?.Assests?.length > 0 || data?.Plates?.length > 0)) {
        const mergedArray = [
          ...(data?.Assests || []),
          ...(data?.Plates || [])
        ];
        const updatedObject = clonepartlist[index];
        updatedObject._id = mergedArray[0]?._id;
        updatedObject.name = mergedArray[0]?.name;
        updatedObject.configId = mergedArray[0]?.configId;
        updatedObject.images = mergedArray[0]?.images?.length > 0 && mergedArray[0]?.images;
        if (mergedArray[0]?.supplier_id) {
          updatedObject.supplier_id = mergedArray[0]?.supplier_id;
        }
        clonepartlist[index] = updatedObject;
        setPartListArray(clonepartlist);
      } else {
        const updatedObject = clonepartlist[index];
        updatedObject.name = "";
        updatedObject.images = "";
        updatedObject.configId = search.target.value;
        setPartListArray(clonepartlist);
      }
    } else {
      toast.error(error?.message);
    }
  }


  const HandleAddParlist = async () => {
    const { data, error } = await CreatePartList(viewdata, PartListArray)
    if (data?.data) {
      toast.success(data?.message);
    } else {
      toast.error(error?.message);
    }
  }
  const HandleFunctions = (value, item) => {
    const filteritem = PartListArray?.findIndex((filter) => item?._id == filter?._id)
    if (filteritem !== -1) {
      if (value.target.value == "Add-Distance") {
        const updatedItem = { ...PartListArray[filteritem] };
        setParlistFunctionOpen(true)
        updatedItem.functions = "Add-Distance"
        if ('quantity' in updatedItem) {
          delete updatedItem?.quantity;
        }
        if (viewdata?.list[filteritem]?.add_distance?.length > 0) {
          updatedItem.add_distance = viewdata?.list[filteritem]?.add_distance
          const updatedPartListArray = [...PartListArray];
          updatedPartListArray[filteritem] = updatedItem;
          setPartListArray(updatedPartListArray);
        } else {

          updatedItem.add_distance = [
            {
              _id: 1,
              Distance: "",
              From: "",
              To: "",
              Quantity: ""
            }
          ];
          const updatedPartListArray = [...PartListArray];
          updatedPartListArray[filteritem] = updatedItem;
          setPartListArray(updatedPartListArray);
        }
      }
      else if (value.target.value == "Add-Qty") {
        const updatedItem = { ...PartListArray[filteritem] };
        setParlistFunctionOpen(false)
        updatedItem.functions = "Add-Qty"
        if ('add_distance' in updatedItem) {
          delete updatedItem?.add_distance;
        }
        const updatedPartListArray = [...PartListArray];
        updatedPartListArray[filteritem] = updatedItem;
        setPartListArray(updatedPartListArray);
      }
      else if (value.target.value == "Add-Edge") {
        const updatedItem = { ...PartListArray[filteritem] };
        setParlistFunctionOpen(false)
        updatedItem.functions = "Add-Edge"
        if ('add_distance' in updatedItem) {
          delete updatedItem?.add_distance;
        }
        if ('quantity' in updatedItem) {
          delete updatedItem?.quantity;
        }
        const updatedPartListArray = [...PartListArray];
        updatedPartListArray[filteritem] = updatedItem;
        setPartListArray(updatedPartListArray);
      }
    }
    else {
      setParlistFunctionOpen(false)
    }
  }

  const HandleSetQuantity = (inputSearch, item, index) => {
    const updatedPartListArray = [...PartListArray];
    const updatedItem = [...updatedPartListArray];
    updatedItem[index].quantity = inputSearch.target.value
    setPartListArray(updatedItem);
  }

  return (
    <Formik
      initialValues={PartlistinitialValues}
    // onSubmit={Handlesubmit}
    // validationSchema={platesvalidationSchema}
    // enableReinitialize
    >
      {() => (
        <Form className="w-full">
          <div className="relative w-full">
            <div className="flex relative gap-10 justify-between flex-wrap p-5 pr-16">
              <div className="w-[163px]">
                <img
                  className="w-[163px]"
                  src={viewdata?.images?.length > 0 ? `${baseUrl}${viewdata?.images[0]}` : PlatesTest}
                  alt="Plates_TEst"
                />
              </div>
              <div className="w-[2px] bg-[#D9D9D9] h-auto" />
              <div className="flex mb-auto flex-1 flex-col gap-2">
                <div className="flex flex-row flex-wrap items-center gap-[15px] justify-between">
                  <h1 className="font-[karla] text-[20px]  font-medium">Name</h1>
                  <div className="px-[12px] text-ellipsis sm:w-[170px] border border-solid border-black bg-[#F6F6F6] rounded-[3px]">
                    <p className="text-[20px] leading-[30px] font-[karla] font-bold ">{viewdata?.name}</p>
                  </div>
                </div>
                <div className="flex flex-row flex-wrap items-center gap-[15px] justify-between">
                  <h1 className="font-[karla] text-[20px] font-medium">Config ID</h1>
                  <div className="px-[12px] sm:w-[170px] border border-solid text-ellipsis border-black bg-[#F6F6F6] rounded-[3px]">
                    <p className="text-[20px]  leading-[30px] font-[karla] font-bold ">{viewdata?.configId}</p>
                  </div>
                </div>
              </div>
              <div className="w-[2px] bg-[#D9D9D9] h-auto" />
              <div className="flex mb-auto flex-1">
                <div className="flex flex-row flex-wrap items-center gap-[15px] justify-between">
                  <h1 className="font-[karla] text-[20px] font-medium">Supplier ID</h1>
                  <div className="px-[12px] sm:w-[170px] border border-solid border-black bg-[#F6F6F6] rounded-[3px]">
                    <p className="text-[20px] leading-[30px] font-[karla] font-bold ">{viewdata?.supplier_id ? viewdata?.supplier_id : viewdata?.supplier_id}</p>
                  </div>
                </div>
              </div>
              <div className="w-[2px] bg-[#D9D9D9] h-auto" />
              <div className="flex mt-auto">
                <div>
                  <div className="flex flex-row gap-[5px]">
                    <div className="shadow-lg">
                      <button type="button" onClick={HandleAddList} className="font-[karla]  text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg">
                        Add
                      </button>
                    </div>
                    <div className="shadow-lg">
                      <button type="button" onClick={HandleAddParlist} className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-[31px] absolute top-5 right-5" onClick={handleToggle}>
                <img src={DropdownCloseIcon} alt="dropdown_arrow_main" />
              </button>
            </div>
            {/* <div className="h-[2px] w-full bg-black absolute"></div> */}
            {PartListArray?.length > 0 && Array.isArray(PartListArray) &&
              <div className="px-3">
                <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10">
                  <div className="col-span-1 flex md:justify-center">
                    <span className=" font-[karla] text-[20px] font-bold text-black">Picture</span>
                  </div>
                  <div className="col-span-2 flex md:justify-center">
                    <span className=" font-[karla] text-[20px] font-bold text-black">Name</span>
                  </div>
                  <div className="col-span-2 flex md:justify-center">
                    <span className=" font-[karla] text-[20px] font-bold text-black">Config-ID</span>
                  </div>
                  <div className="col-span-2 flex md:justify-center">
                    <span className=" font-[karla] text-[20px] font-bold text-black">Function</span>
                  </div>
                  <div className="col-span-2 flex md:justify-center">
                    <span className=" font-[karla] text-[20px] font-bold text-black">Quantity</span>
                  </div>
                </div>
                <div className="mt-[10px] ">
                  {PartListArray?.length > 0 && Array.isArray(PartListArray) && PartListArray?.map((item, index) => {
                    return (
                      <>
                        <div key={index} id={`data-list_${index}`} className="rounded-[5px] relative mb-2 bg-[#F6F6F6] mt-4 border border-solid border-black grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 auto-cols-min gap-[30px] items-center col-span-3  px-[15px] py-[5px]">
                          <div className="col-span-1 auto-cols-max">
                            <div className="h-[45px]">
                              <img
                                className="h-[45px]"
                                src={item?.images?.length > 0 ? `${baseUrl}${item?.images[0]}` : PlatesTest}
                                alt="Plates_Test"
                              />
                            </div>
                          </div>
                          <div className="col-span-2 auto-cols-max text-ellipsis   border border-solid border-black rounded-[3px]">
                            <Field
                              className={`block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 "pr-3"`}
                              id={"name"}
                              name={"name"}
                              value={item?.child_name?.[0] ?? item?.name}
                              disabled={true}
                            />

                          </div>
                          <div key={index} className="col-span-2 auto-cols-max text-ellipsis   border border-solid border-black rounded-[3px]">
                            <Field
                              className={`block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 "pr-3"`}
                              id={"configId"}
                              name={"configId"}
                              value={item?.configId ?? item?.child_config_id?.[0]}
                              disabled={Boolean(item?.child_config_id?.[0])}
                              onChange={(e) => HandleConfigIdSearch(e, index)}
                            />

                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center">
                              {item.functions == "Add-Distance" && (
                                <div onClick={() => handleSettingsIconClick(item._id)} style={{ cursor: 'pointer', marginRight: '-25px', zIndex: 1 }}>
                                  <img
                                    src={settingsIcon}
                                    alt="Settings"
                                    style={{ width: '20px', height: '20px' }} // Adjust size as needed
                                  />
                                </div>
                              )}
                              <Select
                                IconComponent={() => <DropDownIcon />}
                                onChange={(value) => HandleFunctions(value, item, index)}
                                value={item?.functions}
                                className="w-full border h-[32px] border-solid border-black bg-[#F6F6F6]
                              rounded-[3px] px-[12px] text-[20px] font-[karla] font-bold"
                              >
                                {dropdownOptionsEdge.map((option, index) => (
                                  <MenuItem value={option.label} key={index}>
                                    {option.label}
                                  </MenuItem>
                                ))}
                              </Select>
                            </div>
                          </div>

                          {item.functions == "Add-Qty" ?
                            <div className="col-span-2 auto-cols-max text-ellipsis   border border-solid border-black rounded-[3px]">
                              <>
                                <input
                                  className={`block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 "pr-3"`}
                                  value={item?.quantity ?? item?.qty?.[0]}
                                  onChange={(e) => HandleSetQuantity(e, item, index)}
                                />

                              </>
                            </div> :
                            <div className="col-span-2 auto-cols-max text-ellipsis" />

                          }
                          <div className="col-span-1 flex flex-start justify-end cursor-pointer" onClick={() => HandleDelete(item)}>
                            <img className="h-[34px]" src={DeleteIcon} alt="Delete Icon" />
                          </div>
                          {item.functions == "Add-Distance" && ParlistFunctionOpen === item._id && (
                            <PartListFunctionComponent
                              PartListArray={PartListArray}
                              setPartListArray={setPartListArray}
                              index={index}
                              setParlistFunctionOpen={setParlistFunctionOpen}
                            />
                          )}
                        </div >
                      </>
                    )
                  }
                  )}
                </div >
              </div>
            }
          </div >
        </Form >
      )
      }
    </Formik >
  );
};

const DropDownIcon = () => (
  <svg width="23" height="32" viewBox="0 0 29 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_d_324_1664)">
      <path
        d="M24.7383 1.64381L14.9837 14.7173C14.917 14.8069 14.8378 14.878 14.7506 14.9265C14.6633 14.975 14.5698 15 14.4753 15C14.3809 15 14.2874 14.975 14.2001 14.9265C14.1129 14.878 14.0336 14.8069 13.9669 14.7173L4.21242 1.64381C4.11174 1.5092 4.04314 1.33757 4.01533 1.15065C3.98751 0.963732 4.00173 0.769953 4.05619 0.593882C4.11065 0.417811 4.20288 0.267378 4.32121 0.16165C4.43953 0.0559214 4.57862 -0.00033963 4.72083 1.77283e-06L24.2298 6.30465e-08C24.3721 -0.000341365 24.5111 0.0559197 24.6295 0.161648C24.7478 0.267376 24.84 0.417809 24.8945 0.593881C24.9489 0.769951 24.9632 0.96373 24.9353 1.15065C24.9075 1.33756 24.8389 1.5092 24.7383 1.64381Z"
        fill="#456779"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_324_1664"
        x="0.000976562"
        y="0"
        width="28.9482"
        height="23"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_324_1664" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_324_1664"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

