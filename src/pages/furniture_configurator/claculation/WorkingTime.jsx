import Layout from "../../../Layouts/FurnitureConfigurator/Layout";
import SubLayout from "../../../Layouts/FurnitureConfigurator/SubLayout";
import "./material.style.css";
import { useState, useEffect } from "react";
import { GetallcalculationVeriables } from "../../../Functions-configurator/Function-configurator";
import WorkingNames from "./WorkingNames";
import NewWorking from "./NewWorking";
import WorkingFunctions from "./WorkingFunctions";




const WorkingTime = () => {
    const tabs = [
        {
            to: "/dashboard/furniture-configurator/calculation/home",
            label: "General",
        },
        {
            to: "/dashboard/furniture-configurator/calculation/material",
            label: "Material",
        },
        {
            to: "/dashboard/furniture-configurator/calculation/working-time",
            label: "Working-Time",
        },
        {
            to: "/dashboard/furniture-configurator/calculation/fees",
            label: "Fees",
        },
    ];

    const [AddNewVeriableFlag, setAddNewVeriableFlag] = useState(false);
    const [OpenVeriableFunction, setOpenVeriableFunction] = useState(false);
    const [VeriableList, setVeriableList] = useState([]);
    const [MaterialCalculationList, setMaterialCalculationList] = useState([]);
    const [totalReset, settotalReset] = useState(false);
    const [AddTime, setAdd] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const AddVeriable = (type) => {
        if (type === "NewTime") {
            setAdd(true)
        } else {
            setAdd(false)
        }
        setAddNewVeriableFlag(true)
        setOpenVeriableFunction(false)
    }


    useEffect(() => {
        const GetVeriable = async () => {
            const { data, error } = await GetallcalculationVeriables("getWorkingVariables")
            if (data) {
                setIsLoading(false)
                setVeriableList(data.data)
            }
            if (error) {
                setIsLoading(false)
            }
        }
        GetVeriable();
    }, []);



    return (
        <Layout>
            <SubLayout tabs={tabs}>
                <div className="w-full flex flex-row gap-2 justify-end mb-[20px]">
                    <button onClick={() => AddVeriable("NewTime")} className={` ${!AddTime && `opacity-50`} font-[karla] text-[20px] text-white font-bold bg-[#DFB006] rounded-[5px] px-[33px] py-[4px] shadow-lg`}>
                        New Time
                    </button>
                    <button onClick={() => AddVeriable("NewVariable")} className={` ${AddTime && `opacity-50`}  font-[karla] text-[20px] text-white font-bold bg-[#36695C] rounded-[5px] px-[33px] py-[4px] shadow-lg`}>
                        New Variable
                    </button>
                </div>
                <div className="flex gap-[20px] flex-col xl:flex-row">
                    <WorkingNames
                        setVeriableList={setVeriableList}
                        VeriableList={VeriableList}
                        setAddNewVeriableFlag={setAddNewVeriableFlag}
                        setOpenVeriableFunction={setOpenVeriableFunction}
                        setMaterialCalculationList={setMaterialCalculationList}
                        totalReset={totalReset}
                        settotalReset={settotalReset}
                        isLoading={isLoading}
                    />
                    {AddNewVeriableFlag && <NewWorking setVeriableList={setVeriableList} AddTime={AddTime} />}
                    {OpenVeriableFunction && <WorkingFunctions
                        VeriableList={VeriableList}
                        MaterialCalculationList={MaterialCalculationList}
                        setMaterialCalculationList={setMaterialCalculationList}
                        totalReset={totalReset}
                    />}
                </div>
            </SubLayout>
        </Layout>
    );
};

export default WorkingTime;
