import DropdownArrowMain from "/images/furniture_configurator/dropdown-arrow-main.png?url"
import DropdownCloseIcon from "/images/furniture_configurator/dropdown-close-icon.png?url"
// import DrawerTest from "../../../public/images/furniture_configurator/drawer-test.png"
import PlatesTest from "/images/furniture_configurator/plates-test.png?url"
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url"
// import Input from "../Input"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { DrawervalidationSchema } from "../../Formik/FormikFunctions"
import {
  CreateDrawer,
  DeleteDrawer,
  EditDrawer,
} from "../../Functions-configurator/Function-configurator"
import { toast } from "react-hot-toast"
import { useEffect, useRef, useState } from "react"

export const DoorsAccordianBefore = ({ handleToggle, viewdata }) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL_img
  const HandleEdit = (id) => {
    localStorage.setItem("editDrawer_id", id)
    handleToggle()
  }
  return (
    <div className="flex flex-col sm:flex-row items-center gap-[15px] w-full flex-wrap justify-between">
      <div>
        <div className="w-[76px] h-[50px]">
          <img
            className="w-[76px] h-[50px]"
            src={
              viewdata?.images?.length > 0
                ? `${baseUrl}${viewdata?.images[0]}`
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
  )
}

export const DoorsAccordianAfter = ({
  handleToggle,
  drawerlistUpdate,
  createDrawer,
  viewdata,
}) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL_img
  const [Image, setImage] = useState()
  const [disabled, setdisabled] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (viewdata?.images?.length > 0)
      setImage(`${baseUrl}${viewdata?.images[0]}`)
  }, [viewdata?.images[0]])

  const Handlesubmit = async (values, { resetForm }) => {
    setdisabled(true)

    if (createDrawer) {
      const { data, error } = await CreateDrawer(values, "createDoors")
      if (data) {
        resetForm()
        drawerlistUpdate(data?.data)
        toast.success(data?.message)
        setImage("")
        setdisabled(false)
        handleToggle() // Close the form or accordion section
      } else {
        toast.error(error?.message)
        setdisabled(false)
      }
    } else {
      const id = localStorage.getItem("editDrawer_id")
      const { data, error } = await EditDrawer(values, id, "updateDoors")
      if (data) {
        toast.success(data?.message)
        drawerlistUpdate(data?.data)
        setdisabled(false)
        handleToggle() // Close the form or accordion section
      } else {
        toast.error(error?.message)
        setdisabled(false)
      }
    }
  }

  const DeleteSelectedDrawer = async (id) => {
    setdisabled(true)
    const { data, error } = await DeleteDrawer(id, "DeleteDoors")
    if (data) {
      toast.success(data?.message)
      drawerlistUpdate(data?.data)
      setdisabled(false)
      handleToggle() // Close the form or accordion section
    } else {
      toast.error(error?.message)
      setdisabled(false)
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
    images: viewdata?.images[0],
  }
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleFileChange = (e, formik) => {
    const selectedFile = e.target.files[0]
    setImage(URL.createObjectURL(selectedFile))
    formik.setFieldValue("images", selectedFile)
  }
  return (
    <Formik
      initialValues={DrawerinitialValues}
      onSubmit={Handlesubmit}
      validationSchema={DrawervalidationSchema}
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
            <div className="w-[2px] bg-[#D9D9D9] h-full"></div>
            <div className="flex flex-col items-center justify-between h-full">
              <div className="flex flex-row  mb-2 justify-between w-full gap-[25px]">
                <h1 className="font-[karla] text-[20px] font-medium">Name</h1>
                <div className="w-[170px]">
                  <div className="relative">
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
              </div>
              <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                <h1 className="font-[karla] text-[20px] font-medium">
                  Config ID
                </h1>
                <div className="w-[170px]">
                  <div className="relative">
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
              <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                <h1 className="font-[karla] text-[20px] font-medium">
                  Supplier ID
                </h1>
                <div className="w-[170px]">
                  <div className="relative">
                    <Field
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
                    <Field
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
            </div>
            <div className="w-[2px] bg-[#D9D9D9] h-full"></div>
            <div className="flex flex-col mb-2  items-start gap-[20px]">
              <div className="flex flex-row  justify-between w-full gap-[25px]">
                <h1 className="font-[karla] text-[20px] font-medium">
                  Price Einkauf{" "}
                </h1>
                <div className="w-[170px]">
                  <div className="relative">
                    <Field
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
              <div className="flex flex-row  mb-2  justify-between w-full gap-[25px]">
                <h1 className="font-[karla] text-[20px] font-medium">
                  Price-Profit
                </h1>
                <div className="w-[170px]">
                  <div className="relative">
                    <Field
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
              <div className="flex flex-row mb-2  justify-between w-full gap-[25px]">
                <h1 className="font-[karla] text-[20px] font-semibold">
                  Packing Time
                </h1>
                <div className="w-[170px]">
                  <div className="relative">
                    <Field
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
            </div>
            <div className="w-[2px] bg-[#D9D9D9] h-full"></div>

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
                          +formik?.values?.price_einkauf || 0
                        const price_aufschlag =
                          +formik?.values?.price_aufschlag || 0
                        const totalSalePrice = parseFloat(
                          (
                            price_einkauf +
                            (price_einkauf * price_aufschlag) / 100
                          ).toFixed(2)
                        )

                        // Displaying the calculated total sale price
                        return `${totalSalePrice} €/pcs` // Display the area in square meters
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
                          +formik?.values?.price_einkauf || 0
                        const price_aufschlag =
                          +formik?.values?.price_aufschlag || 0
                        const totalProfit = parseFloat(
                          ((price_einkauf * price_aufschlag) / 100).toFixed(2)
                        )

                        // Displaying the calculated total sale price
                        return `${totalProfit} €/pcs` // Display the area in square meters
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
                localStorage.removeItem("editDrawer_id")
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
