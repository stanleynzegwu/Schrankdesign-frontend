import SubLayout from "../../../Layouts/FurnitureConfigurator/SubLayout";
import Layout from "../../../Layouts/FurnitureConfigurator/Layout";
import Accordian from "../../../components/furniture-configurator/Accordian";
import {
  EdgeAccordianAfter,
  EdgeAccordianBefore,
} from "../../../components/furniture-configurator/EdgeAccordian";
import { useEffect, useState } from "react";
import { GetallEdge } from "../../../Functions-configurator/Function-configurator";
import Loader from "../../../components/furniture-configurator/Loader";

const Edge = () => {
  const tabs = [
    {
      to: "/dashboard/furniture-configurator/edge/home",
      label: "Edge",
    },
  ];
  const [NewEdge, setNewEdge] = useState(false);
  const [EdgeList, setEdgeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const GetEdge = async () => {
      const { data, error } = await GetallEdge();
      if (data) {
        setEdgeList(data.data);
        setIsLoading(false);
      }
      if (error) {
        setIsLoading(false);
      }
    };
    GetEdge();
  }, []);

  return (
    <Layout>
      <SubLayout tabs={tabs}>
        <div className="w-full flex flex-row justify-end mb-[20px]">
          <button
            className="font-[karla] text-[20px] text-white font-bold bg-[#36695C] rounded-[5px] px-[33px] py-[4px] shadow-lg"
            onClick={() => setNewEdge(!NewEdge)}
          >
            New Edge
          </button>
        </div>
        {isLoading && <Loader />}
        {NewEdge && (
          <Accordian
            afterCollapse={<EdgeAccordianAfter edgelistUpdate={setEdgeList} createEdge={true} />}
            add={true}
            setState={setNewEdge}
          />
        )}
        {EdgeList?.length > 0 &&
          Array.isArray(EdgeList) &&
          EdgeList.map((item, index) => (
            <Accordian
              key={index}
              index={index}
              afterCollapse={<EdgeAccordianAfter viewdata={item} edgelistUpdate={setEdgeList} />}
              beforeCollapse={<EdgeAccordianBefore viewdata={item} />}
            />
          ))}
      </SubLayout>
    </Layout>
  );
};

export default Edge;
