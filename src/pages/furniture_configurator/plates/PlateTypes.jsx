import Layout from "../../../Layouts/FurnitureConfigurator/Layout";
import SubLayout from "../../../Layouts/FurnitureConfigurator/SubLayout";
import {
  PlatesTypeAccordianAfter,
  PlatesTypeAccordianBefore,
} from "../../../components/furniture-configurator/PlatesTypeAccordian";
import Accordian from "../../../components/furniture-configurator/Accordian";
import { useEffect, useState } from "react";
import React from "react";
import { GetallPlatesTypes } from "../../../Functions-configurator/Function-configurator";
import Loader from "../../../components/furniture-configurator/Loader";

const PlateTypes = () => {
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

  const [NewPlatType, setNewPlatType] = useState(false);
  const [PlateTypesList, setPlateTypesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const GetPlatesType = async () => {
      const { data, error } = await GetallPlatesTypes();
      if (data) {
        setPlateTypesList(data.data);
        setIsLoading(false);
      }
      if (error) {
        setIsLoading(false);
      }
    };
    GetPlatesType();
  }, []);

  return (
    <Layout>
      <SubLayout tabs={tabs}>
        <div className="w-full flex flex-row justify-end mb-[20px]">
          <button
            className="font-[karla] text-[20px] text-white font-bold bg-[#36695C] rounded-[5px] px-[33px] py-[4px] shadow-lg"
            onClick={() => setNewPlatType(!NewPlatType)}
          >
            New Plate-Type
          </button>
        </div>
        <div className="flex flex-col gap-10 overflow-visible">
          {isLoading && <Loader />}

          {NewPlatType && (
            <Accordian
              afterCollapse={
                <PlatesTypeAccordianAfter
                  createplatetypes={true}
                  index={PlateTypesList.length + 1}
                  updatePlatetypes={setPlateTypesList}
                />
              }
              beforeCollapse={<PlatesTypeAccordianBefore />}
              add={true}
              setState={setNewPlatType}
            />
          )}
          {PlateTypesList?.length > 0 &&
            Array?.isArray(PlateTypesList) &&
            PlateTypesList?.map((item, index) => (
              <React.Fragment key={index}>
                <Accordian
                  afterCollapse={
                    <PlatesTypeAccordianAfter
                      updatePlatetypes={setPlateTypesList}
                      viewdata={item}
                      index={index + 1}
                    />
                  }
                  beforeCollapse={<PlatesTypeAccordianBefore viewdata={item} index={index + 1} />}
                />
              </React.Fragment>
            ))}
        </div>
      </SubLayout>
    </Layout>
  );
};

export default PlateTypes;
