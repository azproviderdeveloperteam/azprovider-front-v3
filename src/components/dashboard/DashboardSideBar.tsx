import React from 'react';
import {texts} from "@/utils/texts";
import DashboardSIdeBarItem from "@/components/dashboard/DashboardSIdeBarItem";

const DashboardSideBar = () => {
    const text = texts
    const myTexts = texts.eng.dashboard.main.sidebar
    return (
        <div className='w-full h-full flex flex-col items-start justify-between px-[10%]'>
            <div className='w-full flex flex-col items-start justify-between pt-4'>
                {
                    myTexts.items.slice(0,7).map((item , index)=>{
                        return(
                            <DashboardSIdeBarItem href={item.href} title={item.title} alt={item.alt} icon={item.icon} key={index+1} />
                        )
                    })
                }
            </div>

            <div className='w-full flex flex-col items-start justify-between pb-4'>
                {
                    myTexts.items.slice(8).map((item , index)=>{
                        return(
                            <DashboardSIdeBarItem href={item.href} title={item.title} alt={item.alt} icon={item.icon} key={index+1} />

                        )
                    })
                }
            </div>
        </div>
    );
};

export default DashboardSideBar;