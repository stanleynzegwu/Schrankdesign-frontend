import { useState } from "react";
// import DeleteIcon from "../../../../public/images/furniture_configurator/delete-icon.png";
import { post } from "../../../api/api";
import { toast } from "react-hot-toast";

function NewVeriable({ setVeriableList }) {
    const [VeriableName, setVeriableName] = useState("");
    const [disabled, setdisabled] = useState(false);

    const AddVeriable = async () => {
        if (VeriableName?.trim() && VeriableName != "") {
            setdisabled(true)
            let formdata = new FormData();
            formdata.append("variableName", VeriableName);
            try {
                const data = await post(`/api/v1/variables/CreateVariable`, formdata);

                setVeriableList(data?.data)
                toast.success(data?.message)
                setVeriableName("")
                setdisabled(false)
            } catch (error) {
                console.error("Error in AddVeriable :", error);
                setdisabled(false)
            }
        }
    }

    return (
        <div className="relative flex-1 h-[42px] gap-[10px] col-span-3 bg-[#D9D9D9] px-[10px] py-[5px] rounded-[5px] border border-black border-solid">
            <div className="flex flex-row pl-[20px] gap-[20px]">
                <div className="flex  gap-[20px]">
                    <p className="font-[karla] font-semibold text-[20px]">Variable-Name</p>
                    <div className="col-span-3 bg-white h-[30px]  border border-solid border-black rounded-[3px]">
                        <input value={VeriableName} type='text' style={{ outline: 'none' }} className="font-[karla] pl-2 pt-[1px] w-[100px] font-medium text-[17px]" onChange={(e) => setVeriableName(e.target.value)} />
                    </div>
                </div>
                <div className="flex gap-[20px]">
                    <p className="font-[karla] font-semibold text-[20px]">Config-ID</p>
                    <div className="col-span-3 w-16 bg-white h-[30px] px-[10px] py-[3px] border border-solid border-black rounded-[3px]">
                        <span className="font-[karla] font-medium text-[14px]" >  </span>
                    </div>
                </div>
            </div>
            <div className="absolute flex flex-row gap-[10px] top-1/2 bottom-1/2 right-[10px] items-center justify-center">
                <div className="">
                    <button onClick={AddVeriable} disabled={disabled} className="shadow-lg font-[karla] text-white font-bold bg-[#577E60] rounded-[5px] px-[9px] py-[4px]" >
                        Save
                    </button>
                </div>
                {/* <div className="col-span-2 flex flex-start justify-end" >
                    <img className="h-[34px]" src={DeleteIcon} alt="Delete Icon" />
                </div> */}
            </div>
        </div>
    );
}

export default NewVeriable;