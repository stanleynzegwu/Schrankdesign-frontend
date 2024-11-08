import { useEffect, useState } from "react"
import Layout from "../../../Layouts/FurnitureConfigurator/Layout"
import SubLayout from "../../../Layouts/FurnitureConfigurator/SubLayout"
import Accordian from "../../../components/furniture-configurator/Accordian"
import { DrawerAccordianAfter, DrawerAccordianBefore } from "../../../components/furniture-configurator/DrawerAccordian"
import { GetallDrawer } from "../../../Functions-configurator/Function-configurator"
import Loader from "../../../components/furniture-configurator/Loader"


const Drawer = () => {
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
    const [DrawerList, setDrawerList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const GetDrawer = async () => {
            const { data, error } = await GetallDrawer("getDrawers")
            if (data) {
                setDrawerList(data.data)
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
                        New Drawer
                    </button>
                </div>
                {isLoading && <Loader />}
                {
                    NewDrawer &&
                    < Accordian afterCollapse={<DrawerAccordianAfter drawerlistUpdate={setDrawerList} createDrawer={true} />} add={true} setState={setNewDrawer} />
                }
                {(DrawerList?.length > 0 && Array.isArray(DrawerList)) &&
                    DrawerList.map((item, index) => <Accordian afterCollapse={<DrawerAccordianAfter drawerlistUpdate={setDrawerList} viewdata={item} />} beforeCollapse={<DrawerAccordianBefore viewdata={item} />} setState={setNewDrawer} />)
                }
            </SubLayout>
        </Layout>
    )
}

export default Drawer