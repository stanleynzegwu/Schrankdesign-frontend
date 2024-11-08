import Layout from "../../../Layouts/FurnitureConfigurator/Layout";
import SubLayout from "../../../Layouts/FurnitureConfigurator/SubLayout";
import "./material.style.css";
import { useState, useEffect } from "react";
import VeriableNames from "./VariableNames";
import NewVeriable from "./NewVeriable";
import { GetallcalculationVeriables } from "../../../Functions-configurator/Function-configurator";
import VariableFunctions from "./VariableFunctions";
import FeesNames from "./FeesNames";
import NewFees from "./NewFees";
import FeesFunctions from "./FeesFunctions";




const Fees = () => {
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
            to: "/dashboard/furniture-configurator/calculation/material",
            label: "Fees",
        },
    ];

    const [AddNewVeriableFlag, setAddNewVeriableFlag] = useState(false);
    const [OpenVeriableFunction, setOpenVeriableFunction] = useState(false);
    const [VeriableList, setVeriableList] = useState([]);
    const [MaterialCalculationList, setMaterialCalculationList] = useState([]);
    const [totalReset, settotalReset] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const AddVeriable = () => {
        setAddNewVeriableFlag(!AddNewVeriableFlag)
        setOpenVeriableFunction(false)
    }


    useEffect(() => {
        const GetVeriable = async () => {
            const { data, error } = await GetallcalculationVeriables("getFeesVariables")
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
                <div className="w-full flex flex-row justify-end mb-[20px]">
                    <button onClick={AddVeriable} className="font-[karla] text-[20px] text-white font-bold bg-[#36695C] rounded-[5px] px-[33px] py-[4px] shadow-lg"
                    >
                        New Variable
                    </button>
                </div>
                <div className="flex gap-[20px] flex-col xl:flex-row">
                    <FeesNames
                        setVeriableList={setVeriableList}
                        VeriableList={VeriableList}
                        setAddNewVeriableFlag={setAddNewVeriableFlag}
                        setOpenVeriableFunction={setOpenVeriableFunction}
                        setMaterialCalculationList={setMaterialCalculationList}
                        totalReset={totalReset}
                        settotalReset={settotalReset}
                        isLoading={isLoading}
                    />
                    {AddNewVeriableFlag && <NewFees setVeriableList={setVeriableList} />}
                    {OpenVeriableFunction && <FeesFunctions
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

export default Fees;
