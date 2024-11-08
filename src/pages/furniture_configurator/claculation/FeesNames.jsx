import SettingsIcon from "/images/furniture_configurator/settings-icon.png?url";
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url";
import { DeleteVariableCalculation, SearchcalculationVeriables } from "../../../Functions-configurator/Function-configurator";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "../../../components/furniture-configurator/Loader";


function FeesNames({
    VeriableList,
    setVeriableList,
    setOpenVeriableFunction,
    setAddNewVeriableFlag,
    setMaterialCalculationList,
    settotalReset,
    totalReset,
    isLoading

}) {
    const [disabled, setdisabled] = useState(false);
    const OpenVeriabledata = () => {
        setAddNewVeriableFlag(false)
        setOpenVeriableFunction(true)
    }

    const HandleSerachId = async (configID) => {
        const { data } = await SearchcalculationVeriables(configID, "searchByFeesConfigid")
        if (data) {
            setMaterialCalculationList(data?.data[0])
            settotalReset(!totalReset)
        }
    }

    const HandleDeleteVaribale = async (id) => {
        setdisabled(true)
        const { data } = await DeleteVariableCalculation(id, "DeleteFeesCalculation")
        if (data) {
            const filtered = VeriableList.filter((item) => item._id != id)
            setVeriableList(filtered)
            toast.success("Deleted successfully")
            setdisabled(false)
        }
        setdisabled(false)
    }
    return (
        < div className="w-2/5 shadow-md bg-white border-2 border-solid border-[#d9d9d9] rounded-[12px] " >
            <div className="grid grid-cols-4 px-[10px] gap-[10px] py-2">
                <div className="col-span-2 flex justify-center">
                    <span className="font-[karla] font-bold text-[22px] text-black">Variable-Name</span>
                </div>
                <div className="col-span-1 flex justify-center">
                    <span className=" font-[karla] font-bold text-[22px] text-black">Config-ID</span>
                </div>
            </div>
            <div className="h-[2px] w-full bg-black"></div>
            <div className="px-4 py-2 overflow-y-scroll h-[420px]">
                {isLoading && <Loader />}
                {VeriableList.length > 0 && Array.isArray(VeriableList) &&
                    VeriableList.map((item, index) => {
                        return (
                            <div key={index} className="grid mt-2 grid-cols-4 gap-[10px] bg-[#F6F6F6] rounded-[5px] border border-black border-solid px-[10px] py-[5px] ">
                                <div className="grid grid-cols-4 gap-[10px] col-span-3  ">
                                    <div className="col-span-2">
                                        {/* <Input /> */}
                                        <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3 whitespace-nowrap overflow-hidden text-ellipsis">
                                            {item?.variable_name}
                                        </span>
                                    </div>
                                    <div className="col-span-2">
                                        {/* <Input /> */}
                                        <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3 whitespace-nowrap overflow-hidden text-ellipsis">
                                            {item?.config_id}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-end gap-[10px] items-center col-span-1">
                                    <button
                                        onClick={OpenVeriabledata}
                                    >
                                        <img className="w-[32px] h-[32px]" onClick={() => HandleSerachId(item?.config_id)} src={SettingsIcon} alt="Setting" />
                                    </button>
                                    <button disabled={disabled} onClick={() => HandleDeleteVaribale(item?._id)} >
                                        <img className="w-[30px] h-[32px]" src={DeleteIcon} alt="Delete" />
                                    </button>
                                </div>
                            </div>

                        )
                    }
                    )}
            </div>
        </div >
    );
}

export default FeesNames;