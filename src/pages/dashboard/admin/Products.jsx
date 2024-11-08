import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../../Layouts/Layout";
import { DeleteSingleProduct, GetAllProduct, AllCategory, cloneProduct } from "../../../api/api";
import AdminSideBar from "../../../components/admin/AdminSideBar";
import WelcomeTopBar from "../../../components/admin/WelcomeTopBar";
import Loader from "../../../components/loaders/Loader";

const Products = () => {
  const auth = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([])
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedDelete, setSelectedDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [sortName, setSortName] = useState(false)
  const [categoryShow, setCategoryShow] = useState(false)
  const [categoryAllCheck, setCategoryAllCheck] = useState(false)
  const [categoryChecks, setCategoryChecks] = useState([]);
  const [datePicker, setDatePicker] = useState(false)
  const [allTimeChecker, setAllTimeChecker] = useState(true)
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()

  const [serachKey, setSearchKey] = useState("")

  const getAllCategories = async () => {
    setLoading(true);
    const { data, error } = await GetAllProduct();
    if (data) {
      setLoading(false);
      setProducts(data?.products);
    } else if (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const getCategoryList = async () => {
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

  useEffect(() => {
    getAllCategories();
    getCategoryList();
  }, []);

  useEffect(() => {
    if (categories && products) {
      setCategoryChecks(new Array(categories.length).fill(false));
      setFilteredProducts(products);
      setFilteredCategories(categories)
    }
  }, [categories, products])

  useEffect(() => {
    if (products.length > 0) {
      const dates = products.map(product => new Date(product.updatedAt));
      const earliest = new Date(Math.min(...dates));
      const latest = new Date(Math.max(...dates));
      setFromDate(earliest.toISOString().split('T')[0]);
      setToDate(latest.toISOString().split('T')[0]);
    } else {
      const today = new Date()
      const year = today.getFullYear()
      const month = String(today.getMonth() + 1).padStart(2, '0')
      const day = String(today.getDate()).padStart(2, '0')
      setFromDate(`${year}-${month}-${day}`);
      setToDate(`${year}-${month}-${day}`);
    }
  }, [products])
  const handleDeleteCategory = (e) => {
    setDeleteModal(true);
    setSelectedDelete(e);
  };

  const logoutUser = () => {
    localStorage.setItem("schrankdesign-app-user-token", null);
    navigate("/");
  };
  const deleteProduct = async () => {
    setDeleteLoading(true);
    const { data, error } = await DeleteSingleProduct(selectedDelete);
    if (data) {
      setDeleteLoading(false);
      getAllCategories();
      setDeleteModal(false);
      toast.success(data?.message);
    } else if (error) {
      setDeleteLoading(false);
      setDeleteModal(false);
      toast.error(error?.message);
    }
  };

  const productsSort = (field) => {
    switch (field) {
      case "name":
        products.sort((a, b) => {
          if (sortName) {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        });
        break;
      case "categoryName":
        products.sort((a, b) => {
          if (sortName) {
            return a.categoryName.localeCompare(b.categoryName);
          } else {
            return b.categoryName.localeCompare(a.categoryName);
          }
        });
        break;
      case "active":
        products.sort((a, b) => {
          if (sortName) {
            return a.active - b.active;
          } else {
            return b.active - a.active;
          }
        });
        break;
      case "saveDate":
        products.sort((a, b) => {
          let dateA = new Date(a.updatedAt);
          let dateB = new Date(b.updatedAt);
          if (sortName) {
            return dateA - dateB; // Ascending order
          } else {
            return dateB - dateA; // Descending order
          }
        });
        break;
      case "price":
        products.sort((a, b) => {
          if (sortName) {
            return a.price - b.price; // Ascending order: lower price comes first
          } else {
            return b.price - a.price; // Descending order: higher price comes first
          }
        });
        break;
      default:
        break;
    }
  }

  const handleCategoryChange = (index) => {
    const updatedChecks = [...categoryChecks];
    updatedChecks[index] = !updatedChecks[index];
    setCategoryChecks(updatedChecks);

    const allChecked = updatedChecks.every((check) => check);
    setCategoryAllCheck(allChecked);

    const updatedFilteredCategories = categories.filter((_, i) => updatedChecks[i]);
    // const updatedFilteredProducts = products.filter(product =>
    //   updatedFilteredCategories.some(category => product.categoryName.includes(category.name))
    // )
    // filterFunction(fromDate, toDate, updatedFilteredCategories)
    const updatedFilteredProducts = products.filter(product => {
      const productDate = new Date(product.updatedAt);

      const tDate = new Date(toDate)
      tDate.setDate(tDate.getDate() + 1)

      const inCategory = updatedFilteredCategories.some(category => product.categoryName.includes(category.name));
      const inDateRange = (!fromDate || productDate > new Date(fromDate)) && (!toDate || productDate < tDate);
      const inSearchKey = product.name.toLowerCase().includes(serachKey.toLowerCase());
      return inCategory && inDateRange && inSearchKey;
    });
    setFilteredProducts(updatedFilteredProducts)
    setFilteredCategories(updatedFilteredCategories)
  };

  const handleAllChange = (isChecked) => {
    setCategoryAllCheck(isChecked);
    setCategoryChecks(new Array(categories.length).fill(isChecked));
    
    setFilteredProducts(products);
  };
  
  const handleFilterByDate = (fromDate, toDate) => {
    // filterFunction(fromDate, toDate, filteredCategories)
    const updatedFilteredProducts = products.filter(product => {
      const productDate = new Date(product.updatedAt);

      const tDate = new Date(toDate)
      tDate.setDate(tDate.getDate() + 1)

      const inCategory = filteredCategories.some(category => product.categoryName.includes(category.name));
      const inDateRange = (!fromDate || productDate > new Date(fromDate)) && (!toDate || productDate < tDate);
      const inSearchKey = product.name.toLowerCase().includes(serachKey.toLowerCase());
      return inCategory && inDateRange && inSearchKey;
    });
    setFilteredProducts(updatedFilteredProducts)
  }

  const searchFunction = () => {
    // filterFunction(fromDate, toDate)
    const updatedFilteredProducts = products.filter(product => {
      const productDate = new Date(product.updatedAt);

      const tDate = new Date(toDate)
      tDate.setDate(tDate.getDate() + 1)

      const inCategory = filteredCategories.some(category => product.categoryName.includes(category.name));
      const inDateRange = (!fromDate || productDate > new Date(fromDate)) && (!toDate || productDate < tDate);
      const inSearchKey = product.name.toLowerCase().includes(serachKey.toLowerCase());
      return inCategory && inDateRange && inSearchKey;
    });
    setFilteredProducts(updatedFilteredProducts)
  }

  const filterFunction = (from, to, filteredCategories) => {
    const fromDate = from ? from : fromDate
    const toDate = to ? to : toDate
    const updatedFilteredProducts = products.filter(product => {
      const productDate = new Date(product.updatedAt);

      const tDate = new Date(toDate)
      tDate.setDate(tDate.getDate() + 1)

      const inCategory = filteredCategories.some(category => product.categoryName.includes(category.name));
      const inDateRange = (!fromDate || productDate > new Date(fromDate)) && (!toDate || productDate < tDate);
      const inSearchKey = product.name.toLowerCase().includes(serachKey.toLowerCase());
      return inCategory && inDateRange && inSearchKey;
    });
    setFilteredProducts(updatedFilteredProducts)
  }
  return (
    <Layout>
      {loading && <Loader />}
      <div className="w-[90%] mx-auto rounded-2xl shadow-2xl my-5 p-5 md:p-10 text-black">
        <WelcomeTopBar
          auth={auth}
          logoutUser={logoutUser}
          dispatch={dispatch}
          link={"/dashboard/admin/profile"}
        />
        <div className="mt-5 grid grid-cols-12 lg:gap-10">
          <div className="lg:col-span-2">
            <AdminSideBar />
          </div>
          <div className="col-span-12 lg:col-span-10">
            <div className="flex">
              <div className="mr-auto flex gap-4 py-2 px-4 bg-[#D9D9D9]">
                <div className=" flex items-center">
                  <input className="focus:outline-none h-[30px] border border-black px-2"
                    onChange={(e) => setSearchKey(e.target.value)}
                  ></input>
                </div>
                <div>
                  <button className="bg-[#36695C] rounded-[3px] px-3 md:px-4 hover:px-5 transition-all duration-300 text-[22px] h-[35px] text-[#ffffff]"
                    onClick={() => searchFunction()}
                  >
                    Search
                  </button>
                </div>
                <div className="relative">
                  <button className="px-3 md:px-4 hover:px-5 transition-all duration-300 w-32 bg-[#456779] text-[22px] h-[35px] text-[#ffffff]"
                    onClick={() => setCategoryShow(!categoryShow)}
                    onMouseOver={() => setCategoryShow(true)}
                    onMouseOut={() => setCategoryShow(false)}
                  >
                    Categorie
                  </button>
                  {categoryShow && (
                    <div className="origin-top-right absolute mx-auto w-96 -left-32 z-10"
                      onMouseOver={() => setCategoryShow(true)}
                      onMouseOut={() => setCategoryShow(false)}
                    >
                      <div className="mt-2 bg-[#D9D9D9]  rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="absolute top-0 right-1/2 transform translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#D9D9D9]"></div>
                        <div className="flex items-center">
                          <div className="mx-auto my-2">
                            <input type="checkbox" className="mr-1"
                              checked={categoryAllCheck}
                              onChange={(e) => handleAllChange(e.target.checked)}
                            ></input>
                            All
                          </div>
                        </div>
                        <div className="grid grid-cols-3 p-4 pt-0">
                          {categories && (
                            categories.map((category, index) => (
                              <div className="flex items-center">
                                <div className="my-2">
                                  <input type="checkbox" className="mr-1"
                                    checked={categoryChecks[index]}
                                    onChange={(e) => handleCategoryChange(index)}
                                  ></input>
                                </div>
                                <div style={{fontSize: '12px'}}>
                                  {category.name}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button className="px-3 md:px-4 hover:px-5 transition-all duration-300 w-50 bg-[#456779] text-[20px] h-[35px] text-[#ffffff]"
                    onClick={() => setDatePicker(!datePicker)}
                    onMouseOver={() => setDatePicker(true)}
                    onMouseOut={() => setDatePicker(false)}
                  >
                    {`${fromDate}-${toDate}`}
                  </button>
                  {datePicker && (
                    <div className="origin-top-right absolute mx-auto w-96 -left-24 z-10"
                      onMouseOver={() => setDatePicker(true)}
                      onMouseOut={() => setDatePicker(false)}
                    >
                      <div className="mt-2 bg-[#D9D9D9]  rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="absolute top-0 right-1/2 transform translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#D9D9D9]"></div>
                        <div className="flex items-center">
                          <div className="mx-auto my-2">
                          <input type="checkbox" className="mr-1"
                            checked={allTimeChecker}
                            onChange={(e) => setAllTimeChecker(e.target.checked)}
                          ></input>
                            All Time
                          </div>
                        </div>
                        <div className="grid grid-cols-2 p-4 pt-0 ">
                          <div className="flex items-center mr-auto">
                            From
                            <input type="date" datePicker disabled={allTimeChecker}
                              className="focus: outline-none px-2 border border-1 w-32 ml-3"
                              value={fromDate}
                              onChange={(e) => {
                                setFromDate(e.target.value)
                                handleFilterByDate(e.target.value, toDate)
                              }}
                            ></input>
                          </div>
                          <div className="flex items-center ml-auto">
                            To
                            <input type="date" datePicker disabled={allTimeChecker}
                              className="focus: outline-none px-2 border border-1 w-32 ml-3"
                              value={toDate}
                              onChange={(e) => {
                                setToDate(e.target.value)
                                handleFilterByDate(fromDate, e.target.value)
                              }}
                            ></input>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-auto flex items-center">
                <Link to="/dashboard/admin/products/create" className="ml-auto ">
                  <button className="site-button py-1.5 px-3 md:py-2 md:px-4 hover:px-5 transition-all duration-300 text-sm">
                    Create
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg lg:w-[100%] mx-auto mt-5">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => {
                        setSortName(!sortName)
                        productsSort("name")
                      }}>
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => {
                        setSortName(!sortName)
                        productsSort("categoryName")
                      }}>
                      Categorie
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Configuration-Nr
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => {
                        setSortName(!sortName)
                        productsSort("active")
                      }}>
                      Active
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => {
                        setSortName(!sortName)
                        productsSort("saveDate")}
                      }>
                      Save Date
                    </th>
                    <th scope="col" className="px-6 py-3 cursor-pointer" onClick={() => {
                        setSortName(!sortName)
                        productsSort("price")}
                      }>
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Update
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProducts &&
                    filteredProducts?.map((item) => (
                      <tr
                        key={item?._id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item?.name}
                        </th>
                        <td className="px-6 py-4">
                          <img
                            src={item?.defaultImage?.data}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          /> 
                        </td>
                        <td className="px-6 py-4">{item?.categoryName}</td>
                        <td className="px-6 py-4">{item?.configId}</td>
                        <td className="px-6 py-4">{item?.active ? "Yes" : 'No'}</td>
                        <td className="px-6 py-4">{item?.updatedAt?.slice(0, item?.updatedAt.indexOf('T'))}</td>
                        <td className="px-6 py-4">{item?.price}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <Link
                            to={`/dashboard/admin/products/update/${item?.categoryName}/${item?.configId}`}
                          >
                            <button className="px-3 py-1.5 rounded-md text-[#5a8560] hover:bg-[#5a8560] hover:text-white :bg-red-700 transition-all duration-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-refresh-ccw"
                              >
                                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                <path d="M3 3v5h5" />
                                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                <path d="M16 16h5v5" />
                              </svg>
                            </button>
                          </Link>
                          <div>
                            <button className="px-2 py-2 rounded-md bg-[#36695C] text-white :bg-red-700 transition-all duration-300"
                              onClick={async () => {
                                const configId = item?.configId
                                const { data, error } = await cloneProduct(configId)
                                if (data) {
                                  
                                } else {
                                  toast.error("Clone Product Failture!")
                                }
                              }}
                            >copy</button>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={(e) => handleDeleteCategory(item?._id)}
                            className="px-3 py-1.5 rounded-md text-red-500 hover:bg-red-700 hover:text-white :bg-red-700 transition-all duration-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-trash-2"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {products?.length < 1 && (
                <div className="flex my-5">
                  <h3 className="font-semibold mx-auto text-gray-700 italic">
                    Sorry No Products Found
                  </h3>
                </div>
              )}
            </div>
            <div className="flex mt-4">
              <p className="ml-auto font-semibold text-base italic text-gray-600">
                Showing {products && products.length} Products.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {deleteModal && (
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
                  onClick={deleteProduct}
                  className="site-button ml-auto mr-3 py-2 px-4 hover:px-5  text-sm font-normal flex"
                >
                  Yes
                  {deleteLoading && (
                    <div className="ml-2 mt-1 animate-spin rounded-full h-4 w-4 border-t-4 border-white border-solid"></div>
                  )}
                </button>
                <button
                  onClick={(e) => setDeleteModal(false)}
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

export default Products;
