import DropdownArrowMain from "/images/furniture_configurator/dropdown-arrow-main.png?url"
import DropdownCloseIcon from "/images/furniture_configurator/dropdown-close-icon.png?url"
import { useState } from "react"
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url"
import { ErrorMessage, Field, Form, Formik } from "formik"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import {
  CreatePlatesTypes,
  DeltePlateTypes,
  EditPlatesTypes,
} from "../../Functions-configurator/Function-configurator"
import toast from "react-hot-toast"

export const PlatesTypeAccordianBefore = ({
  handleToggle,
  index,
  viewdata,
}) => {
  const HandleEdit = (id) => {
    localStorage.setItem("editplateTypes_id", id)
    handleToggle()
  }

  return (
    <div
      className="flex flex-col sm:flex-row items-center gap-[15px] w-full flex-wrap justify-between"
      key={index}
    >
      <div>
        <div className="px-[12px] w-fit h-fit border border-solid border-black bg-[#F6F6F6] rounded-[3px]">
          <p className="text-[32px] leading-[30px] font-[karla] font-bold ">
            {viewdata?.configId && viewdata?.configId}
          </p>
        </div>
      </div>
      <div className="w-[2px] bg-[#D9D9D9] h-[43px]" />
      <div className="flex flex-row items-center gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Name</h1>
        <div className="w-[170px]">
          <div className="relative">
            <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3">
              {viewdata?.name}
            </span>
          </div>
        </div>
      </div>
      <div className="w-[2px] bg-[#D9D9D9] h-[43px]" />
      <div className="flex flex-row items-center gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Config</h1>
        <div className="w-[170px]">
          <div className="relative">
            <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3">
              {viewdata?.config_0}
            </span>
          </div>
        </div>
      </div>
      <div className="w-[2px] bg-[#D9D9D9] h-[43px]" />
      <div className="relative gap-[15px] flex">
        <h1 className="font-[karla] text-[20px] font-medium">Edge</h1>
        <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3">
          <div className="flex items-center gap-4">
            {
              dropdownOptionsEdge.filter(
                (item) => item.label === viewdata?.edge_0
              )[0]?.icon
            }
            {viewdata?.edge_0}
          </div>
        </span>
      </div>
      <button className="w-[31px]" onClick={() => HandleEdit(viewdata._id)}>
        <img src={DropdownArrowMain} alt="dropdown_arrow_main" />
      </button>
    </div>
  )
}

const dropdownOptionsEdge = [
  {
    label: "V",
    icon: <div className="w-6 h-6 border-gray-600 border-b-4"></div>,
  },
  {
    label: "H",
    icon: <div className="w-6 h-6 border-gray-600 border-t-4"></div>,
  },
  {
    label: "R",
    icon: <div className="w-6 h-6 border-gray-600 border-r-4"></div>,
  },
  {
    label: "L",
    icon: <div className="w-6 h-6 border-gray-600 border-s-4"></div>,
  },
  {
    label: "VH",
    icon: <div className="w-6 h-6 border-gray-600 border-y-4 "></div>,
  },
  {
    label: "VR",
    icon: <div className="w-6 h-6 border-gray-600 border-r-4 border-b-4"></div>,
  },
  {
    label: "VL",
    icon: <div className="w-6 h-6 border-gray-600 border-l-4 border-b-4"></div>,
  },
  {
    label: "HL",
    icon: <div className="w-6 h-6 border-gray-600 border-t-4 border-l-4"></div>,
  },
  {
    label: "HR",
    icon: <div className="w-6 h-6 border-gray-600 border-t-4 border-r-4"></div>,
  },
  {
    label: "LR",
    icon: <div className="w-6 h-6 border-gray-600  border-x-4"></div>,
  },
  {
    label: "VHR",
    icon: (
      <div className="w-6 h-6 border-gray-600 border-t-4 border-r-4 border-y-4"></div>
    ),
  },
  {
    label: "VHL",
    icon: (
      <div className="w-6 h-6 border-gray-600 border-t-4 border-l-4 border-y-4"></div>
    ),
  },
  {
    label: "VLR",
    icon: (
      <div className="w-6 h-6 border-gray-600  border-r-4 border-l-4 border-b-4"></div>
    ),
  },
  {
    label: "HLR",
    icon: (
      <div className="w-6 h-6 border-gray-600 border-t-4 border-r-4 border-l-4 border-x-4"></div>
    ),
  },
  {
    label: "VHLR",
    icon: (
      <div className="w-6 h-6 border-gray-600 border-t-4 border-r-4 border-l-4 border-y-4 border-x-4"></div>
    ),
  },
  {
    label: "--none--",
    icon: null,
  },
]
export const PlatesTypeAccordianAfter = ({
  handleToggle,
  createplatetypes,
  updatePlatetypes,
  viewdata,
  // index,
}) => {
  const dropdownOptions = ["1. Wardrobe", "2. Wash-Tables", "3. Sideboards"]
  const [disabled, setdisabled] = useState(false)

  const platesTypesinitialValues = {
    name: viewdata?.name || "",
    config_0: viewdata?.config_0 || "1. Wardrobe",
    edge_0: viewdata?.edge_0 || "__ V",
    cnc_time_pcs: viewdata?.cnc_time_pcs || "0",
  }

  const Handlesubmit = async (values, { resetForm }) => {
    setdisabled(true)
    if (createplatetypes) {
      const { data, error } = await CreatePlatesTypes(values)
      if (data) {
        resetForm()
        toast.success(data?.message)
        updatePlatetypes(data?.data)
        setdisabled(false)
        handleToggle() // Close the form or accordion section
      } else {
        toast.error(error?.message)
        setdisabled(false)
      }
    } else {
      const id = localStorage.getItem("editplateTypes_id")
      const { data, error } = await EditPlatesTypes(values, id)
      if (data) {
        toast.success(data?.message)
        updatePlatetypes(data?.data)
        setdisabled(false)
        handleToggle() // Close the form or accordion section
      } else {
        toast.error(error?.message)
        setdisabled(false)
      }
    }
  }
  const DeleteSelectedPlateTypes = async (id) => {
    setdisabled(true)
    const { data, error } = await DeltePlateTypes(id)
    if (data) {
      toast.success(data?.message)
      updatePlatetypes(data?.data)
      setdisabled(false)
      handleToggle() // Close the form or accordion section
    } else {
      toast.error(error?.message)
      setdisabled(false)
    }
  }
  const handleEdgeSelect = (value, formik, name) => {
    formik.setFieldValue(name, value.target.value)
  }

  return (
    <Formik
      initialValues={platesTypesinitialValues}
      onSubmit={Handlesubmit}
      enableReinitialize
    >
      {(formik) => (
        <Form className="w-full relative">
          <div className="flex justify-between max-w-7xl flex-wrap py-5 pl-5 pr-16">
            <div className="px-[12px] border border-solid border-black bg-[#F6F6F6] w-fit h-fit rounded-[3px]">
              <p className="text-[20px] leading-[30px] font-[karla] font-bold ">
                {viewdata?.configId}
              </p>
            </div>
            <div className="flex flex-row  gap-[25px]">
              <h1 className="font-[karla] text-[20px] font-medium">Name</h1>
              <div className="w-[170px]">
                {/* <Input value={"Side"} /> */}
                <div className="w-[170px]">
                  <div className="relative">
                    <Field
                      className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3"
                      id={"name"}
                      name={"name"}
                      required
                    />
                    <ErrorMessage
                      name={"name"}
                      component="div"
                      className="mt-2 text-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[2px] bg-[#D9D9D9] h-auto " />
            <div className="flex flex-col items-center gap-[15px]">
              {Array(1)
                .fill(0)
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row items-center gap-[15px] justify-between w-full"
                    >
                      <h1 className="font-[karla] text-[20px] font-medium">
                        Config
                      </h1>
                      <div className="w-[170px]">
                        <Field
                          as="select"
                          name={`config_${index}`}
                          className="w-full border h-[32px] border-solid border-black bg-[#F6F6F6] rounded-[3px] px-[12px] text-[20px] font-[karla] font-bold"
                        >
                          {dropdownOptions.map((item, index) => {
                            return (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            )
                          })}
                        </Field>
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="w-[2px] bg-[#D9D9D9] h-auto " />
            <div className="flex flex-col items-center gap-[15px]">
              {Array(1)
                .fill(0)
                .map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row items-center gap-[15px] justify-between w-full"
                    >
                      <h1 className="font-[karla] text-[20px] font-medium">
                        Edge
                      </h1>
                      <div className="w-[170px]">
                        <Select
                          IconComponent={() => <DropDownIcon />}
                          onChange={(value) =>
                            handleEdgeSelect(value, formik, `edge_${index}`)
                          }
                          value={formik?.values[`edge_${index}`]}
                          name={`edge_${index}`}
                          defaultValue={"V"}
                          className="w-full border h-[32px] border-solid border-black bg-[#F6F6F6]
                        rounded-[3px] px-[12px] text-[20px] font-[karla] font-bold"
                        >
                          {dropdownOptionsEdge.map((item, index) => {
                            return (
                              <MenuItem value={item.label} key={index}>
                                <div className="flex items-center gap-4">
                                  {item.icon}
                                  {item.label}
                                </div>
                              </MenuItem>
                            )
                          })}
                        </Select>
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className="w-[2px] bg-[#D9D9D9] h-auto " />
            <div className="flex flex-col items-center gap-[15px]">
              <div className="flex flex-row justify-between w-full gap-[15px]">
                <h1 className="font-[karla] text-[20px]">
                  CNC Time
                </h1>
                <div className="w-[170px]">
                  <div className="relative">
                    <Field
                      className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 pr-14"
                      id={"cnc_time_pcs"}
                      name={"cnc_time_pcs"}
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
              <div className="flex flex-row w-[170px] ml-auto items-end">
                {!createplatetypes && (
                  <button
                    disabled={disabled}
                    onClick={() => DeleteSelectedPlateTypes(viewdata?._id)}
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
                <div className="ml-auto">
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
            <button
              className="w-[31px] absolute top-5 right-5"
              onClick={() => {
                localStorage.removeItem("editplateTypes_id")
                handleToggle()
              }}
            >
              <img src={DropdownCloseIcon} alt="dropdown_arrow_main" />
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

const DropDownIcon = () => (
  <svg
    width="29"
    height="23"
    viewBox="0 0 29 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
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
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_324_1664"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_324_1664"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
