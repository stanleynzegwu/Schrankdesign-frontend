// import { Menu, Transition } from "@headlessui/react";
import { useState } from "react";
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url";
import { DeleteTestPartlist } from "../../Functions-configurator/Function-configurator";

function Test_part_Listing({ viewdata, index, setTestParlist }) {
    const [Deletedisabled, setDeletedisabled] = useState(false);
    const DeleteTestPart = async (configId) => {
        setDeletedisabled(true)
        const { data } = await DeleteTestPartlist(configId)
        if (data) {
            setDeletedisabled(false)
            setTestParlist(data?.data)
        }
        else {
            setDeletedisabled(false)
        }
    }


    let bg;
    if (viewdata?.configId?.startsWith("PT_")) {
        bg = "bg-[#D9D9D9]"; // Gray color for items starting with "PT_"
    } else if (viewdata?.configId?.startsWith("A_")) {
        bg = "bg-[#57AD6B]"; // Green color for items starting with "A_"
    } else if (viewdata?.configId?.startsWith("E_")) {
        bg = "bg-[#6295B0]"; // Blue color for items starting with "E_"
    } else {
        bg = "bg-[#D9D9D9]"; // Default color if none of the conditions are met
    }
    const IsAssests = viewdata?.configId.startsWith("A_")
    return (
        < div key={index} className="py-[11px] gap-[11px] flex flex-col " >
            <div className="flex flex-col h-fit gap-[10px] ">
                <div key={index} className="border  px-[7px]  py-[10px] border-black border-solid rounded-[5px] flex flex-col gap-[10px]">
                    <div key={index} className={`rounded-[5px]  grid md:grid-cols-13 lg:grid-cols-26 auto-cols-min gap-[10px] items-center col-span-3 ${bg} px-[15px] py-[5px] bg-opacity-80`}>
                        <div className="col-span-4 auto-cols-max text-ellipsis h-[30px] px-[10px] py-[3px] border border-solid border-black rounded-[3px]">
                            <span className="font-[karla] font-bold text-[22px]">{viewdata?.MaterialName}</span>
                        </div>
                        <div className="col-span-3 h-[30px] px-[10px] border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis">
                            <span className="font-[karla] font-bold text-[22px]">{viewdata?.configId}</span>
                        </div>
                        {
                            !IsAssests ? <>
                                <div className="col-span-3 h-[30px] px-[10px]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                    <span className="font-[karla] font-bold text-[22px]"></span>
                                </div>
                                <div className="col-span-3 h-[30px] px-[10px]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                    <span className="font-[karla] font-bold text-[22px]">{viewdata?.PlateDepth}</span>
                                </div>
                                <div className="col-span-3 h-[30px] px-[10px]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                    <span className="font-[karla] font-bold text-[22px]">{viewdata?.PlateLength}</span>
                                </div>
                                <div className="col-span-3 h-[30px] px-[10px]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                    <span className="font-[karla] font-bold text-[22px]">{viewdata?.edge_0}</span>
                                </div>
                                <div className="col-span-3 h-[30px] px-[10px]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                    <span className="font-[karla] font-bold text-[22px]">{viewdata?.name}</span>
                                </div>
                            </> :
                                <>
                                    <div className="col-span-3 h-[30px] px-[10px]  " />

                                    <div className="col-span-3 h-[30px] px-[10px]  " />

                                    <div className="col-span-3 h-[30px] px-[10px]  " />

                                    <div className="col-span-3 h-[30px] px-[10px]  " />
                                    
                                    <div className="col-span-3 h-[30px] px-[10px]  " />
                                </>
                        }
                        <div className="col-span-3 h-[30px] px-[10px]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis">
                            <span className="font-[karla] font-bold text-[22px]">1</span>
                        </div>
                        <div className="col-span-1 flex flex-start justify-end">
                            <button disabled={Deletedisabled} onClick={() => DeleteTestPart(viewdata?._id)}>
                                <img className="h-[34px]" src={DeleteIcon} alt="Delete Icon" />
                            </button>
                        </div>
                    </div>
                    {
                        viewdata?.list?.length > 0 && Array.isArray(viewdata?.list) &&
                        viewdata?.list?.map((item, index) => {
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
                            const className = `rounded-[5px] grid md:grid-cols-13 lg:grid-cols-26 auto-cols-min gap-[10px] items-center col-span-3 ${bgColor} bg-opacity-80 rounded-[5px] px-[10px] py-[5px]`;
                            return (
                                <div key={index} className={className}>
                                    <div className="col-span-4 auto-cols-max text-ellipsis h-[30px] px-[10px]  border border-solid border-black rounded-[3px]">
                                        <span className="font-[karla] font-medium text-[22px] whitespace-nowrap overflow-hidden text-ellipsis">{item?.child_name?.length > 0 && item?.child_name[0]}</span>
                                    </div>
                                    <div className="col-span-3 h-[30px] px-[10px]  border border-solid border-black rounded-[3px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                        <span className="font-[karla] font-medium text-[22px] whitespace-nowrap overflow-hidden text-ellipsis">{item?.child_config_id?.length > 0 && item?.child_config_id[0]}</span>
                                    </div>
                                    {
                                        item?.child_config_id[0]?.startsWith("E_") ? (
                                            <div className="col-span-3 h-[30px] px-[10px] border border-solid border-black rounded-[3px] whitespace-nowrap overflow-hidden text-ellipsis">
                                                <span className="font-[karla] font-medium text-[22px]">{item?.child_config_id?.length > 0 && item?.edge_size}</span>
                                            </div>
                                        ) : (
                                            <div className="col-span-3 h-[30px] px-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                                                <span className="font-[karla] font-medium text-[22px]"></span>
                                            </div>
                                        )
                                    }
                                    <div className="col-span-3 h-[30px] px-[10px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                        <span className="font-[karla] font-medium text-[22px]"></span>
                                    </div>
                                    <div className="col-span-3 h-[30px] px-[10px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                        <span className="font-[karla] font-medium text-[22px]"></span>
                                    </div>
                                    <div className="col-span-3 h-[30px] px-[10px]  whitespace-nowrap overflow-hidden text-ellipsis">
                                        <span className="font-[karla] font-medium text-[22px]">{item?.edge_0?.length > 0 && item[0]?.edge_0}</span>
                                    </div>
                                    <div className="col-span-3 h-[30px] px-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                                        <span className="font-[karla] font-medium text-[22px]"></span>
                                    </div>
                                    {
                                        item?.child_config_id[0]?.startsWith("A_") ? (
                                            <div className="col-span-3 h-[30px] px-[10px] border border-solid border-black rounded-[3px] whitespace-nowrap overflow-hidden text-ellipsis">
                                                <span className="font-[karla] font-medium text-[22px]">{item?.qty?.length > 0 && item?.qty[0]}</span>
                                            </div>
                                        ) : (
                                            <div className="col-span-3 h-[30px] px-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                                                <span className="font-[karla] font-medium text-[22px]"></span>
                                            </div>
                                        )
                                    }
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
                </div>
            </div>
        </div >
    );
}

export default Test_part_Listing;