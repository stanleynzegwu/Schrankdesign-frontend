import { useEffect, useState } from "react"
import Layout from "../../../Layouts/FurnitureConfigurator/Layout"
import SubLayout from "../../../Layouts/FurnitureConfigurator/SubLayout"
import Accordian from "../../../components/furniture-configurator/Accordian"
import { GetallDrawer } from "../../../Functions-configurator/Function-configurator"
import Loader from "../../../components/furniture-configurator/Loader"
import { HandlesAccordianAfter, HandlesAccordianBefore } from "../../../components/furniture-configurator/HandlesAccordian"


const Handles = () => {
    const tabs = [
        {
            to: '/dashboard/furniture-configurator/drawer/home',
            label: 'Drawer'
        },
        // {
        //     to: '/dashboard/furniture-configurator/drawer/doors',
        //     label: 'Doors'
        // },
        {
            to: '/dashboard/furniture-configurator/drawer/handles',
            label: 'Handles'
        },
        {
            to: '/dashboard/furniture-configurator/drawer/feets',
            label: 'Feets'
        },
        // {
        //     to: '/dashboard/furniture-configurator/drawer/others',
        //     label: 'Others'
        // },
        {
            to: '/dashboard/furniture-configurator/drawer/fittings',
            label: 'Fittings'
        },
    ]
    const [NewDrawer, setNewDrawer] = useState(false);
    const [HandleList, setHandleList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUpdatedPartList = async () => {
        const { data, error } = await GetallDrawer("gethandle")
        if (data) {
            setHandleList(data.data)
            setIsLoading(false)
        }
        if (error) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const GetDrawer = async () => {
            const { data, error } = await GetallDrawer("gethandle")
            if (data) {
                setHandleList(data.data)
                setIsLoading(false)
            }
            if (error) {
                setIsLoading(false)
            }
        }
        GetDrawer();
    }, []);


    return (
        <Layout>
            <SubLayout tabs={tabs}>
                <div className="w-full flex flex-row justify-end mb-[20px] text-black">
                    <button className="font-[karla] text-[20px] text-white font-bold bg-[#36695C] rounded-[5px] px-[33px] py-[4px] shadow-lg" onClick={() => setNewDrawer(!NewDrawer)}>
                        New Handle
                    </button>
                </div>
                {isLoading && <Loader />}
                {
                    NewDrawer &&
                    < Accordian afterCollapse={<HandlesAccordianAfter drawerlistUpdate={setHandleList} createDrawer={true} />} add={true} setState={setNewDrawer} />
                }
                {(HandleList?.length > 0 && Array.isArray(HandleList)) &&
                    HandleList.map((item, index) => <Accordian  onClose={fetchUpdatedPartList} afterCollapse={<HandlesAccordianAfter drawerlistUpdate={setHandleList} viewdata={item} />} beforeCollapse={<HandlesAccordianBefore viewdata={item} />} setState={setNewDrawer} />)
                }
            </SubLayout>
        </Layout>
    )
}

export default Handles