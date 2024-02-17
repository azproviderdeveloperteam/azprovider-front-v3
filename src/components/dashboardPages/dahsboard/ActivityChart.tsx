import React from 'react';
import {texts} from "@/utils/texts";
import BlueBtn from "@/components/Buttons/BlueBtn";
import {Bar} from "react-chartjs-2";
  import {CategoryScale} from 'chart.js';
Chart.register(CategoryScale);
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

 const ActivityChart = () => {


    const text = texts.eng
    const myTexts = text.dashboard.pages.dashboard.activityChart


    const labels = ['1' , '2' , '3' , '4' , '5' , '6' , '1' , '2' , '3' , '4' , '5' , '6' ,'1' , '2' , '3' , '4' , '5' , '6' , '1' , '2' , '3' , '4' , '5' , '6']
    const data = {
        labels: labels,
        datasets: [{
            label: '',
            data: [12, 29, 30, 11, 16, 15, 20 , 15, 19, 10, 31, 16, 15, 10 ,  15, 20 , 15, 19, 10, 31, 16, 15, 10 ,2],
            backgroundColor: [
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',

            ],
            borderColor: [
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',
                '#051926',


            ],
            borderWidth: 1
        }]
    };


    return (
        <div className='w-full flex flex-col items-center justify-start bg-primary-gray-100 p-5 rounded-[1.5rem]'>
            <div className='w-full flex flex-row items-center justify-between '>
                <h3 className='text-[#151515] font-bold text-[1.2rem]'>
                    {myTexts?.title} <span className='ml-1 text-[#7A7A7A] font-normal text-[1rem]'>{myTexts.afterTitle}</span>
                </h3>
                <div className='text-[#151515] font-bold text-[1.2rem]'>
                    {'12 July'}
                </div>
            </div>
            <div className='w-full mt-3 h-[15rem]'>
                <Bar
                    width={'2000'}
                    height={'600'}
                    data={data}

                />
            </div>

            <div className='w-full flex flex-row items-start justify-start flex-wrap mt-3'>
                <div className='w-1/3 px-[0.3rem] mt-1'>
                    <div className='w-full flex flex-row items-center justify-start'>
                        <div className='!w-[1rem] !h-[1rem] rounded-full bg-[#D9D9D9] mr-1'/>
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

                <div className='w-1/3 px-[0.3rem] mt-1'>
                    <div className='w-full flex flex-row items-center justify-start'>
                        <div className='!w-[1rem] !h-[1rem] rounded-full bg-[#D9D9D9] mr-1'/>
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

                <div className='w-1/3 px-[0.3rem] mt-1'>
                    <div className='w-full flex flex-row items-center justify-start'>
                        <div className='!w-[1rem] !h-[1rem] rounded-full bg-[#D9D9D9] mr-1'/>
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

                <div className='w-1/3 px-[0.3rem] mt-1'>
                    <div className='w-full flex flex-row items-center justify-start'>
                        <div className='!w-[1rem] !h-[1rem] rounded-full bg-[#D9D9D9] mr-1'/>
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

                <div className='w-1/3 px-[0.3rem] mt-1'>
                    <div className='w-full flex flex-row items-center justify-start'>
                        <div className='!w-[1rem] !h-[1rem] rounded-full bg-[#D9D9D9] mr-1'/>
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
            </div>


            </div>
    );
};

export default ActivityChart;