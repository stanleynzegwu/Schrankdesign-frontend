import { useEffect, useState } from "react";
import Layout from "../../../Layouts/FurnitureConfigurator/Layout";
import SubLayout from "../../../Layouts/FurnitureConfigurator/SubLayout";
import Accordian from "../../../components/furniture-configurator/Accordian";
import {
  GetallDrawer,
  GetallTexture,
} from "../../../Functions-configurator/Function-configurator";
import Loader from "../../../components/furniture-configurator/Loader";
import {
  HandlesAccordianAfter,
  HandlesAccordianBefore,
} from "../../../components/furniture-configurator/TextureAccordian";

const Textures = () => {
  const [NewDrawer, setNewDrawer] = useState(false);
  const [TextureList, setTextureList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUpdatedPartList = async () => {
    const { data, error } = await GetallTexture();
    if (data) {
      setTextureList(data.data);
      setIsLoading(false);
    }
    if (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const GetDrawer = async () => {
      const { data, error } = await GetallTexture();
      if (data) {
        setTextureList(data.data);
        setIsLoading(false);
      }
      if (error) {
        setIsLoading(false);
      }
    };
    GetDrawer();
  }, []);

  return (
    <Layout>
      <div className="p-5">
        <div className="w-full flex flex-row justify-end mb-[20px] text-black">
          <button
            className="font-[karla] text-[20px] text-white font-bold bg-[#36695C] rounded-[5px] px-[33px] py-[4px] shadow-lg"
            onClick={() => setNewDrawer(!NewDrawer)}
          >
            New Texture
          </button>
        </div>
        {isLoading && <Loader />}
        {NewDrawer && (
          <Accordian
            afterCollapse={
              <HandlesAccordianAfter
                drawerlistUpdate={setTextureList}
                createDrawer={true}
              />
            }
            add={true}
            setState={setNewDrawer}
          />
        )}
        {TextureList?.length > 0 &&
          Array.isArray(TextureList) &&
          TextureList.map((item, index) => (
            <Accordian
              onClose={fetchUpdatedPartList}
              afterCollapse={
                <HandlesAccordianAfter
                  drawerlistUpdate={setTextureList}
                  viewdata={item}
                />
              }
              beforeCollapse={<HandlesAccordianBefore viewdata={item} />}
              setState={setNewDrawer}
            />
          ))}
      </div>
    </Layout>
  );
};

export default Textures;
