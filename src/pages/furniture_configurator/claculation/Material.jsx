import Layout from "../../../Layouts/FurnitureConfigurator/Layout";
import SubLayout from "../../../Layouts/FurnitureConfigurator/SubLayout";
import SettingsIcon from "/images/furniture_configurator/settings-icon.png?url";
import DeleteIcon from "/images/furniture_configurator/delete-icon.png?url";
// import { Menu, Transition } from "@headlessui/react";
// import { Fragment } from "react";
import "./material.style.css";
import Input from "../../../components/Input";
import Dropdown from "../../../components/dropdown";
import { useState, useEffect, useRef } from "react";




const Material = () => {
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
      to: "/dashboard/furniture-configurator/calculation/material",
      label: "Working-Time",
    },
    {
      to: "/dashboard/furniture-configurator/calculation/material",
      label: "Fees",
    },
  ];

  const dropdownOptions = ["Price selling"];
  const [newItem, setNewItem] = useState(false);
  const [showItemsContainer, setShowItemsContainer] = useState(false);
  const [editItem, setEditItem] = useState(false);
  // const [active, setActive] = useState("+");
  // const [items, setItems] = useState([]);
  const [selectedVar, setSelectedVar] = useState();
  const [newItemFlag, setNewItemFlag] = useState(false);
  const [newVariableFlag, setNewVariableFlag] = useState(false);
  // const [dropdownActive, setDropdownActive] = useState(false);
  const [myVariables, setMyVariables] = useState([]);


  const variableNameRef = useRef(null);
  const dropdownRef = useRef([]);
  const variableConfigIdRef = useRef(null);
  const newItemIdRef = useRef(null);
  /*
  variable 

  */
  useEffect(() => {
    let newVariables = [
      {
        name: "Material-Verkaufspreisa-var",
        configId: 1,
        value: "Price selling",
        testResult: "222222",
        materialItems: [
          {
            type: 'item',
            name: "Material-Verkaufspreisa",
            parentConfigId: 2,
            configId: 1,
            value: "Price selling",
            testResult: "222222",
          },
          {
            type: 'item',
            name: "Material-Verkaufspreisa",
            parentConfigId: 3,
            configId: 2,
            value: "Price selling",
            testResult: "222222",
          },
          {
            type: 'operator',
            selected: '+'
          },
          {
            type: 'number',
            value: "2233",
          }
        ]
      },
      {
        name: "Material-Verkaufspreisa-var2",
        configId: 2,
        value: "Price selling",
        testResult: "222222",
        materialItems: [
          {
            type: 'item',
            name: "Material-Verkaufspreisa22",
            parentConfigId: 1,
            configId: 1,
            value: "Price selling",
            testResult: "222222",
          },
          {
            type: 'operator',
            selected: '-'
          },
          {
            type: 'item',
            name: "Material-Verkaufspreisa23",
            parentConfigId: 3,
            configId: 2,
            value: "Price selling",
            testResult: "222222",
          },
          {
            type: 'number',
            value: "11",
          }
        ]
      },
      {
        name: "Material-Verkaufspreisa-var2",
        configId: 3,
        value: "Price selling",
        testResult: "222222",
        materialItems: []
      }

    ]
    setMyVariables(newVariables);
  }, []);



  const clickedDropdown = (index) => {
    if (dropdownRef[index].classList.contains('select-wrapper')) {
      dropdownRef[index].classList.add('select-wrapper-clicked');
      dropdownRef[index].classList.remove('select-wrapper');
      dropdownRef[index].children[0].classList.add('changeSelectStyle');
    }
    else {
      dropdownRef[index].classList.remove('select-wrapper-clicked');
      dropdownRef[index].classList.add('select-wrapper');
      dropdownRef[index].children[0].classList.remove('changeSelectStyle');
    }
  }
  const bluredDropdown = (index) => {
    dropdownRef[index].classList.remove('select-wrapper-clicked');
    dropdownRef[index].classList.add('select-wrapper');
    dropdownRef[index].children[0].classList.remove('changeSelectStyle');
  }
  const handleDeleteVariables = (index) => {
    // setEditItem(false);
    const temp = [...myVariables];
    temp.splice(index, 1);
    setMyVariables(temp);
    setShowItemsContainer(false);
  };
  const handleAddVariable = () => {
    let newVariable = {
      name: variableNameRef.current.value,
      configId: variableConfigIdRef.current.innerHTML,
      value: "Price selling",
      testResult: "222222",
      materialItems: [],
    }
    setMyVariables([
      ...myVariables,
      newVariable

    ]);
    setNewVariableFlag(false);
    setShowItemsContainer(true);
    setSelectedVar(newVariable);
  }
  const handleDeleteItems = (index) => {
    // setEditItem(false);
    let varCopy = [...myVariables];
    let varIndex = varCopy.findIndex(e => e.configId === selectedVar.configId);
    const temp = { ...selectedVar };
    temp.materialItems.splice(index, 1);
    // setItems(temp);
    setSelectedVar(temp);
    varCopy[varIndex] = temp;
    setMyVariables(varCopy);
  };
  const handleEditItem = (varConfigId) => {
    // if(selectedVar.configId!==varConfigId){
    setShowItemsContainer(true);
    // setEditItem(item);
    let varCopy = [...myVariables];
    let filterVar = varCopy.filter(v => v.configId === varConfigId);
    let selectedVariable = filterVar.length !== 0 ? filterVar[0] : [];
    setSelectedVar(selectedVariable);
    setNewVariableFlag(false);
    setNewItemFlag(false);
    // }

  };
  const handleAddItem = (itemType) => {
    let varCopy = [...myVariables];
    let varIndex = varCopy.findIndex(e => e.configId === selectedVar.configId);
    let item = {};
    if (itemType === "item") {
      let pConfigId = newItemIdRef.current.value;
      let varCopy = [...myVariables];
      let findVar = varCopy.filter(e => e.configId == pConfigId);
      if (findVar.length === 0) {
        alert('Config ID not found');
        return;
      }
      let parentVar = findVar[0];
      item = {
        type: "item",
        name: parentVar.name,
        configId: "1234",
        pConfigId: parentVar.configId,
        value: "2333",
        testResult: "1234",
      }

      setNewItemFlag(false);
      // setNewItem(true);
    }
    else if (itemType === 'operator') {
      // let itemsArr = [...selectedVar.materialItems];
      // if(itemsArr.length!==0 && (itemsArr[itemsArr.length-1].type==='item' || itemsArr[itemsArr.length-1].type==='number' )){

      item = {
        type: 'operator',
        selected: '+'
      }
      //}
    }
    else {

      item = {
        type: 'number',
        value: '2233',
      }
    }
    varCopy[varIndex].materialItems.push(item);
    setMyVariables(varCopy);
  };

  const saveCalculation = () => {
    // write code for saving calculations here
    setEditItem(false)
  }
  const handleChangeOperation = (e, index) => {
    let selectedOpt = e.target.value;
    let varCopy = [...myVariables];
    let varIndex = varCopy.findIndex(el => el.configId === selectedVar.configId);
    let selectedV = { ...selectedVar };
    //  return;

    selectedV.materialItems[index].selected = selectedOpt;
    varCopy[varIndex] = selectedV;
    // return;
    setSelectedVar(selectedV);
    setMyVariables(varCopy);


  }
  return (
    <Layout>
      <SubLayout tabs={tabs}>
        <div className="w-full flex flex-row justify-end mb-[20px]">
          <button
            className="font-[karla] text-[20px] text-white font-bold bg-[#36695C] rounded-[5px] px-[33px] py-[4px] shadow-lg"
            onClick={() => { setNewVariableFlag(true); setShowItemsContainer(false); setEditItem(false); setNewItemFlag(false) }}
          >
            New Variable
          </button>
        </div>


        <div className="flex gap-[20px] flex-col xl:flex-row">
          <div className="body-height  flex-col  w-2/5 shadow-md bg-white border-2 border-solid border-[#d9d9d9] rounded-[12px] ">
            <div className="grid grid-cols-4 px-[10px] gap-[10px] py-2">
              <div className="col-span-2 flex justify-center">
                <span className="font-[karla] font-bold text-[22px] text-black">Variable-Name</span>
              </div>
              <div className="col-span-1 flex justify-center">
                <span className=" font-[karla] font-bold text-[22px] text-black">Config-ID</span>
              </div>
            </div>
            <div className="h-[2px] w-full bg-black"></div>

            <div className="px-[10px] py-[11px] gap-[11px] flex flex-col variables">
              {myVariables.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-[10px] bg-[#F6F6F6] rounded-[5px] border border-black border-solid px-[10px] py-[5px] ">
                  <div className="grid grid-cols-3 gap-[10px] col-span-3  ">
                    <div className="col-span-2">
                      <Input value={item.name} />
                    </div>
                    <div className="col-span-1">
                      <Input value={item.configId} />
                    </div>
                  </div>
                  <div className="flex flex-row justify-end gap-[10px] items-center col-span-1">
                    <button
                      onClick={() => {
                        handleEditItem(item.configId);
                      }}
                    >
                      <img className="w-[32px] h-[32px]" src={SettingsIcon} alt="Setting" />
                    </button>
                    <button onClick={() => handleDeleteVariables(index)}>
                      <img className="w-[30px] h-[32px]" src={DeleteIcon} alt="Delete" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {newVariableFlag && (
            <div className="relative flex-1 h-[42px] gap-[10px] col-span-3 bg-[#D9D9D9] px-[10px] py-[5px] rounded-[5px] border border-black border-solid">
              <div className="flex flex-row pl-[20px] gap-[20px]">
                <div className="flex  gap-[20px]">
                  <p className="font-[karla] font-semibold text-[20px]">Variable-Name</p>
                  <div className="col-span-3 bg-white h-[30px]  border border-solid border-black rounded-[3px]">
                    <input ref={variableNameRef} type='text' style={{ outline: 'none' }} className="font-[karla] pl-2 pt-[1px] w-[100px] font-medium text-[17px]" />
                  </div>
                </div>
                <div className="flex gap-[20px]">
                  <p className="font-[karla] font-semibold text-[20px]">Config-ID</p>
                  <div className="col-span-3 bg-white h-[30px] px-[10px] py-[3px] border border-solid border-black rounded-[3px]">
                    <span className="font-[karla] font-medium text-[14px]" ref={variableConfigIdRef}>{Math.floor(Math.random() * 101)}</span>
                  </div>
                </div>
              </div>
              <div className="absolute flex flex-row gap-[10px] top-1/2 bottom-1/2 right-[10px] items-center justify-center">
                <div className="">
                  <button className="shadow-lg font-[karla] text-white font-bold bg-[#577E60] rounded-[5px] px-[9px] py-[4px]"
                    onClick={() => handleAddVariable()}>
                    Save
                  </button>
                </div>
                <div className="col-span-2 flex flex-start justify-end" onClick={() => setNewVariableFlag(false)}>
                  <img className="h-[34px]" src={DeleteIcon} alt="Delete Icon" />
                </div>
              </div>
            </div>
          )}


          {(showItemsContainer) && (
            <div className="py-[7px] body-height flex-1 flex-col h-full flex items-center justify-between shadow-md bg-white border-2 border-solid border-[#d9d9d9] rounded-[12px]">
              <div className="w-full">
                {/* {header} */}
                <div className="w-full flex flex-col">
                  <div className="relative px-[10px] flex flex-row items-center w-full justify-between">
                    <div className="shadow-lg">
                      <button className="font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg">
                        Add Function
                      </button>
                    </div>
                    <div className="flex items-center gap-[5px] justify-between">
                      <img src={SettingsIcon} className="w-[32px]" alt="Settings Icon" />
                      <span className="font-[karla] font-bold text-[24px] underline text-black">
                        Edge-Verkaufspreis
                      </span>
                    </div>
                    <div className="shadow-lg">
                      <button className="font-[karla] text-white font-bold bg-[#577E60] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                        onClick={saveCalculation}>
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
                    {/* {editItem ? ( */}

                    {selectedVar.materialItems.map((item, index) => (
                      <div key={index}>
                        {item.type === 'item' || item.type === 'number' ? (
                          <div className="grid grid-cols-5 md:grid-cols-11 auto-cols-min gap-[10px] items-center col-span-3 bg-[#F6F6F6] px-[10px] py-[5px] rounded-[5px] border border-black border-solid">
                            <div className="col-span-3">
                              {item.type === 'item' && <Input value={item.name} />}
                            </div>
                            <div className="col-span-2">
                              {item.type === 'item' && <Input value={item.configId} />}
                            </div>
                            <div className="col-span-3">
                              {item.type === 'item' ? (
                                <Dropdown options={dropdownOptions} def={"Price selling"} />
                              ) : (<Input value={item.value} />)}
                            </div>
                            <div className="col-span-2">

                              {item.type === 'item' && <Input value={item.testResult} />}
                            </div>
                            <button
                              onClick={() => handleDeleteItems(index)}
                              className="col-span-1 flex flex-start justify-end"
                            >
                              <img className="h-[34px]" src={DeleteIcon} alt="Delete Icon" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            {/* <div className="px-[32px] border border-solid border-black bg-[#36695C] rounded-[3px]"> */}
                            <div ref={el => dropdownRef[index] = el} className={`relative ${'select-wrapper'}`}>
                              <select className={`text-[30px] text-white px-[32px] border leading-[24px] height-[28px] pt-[-4px] pb-[5px] border-black font-[karla] font-bold rounded-[6px] bg-[#36695C] custom-select-operation`}
                                onClick={() => clickedDropdown(index)} onBlur={() => bluredDropdown(index)} value={item.selected} onChange={(e) => handleChangeOperation(e, index)}>
                                <option value="+" className="bg-[#F6F6F6] text-black">+</option>
                                <option value="-" className="bg-[#F6F6F6] text-black">-</option>
                                <option value="*" className="bg-[#F6F6F6] text-black">x</option>
                                <option value="/" className="bg-[#F6F6F6] text-black">÷</option>


                              </select>
                            </div>
                            {/* </div> */}
                          </div>
                        )}
                      </div>
                    ))}


                    {newItem && !editItem ? (
                      <div className="grid grid-cols-5 md:grid-cols-11 auto-cols-min gap-[10px] items-center col-span-3 bg-[#F6F6F6] px-[10px] py-[5px] rounded-[5px] border border-black border-solid">
                        <div className="col-span-3">
                          <input
                            type="text"
                            className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="text"
                            className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3"
                          />
                        </div>
                        <div className="col-span-3">
                          <Dropdown options={dropdownOptions} def={"Price selling"} />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="text"
                            className="block text-[20px] leading-[30px] font-[karla] font-bold  outline-none w-full border border-solid border-black bg-[#F6F6F6] rounded-[3px] px-3"
                          />
                        </div>
                        <button
                          onClick={() => setNewItem(false)}
                          className="col-span-1 flex flex-start justify-end"
                        >
                          <img className="h-[34px]" src={DeleteIcon} alt="Delete Icon" />
                        </button>
                      </div>
                    ) : null}
                    {newItemFlag && (
                      <div className="relative gap-[10px] col-span-3 bg-[#D9D9D9] px-[10px] py-[5px] rounded-[5px] border border-black border-solid">
                        <div className="flex flex-row justify-center gap-[34px]">
                          <p className="font-[karla] font-semibold text-[20px]">Config-ID</p>
                          <div className="col-span-3 bg-white pt-[1px] px-[10px] border border-solid border-black rounded-[3px]">
                            <input className="font-[karla] font-medium text-[14px] outline-none" ref={newItemIdRef} />
                          </div>
                        </div>
                        <div className="absolute flex flex-row gap-[10px] top-1/2 bottom-1/2 right-[10px] items-center justify-center">
                          <div className="">
                            <button className="shadow-lg font-[karla] text-white font-bold bg-[#577E60] rounded-[5px] px-[9px] py-[4px]"
                              onClick={() => handleAddItem('item')}>
                              Save
                            </button>
                          </div>
                          <div className="col-span-2 flex flex-start justify-end" onClick={() => setNewItemFlag(false)}>
                            <img className="h-[34px]" src={DeleteIcon} alt="Delete Icon" />
                          </div>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>
              {/* footer  */}
              <div className=" w-full flex flex-col">
                <div className="h-[2px] w-full bg-black"></div>
                <div className="flex flex-row px-[10px] items-center pt-[7px] justify-between">
                  <div className="flex flex-row gap-[15px]">
                    <div className="shadow-lg">
                      <button className="font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                        onClick={() => handleAddItem('operator')}>
                        Add-Operator
                      </button>
                    </div>
                    <div className="shadow-lg">
                      <button
                        className="font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                        onClick={() => setNewItemFlag(true)}
                      >
                        Add-Variable
                      </button>
                    </div>
                    <div className="shadow-lg">
                      <button className="font-[karla] text-white font-bold bg-[#456779] rounded-[5px] px-[9px] py-[4px] shadow-lg"
                        onClick={() => handleAddItem('number')}>
                        Add-Number
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row items-center gap-[10px]">
                    <p className="font-[karla] font-medium text-[20px]">Test-Total = </p>
                    <div className="col-span-3 bg-white h-[30px] px-[10px] py-[3px] border border-solid border-black rounded-[3px]">
                      <span className="font-[karla] font-medium text-[16px]">12345</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </SubLayout>
    </Layout>
  );
};

export default Material;
