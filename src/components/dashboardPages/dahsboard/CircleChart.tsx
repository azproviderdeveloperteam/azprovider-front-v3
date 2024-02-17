'use client'
import React from 'react';
import {texts} from "@/utils/texts";
import {Pie} from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
const CircleChart = () => {


    const text = texts.eng
    const myTexts = text.dashboard.pages.dashboard.circleChart


    const dataa = {
        labels: [
            // 'a',
            // 'b',
            // 'c',
            // 'd',
        ],
        datasets: [{
            label: 'a',
            data: [300, 50, 100,12],
            backgroundColor: [
                '#22446B',
                '#853063',
                '#626340',
                '#051926'
            ],
            hoverOffset: 4
        }]
    };


    return (
        <div className='w-full flex flex-col items-center justify-start bg-primary-gray-100 p-5 rounded-[1.5rem]'>
            <div className='w-full flex flex-row items-center justify-between '>
                <h3 className='text-[#151515] font-bold text-[1.2rem]'>
                    {myTexts?.title} <span className='ml-1 text-[#7A7A7A] font-normal text-[1rem]'>{myTexts.afterTitle}</span>
                </h3>
            </div>
            <div className='w-7/12 flex flex-row items-center justify-center mt-1' >
                <Pie
                    data={dataa}
                 />
            </div>
            <div className='w-full flex flex-row items-start justify-start flex-wrap mt-3'>
                <div className='w-1/2 px-[0.3rem] mt-1'>
                    <div className='w-full flex flex-row items-center justify-start'>
                         <div className='!w-[1rem] !h-[1rem] rounded-full bg-[#22446B] mr-1'/>
                        <div>
                            <div className='text-[0.6rem]'>
                                Product 12%
                            </div>
                            <div className='text-[0.5rem] text-[#898989]'>
                                Edit, create or organize your products
                            </div>
                        </div>

                    </div>
                </div>

                <div className='w-1/2 px-[0.3rem] mt-1'>
                    <div className='w-full flex flex-row items-center justify-start'>
                        <div className='!w-[1rem] !h-[1rem] rounded-full bg-[#853063] mr-1'/>
                        <div>
                            <div className='text-[0.6rem]'>
                                Inovation 12%
                            </div>
                            <div className='text-[0.5rem] text-[#898989]'>
                                Edit, create or organize your products
                            </div>
                        </div>

                    </div>
                </div>

                <div className='w-1/2 px-[0.3rem] mt-1'>
                    <div className='w-full flex flex-row items-center justify-start'>
                        <div className='!w-[1rem] !h-[1rem] rounded-full bg-[#051926] mr-1'/>
                        <div>
                            <div className='text-[0.6rem]'>
                                Pre-Invoice  12%
                            </div>
                            <div className='text-[0.5rem] text-[#898989]'>
                                Edit, create or organize your products
                            </div>
                        </div>

                    </div>
                </div>

                <div className='w-1/2 px-[0.3rem] mt-1'>
                    <div className='w-full flex flex-row items-center justify-start'>
                        <div className='!w-[1rem] !h-[1rem] rounded-full bg-[#626340] mr-1'/>
                        <div>
                            <div className='text-[0.6rem]'>
                                Services 12%
                            </div>
                            <div className='text-[0.5rem] text-[#898989]'>
                                Edit, create or organize your products
                            </div>
                        </div>

                    </div>
                </div>



            </div>
        </div>
    );
};

export default CircleChart;