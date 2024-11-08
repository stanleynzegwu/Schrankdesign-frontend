import { useEffect, useState } from "react";
import Layout from "../../../Layouts/FurnitureConfigurator/Layout";
import SubLayout from "../../../Layouts/FurnitureConfigurator/SubLayout";

import Test_part_Listing from "../../../components/furniture-configurator/Test-part-Listing";
import Create_part_list from "../../../components/furniture-configurator/Create-test-part-list";
import { GetallTestPartList } from "../../../Functions-configurator/Function-configurator";
import Loader from "../../../components/furniture-configurator/Loader";
import { toast } from "react-hot-toast";


const TestPartList = () => {
  const tabs = [
    {
      to: "/dashboard/furniture-configurator/part-list/home",
      label: "Part-List-ADD",
    },
    {
      to: "/dashboard/furniture-configurator/part-list/test-part-list",
      label: "Test-Part-List",
    },
  ];
  const [TestParlist, setTestParlist] = useState([]);
  const [AddTestPartList, setAddTestPartList] = useState(false);
  const [Type, setType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const GetTestPartist = async () => {
      const { data, error } = await GetallTestPartList()
      if (data) {
        setIsLoading(false)
        setTestParlist(data?.data)
      }
      if (error) {
        setIsLoading(false)
        toast.error("Opps data not found !");
      }
    }
    GetTestPartist();
  }, []);

  const HandleAddTest_PartList = (type) => {
    setAddTestPartList(true)
    setType(type)
  }


  return (
    <Layout>
      <SubLayout tabs={tabs}>

        <div className="py-[7px] px-4  flex-col h-full flex justify-between shadow-md bg-white border-2 border-solid border-[#d9d9d9] rounded-[12px]">
          <div>

            {/* {header} */}
            <div className="w-full flex flex-col mb-4">
              <div className="relative px-[10px] flex flex-row items-center w-full justify-center">
                <div className="flex items-center gap-[5px] justify-between">
                  <span className="font-[karla] text-[20px] text-black">Edge-Verkaufspreis</span>
                </div>
              </div>
              <div className="grid md:grid-cols-13 lg:grid-cols-26 w-full px-[10px] gap-[10px] mt-[9px]">
                <div className="col-span-2 flex lg:justify-center">
                  <span className="font-[karla] text-[20px] text-black"></span>
                </div>
                <div className="col-span-3 flex lg:justify-center">
                  <span className="font-[karla] text-[20px] text-black">Material-Name</span>
                </div>
                <div className="col-span-2 flex lg:justify-center">
                  <span className=" font-[karla] text-[20px] text-black">Config-ID</span>
                </div>
                <div className="col-span-3 flex lg:justify-center">
                  <span className=" font-[karla] text-[20px] text-black">Edge-Size</span>
                </div>
                <div className="col-span-3 flex lg:justify-center">
                  <span className="font-[karla] text-[20px] text-black">Plate-Depth</span>
                </div>
                <div className="col-span-3 flex lg:justify-center">
                  <span className=" font-[karla] text-[20px] text-black">Plate-Length</span>
                </div>
                <div className="col-span-3 flex lg:justify-center">
                  <span className=" font-[karla] text-[20px] text-black">Edge-Type</span>
                </div>
                <div className="col-span-3 flex lg:justify-center">
                  <span className=" font-[karla] text-[20px] text-black">Plate-Type</span>
                </div>
                <div className="col-span-3 flex lg:justify-center">
                  <span className=" font-[karla] text-[20px] text-black">Quantity</span>
                </div>
              </div>
              <div className="h-[2px] w-full bg-black"></div>
            </div>
            {/* body */}
            {isLoading && <Loader />}
            {AddTestPartList && < Create_part_list Type={Type} setAddTestPartList={setAddTestPartList} setTestParlist={setTestParlist} />}

            {(TestParlist?.length > 0 && Array.isArray(TestParlist)) &&
              TestParlist?.map((item, index) => (
                <Test_part_Listing viewdata={item} index={index} setTestParlist={setTestParlist} />
              ))
            }
          </div>
          {/* footer  */}
          <div className=" w-full flex mt-4 flex-col">
            <div className="h-[2px] w-full bg-black"></div>
            <div className="flex flex-row px-[10px] items-center pt-[7px] justify-between">
              <div className="flex flex-row gap-[15px]">
                <div className="shadow-lg">
                  <button onClick={() => HandleAddTest_PartList("plates")} className="font-[karla]  text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg">
                    Add-Plate
                  </button>
                </div>
                <div className="shadow-lg">
                  <button onClick={() => HandleAddTest_PartList("asset")} className="font-[karla] text-white font-bold bg-[#36695C] rounded-[5px] px-[9px] py-[4px] shadow-lg">
                    Add-Asset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SubLayout>
    </Layout>
  );
};

export default TestPartList;
