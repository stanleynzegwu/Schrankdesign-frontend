import DropdownArrowMain from "/images/furniture_configurator/dropdown-arrow-main.png?url";
import DropdownCloseIcon from "/images/furniture_configurator/dropdown-close-icon.png?url";
import PlatesTest from "/images/furniture_configurator/plates-test.png";
// import Input from "../Input";
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url";
// import Dropdown from "../dropdown";
import { EdgevalidationSchema } from "../../Formik/FormikFunctions";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  CreateEdge,
  DeleteEdge,
  EditEdge,
} from "../../Functions-configurator/Function-configurator";
import { toast } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

export const EdgeAccordianBefore = ({ handleToggle, viewdata }) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL_img;

  const HandleEdit = (id) => {
    localStorage.setItem("editedge_id", id);
    handleToggle();
  };

  // const [Image, setImage] = useState();

  useEffect(() => {
    // setImage(`${baseUrl}${viewdata?.images[0]}`);
  }, [viewdata?.images[0]]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-[15px] w-full flex-wrap justify-between">
      <div>
        <div className="w-[50px] h-[50px]">
          <img
            className="w-[50px] h-[50px]"
            src={viewdata?.images?.length > 0 ? baseUrl + viewdata?.images[0] : PlatesTest}
            alt="Plates_Test"
          />
        </div>
      </div>
      <div className="border-l-2 border-[#D9D9D9] flex-wrap px-6 py-1 flex flex-row items-center gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Name</h1>
        <div className="w-[170px]">
          <div className="relative">
            <span className="block text-[18px] leadingsemibold30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3">
              {viewdata?.name}
            </span>
          </div>
        </div>
      </div>
      <div className="border-l-2 border-[#D9D9D9] flex-wrap px-6 py-1 flex flex-row items-center gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Config ID</h1>
        <div className="w-[170px]">
          <div className="relative">
            <span className="block text-[18px] leadingsemibold30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3">
              {viewdata?.configId}
            </span>
          </div>
        </div>
      </div>
      <div className="border-l-2 border-[#D9D9D9] flex-wrap px-6 py-1 flex flex-row items-center gap-[15px] justify-between">
        <h1 className="font-[karla] text-[20px] font-medium">Price Einkauf</h1>
        <div className="w-[170px]">
          <div className="relative">
            <span className="block text-[18px] leadingsemibold30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3">
              {viewdata?.edge_cost}
            </span>
          </div>
        </div>
      </div>
      <button className="w-[31px] shrink-0" onClick={() => HandleEdit(viewdata._id)}>
        <img src={DropdownArrowMain} alt="dropdown_arrow_main" />
      </button>
    </div>
  );
};

export const EdgeAccordianAfter = ({ handleToggle, edgelistUpdate, viewdata, createEdge }) => {
  const baseUrl = import.meta.env.VITE_BACKEND_URL_img;

  const list1 = [
    { label: "Name", logo: null, name: "name" },
    { label: "Config-ID", logo: null, name: "configId" },
    { label: "Edge-Cost", logo: "€/m", name: "edge_cost" },
    { label: "Price-Profit", logo: "%", name: "price_aufschlag" },
    { label: "Supplier ID", logo: null, name: "supplier_id" },
  ];

  const list2 = [
    { label: "Plate ID Match", logo: null, name: "plate_Id_match" },
    { label: "Edge Width", logo: "mm", name: "edge_width" },
    { label: "Edge Thickness", logo: "mm", name: "edge_thickness" },
    { label: "Edge Type", logo: null, name: "edgeType" },
  ];

  const [Image, setImage] = useState();
  const [disabled, setdisabled] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (viewdata?.images?.length > 0) setImage(`${baseUrl}${viewdata?.images[0]}`);
  }, [viewdata?.images[0]]);

  // const dropdownOptions = ["Dekor-Edge", "Furnier-Edge"];

  const Handlesubmit = async (values, { resetForm }) => {
    setdisabled(true);

    if (createEdge) {
      const { data, error } = await CreateEdge(values);
      if (data) {
        resetForm();
        edgelistUpdate(data?.data);
        toast.success(data?.message);
        setImage("");
        setdisabled(false);
        handleToggle(); // Close the form or accordion section
      } else {
        toast.error(error?.message);
        setdisabled(false);
      }
    } else {
      const id = localStorage.getItem("editedge_id");
      const { data, error } = await EditEdge(values, id);
      if (data) {
        toast.success(data?.message);
        edgelistUpdate(data?.data);
        setdisabled(false);
        handleToggle(); // Close the form or accordion section
      } else {
        toast.error(error?.message);
        setdisabled(false);
      }
    }
  };

  const DeleteSelectedEdge = async (id) => {
    setdisabled(true);
    const { data, error } = await DeleteEdge(id);
    if (data) {
      toast.success(data?.message);
      edgelistUpdate(data?.data);
      setdisabled(false);
      handleToggle(); // Close the form or accordion section
    } else {
      toast.error(error?.message);
      setdisabled(false);
    }
  };

  const EdgeinitialValues = {
    name: viewdata?.name || "",
    configId: viewdata?.configId || "",
    edge_cost: viewdata?.edge_cost || "",
    price_aufschlag: viewdata?.price_aufschlag || "",
    supplier_id: viewdata?.supplier_id || "",
    plate_Id_match: viewdata?.plate_Id_match || "",
    edge_width: viewdata?.edge_width || "",
    edge_thickness: viewdata?.edge_thickness || "",
    edge_type: viewdata?.edge_type || "DekorEdge",
    images: viewdata?.images[0],
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

  return (
    <Formik
      initialValues={EdgeinitialValues}
      onSubmit={Handlesubmit}
      validationSchema={EdgevalidationSchema}
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
                {Image && <img className="w-full h-full" src={Image && Image} alt="Plates_TEst" />}
                <input
                  type="file"
                  className="hidden"
                  accept=".jpeg, .jpg, .png"
                  ref={fileInputRef}
                  onChange={(e) => handleFileChange(e, formik)}
                />
              </div>
            </div>
            <div className="w-[2px] bg-[#D9D9D9] h-auto" />
            <div className="flex flex-col items-center justify-between h-full">
              {list1.map((item, index) => (
                <div key={index} className="flex flex-row mb-2 justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-medium">{item.label}</h1>
                  <div className="w-[170px]">
                    <div className="relative">
                      <Field
                        className={`block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 ${item.logo ? "pr-14" : "pr-3"
                          }`}
                        id={item.name}
                        name={item.name}
                        disabled={item?.name === "configId" && true}
                      />
                      {item?.logo && (
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex  pr-3">
                          <p className="text-[16px] leading-[30px] font-[karla] font-normal">
                            {item?.logo}
                          </p>
                        </div>
                      )}
                      <ErrorMessage
                        name={item?.name}
                        component="div"
                        className="mt-2 text-red-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-[2px] bg-[#D9D9D9] h-auto" />
            <div className="flex flex-col items-start justify-between">
              {list2.map((item, index) => (
                <div key={index} className="flex flex-row mb-2 justify-between w-full gap-[25px]">
                  <h1 className="font-[karla] text-[20px] font-medium">{item.label}</h1>
                  <div className="w-[170px]">
                    {item.label === "Edge Type" ? (
                      <Field
                        as="select"
                        name="edge_type"
                        className="w-full border h-[32px] border-solid border-black bg-[#F6F6F6] rounded-[3px] px-[12px] text-[20px] font-[karla] font-bold"
                      >
                        <option value="DekorEdge">Dekor-Edge</option>
                        <option value="FurnierEdge">Furnier-Edge</option>
                      </Field>
                    ) : (
                      <div className="relative">
                        <Field
                          className={`block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] pl-3 ${item.logo ? "pr-14" : "pr-3"
                            }`}
                          id={item.name}
                          name={item.name}


                        />
                        {item?.logo && (
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex  px-3">
                            <p className="text-[16px] leading-[30px] font-[karla] font-normal">
                              {item?.logo}
                            </p>
                          </div>
                        )}
                        <ErrorMessage
                          name={item?.name}
                          component="div"
                          className="mt-2 text-red-500"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-[2px] bg-[#D9D9D9] h-auto" />
            <div className="mt-auto mb-3 flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[5px]">
                <div className="flex flex-row justify-between gap-6">
                  <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                    Edge-Waste:
                  </h1>
                  <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">20 %</h1>
                </div>
                <div className="flex flex-row justify-between gap-6">
                  <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                    Price selling:
                  </h1>
                  <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                    {(() => {
                        const edge_cost = +formik?.values?.edge_cost || 0;
                        const priceIncrease = +formik?.values?.price_aufschlag || 0;
                        const totalSalePrice = parseFloat((edge_cost + (edge_cost * priceIncrease / 100)).toFixed(2));

                        // Displaying the calculated total sale price
                      return `${totalSalePrice} €/m`; // Display the area in square meters
                      })()} </h1>
                </div>
                <div className="flex flex-row justify-between gap-6">
                  <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                    Profit m²:
                  </h1>
                  <h1 className="font-[karla] leading-[16px] font-semibold text-[18px]">
                    {(() => {
                        const edge_cost = +formik?.values?.edge_cost || 0;
                        const priceIncrease = +formik?.values?.price_aufschlag || 0;
                        const totalProfit = parseFloat((edge_cost * priceIncrease / 100).toFixed(2));

                        // Displaying the calculated total sale price
                      return `${totalProfit} €/m`; // Display the area in square meters
                      })()} </h1>
                </div>
              </div>
              <div className="flex flex-row justify-between w-[160px]">
                {!createEdge && (
                  <button
                    disabled={disabled}
                    onClick={() => DeleteSelectedEdge(viewdata?._id)}
                    className="cursor-pointer"
                    type="button"
                  >
                    <img className="w-[28px]" src={DeleteIcon} alt="DeleteIcon" />
                  </button>
                )}
                <div>
                  <button
                    disabled={disabled}
                    type="submit"
                    className="font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
              <button
                className="absolute right-5 top-5 w-[31px]"
                onClick={() => {
                  localStorage.removeItem("editedge_id");
                  handleToggle();
                }}
              >
                <img src={DropdownCloseIcon} alt="dropdown_arrow_main" />
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
