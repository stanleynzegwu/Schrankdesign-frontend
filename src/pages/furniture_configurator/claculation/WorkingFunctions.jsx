import SettingsIcon from "/images/furniture_configurator/settings-icon.png?url";
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url";

import { Skeleton } from 'antd'
import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateCalculation, SearchFunction_ConfigID, SearchMaterial_ConfigID } from "../../../Functions-configurator/Function-configurator";
import toast from "react-hot-toast";

function WorkingFunctions({ MaterialCalculationList, setMaterialCalculationList, totalReset }) { // VeriableList,
    const [TestTottal, setTestTottal] = useState(0);

    useEffect(() => {
        setTestTottal(0)
    }, [totalReset]);

    const dropdownOptionsOperators = [
        {
            label: "plus", icon: <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.6875 9.1875H11.8125V1.3125C11.8125 0.964403 11.6742 0.630564 11.4281 0.384423C11.1819 0.138281 10.8481 0 10.5 0C10.1519 0 9.81806 0.138281 9.57192 0.384423C9.32578 0.630564 9.1875 0.964403 9.1875 1.3125V9.1875H1.3125C0.964403 9.1875 0.630564 9.32578 0.384423 9.57192C0.138281 9.81806 0 10.1519 0 10.5C0 10.8481 0.138281 11.1819 0.384423 11.4281C0.630564 11.6742 0.964403 11.8125 1.3125 11.8125H9.1875V19.6875C9.1875 20.0356 9.32578 20.3694 9.57192 20.6156C9.81806 20.8617 10.1519 21 10.5 21C10.8481 21 11.1819 20.8617 11.4281 20.6156C11.6742 20.3694 11.8125 20.0356 11.8125 19.6875V11.8125H19.6875C20.0356 11.8125 20.3694 11.6742 20.6156 11.4281C20.8617 11.1819 21 10.8481 21 10.5C21 10.1519 20.8617 9.81806 20.6156 9.57192C20.3694 9.32578 20.0356 9.1875 19.6875 9.1875Z" fill="#36695C" />
            </svg>
        },
        {
            label: "minus", icon: <svg width="21" height="3" viewBox="0 0 21 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 3H1.5C1.10218 3 0.720645 2.84196 0.43934 2.56066C0.158036 2.27936 0 1.89782 0 1.5C0 1.10218 0.158036 0.720645 0.43934 0.43934C0.720645 0.158036 1.10218 0 1.5 0H19.5C19.8978 0 20.2794 0.158036 20.5607 0.43934C20.842 0.720645 21 1.10218 21 1.5C21 1.89782 20.842 2.27936 20.5607 2.56066C20.2794 2.84196 19.8978 3 19.5 3Z" fill="#FD3E32" />
            </svg>
        },
        {
            label: "divide", icon: <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 9C21 9.34099 20.8672 9.66802 20.631 9.90914C20.3947 10.1503 20.0742 10.2857 19.74 10.2857H1.26C0.925827 10.2857 0.605341 10.1503 0.369045 9.90914C0.13275 9.66802 0 9.34099 0 9C0 8.65901 0.13275 8.33198 0.369045 8.09086C0.605341 7.84974 0.925827 7.71429 1.26 7.71429H19.74C20.0742 7.71429 20.3947 7.84974 20.631 8.09086C20.8672 8.33198 21 8.65901 21 9ZM10.5 4.28572C10.9153 4.28572 11.3214 4.16004 11.6667 3.92458C12.012 3.68912 12.2812 3.35445 12.4401 2.96289C12.5991 2.57134 12.6407 2.14048 12.5596 1.72481C12.4786 1.30913 12.2786 0.927313 11.9849 0.627629C11.6912 0.327946 11.317 0.123858 10.9097 0.0411754C10.5023 -0.0415072 10.0801 0.000928466 9.69636 0.163116C9.31264 0.325304 8.98466 0.59996 8.75391 0.952351C8.52316 1.30474 8.4 1.71904 8.4 2.14286C8.4 2.71118 8.62125 3.25622 9.01508 3.65809C9.4089 4.05995 9.94304 4.28572 10.5 4.28572ZM10.5 13.7143C10.0847 13.7143 9.67865 13.84 9.3333 14.0754C8.98796 14.3109 8.7188 14.6456 8.55985 15.0371C8.40091 15.4287 8.35932 15.8595 8.44035 16.2752C8.52138 16.6909 8.72139 17.0727 9.01508 17.3724C9.30877 17.6721 9.68295 17.8761 10.0903 17.9588C10.4977 18.0415 10.9199 17.9991 11.3036 17.8369C11.6874 17.6747 12.0153 17.4 12.2461 17.0477C12.4768 16.6953 12.6 16.281 12.6 15.8571C12.6 15.2888 12.3787 14.7438 11.9849 14.3419C11.5911 13.9401 11.057 13.7143 10.5 13.7143Z" fill="black" />
            </svg>
        },
        {
            label: "multiply", icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.33404 6.50239L12.612 2.22439C12.7342 2.10418 12.8314 1.96097 12.898 1.803C12.9646 1.64504 12.9993 1.47546 13 1.30403C13.0007 1.13261 12.9675 0.962744 12.9022 0.804228C12.837 0.645713 12.741 0.501686 12.6198 0.380457C12.4986 0.259228 12.3546 0.163196 12.1961 0.0978986C12.0376 0.0326016 11.8677 -0.000667588 11.6963 1.015e-05C11.5249 0.000687888 11.3553 0.0352992 11.1973 0.101847C11.0393 0.168396 10.8961 0.265564 10.7758 0.387748L6.49783 4.66575L2.21983 0.38818C2.09923 0.267585 1.95606 0.171923 1.7985 0.106657C1.64093 0.0413911 1.47205 0.00779908 1.30151 0.00779908C1.13096 0.00779908 0.962079 0.0413911 0.804513 0.106657C0.646948 0.171923 0.50378 0.267585 0.383184 0.38818C0.13963 0.631735 0.00280264 0.962065 0.00280264 1.3065C0.00280264 1.65094 0.13963 1.98127 0.383184 2.22482L4.66118 6.50239L0.372795 10.7908C0.132566 11.035 -0.00142374 11.3643 1.1411e-05 11.7068C0.00144657 12.0494 0.138191 12.3775 0.380457 12.6198C0.622724 12.862 0.950885 12.9986 1.29346 13C1.63603 13.0013 1.96526 12.8673 2.20944 12.627L6.49739 8.33903L10.775 12.6166C11.0286 12.8703 11.3611 12.9971 11.6931 12.9971C12.0251 12.9971 12.3575 12.8703 12.6112 12.6166C12.7318 12.4961 12.8275 12.353 12.8928 12.1954C12.9581 12.0379 12.9917 11.869 12.9917 11.6985C12.9917 11.528 12.9581 11.3591 12.8928 11.2016C12.8275 11.044 12.7318 10.9009 12.6112 10.7804L8.33404 6.50239Z" fill="#31373D" />
            </svg>
        },
        {
            label: "minus-percent", icon: <svg width="37" height="16" viewBox="0 0 37 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.8571 9H1.14286C0.839753 9 0.549063 8.84196 0.334735 8.56066C0.120408 8.27936 0 7.89782 0 7.5C0 7.10218 0.120408 6.72064 0.334735 6.43934C0.549063 6.15804 0.839753 6 1.14286 6H14.8571C15.1602 6 15.4509 6.15804 15.6653 6.43934C15.8796 6.72064 16 7.10218 16 7.5C16 7.89782 15.8796 8.27936 15.6653 8.56066C15.4509 8.84196 15.1602 9 14.8571 9Z" fill="#FD3E32" />
                <path d="M36.6084 2.27768C37.1291 1.75695 37.1291 0.91128 36.6084 0.390549C36.0877 -0.130183 35.242 -0.130183 34.7213 0.390549L21.3905 13.7213C20.8698 14.242 20.8698 15.0877 21.3905 15.6084C21.9113 16.1291 22.7569 16.1291 23.2777 15.6084L36.6084 2.27768ZM26.3354 2.66927C26.3354 1.96216 26.0545 1.28402 25.5545 0.78402C25.0545 0.284021 24.3764 0.00312426 23.6693 0.00312426C22.9622 0.00312426 22.284 0.284021 21.784 0.78402C21.284 1.28402 21.0031 1.96216 21.0031 2.66927C21.0031 3.37638 21.284 4.05452 21.784 4.55452C22.284 5.05452 22.9622 5.33542 23.6693 5.33542C24.3764 5.33542 25.0545 5.05452 25.5545 4.55452C26.0545 4.05452 26.3354 3.37638 26.3354 2.66927ZM37 13.3339C37 12.6267 36.7191 11.9486 36.2191 11.4486C35.7191 10.9486 35.041 10.6677 34.3339 10.6677C33.6267 10.6677 32.9486 10.9486 32.4486 11.4486C31.9486 11.9486 31.6677 12.6267 31.6677 13.3339C31.6677 14.041 31.9486 14.7191 32.4486 15.2191C32.9486 15.7191 33.6267 16 34.3339 16C35.041 16 35.7191 15.7191 36.2191 15.2191C36.7191 14.7191 37 14.041 37 13.3339Z" fill="black" />
            </svg>
        },
        {
            label: "plus-percent", icon: <svg width="37" height="16" viewBox="0 0 37 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z" fill="#36695C" />
                <path d="M36.6084 2.27768C37.1291 1.75695 37.1291 0.91128 36.6084 0.390549C36.0877 -0.130183 35.242 -0.130183 34.7213 0.390549L21.3905 13.7213C20.8698 14.242 20.8698 15.0877 21.3905 15.6084C21.9113 16.1291 22.7569 16.1291 23.2777 15.6084L36.6084 2.27768ZM26.3354 2.66927C26.3354 1.96216 26.0545 1.28402 25.5545 0.78402C25.0545 0.284021 24.3764 0.00312426 23.6693 0.00312426C22.9622 0.00312426 22.284 0.284021 21.784 0.78402C21.284 1.28402 21.0031 1.96216 21.0031 2.66927C21.0031 3.37638 21.284 4.05452 21.784 4.55452C22.284 5.05452 22.9622 5.33542 23.6693 5.33542C24.3764 5.33542 25.0545 5.05452 25.5545 4.55452C26.0545 4.05452 26.3354 3.37638 26.3354 2.66927ZM37 13.3339C37 12.6267 36.7191 11.9486 36.2191 11.4486C35.7191 10.9486 35.041 10.6677 34.3339 10.6677C33.6267 10.6677 32.9486 10.9486 32.4486 11.4486C31.9486 11.9486 31.6677 12.6267 31.6677 13.3339C31.6677 14.041 31.9486 14.7191 32.4486 15.2191C32.9486 15.7191 33.6267 16 34.3339 16C35.041 16 35.7191 15.7191 36.2191 15.2191C36.7191 14.7191 37 14.041 37 13.3339Z" fill="black" />
            </svg>
        },
    ]

    const HandleCreateCalculation = (type) => {
        let newObject;
        let listing = [...MaterialCalculationList.material_items]

        if (type === "operator" && listing.length === 0) {
            toast.error("Please add a number or variable first!");
            return;
        }
        // Condition 2: Check if the last entry was an operator and prevent adding another operator
        if (type === "operator" && listing.length > 0 && listing[listing.length - 1].type === "operator") {
            toast.error("Cannot add an operator after another operator.\n\n Please add a number or variable first!");
            return;
        }
        // Condition 3: Prevent adding a number or variable directly after another number or variable
        if ((type === "addnumber" || type === "addvariable" || type === "addfunction") && listing.length > 0 &&
            (listing[listing.length - 1].type === "addnumber" || listing[listing.length - 1].type === "addvariable" || listing[listing.length - 1].type === "addfunction")) {
            toast.error("Cannot add a number or variable after another number \n\n  or variable without an operator in between!");
            return; // Stop the function execution
        }

        if (type === "addnumber") {
            newObject = {
                _id: Date.now(),
                type: "addnumber",
            };

        }
        else if (type === "addvariable") {
            newObject = {
                _id: Date.now(),
                type: "addvariable"
            };
        }
        else if (type === "operator") {
            newObject = {
                _id: Date.now(),
                type: "operator",
                value: "plus",
            };
        }
        else if (type == "addfunction") {
            newObject = {
                _id: Date.now(),
                type: "addfunction",
            };
        }
        const newMaterialItemsArray = [...MaterialCalculationList.material_items, newObject];
        const updatedMaterialCalculationList = {
            ...MaterialCalculationList,
            material_items: newMaterialItemsArray
        };
        setMaterialCalculationList(updatedMaterialCalculationList);

    }

    // const HandleSetValue = (event, index) => {
    const HandleSetValue = (numbervalue, index) => {
        const value = Number(numbervalue.target.value);
        if (typeof value == "number") {
            // Correctly accessing and updating the item within the material_items array
            const updatedObject = { ...MaterialCalculationList.material_items[index], value: value };
            // Making an immutable update to the material_items array
            const updatedMaterialItems = [...(MaterialCalculationList?.material_items ?? [])];
            updatedMaterialItems[index] = updatedObject;
            // Setting the updated list back to the state
            setMaterialCalculationList({
                ...MaterialCalculationList,
                material_items: updatedMaterialItems
            });
        }
    }

    const HandleChangeOperator = (operator, index) => {
        const value = operator.target.value
        const updatedObject = {...MaterialCalculationList?.material_items[index], value: value };
        // Making an immutable update to the material_items array
        const updatedMaterialItems = [...(MaterialCalculationList?.material_items ?? [])];
        updatedMaterialItems[index] = updatedObject;
        // Setting the updated list back to the state
        setMaterialCalculationList({
            ...MaterialCalculationList,
            material_items: updatedMaterialItems
        });
    }

    const SearchVariable = async (search, index) => {
        const ID = search.target.value;
        if (ID?.trim()?.length > 5 && ID?.trim()?.length < 9) {
            const { data } = await SearchMaterial_ConfigID(ID)
            if (data?.data?.length > 0) {
                const matchedItem = data?.data[0]
                const updatedObject = { ...MaterialCalculationList.material_items[index], ...matchedItem };
                const updatedMaterialItems = MaterialCalculationList.material_items.map((item, idx) => {
                    if (idx === index) {
                        return updatedObject;
                    }
                    return item;
                });
                setMaterialCalculationList({
                    ...MaterialCalculationList,
                    material_items: updatedMaterialItems
                });
                toast("Data is available. Changes cannot be made, only deletion is allowed.", {
                    icon: '⚠️',
                });
            }
        }
    }
    const SearchFunction = async (search, index) => {
        const ID = search.target.value;
        if (ID?.trim()?.length > 5 && ID?.trim()?.length < 9) {
            const { data } = await SearchFunction_ConfigID(ID)
            if (data?.data && data?.status) {
                const matchedItem = data?.data
                const updatedObject = { ...MaterialCalculationList.material_items[index], ...matchedItem };
                const updatedMaterialItems = MaterialCalculationList.material_items.map((item, idx) => {
                    if (idx === index) {
                        return updatedObject;
                    }
                    return item;
                });
                setMaterialCalculationList({
                    ...MaterialCalculationList,
                    material_items: updatedMaterialItems
                });
                toast("Function is available. Changes cannot be made, only deletion is allowed.", {
                    icon: '⚠️',
                });
            }
        }
    }

    // const DeleteCalculationItem = (id) => {
    //     // Find the index of the item with the specified id
    //     const index = MaterialCalculationList?.material_items.findIndex((item) => item?._id === id);
    //     // Filter out the item and its predecessor
    //     const filtered = MaterialCalculationList?.material_items.filter((item, idx) => idx !== index && idx !== index - 1);
    //     // Update the MaterialCalculationList state with the filtered items
    //     setMaterialCalculationList({
    //         ...MaterialCalculationList,
    //         material_items: filtered
    //     });
    // }

    const DeleteCalculationItem = (id) => {
        // Find the index of the item with the specified id
        const index = MaterialCalculationList?.material_items.findIndex((item) => item?._id === id);

        // Handle case where the item is not found
        if (index === -1) return;

        // Determine the range of indexes to be removed based on the specified conditions
        let startIndex = index;
        let endIndex = index;

        // Condition 1: If it's the first item, also remove the item after it (if exists)
        if (index === 0 && MaterialCalculationList?.material_items.length > 1) {
            endIndex = 1; // Remove the first and the second item
        }
        // Condition 2: For any item that's not the first, remove it and the item before it
        else if (index > 0) {
            startIndex = index - 1; // Remove the selected item and the one before it
        }

        // Filter out items that are not within the startIndex and endIndex
        const filtered = MaterialCalculationList?.material_items.filter((item, idx) => idx < startIndex || idx > endIndex);

        // Update the MaterialCalculationList state with the filtered items
        setMaterialCalculationList({
            ...MaterialCalculationList,
            material_items: filtered
        });
    }
    
    const calculateResult = (materialItems) => {
        // Assume the first item's value is the initial accumulator value, converted to number
        const materialValue = Number(materialItems[0]?.value)
        const materialTotal = materialItems[0]?.test_result ? Number(materialItems[0]?.test_result) : Number(materialItems[0]?.test_total)
        let accumulator = materialItems && materialItems?.length > 0 ? parseFloat(materialValue ? materialValue : materialTotal) : 0;

        // Loop through the items, starting from the second item
        for (let i = 1; i < materialItems?.length; i += 2) {
            const operator = materialItems[i]?.value; // Assuming the operator is stored in the 'value' key
            const InnerValue = Number(materialItems[i + 1]?.value)
            const InnerTotal = materialItems[i + 1]?.test_result ? Number(materialItems[i + 1]?.test_result) : Number(materialItems[i + 1]?.test_total)
            const nextValue = parseFloat(InnerValue ? InnerValue : InnerTotal);
            switch (operator) {
                case 'plus':
                    accumulator += nextValue;
                    break;
                case 'minus':
                    accumulator -= nextValue;
                    break;
                case 'multiply':
                    accumulator *= nextValue;
                    break;
                case 'divide':
                    accumulator /= nextValue;
                    break;
                case 'minus-percent':
                    accumulator -= (accumulator * nextValue) / 100;
                    break;
                case 'plus-percent':
                    accumulator += (accumulator * nextValue) / 100;
                    break;
                default:
                    console.log(`Unknown operator ${operator}`);
            }
        }
        return accumulator;
    };

    useEffect(() => {
        if (MaterialCalculationList?.material_items?.length > 0) {
            const result = calculateResult(MaterialCalculationList?.material_items);
            if (!isNaN(result) && result != undefined) {
                const formattedResult = Number(result.toFixed(3));
                setTestTottal(formattedResult);
            }
        } else {
            setTestTottal(0);
        }

    }, [MaterialCalculationList]);


    const CreateCalculationMaterial = async () => {
        const { data } = await CreateCalculation(MaterialCalculationList, "addDataToWorkingVariable", TestTottal)
        if (data) {
            toast.success("Updated Successfully !")
        }
    };



    const bg = MaterialCalculationList?.VariableType && MaterialCalculationList?.VariableType == "new_time" ? "bg-[#DFB006]" : "bg-white"
    return (
        < div className={`py-[7px]  flex-1 flex-col h-full flex items-center justify-between shadow-md ${bg} border-2 border-solid border-[#d9d9d9] rounded-[12px]`}>
            <div className="w-full">
                <div className="w-full flex flex-col">
                    <div className="relative px-[10px] flex flex-row items-center w-full justify-between">
                        <div className="shadow-lg">
                            <button onClick={() => HandleCreateCalculation("addfunction")} className="font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg">
                                Add Function
                            </button>
                        </div>
                        <div className="flex items-center gap-[5px] justify-between">
                            <span className="font-[karla] font-bold text-[24px] underline text-black">
                                {MaterialCalculationList?.variable_name ? MaterialCalculationList?.variable_name :
                                    <Skeleton.Input className='mb-3' active={true} size={"small"} block={"default"} />}
                            </span>
                            <img src={SettingsIcon} className="w-[32px]" alt="Settings Icon" />
                        </div>
                        <div className="shadow-lg">
                            <button onClick={CreateCalculationMaterial} className="font-[karla] text-white font-bold bg-[#577E60] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-5 md:grid-cols-11 w-full px-[10px] gap-[10px] mt-[9px]">
                        <div className="col-span-3 flex justify-center">
                            <span className="font-[karla] text-[19px] font-semibold text-black">Material-Name</span>
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <span className=" font-[karla] text-[19px] font-semibold text-black">Config-ID</span>
                        </div>
                        <div className="col-span-3 flex justify-center">
                            <span className=" font-[karla] text-[19px] font-semibold text-black">Value</span>
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <span className="font-[karla] text-[19px] font-semibold text-black">Test-Result</span>
                        </div>
                    </div>
                    <div className="h-[2px] w-full bg-black"></div>
                </div>
                {/* body */}

                <div className="px-[10px] py-[11px] gap-[11px] flex flex-col">
                    <div className="flex flex-col h-fit gap-[10px]">
                        {MaterialCalculationList?.material_items?.length > 0 && Array.isArray(MaterialCalculationList?.material_items) &&
                            MaterialCalculationList?.material_items?.map((item, index) => {
                                const bgound = item?.VariableType && item?.VariableType == "new_time" ? "bg-[#DFB006]" : "bg-[#F6F6F6]"
                                return (
                                    item?.type == 'addvariable' || item?.type == 'addnumber' || item?.type == 'addfunction' ?
                                        < div key={index} className={`grid grid-cols-5 md:grid-cols-11 auto-cols-min gap-[10px] items-center col-span-3 ${bgound} px-[10px] py-[5px] rounded-[5px] border border-black border-solid`}>
                                            <div className="col-span-3">
                                                {item?.type === 'addvariable' &&
                                                    <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] whitespace-nowrap overflow-hidden text-ellipsis px-3">
                                                        {item?.variable_name ? item?.variable_name : '\u00A0'}
                                                    </span>
                                                }
                                                {item?.type === 'addfunction' &&
                                                    <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] whitespace-nowrap overflow-hidden text-ellipsis px-3">
                                                        {item?.variable_name ? item?.variable_name : '\u00A0'}
                                                    </span>
                                                }
                                            </div>
                                            <div className="col-span-2">
                                                {item?.type == 'addvariable' &&
                                                    <input
                                                        onChange={(e) => SearchVariable(e, index)}
                                                        type='text' value={item?.config_id} style={{ outline: 'none' }} className="font-[karla] pt-[1px] w-full font-medium text-[17px] border border-solid border-black rounded-[5px] px-1"
                                                    />
                                                }
                                                {item?.type == 'addfunction' &&
                                                    <input
                                                        onChange={(e) => SearchFunction(e, index)}
                                                        type='text' value={item?.config_id} style={{ outline: 'none' }} className="font-[karla] pt-[1px] w-full font-medium text-[17px] border border-solid border-black rounded-[5px] px-1"
                                                    />
                                                }
                                            </div>
                                            <div className="col-span-3 ">
                                                {item?.type === 'addvariable' || item?.type === 'addfunction' ? (
                                                    <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] whitespace-nowrap overflow-hidden text-ellipsis px-3">
                                                        {'\u00A0'}
                                                    </span>
                                                ) :
                                                    <input
                                                        onChange={(e) => HandleSetValue(e, index)}
                                                        type='number' value={item?.value} style={{ outline: 'none' }} className="font-[karla] pt-[1px] w-full font-medium text-[17px] border border-solid border-black rounded-[5px] px-1"
                                                    />
                                                }
                                            </div>
                                            <div className="col-span-2">
                                                {
                                                    item?.type === 'addvariable' &&
                                                    <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] whitespace-nowrap overflow-hidden text-ellipsis px-3">
                                                        {item?.test_total ? item?.test_total : item?.test_result ? item?.test_result : '\u00A0'}
                                                    </span>}
                                                {
                                                    item?.type === 'addfunction' &&
                                                    <span className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] whitespace-nowrap overflow-hidden text-ellipsis px-3">
                                                        {item?.test_total || item?.test_total == 0 ? item?.test_total : item?.test_result ? item?.test_result : '\u00A0'}
                                                    </span>}
                                            </div>
                                            <button
                                                className="col-span-1 flex flex-start justify-end"
                                                onClick={() => DeleteCalculationItem(item?._id)}
                                            >
                                                <img className="h-[34px]" src={DeleteIcon} alt="Delete Icon" />
                                            </button>
                                        </div>
                                        :
                                        <div key={index} className="flex justify-center">
                                            <Select
                                                // IconComponent={() => <DropDownIcon />}
                                                onChange={(value) => HandleChangeOperator(value, index)}
                                                value={item?.value}
                                                defaultValue={"plus"}
                                                className="border h-[32px] border-solid border-black bg-[#F6F6F6] flex items-center justify-center rounded-[3px] px-[12px] text-[20px] font-[karla] font-bold"
                                            >
                                                {dropdownOptionsOperators.map((item, index) => {
                                                    return (
                                                        <MenuItem value={item.label} key={index} className="flex items-center">
                                                            <div className="flex items-center gap-4">
                                                                {item.icon}
                                                                <span className="hidden">{item.label}</span>
                                                            </div>
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {/* footer  */}
            <div className=" w-full flex flex-col" >
                <div className="h-[2px] w-full bg-black"></div>
                <div className="flex flex-row px-[10px] items-center pt-[7px] justify-between">
                    <div className="flex flex-row gap-[15px]">
                        <div className="shadow-lg">
                            <button onClick={() => HandleCreateCalculation("operator")} className="font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                            >
                                Add-Operator
                            </button>
                        </div>
                        <div className="shadow-lg">
                            <button onClick={() => HandleCreateCalculation("addvariable")}
                                className="font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg"

                            >
                                Add-Variable
                            </button>
                        </div>
                        <div className="shadow-lg">
                            <button onClick={() => HandleCreateCalculation("addnumber")} className="font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                            >
                                Add - Number
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row items-center gap-[10px]">
                        <p className="font-[karla] font-medium text-[20px]">Test-Total = </p>
                        <div className="col-span-3 bg-white h-[30px] px-[10px] py-[3px] border border-solid border-black rounded-[3px]">
                            <span className="font-[karla] font-medium text-[16px]">{TestTottal}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default WorkingFunctions;