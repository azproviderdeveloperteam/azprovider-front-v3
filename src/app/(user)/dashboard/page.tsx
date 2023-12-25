'use client'
import React, {useState} from 'react';
import UpgradeComponents from "@/components/dashboardPages/dahsboard/UpgradeComponents";
import DashboardWidgets from "@/components/dashboardPages/dahsboard/DashboardWidgets";
import CircleChart from "@/components/dashboardPages/dahsboard/CircleChart";
import ActivityChart from "@/components/dashboardPages/dahsboard/ActivityChart";
import UserCard from "@/components/dashboardPages/dahsboard/UserCard";
import Notifications from "@/components/dashboardPages/dahsboard/Notifications";
import ChatDashboard from "@/components/dashboardPages/dahsboard/ChatDashboard";
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
                    <div className='w-full flex flex-row items-start justify-between mt-4'>
                        <div className={`${rightBig ? 'w-[32%]' :'w-full'}`}>
                            <CircleChart />
                        </div>
                        <div className={`${rightBig ? 'w-[65%]' :'w-[0px] hidden'}`}>
                            <ActivityChart />
                        </div>
                    </div>
                </div>
                <div className={`${rightBig ? 'w-[28%]' :''} pr-[1%]`}>
                    <UserCard />
                    <Notifications />
                    <ChatDashboard />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;