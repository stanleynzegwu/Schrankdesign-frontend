import { useEffect, useState } from 'react';
import Layout from '../../../Layouts/FurnitureConfigurator/Layout'
import SubLayout from '../../../Layouts/FurnitureConfigurator/SubLayout'
import Accordian from '../../../components/furniture-configurator/Accordian';

import { PartListAccordianAfter, PartListAccordianBefore } from '../../../components/furniture-configurator/PartListAccordian';
import Loader from '../../../components/furniture-configurator/Loader';
import { GetallPArtList } from '../../../Functions-configurator/Function-configurator';


const PartListAdd = () => {
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
  const [NewPartlistAdd, setNewPartlistAdd] = useState(false);
  const [Partlist, setPartlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUpdatedPartList = async () => {
    const { data, error } = await GetallPArtList()
    if (data) {
      setIsLoading(false)
      // const concat = data?.Assests.concat(data?.Plates)
      setPartlist(data?.Data)
    }
    if (error) {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    const GetPartList = async () => {
      const { data, error } = await GetallPArtList()
      if (data) {
        setIsLoading(false)
        // const concat = data?.Assests.concat(data?.Plates)
        setPartlist(data?.Data)
      }
      if (error) {
        setIsLoading(false)
      }
    }
    GetPartList();
  }, []);



  return (
    <Layout>
      <SubLayout tabs={tabs}>
        {isLoading && <Loader />}
        {Partlist?.length > 0 && Array.isArray(Partlist) && Partlist?.map((item, index) => {
          return (
            <Accordian index={index} beforeCollapse={<PartListAccordianBefore viewdata={item} />} afterCollapse={<PartListAccordianAfter viewdata={item} />} onClose={fetchUpdatedPartList} />
          )
        })}
      </SubLayout>
    </Layout>
  )
}

export default PartListAdd