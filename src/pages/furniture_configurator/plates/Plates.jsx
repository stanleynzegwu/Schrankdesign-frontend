import { useEffect, useState } from "react";
import Layout from "../../../Layouts/FurnitureConfigurator/Layout";
import SubLayout from "../../../Layouts/FurnitureConfigurator/SubLayout";
import Accordian from "../../../components/furniture-configurator/Accordian";
import { PlatesAccordianAfter, PlatesAccordianBefore } from "../../../components/furniture-configurator/PlatesAccordian";
import { GetallPlates, GetTexture } from "../../../Functions-configurator/Function-configurator";
import Loader from "../../../components/furniture-configurator/Loader";
const tabs = [
  {
    to: "/dashboard/furniture-configurator/plates/home",
    label: "Plates",
  },
  {
    to: "/dashboard/furniture-configurator/plates/plate-types",
    label: "Plate-Types",
  },
];
const Plates = () => {

  const [NewPlate, setNewPlate] = useState(false);
  const [PlatesList, setPlatesList] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [textureList, setTextureList] = useState()

  useEffect(() => {
    const GetPlates = async () => {
      const { data, error } = await GetallPlates()
      if (data) {
        setIsLoading(false)
        setPlatesList(data.data)
      }
      if (error) {
        setIsLoading(false)
      }
    }
    const getTexture = async () => {
      const { data, error } = await GetTexture();
      if (data) {
        setTextureList(data.data)
      }
      if (error) {
        console.log(error?.message);
      }
    };
    GetPlates();
    getTexture()
  }, []);

  return (
    <Layout>
      <SubLayout tabs={tabs}>
        <div className="w-full flex flex-row justify-end mb-[20px]">
          <button className="font-[karla] text-[20px] text-white font-bold bg-[#36695C] rounded-[5px] px-[33px] py-[4px] shadow-lg" onClick={() => setNewPlate(!NewPlate)}>
            New Plate
          </button>
        </div>

        {isLoading && <Loader />}
        {NewPlate && < Accordian
          afterCollapse={<PlatesAccordianAfter newPlate={setPlatesList} createplate={true} textureList={textureList}/>}
          add={true}
          setState={setNewPlate}
        />}

        {PlatesList?.length > 0 && Array.isArray(PlatesList) && PlatesList?.map((item, index) => {
          return (
            <Accordian
              key={index}
              afterCollapse={<PlatesAccordianAfter newPlate={setPlatesList} viewdata={item}  textureList={textureList}/>}
              beforeCollapse={<PlatesAccordianBefore viewdata={item} />}
            />
          );
        })}
      </SubLayout>
    </Layout>
  );
};

export default Plates;
