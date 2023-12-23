'use client'
import React, {useState} from 'react';
import UpgradeComponents from "@/components/dashboardPages/dahsboard/UpgradeComponents";
import DashboardWidgets from "@/components/dashboardPages/dahsboard/DashboardWidgets";

const DashboardPage = () => {

    const [viewUpgrade ,setViewUpgrade ] = useState(true)
    const [rightBig , setRightBig] = useState(true)
    return (
        <div className='w-full overflow-y-auto px-5'>
            {
                viewUpgrade && <UpgradeComponents setViewUpgradeFalse={()=>setViewUpgrade(false)}/>
            }

            <div className='w-full flex flex-row items-start justify-between min-h-full'>
                <div className={`${rightBig ? 'w-[71%]' :''}`}>
                    <DashboardWidgets />
                </div>
                <div className={`${rightBig ? 'w-[26%]' :''}`}>

                </div>
            </div>
        </div>
    );
};

export default DashboardPage;