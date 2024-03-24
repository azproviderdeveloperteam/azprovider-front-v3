'use client'
import React from 'react';
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSideBar from "@/components/dashboard/DashboardSideBar";

const DashboardMainLayout = ({children}:any) => {
    return (
        <div className={'w-full'}>
            <div className={`hidden lg:inline-block w-[20%] max-w-[17.5rem] min-h-max transition transition-all ease-in delay-150 duration-1500 mx-[16px] my-[16px] `}
               >
                <div className={`fixed top-24  h-[calc(100vh-6.5rem)] rounded-[15px]     w-[20%] max-w-[17.5rem] transition transition-all ease-in delay-150 duration-1500 `}>
                    <DashboardSideBar/>
                </div>
            </div>

            <div className={`inline-block transition transition-all w-full    lg:w-[calc(100%-20rem)] ease-in delay-150 duration-1500  min-h-[calc(100vh-0px)]`}>
                <div className={`sticky z-[1] top-0 lg:h-[112px] w-full     lg:py-[16px] mx-3]`}>
                    <div className='w-full h-full py-[10px] lg:px-0   lg:rounded-[15px]'>
                        <DashboardHeader />
                    </div>
                </div>

                <div className='lg:w-full w-[95%] m-auto lg:m-0 my-[5rem] lg:my-0'>
                    {children}
                </div>
            </div>



        </div>
    );
};

export default DashboardMainLayout;