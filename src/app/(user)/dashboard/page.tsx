'use client'
import React, {useState} from 'react';
import UpgradeComponents from "@/components/dashboardPages/dahsboard/UpgradeComponents";
import DashboardWidgets from "@/components/dashboardPages/dahsboard/DashboardWidgets";
import CircleChart from "@/components/dashboardPages/dahsboard/CircleChart";
import ActivityChart from "@/components/dashboardPages/dahsboard/ActivityChart";
import UserCard from "@/components/dashboardPages/dahsboard/UserCard";
import Notifications from "@/components/dashboardPages/dahsboard/Notifications";
import ChatDashboard from "@/components/dashboardPages/dahsboard/ChatDashboard";
import {useChat, useChatAction} from "../../../contexts/ChatContext";
import CompleteChatView from "@/components/dashboard/CompleteChatView";
import DashboardInviteCode from "@/components/dashboard/DashboardInviteCode";
const DashboardPage = () => {
    const chatDispatch = useChatAction()
    const {chatData} = useChat()

    const [viewUpgrade ,setViewUpgrade ] = useState(true)
    const [rightBig , setRightBig] = useState(true)

    const [viewJustChat , setViewJustChat] = useState<any>(false)
    return (
        viewJustChat ?

            <div className='w-full overflow-y-auto px-5'>
                <CompleteChatView viewJustChat={viewJustChat} setViewJustChat={(e:any)=>setViewJustChat(e)}/>
            </div>
            :
        <div className='w-full overflow-y-auto px-5'>
            {
                viewUpgrade && <UpgradeComponents  setViewUpgradeFalse={()=>setViewUpgrade(false)}/>
            }

            <div className='w-full flex flex-col lg:flex-row items-start justify-between min-h-full'>
                <div className='w-full lg:hidden my-5'>
                    <UserCard />
                </div>
                <div className={`${rightBig ? 'w-full lg:w-[71%]' :''}`}>
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
                <div className={`${rightBig ? 'w-full lg:w-[28%]' :''} pr-[1%]`}>
                    <div className='w-full hidden lg:block'>
                        <UserCard />
                    </div>
                    <DashboardInviteCode />
                    {/*<Notifications />*/}
                    <ChatDashboard viewJustChat={viewJustChat} setViewJustChat={(e:any)=>setViewJustChat(e)}/>

                </div>
            </div>
        </div>
    );
};

export default DashboardPage;