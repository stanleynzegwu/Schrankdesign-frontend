import settingsIcon from "/images/furniture_configurator/settings-icon.png?url"
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url"
import { MenuItem, Select } from "@mui/material"
// import { useEffect } from "react"

function PartListFunctionComponent({
  PartListArray,
  setPartListArray,
  index,
  setParlistFunctionOpen,
}) {
  const dropdownOptionsEdge = [
    { label: "Length", icon: null },
    { label: "Depth", icon: null },
  ]
  const HandleAddFunction = () => {
    const updatedPartListArray = [...PartListArray] // Copy the PartListArray
    const updatedItem = { ...updatedPartListArray[index] } // Copy the item at the specified index
    // Create a new distance object
    const newDistanceObject = {
      _id: updatedItem.add_distance.length + 1,
      Distance: "",
      From: "",
      To: "",
      Quantity: "",
    }
    // Add the new distance object to the add_distance array of the item
    updatedItem.add_distance.push(newDistanceObject)
    // Update the PartListArray with the updated item
    updatedPartListArray[index] = updatedItem
    // Update the state with the updated PartListArray
    setPartListArray(updatedPartListArray)
  }

  const HandleDeleteFunction = (itemID) => {
    const updatedPartListArray = [...PartListArray] // Copy the PartListArray
    const updatedItem = [...(updatedPartListArray[index]?.add_distance ?? [])];
    // updatedItem.splice(distanceIndex, 1);
    if (updatedItem?.length > 1) {
      const filter = updatedItem.filter((item) => item._id != itemID)
      updatedPartListArray[index].add_distance = filter
      setPartListArray(updatedPartListArray)
    }
  }

  const HandleInputChanges = (inputVal, currentIndex, type) => {
    const updatedPartListArray = [...PartListArray]
    const updatedItem = [...(updatedPartListArray[index]?.add_distance ?? [])]
    const selected_funtion_Row = updatedItem[currentIndex]
    selected_funtion_Row[type] = inputVal.target.value
    updatedPartListArray[index].add_distance[currentIndex] =
      selected_funtion_Row
    setPartListArray(updatedPartListArray)
  }

  return (
    PartListArray[index]?.add_distance?.length > 0 &&
    Array.isArray(PartListArray[index]?.add_distance) && (
      <div className="toggler  transition duration-300 delay-200 rounded-[5px] col-span-12 bg-[#F6F6F6]  z-[15] absolute w-full top-[102%]  border border-solid border-black px-2 ">
        <div className="flex justify-between  py-6 px-3">
          <div className="flex w-[80%] justify-center items-center text-black gap-2 ">
            <img width={20} height={20} src={settingsIcon} alt="setting-icon" />
            <h3>Add-Distance</h3>
          </div>
          <div className="flex flex-row gap-[5px]">
            <div className="shadow-lg">
              <button
                onClick={HandleAddFunction}
                type="button"
                className="font-[karla]  text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg"
              >
                Add
              </button>
            </div>
            <div className="shadow-lg">
              <button
                onClick={() => setParlistFunctionOpen(false)}
                type="button"
                className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {PartListArray[index]?.add_distance?.length > 0 &&
          Array.isArray(PartListArray[index]?.add_distance) &&
          PartListArray[index]?.add_distance?.map((item, indexinner) => {
            return (
              <div
                key={indexinner}
                className="flex flex-row items-center flex-wrap justify-between w-full p-3 mb-3  rounded-[5px]  border border-solid border-black "
              >
                <div className=" px-4 flex flex-row items-center flex-wrap gap-[15px] justify-between">
                  <h1 className="font-[karla] text-[20px] font-medium">
                    Distance{" "}
                  </h1>
                  <div className="sm:w-[170px] border border-solid border-black bg-[#F6F6F6] rounded-[3px]">
                    <Select
                      IconComponent={() => <DropDownIcon />}
                      onChange={(e) =>
                        HandleInputChanges(e, indexinner, "Distance")
                      }
                      value={item?.functions_distance?.[0] ?? item?.Distance}
                      disabled={item?.functions_distance?.[0] && true}
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
                <div className=" px-4 flex flex-row items-center flex-wrap gap-[15px] justify-between">
                  <h1 className="font-[karla] text-[20px] font-medium">
                    From{" "}
                  </h1>
                  <div className="sm:w-[170px] border border-solid border-black bg-[#F6F6F6] rounded-[3px]">
                    <input
                      className="block w-100 h-100 text-[20px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3"
                      onChange={(e) =>
                        HandleInputChanges(e, indexinner, "From")
                      }
                      value={item?.functions_from?.[0] ?? item?.From}
                      required
                      disabled={item?.functions_from?.[0] && true}
                      type="number"
                    />
                  </div>
                </div>
                <div className=" px-4 flex flex-row items-center flex-wrap gap-[15px] justify-between">
                  <h1 className="font-[karla] text-[20px] font-medium">To </h1>
                  <div className="sm:w-[170px] border border-solid border-black bg-[#F6F6F6] rounded-[3px]">
                    <input
                      className="block w-100 h-100 text-[20px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3"
                      onChange={(e) => HandleInputChanges(e, indexinner, "To")}
                      value={item?.functions_to?.[0] ?? item?.To}
                      required
                      disabled={item?.functions_to?.[0] && true}
                      type="number"
                    />
                  </div>
                </div>
                <div className=" px-4 flex flex-row items-center flex-wrap gap-[15px] justify-between">
                  <h1 className="font-[karla] text-[20px] font-medium">
                    Quantity{" "}
                  </h1>
                  <div className="sm:w-[170px] border border-solid border-black bg-[#F6F6F6] rounded-[3px]">
                    <input
                      className="block w-100 h-100 text-[20px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3"
                      onChange={(e) =>
                        HandleInputChanges(e, indexinner, "Quantity")
                      }
                      value={item?.functions_quantity?.[0] ?? item?.Quantity}
                      disabled={item?.functions_quantity?.[0] && true}
                      required
                      type="number"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => HandleDeleteFunction(item._id, index)}
                  className="w-[31px] shrink-0"
                >
                  <img
                    className="h-[34px]"
                    src={DeleteIcon}
                    alt="Delete Icon"
                  />
                </button>
              </div>
            )
          })}
      </div>
    )
  )
}

export default PartListFunctionComponent

const DropDownIcon = () => (
  <svg
    width="66"
    height="43"
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
