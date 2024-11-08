import { useEffect, useState } from "react"
import Layout from "../../../Layouts/FurnitureConfigurator/Layout"
import SubLayout from "../../../Layouts/FurnitureConfigurator/SubLayout"
import Accordian from "../../../components/furniture-configurator/Accordian"
import { GetallDrawer } from "../../../Functions-configurator/Function-configurator"
import Loader from "../../../components/furniture-configurator/Loader"
import { DoorsAccordianAfter, DoorsAccordianBefore } from "../../../components/furniture-configurator/DoorsAccordian"


const Doors = () => {
    const tabs = [
        {
            to: '/dashboard/furniture-configurator/drawer/home',
            label: 'Drawer'
        },
        {
            to: '/dashboard/furniture-configurator/drawer/doors',
            label: 'Doors'
        },
        {
            to: '/dashboard/furniture-configurator/drawer/handles',
            label: 'Handles'
        },
        {
            to: '/dashboard/furniture-configurator/drawer/feets',
            label: 'Feets'
        },
        {
            to: '/dashboard/furniture-configurator/drawer/others',
            label: 'Others'
        },
        {
            to: '/dashboard/furniture-configurator/drawer/fittings',
            label: 'Fittings'
        },
    ]
    const [NewDrawer, setNewDrawer] = useState(false);
    const [DoorsList, setDoorsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const GetDrawer = async () => {
            const { data, error } = await GetallDrawer("getDoors")
            if (data) {
                setDoorsList(data.data)
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
                        New Door
                    </button>
                </div>
                {isLoading && <Loader />}
                {
                    NewDrawer &&
                    < Accordian afterCollapse={<DoorsAccordianAfter drawerlistUpdate={setDoorsList} createDrawer={true} />} add={true} setState={setNewDrawer} />
                }
                {(DoorsList?.length > 0 && Array.isArray(DoorsList)) &&
                    DoorsList.map((item, index) => <Accordian afterCollapse={<DoorsAccordianAfter drawerlistUpdate={setDoorsList} viewdata={item} />} beforeCollapse={<DoorsAccordianBefore viewdata={item} />} setState={setNewDrawer} />)
                }
            </SubLayout>
        </Layout>
    )
}

export default Doors