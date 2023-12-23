import React from 'react';
import {texts} from "@/utils/texts";
import BlueBtn from "@/components/Buttons/BlueBtn";

const ActivityChart = () => {


    const text = texts.eng
    const myTexts = text.dashboard.pages.dashboard.activityChart

    return (
        <div className='w-full flex flex-row items-center justify-start bg-primary-gray-100 p-5 rounded-[1.5rem]'>
            <div className='w-full flex flex-row items-center justify-between '>
                <h3 className='text-[#151515] font-bold text-[1.2rem]'>
                    {myTexts?.title} <span className='ml-1 text-[#7A7A7A] font-normal text-[1rem]'>{myTexts.afterTitle}</span>
                </h3>
                <div className='text-[#151515] font-bold text-[1.2rem]'>
                    {'12 July'}
                </div>
            </div>
        </div>
    );
};

export default ActivityChart;