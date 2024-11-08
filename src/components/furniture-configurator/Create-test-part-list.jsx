// import { button } from "@material-tailwind/react";
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url";
import { CreateTestPartList, SearchTestPartList_ConfigID } from "../../Functions-configurator/Function-configurator";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function Create_part_list({ setAddTestPartList, Type, setTestParlist }) {
    const [SearchingInput, setSearchingInput] = useState();
    const [PlateDepth, setPlateDepth] = useState('');
    const [MaterialName, setMaterialName] = useState('');
    const [PlateLength, setPlateLength] = useState('');
    const [SearchingData, setSearchingData] = useState();
    const [SearchingDataList, setSearchingDataList] = useState([]);
    const [Disabled, setDisabled] = useState(false);

    const HandleAddPart = async () => {
        if (SearchingInput?.trim() && SearchingData?.length > 0) {
            setDisabled(true)
            const { data, error } = await CreateTestPartList(SearchingInput, PlateDepth, PlateLength, MaterialName)
            if (data) {
                if (data.message != "Config Id already exists" && data.message != "Plate Length must be provided and cannot be empty" && data.message != "Plate Depth must be provided and cannot be empty" && data.message != "Config Id must start with 'PT_' or 'A_'" && data.message != "Material Name must be provided and cannot be empty" && data.message != "No matching plate found for the provided Material Name") {
                    setTestParlist(data?.data)
                    toast.success(data?.message);
                    setDisabled(false)
                    setAddTestPartList(false)
                    setSearchingInput("")
                    setPlateDepth('');
                    setMaterialName('');
                    setPlateLength('');
                    setSearchingData([])
                    setSearchingDataList([])
                } else {
                    setDisabled(false)
                    toast.error(data?.message);
                }
            }
            if (error) {
                toast.error(data?.messag);
                setDisabled(false)
            }
        }
    }

    useEffect(() => {
        if (Type) {
            setSearchingInput("")
            setSearchingData([])
            setSearchingDataList([])
        }
    }, [Type]);
    const SearchingTest_part_list = async (e) => {
        const Search = e.target.value
        setSearchingInput(Search)
        if (Search.trim() && Search?.length > 3) {
            const { data, error } = await SearchTestPartList_ConfigID(Search, Type)
            if ((data && (data?.Assests?.length > 0 || data?.Plates?.length > 0 || data?.PlatesType?.length > 0))) {
                const mergedArray = [
                    ...(data?.Assests || []),
                    ...(data?.Plates || []),
                    ...(data?.PlatesType || []),
                    ...(data?.FilteredPlatesData || [])
                ];
                if (mergedArray?.length > 0 && Array.isArray(mergedArray)) {
                    setSearchingData(mergedArray)
                    if (mergedArray[0]?.list?.length > 0 && Array.isArray(mergedArray[0]?.list)) {
                        setSearchingDataList(mergedArray[0]?.list)
                    }
                }
            } else {
                setSearchingData([])
                setSearchingDataList([])
            }
            if (error) {
                setSearchingData([])
                setSearchingDataList([])
                toast.error("There is no such result for this config id");
            }
        } else {
            setSearchingData([])
            setSearchingDataList([])
        }
    }
    
    const getBgColorClass = (input) => {
        if (input?.startsWith("PT_")) {
            return "bg-[#D9D9D9]"; // Gray color for items starting with "PT_"
        } else if (input?.startsWith("A_")) {
            return "bg-[#57AD6B]"; // Green color for items starting with "A_"
        } else if (input?.startsWith("E_")) {
            return "bg-[#6295B0]"; // Blue color for items starting with "E_"
        } else {
            return "bg-[#F6F6F6]"; // Default color if none of the conditions are met
        }
    };

    return (
        <div className="border px-[5px]   border-black border-solid rounded-[5px] py-1 flex flex-col items-center gap-[10px]">
            <div className={`rounded-t-[5px] rounded-[5px] ${getBgColorClass(SearchingInput)} bg-opacity-80 grid md:grid-cols-13 lg:grid-cols-26 auto-cols-min gap-[10px] items-center col-span-3 px-[15px] py-[5px]`}>
                <div className="col-span-2 auto-cols-max text-ellipsis p-0 text-center  ">
                    <button disabled={Disabled} onClick={HandleAddPart} type="button" className="w-[50%] bg-[#577E60] text-white   font-bold shadow-lg rounded-[5px] font-[karla] h-[30px] text-[22px] whitespace-nowrap overflow-hidden text-ellipsis">
                        Save
                    </button>
                </div>
                <div className="col-span-3 h-[30px] bg-[#fff] border border-solid border-black rounded-[3px]">
                    < input
                        placeholder="Material Name"
                        className="font-[karla] w-full h-full px-[3px] font-bold text-[15px]"
                        type="text"
                        value={MaterialName}
                        onChange={(e) => setMaterialName(e.target.value)}
                    />
                </div>
                <div className="col-span-2 h-[30px] bg-[#fff]   border border-solid border-black rounded-[3px]">
                    <input
                        className="font-[karla] w-full h-full px-[3px]  font-bold text-[15px]"
                        type="text"
                        value={SearchingInput}
                        onChange={(e) => SearchingTest_part_list(e)}
                    />
                </div>
                {Type !== "asset" ? <div className="col-span-3 h-[30px] px-[10px] bg-[#fff]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis ">
                    <span className="font-[karla] font-bold text-[22px]"></span>
                </div> : <div className="col-span-3 " />
                }
                {Type !== "asset" ? <div className="col-span-3 h-[30px] bg-[#fff] border border-solid border-black rounded-[3px]">
                    <input
                        placeholder="Plate Depth"
                        className="font-[karla] w-full h-full px-[3px] font-bold text-[15px]"
                        type="text"
                        value={PlateDepth}
                        onChange={(e) => setPlateDepth(e.target.value)}
                    />
                </div> : <div className="col-span-3 " />
                }
                {Type !== "asset" ? <div className="col-span-3 h-[30px] bg-[#fff] border border-solid border-black rounded-[3px]">
                    <input
                        placeholder="Plate Length"
                        className="font-[karla] w-full h-full px-[3px] font-bold text-[15px]"
                        type="text"
                        value={PlateLength}
                        onChange={(e) => setPlateLength(e.target.value)}
                    />
                </div> : <div className="col-span-3 " />
                }
                {Type !== "asset" ? <div className="col-span-3 h-[30px] px-[10px] bg-[#fff]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="font-[karla] font-bold text-[22px]">{SearchingData?.length > 0 && SearchingData[0]?.edge_0}</span>
                </div>
                    : <div className="col-span-3 " />}

                {Type !== "asset" ? <div className="col-span-3 h-[30px] px-[10px] bg-[#fff]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="font-[karla] font-bold text-[22px]">{SearchingData?.length > 0 && SearchingData[0]?.name}</span>
                </div> : <div className="col-span-3 " />}

                <div className="col-span-3 h-[30px] px-[10px] bg-[#fff]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis">
                    <span className="font-[karla] font-bold text-[22px]">1</span>
                </div>
                <div className="col-span-1 flex flex-start justify-end cursor-pointer" onClick={() => setAddTestPartList(false)}>
                    <img className="h-[34px]" src={DeleteIcon} alt="Delete Icon" />
                </div>

            </div>
            {
                SearchingDataList?.length > 0 && Array.isArray(SearchingDataList) &&
                SearchingDataList?.map((item, index) => {
                    let bgColor;
                    if (item?.child_config_id[0]?.startsWith("PT_")) {
                        bgColor = "bg-[#D9D9D9]"; // Gray color for items starting with "PT_"
                    } else if (item?.child_config_id[0]?.startsWith("A_")) {
                        bgColor = "bg-[#57AD6B]"; // Green color for items starting with "A_"
                    } else if (item?.child_config_id[0]?.startsWith("E_")) {
                        bgColor = "bg-[#6295B0]"; // Blue color for items starting with "E_"
                    } else {
                        bgColor = "bg-[#D9D9D9]"; // Default color if none of the conditions are met
                    }
                    const className = `rounded-t-[5px] grid md:grid-cols-13 lg:grid-cols-26 auto-cols-min gap-[10px] items-center col-span-3 ${bgColor} bg-opacity-80 rounded-[5px] px-[10px] py-[5px]`;
                    return (
                        <div key={index} className={className}>
                            <div className="col-span-4 auto-cols-max text-ellipsis h-[30px] px-[10px]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden ">
                                <span className="font-[karla] font-medium text-[22px]">{item?.child_name?.length > 0 && item?.child_name[0]}</span>
                            </div>
                            <div className="col-span-3 h-[30px] px-[10px]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                <span className="font-[karla] font-medium text-[22px]">{item?.child_config_id?.length > 0 && item?.child_config_id[0]}</span>
                            </div>
                            <div className="col-span-3 h-[30px] px-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                                <span className="font-[karla] font-medium text-[22px]"></span>
                            </div>
                            <div className="col-span-3 h-[30px] px-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                                <span className="font-[karla] font-medium text-[22px]"></span>
                            </div>
                            <div className="col-span-3 h-[30px] px-[10px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                <span className="font-[karla] font-medium text-[22px]"></span>
                            </div>
                            <div className="col-span-3 h-[30px] px-[10px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                <span className="font-[karla] font-medium text-[22px]">{item?.edge_0?.length > 0 && item[0]?.edge_0}</span>
                            </div>
                            <div className="col-span-3 h-[30px] px-[10px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                <span className="font-[karla] font-medium text-[22px]"></span>
                            </div>
                            <div className="col-span-3 h-[30px] px-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                                <span className="font-[karla] font-medium text-[22px]"></span>
                            </div>
                            <div className="col-span-1 flex flex-start justify-end">
                                {/* <img className="h-[34px]" src={DeleteIcon} alt="Delete Icon" /> */}
                                <svg width="34" height="31" viewBox="0 0 34 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M31.8185 13.5625H19.0911V1.9375C19.0911 1.42364 18.8676 0.930833 18.4698 0.567481C18.072 0.204129 17.5324 0 16.9699 0C16.4073 0 15.8677 0.204129 15.4699 0.567481C15.0721 0.930833 14.8486 1.42364 14.8486 1.9375V13.5625H2.12123C1.55865 13.5625 1.0191 13.7666 0.621295 14.13C0.223487 14.4933 0 14.9861 0 15.5C0 16.0139 0.223487 16.5067 0.621295 16.87C1.0191 17.2334 1.55865 17.4375 2.12123 17.4375H14.8486V29.0625C14.8486 29.5764 15.0721 30.0692 15.4699 30.4325C15.8677 30.7959 16.4073 31 16.9699 31C17.5324 31 18.072 30.7959 18.4698 30.4325C18.8676 30.0692 19.0911 29.5764 19.0911 29.0625V17.4375H31.8185C32.3811 17.4375 32.9206 17.2334 33.3184 16.87C33.7162 16.5067 33.9397 16.0139 33.9397 15.5C33.9397 14.9861 33.7162 14.4933 33.3184 14.13C32.9206 13.7666 32.3811 13.5625 31.8185 13.5625Z" fill="black" />
                                </svg>

                            </div>
                        </div>
                    )
                })
            }
        </div >
    );
}

export default Create_part_list;