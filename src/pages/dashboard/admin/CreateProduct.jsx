import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../../Layouts/Layout";
import { AllCategory, CreateSingleProduct } from "../../../api/api";
import Loader from "../../../components/loaders/Loader";
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url";
// import { render } from "@react-three/fiber";

const productImageCount = 15;
const productDetailCount = 8;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [saveModal, setSaveModal] = useState(false)
  const [pictureMass, setPictureMass] = useState(0)

  const [defaultImage, setDefaultImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState();
  const [categoryName, setCategoryName] = useState();
  // const [subtitle, setSubtitle] = useState("");
  // const [rating, setRating] = useState();
  // const [minDimension, setMinDimension] = useState();
  // const [maxDimension, setMaxDimension] = useState();
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(null);

  const [imagesIndex, setImagesIndex] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaTag, setMetaTag] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [materialNumber, setMaterialNumber] = useState("");
  const [active, setActive] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [detailChanged, setDetailChanged] = useState(false)

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (fileList.length > 0 && defaultImage && hoverImage) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("categoryName", categoryName);
      formData.append("defaultImage", defaultImage);
      formData.append("hoverImage", hoverImage);
      // formData.append("subtitle", subtitle);
      formData.append("subtitle", "subtitle")
      // formData.append("rating", rating);
      formData.append("rating", 5);
      formData.append("minDimension", minDimension);
      formData.append("maxDimension", maxDimension);
      formData.append("price", price);
      formData.append("active", active)
      formData.append("productDescription", productDescription)
      formData.append("metaDescription", metaDescription)
      formData.append("metaTag", metaTag)
      formData.append("imagesIndex", imagesIndex)
      let tempPos = new Array()
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i]) {
          formData.append('detailImages', fileList[i]);
          formData.append("fileListPos", i)
          tempPos.push(i)
        }
      }
      if (!category) {
        toast.error("Category is required");
        setLoading(false);
        return;
      }
      const { data, error } = await CreateSingleProduct(formData);
      if (data) {
        toast.success(data?.message);
        setLoading(false);
        navigate("/dashboard/admin/products");
      } else if (error) {
        setLoading(false);
        console.log("error");
        toast.error(error?.message);
      }
    } else {
      if (fileList.length === 0) {
        toast.error("Product Detail Image is required")
      }
      if (!defaultImage) {
        toast.error("Main Picture is required")
      }
      if (!hoverImage) {
        toast.error("Hover Picture is required")
      }
    }
  };

  const getAllCategories = async () => {
    setLoading(true);
    const { data, error } = await AllCategory();
    if (data) {
      setLoading(false);
      setCategories(data?.categories);
    } else if (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const productImages = Array.from(
    { length: productImageCount },
    (_, index) => `/images/productimage/${index + 1}.png`
  );
  const productDetailImages = Array.from(
    { length: productDetailCount },
    () => `/images/avatar-.jpg`
  );
  useEffect(() => {
    getAllCategories();
  }, []);
  const setFiles = (e) => {
    const tempFiles = e.target.files;
    setPictureMass(tempFiles.length)
    let tempFileList = [];
    if (tempFiles[0]) {
      setDefaultImage(tempFiles[0]);
    }
    if (tempFiles[1]) {
      setHoverImage(tempFiles[1]);
    }
    if (tempFiles.length > 2) {
      for (let i = 2; i < tempFiles.length; i++) {
        tempFileList.push(tempFiles[i]);
      }
      setFileList(tempFileList);
    }
  };

  const editConfirm = () => {
    setSaveModal(true)
  }

  const productEdit =  async() => {
    setSaveModal(false)
    setLoading(true);
    if (fileList.length > 0 && defaultImage && hoverImage && name
      && category && productDescription && metaDescription && metaTag
    ) {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("categoryName", categoryName);
      formData.append("defaultImage", defaultImage);
      formData.append("hoverImage", hoverImage);
      // formData.append("subtitle", subtitle);
      formData.append("subtitle", "subtitle")
      // formData.append("rating", rating);
      formData.append("rating", 5);
      formData.append("minDimension", minDimension);
      formData.append("maxDimension", maxDimension);
      formData.append("price", price);
      formData.append("active", active)
      formData.append("productDescription", productDescription)
      formData.append("metaDescription", metaDescription)
      formData.append("metaTag", metaTag)
      formData.append("imagesIndex", imagesIndex)
      let tempPos = new Array()
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i]) {
          formData.append('detailImages', fileList[i]);
          formData.append("fileListPos", i)
          tempPos.push(i)
        }
      }
      if (!category) {
        toast.error("Category is required");
        setLoading(false);
        return;
      }
      const { data, error } = await CreateSingleProduct(formData);
      if (data) {
        const id = data?.products.categoryName
        const configId = data?.products.configId
        toast.success(data?.message);
        setLoading(false);
        navigate(`/product/${id}/${configId}`);
      } else if (error) {
        setLoading(false);
        console.log("error");
        toast.error(error?.message);
      }
    } else {
      if (fileList.length === 0) {
        toast.error("Product Detail Image is required")
        setLoading(false)
        return
      }
      if (!defaultImage) {
        toast.error("Main Picture is required")
        setLoading(false)
        return
      }
      if (!hoverImage) {
        toast.error("Hover Picture is required")
        setLoading(false)
        return
      }
      if (!name) {
        toast.error("Product Name is required")
        setLoading(false)
        return
      }
      if (!productDescription) {
        toast.error("Product Description is required")
        setLoading(false)
        return
      }
      if (!category) {
        toast.error("Product Category is required")
        setLoading(false)
        return
      }
      if (!metaDescription) {
        toast.error("Meta Description is required")
        setLoading(false)
        return
      }
      if (!metaTag) {
        toast.error("Meta Tag is required")
        setLoading(false)
        return
      }
    }
  }

  return (
    <Layout>
      {loading && <Loader />}
      <div className="w-[90%]  p-10 rounded-2xl mt-5 shadow-2xl mx-auto mb-5 text-black">
        <form 
        onSubmit={handleRegisterSubmit}
        >
          <div className="border-b-[1px] border-black pb-5 mb-5">
            <div className="flex w-[100%] items-center mb-5">
              <div className="mr-2 ml-2 w-[15%] font-bold">
                Product Pictures
              </div>
              <div className="mr-2 ml-2 w-[85%] flex  items-center justify-between ">
                <div className="items-center flex">
                  <button
                    type="button"
                    className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                    onClick={editConfirm}
                  >
                    Product Edit
                  </button>
                </div>
                <div className="flex items-center">
                  <div className="items-center flex mr-5">
                    <button
                      type="button"
                      onClick={() => {}}
                      className="cursor-pointer"
                    >
                      <img
                        className="w-[28px]"
                        src={DeleteIcon}
                        alt="DeleteIcon"
                      />
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                    >
                      Save
                      {loading && (
                        <div className="ml-2 mt-1 animate-spin rounded-full h-4 w-4 border-t-4 border-white border-solid"></div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-[100%] items-center mb-5">
              <div className="mr-2 ml-2 w-[15%] font-bold">Product Name</div>
              <div className="mr-2 ml-2 w-[75%] flex items-center">
                <div className="items-center flex ml-0 mr-auto">
                  <input
                    className="border border-solid border-black rounded-[5px]"
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="flex items-center font-bold ml-auto mr-auto">
                  <div className="pr-2">Configuration-Nr</div>
                  <div>
                    <input disabled
                      type="text"
                      className="border border-solid border-black rounded-[5px]"
                    ></input>
                  </div>
                </div>
                <div className="flex items-center font-bold ml-auto mr-0">
                  <div className="pr-2">Active</div>
                  <div className="flex items-center">
                    <input
                      className=""
                      type="checkBox"
                      onChange={(e) => setActive(e.target.checked)}
                      checked={active}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-[100%] items-center mb-5">
              <div className="mr-2 ml-2 w-[15%] font-bold">
                Product Description
              </div>
              <div className="mr-2 ml-2 w-[75%] flex items-center ">
                <textarea
                  className="w-[100%] border border-solid border-black rounded-[5px]"
                  onChange={(e) => setProductDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex w-[100%] items-center mb-5">
              <div className="mr-2 ml-2 w-[15%] font-bold">
                Product Category
              </div>
              <div className="mr-2 ml-2 w-[75%] flex items-center">
                <select
                  id="filter"
                  className="text-base rounded-[5px] block w-[200px] p-2.5 focus:outline-none border border-solid border-black"
                  onChange={(e) => {
                    setCategory(e.target.value)
                    const selectedOption = e.target.options[e.target.selectedIndex];
                    const categoryName = selectedOption.getAttribute('name');
                    setCategoryName(categoryName)
                  }}
                  required
                >
                  <option value=""></option>
                  {categories &&
                    categories.map((item) => (
                      <option
                        key={item?._id}
                        className="text-base p-2"
                        value={item?._id}
                        name={item?.name}
                      >
                        {item?.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex w-[100%] items-center mb-5">
              <div className="mr-2 ml-2 w-[15%] font-bold">
                Meta Description
              </div>
              <div className="mr-2 ml-2 w-[75%]">
                <input
                  className="border border-solid border-black rounded-[5px]"
                  onChange={(e) => setMetaDescription(e.target.value)}
                  required
                ></input>
              </div>
            </div>

            <div className="flex w-[100%] items-center">
              <div className="mr-2 ml-2 w-[15%] font-bold">
                Meta Site Title Tag
              </div>
              <div className="mr-2 ml-2 w-[75%]">
                <input
                  className="w-[100%] border border-solid border-black rounded-[5px]"
                  onChange={(e) => setMetaTag(e.target.value)}
                  required
                ></input>
              </div>
            </div>
          </div>

          <div>
            <div className="flex w-[100%] items-center mb-5">
              <div className="mr-2 ml-2 w-[60%] font-bold">
                <div className="flex mb-5 items-center">
                  <div className="w-[30%]">Product Pictures</div>
                  <div className="relative">
                    <button
                      type=""
                      disabled
                      className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg cursor-pointer"
                    >
                      Picture mass Upload ({pictureMass}/122pcs.)
                    </button>
                    <input
                      type="file"
                      multiple="multiple"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        setFiles(e);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="flex mb-5 items-center">
                  {productImages.map((image, index) => (
                    <div
                      key={index}
                      className={`shadow-lg mr-1 ml-1 rounded-[10px] cursor-pointer ${
                        imagesIndex === index
                          ? "box-border border-black border-[2px]"
                          : null
                      }`}
                      onClick={() => setImagesIndex(index)}
                    >
                      <img src={image} alt={`Product ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <div className="">
                  <div className="flex mb-5 items-center">
                    <div className="w-[30%]">Name of Material</div>
                    <div>
                      <input
                        className="border border-solid border-black rounded-[5px]"
                        onChange={(e) => setMaterialName(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="flex mb-5 items-center">
                    <div className="w-[30%]">Standard-Material NR.</div>
                    <div>
                      <input
                        className="border border-solid border-black rounded-[5px]"
                        onChange={(e) => setMaterialNumber(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mr-2 ml-2 w-[40%] flex m-auto">
                <div className="mb-4 w-max m-auto">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Main Picture
                  </label>
                  <div className="relative cursor-pointer">
                    {defaultImage ? (
                      <img
                        src={URL.createObjectURL(defaultImage)}
                        alt="avatar"
                        className="h-32 w-32 rounded cursor-pointer"
                      />
                    ) : (
                      <img
                        src="/images/avatar-.jpg"
                        alt="avatar"
                        className="h-32 w-32 rounded cursor-pointer"
                      />
                    )}

                    <input
                      type="file"
                      alt="avatar"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => setDefaultImage(e.target.files[0])}
                      
                    />
                  </div>
                </div>
                <div className="mb-4 w-max m-auto">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    HoverPicture
                  </label>
                  <div className="relative cursor-pointer">
                    {hoverImage ? (
                      <img
                        src={URL.createObjectURL(hoverImage)}
                        alt="avatar"
                        className="h-32 w-32 rounded cursor-pointer"
                      />
                    ) : (
                      <img
                        src="/images/avatar-.jpg"
                        alt="avatar"
                        className="h-32 w-32 rounded cursor-pointer"
                      />
                    )}

                    <input
                      type="file"
                      alt="avatar"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => setHoverImage(e.target.files[0])}
                      
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-[100%] items-center">
              {productDetailImages.map((image, index) => (
                <div key={index} className="mb-4 w-max m-auto">
                  <div className="relative cursor-pointer">
                    {fileList[index + productDetailCount * imagesIndex] ? (
                      <img
                        src={URL.createObjectURL(
                          fileList[index + productDetailCount * imagesIndex]
                        )}
                        alt="avatar"
                        className="h-32 w-32 rounded cursor-pointer"
                      />
                    ) : (
                      <img
                        src="/images/avatar-.jpg"
                        alt="avatar"
                        className="h-32 w-32 rounded cursor-pointer"
                      />
                    )}

                    <input
                      type="file"
                      alt="avatar"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        // setProductDetail(e, index)
                        const count = index + productDetailCount * imagesIndex
                        let tempFileList = fileList;
                        if ( e.target.files[0]) {
                          if ( fileList[count] ) {
                            tempFileList[count] = e.target.files[0];
                          } else {
                            if (count === 0) {
                              tempFileList[count] = e.target.files[0]
                            } else {
                              for ( let i = 0; i <count; i++) {
                                if (!tempFileList[i]) {
                                  tempFileList[i]  = undefined
                                }
                                tempFileList[count] = e.target.files[0]
                                
                              }
                            }
                          }
                          setFileList(tempFileList)
                          setDetailChanged(!detailChanged)
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
      {saveModal && (
        <>
          <div className="fixed inset-0 flex items-center justify-center z-50" style={{zIndex: 10000000000000000}}>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg p-6 h-auto w-[80%] md:w-[60%] lg:w-[40%] 2xl:w-[30%] overflow-y-auto z-50">
              <div className="flex">
                <h1 className="flex text-xl md:text-2xl lg:text-2xl mx-auto font-semibold">
                  Are you sure?
                </h1>
              </div>
              <div className="flex mt-10">
                <button
                  onClick={productEdit}
                  className="site-button ml-auto mr-3 py-2 px-4 hover:px-5  text-sm font-normal flex"
                >
                  Yes
                  {/* {deleteLoading && (
                    <div className="ml-2 mt-1 animate-spin rounded-full h-4 w-4 border-t-4 border-white border-solid"></div>
                  )} */}
                </button>
                <button
                  onClick={() => setSaveModal(false)}
                  className="site-button mr-auto ml-3 py-2 px-4 hover:px-5  text-sm font-normal bg-red-500 hover:bg-red-700"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* <div className="w-[90%]  p-10 pt-4 rounded-2xl mt-2 mb-5 shadow-2xl mx-auto">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
          Create Collection
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1">
          <div></div>
          <div>
            <form
              className="max-w-md mx-auto mt-10"
              onSubmit={handleRegisterSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4 w-max">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Default Image
                  </label>
                  <div className="relative cursor-pointer">
                    {defaultImage ? (
                      <img
                        src={URL.createObjectURL(defaultImage)}
                        alt="avatar"
                        className="h-32 w-32 rounded cursor-pointer"
                      />
                    ) : (
                      <img
                        src="/images/avatar-.jpg"
                        alt="avatar"
                        className="h-32 w-32 rounded cursor-pointer"
                      />
                    )}

                    <input
                      type="file"
                      alt="avatar"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => setDefaultImage(e.target.files[0])}
                      required
                    />
                  </div>
                </div>
                <div className="mb-4 w-max">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Hover Image
                  </label>
                  <div className="relative cursor-pointer">
                    {hoverImage ? (
                      <img
                        src={URL.createObjectURL(hoverImage)}
                        alt="avatar"
                        className="h-32 w-32 rounded cursor-pointer"
                      />
                    ) : (
                      <img
                        src="/images/avatar-.jpg"
                        alt="avatar"
                        className="h-32 w-32 rounded cursor-pointer"
                      />
                    )}

                    <input
                      type="file"
                      alt="avatar"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => setHoverImage(e.target.files[0])}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-0 w-full mb-5 group mt-4">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Select Category
                </label>
                <select
                  id="filter"
                  className="text-base rounded-lg block w-1/2 p-2.5 focus:outline-none"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value=""></option>
                  {categories &&
                    categories.map((item) => (
                      <option
                        key={item?._id}
                        className="text-base p-2"
                        value={item?._id}
                      >
                        {item?.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="relative z-0 w-full mb-5 group mt-4">
                <input
                  type="text"
                  name="subtitle"
                  id="subtitle"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Subtitle
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group mt-4">
                <input
                  type="text"
                  name="subtitle"
                  id="subtitle"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Rating
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group mt-4">
                <input
                  type="text"
                  name="subtitle"
                  id="subtitle"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={minDimension}
                  onChange={(e) => setMinDimension(e.target.value)}
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Min Dimension
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group mt-4">
                <input
                  type="text"
                  name="subtitle"
                  id="subtitle"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={maxDimension}
                  onChange={(e) => setMaxDimension(e.target.value)}
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Max Dimension
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group mt-4">
                <input
                  type="text"
                  name="subtitle"
                  id="subtitle"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Price
                </label>
              </div>

              <button
                type="submit"
                className="site-button py-2 px-4 hover:px-5 mt-3 flex"
              >
                Submit
                {loading && (
                  <div className="ml-2 mt-1 animate-spin rounded-full h-4 w-4 border-t-4 border-white border-solid"></div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default CreateProduct;
