import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../../Layouts/Layout";
import { GetSingleProduct, UpdateSingleProduct } from "../../../api/api";
import Loader from "../../../components/loaders/Loader";
import DeleteIcon from "/images/furniture_configurator/delete-icon.png";
// import { string } from "yup";

const productImageCount = 15;
const productDetailCount = 8;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const parms = useParams();
  const [pictureMass, setPictureMass] = useState(0)

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [defaultImage, setDefaultImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [imagesIndex, setImagesIndex] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaTag, setMetaTag] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [materialNumber, setMaterialNumber] = useState("");
  const [active, setActive] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [detailChanged, setDetailChanged] = useState(false)
  const [configNumber, setConfigNumber] = useState()
  const [saveModal, setSaveModal] = useState(false)
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setPageLoading(true)
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("defaultImage", defaultImage);
    if (hoverImage) {
      formData.append("hoverImage", hoverImage);
    }
    formData.append("rating", rating);
    formData.append("price", price);

    formData.append("active", active)
    formData.append("productDescription", productDescription)
    formData.append("metaDescription", metaDescription)
    formData.append("metaTag", metaTag)
    formData.append("imagesIndex", imagesIndex)

    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i]) {
        if (typeof fileList[i] === 'string') {
          formData.append('fileList', fileList[i]);
          formData.append("fileListPos", i)
        } else {
          formData.append('detailImages', fileList[i]);
          formData.append("detailImagesPos", i)

        }
      }
    }

    const { data, error } = await UpdateSingleProduct(parms?.configId, formData);
    if (data) {
      toast.success(data?.message);
      setLoading(false)
      setPageLoading(false)
      navigate("/dashboard/admin/products");
    } else if (error) {
      setLoading(false);
      setPageLoading(false)
      toast.error(error?.message);
    }
  };

  const getProduct = async () => {
    setPageLoading(true);
    const { data, error } = await GetSingleProduct(parms?.configId);
    if (data) {
      setName(data?.product?.name);
      setConfigNumber(data?.product?.configId)
      setDefaultImage(data?.product?.defaultImage);
      setHoverImage(data?.product?.hoverImage);
      setRating(data?.product?.rating);
      setPrice(data?.product?.price);

      setActive(data?.product?.active);
      setImagesIndex(data?.product?.imagesIndex)
      setProductDescription(data?.product?.productDescription)
      setMetaDescription(data?.product?.metaDescription)
      setMetaTag(data?.product?.metaTag)
      const detailImages = data?.product.detailImages
      const length = Number(detailImages[detailImages.length-1].pos)
      let tempFileList = []
      for (let i = 0; i < length+1; i++) {
        let flag = true
        detailImages.map((image, index) => {
          if (Number(image.pos) === i) {
            tempFileList.push(image.image)
            flag = false
          }
        })
        if (flag) {
          tempFileList.push(undefined)
        }
      }
      setFileList(tempFileList)

      setPageLoading(false);
    } else if (error) {
      setPageLoading(true);
    }
  };

  useEffect(() => {
    getProduct();
    //eslint-disable-next-line
  }, []);

  const productImages = Array.from(
    { length: productImageCount },
    (_, index) => `/images/productimage/${index + 1}.png`
  );
  const productDetailImages = Array.from(
    { length: productDetailCount },
    (_, index) => `/images/avatar-.jpg`
  );
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
    setPageLoading(true)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("defaultImage", defaultImage);
    if (hoverImage) {
      formData.append("hoverImage", hoverImage);
    }
    formData.append("rating", rating);
    formData.append("price", price);

    formData.append("active", active)
    formData.append("productDescription", productDescription)
    formData.append("metaDescription", metaDescription)
    formData.append("metaTag", metaTag)
    formData.append("imagesIndex", imagesIndex)

    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i]) {
        if (typeof fileList[i] === 'string') {
          formData.append('fileList', fileList[i]);
          formData.append("fileListPos", i)
        } else {
          formData.append('detailImages', fileList[i]);
          formData.append("detailImagesPos", i)

        }
      }
    }

    const { data, error } = await UpdateSingleProduct(parms?.configId, formData);
    if (data) {
      toast.success(data?.message);
      setLoading(false)
      setPageLoading(false)
      navigate(`/product/${parms?.id}/${parms?.configId}`);
    } else if (error) {
      setLoading(false);
      setPageLoading(false)
      toast.error(error?.message);
    }
  }
  return (
    <Layout>
      {pageLoading && <Loader />}
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
                      onClick={(e) => {}}
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="flex items-center font-bold ml-auto mr-auto">
                  <div className="pr-2">Configuration-Nr</div>
                  <div disabled>
                    <input
                      type="text"
                      value={configNumber}
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
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            <div className="flex w-[100%] items-center mb-5">
              <div className="mr-2 ml-2 w-[15%] font-bold">
                Meta Description
              </div>
              <div className="mr-2 ml-2 w-[75%]">
                <input
                  className="border border-solid border-black rounded-[5px]"
                  value={metaDescription}
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
                  value={metaTag}
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
                      onClick={(e) => setImagesIndex(index)}
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
                        // src={defaultImage.data}
                        src={
                          typeof defaultImage.data === 'string'
                            ? defaultImage.data
                            : URL.createObjectURL(defaultImage)
                        }
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
                        // src={hoverImage.data}
                        src={
                          typeof hoverImage.data === 'string'
                            ? hoverImage.data
                            : URL.createObjectURL(hoverImage)
                        }
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
                        // src={URL.createObjectURL(
                        //   fileList[index + productDetailCount * imagesIndex]
                        // )}
                        src={
                          typeof fileList[index + productDetailCount * imagesIndex] === 'string'
                            ? fileList[index + productDetailCount * imagesIndex]
                            : URL.createObjectURL(fileList[index + productDetailCount * imagesIndex])
                        }
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
                        // console.log(e.target.files[0])
                        const count = index + productDetailCount * imagesIndex
                        let tempFileList = fileList;
                        if ( e.target.files[0]) {
                          if ( fileList[count]) {
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
                  onClick={(e) => setSaveModal(false)}
                  className="site-button mr-auto ml-3 py-2 px-4 hover:px-5  text-sm font-normal bg-red-500 hover:bg-red-700"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default UpdateProduct;
