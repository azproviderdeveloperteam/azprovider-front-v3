import React, {useState} from 'react';
import {texts} from "@/utils/texts";
import BlueBtn from "@/components/Buttons/BlueBtn";
import GreenGrayBtn from "@/components/Buttons/GreenGrayBtn";
import {Card} from "@material-tailwind/react";
import Image from "next/image";

const DashboardWidgets = () => {

    const text = texts.eng
    const myTexts = text.dashboard.pages.dashboard.widgets

    const [filter , setFilter] = useState<any>('products')


    return (
        <div className='w-full bg-primary-gray-100 p-5 rounded-[1.5rem]'>
            <div className='w-full flex flex-row items-center justify-between '>
                <h3 className='text-[#151515] font-bold text-[1.2rem]'>
                    {'Referral'} <span className='ml-1 text-[#7A7A7A] font-normal text-[1rem'>{'Invite your friends to azprovider.com'}</span>
                </h3>
                <BlueBtn otherClass={'!px-0'}>
                    {myTexts.addPost}
                </BlueBtn>
            </div>
            <div className='w-full flex flex-row items-start justify-between px-0 mt-4'>
                <div className='w-10/12  flex flex-row items-start justify-start flex-wrap' >
                    {
                        myTexts.filters.map((item ,index)=>{
                            return(
                                <GreenGrayBtn otherClass={index === 0 ? '!ml-0' : ''} active={item.toLowerCase() === filter?.toLowerCase()} onClick={()=>setFilter(item)} key={index+1}>
                                    {item}
                                </GreenGrayBtn>
                            )
                        })
                    }
                </div>

                <div className='w-2/12 text-right text-[#A1A1A1] font-bold text-[1rem] capitalize'>
                    {`3 ${filter}`}
                </div>
            </div>

            <Card className="h-[26rem] w-full overflow-scroll bg-transparent shadow-none mt-3 !font-normal font-roboto">
                <table className="w-full min-w-max table-auto text-left">
                    <thead className='w-full'>
                        <tr  className='w-full !font-normal text-primary-dark-b'>
                            <th className='w-[25%] max-w-[16rem] !font-normal text-primary-dark-b text-left'>
                                {myTexts.tableHeaders[0]}
                            </th>

                            <th className='w-[25%] max-w-[16rem] !font-normal text-primary-dark-b text-left'>
                                {myTexts.tableHeaders[1]}
                            </th>

                            <th className='w-[19%] max-w-[10rem] !font-normal text-primary-dark-b text-center'>
                                {myTexts.tableHeaders[2]}
                            </th>
                            <th className='w-[8%] max-w-[5rem] !font-normal text-primary-dark-b text-center'>
                                {myTexts.tableHeaders[3]}
                            </th>
                            <th className='w-[8%] max-w-[5rem] !font-normal text-primary-dark-b text-center'>
                                {myTexts.tableHeaders[4]}
                            </th>
                            <th className='w-[8%] max-w-[5rem] !font-normal text-primary-dark-b text-center'>
                                {myTexts.tableHeaders[5]}
                            </th>
                        </tr>
                    </thead>

                    <tbody className='w-full px-3'>
                    {
                        [...Array(3)].map((item , index)=>{
                            return(
                                <tr key={index+1} className='w-full bg-primary-gray-400 py-2 my-1  border-[15px] border-primary-gray-100 rounded-[1.5rem] !shadow-md' style={{boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.10)'}}>
                                    <td className='w-[25%] max-w-[16rem] !font-normal text-primary-dark-b text-left rounded-l-full px-2' >
                                        <span className='font-bold'> Tesla C40 Large Cabin </span>
                                    </td>

                                    <td className='w-[25%] max-w-[16rem] !font-normal text-primary-dark-b text-left'>
                                        <span className='flex flex-row items-center justify-start'>
                                            <Image src={'/union.svg'} alt={'union'} width={15} height={15} />
                                            <span className='text-[#FF4B23] ml-2'> 2,575,000,000 IRT </span>
                                        </span>
                                    </td>

                                    <td className='w-[19%] max-w-[10rem] !font-normal text-primary-dark-b text-center'>
                                        <span className='font-bold'> 12 Jun 22  </span>
                                    </td>
                                    <th className='w-[8%] max-w-[5rem] !font-normal text-primary-dark-b text-center'>
                                        <span className=' bg-[#E80000] w-[3rem] h-[3rem] rounded-full text-white py-1 px-2 '>2 </span>
                                    </th>
                                    <td className='w-[8%] max-w-[5rem] !font-normal text-primary-dark-b text-center'>
                                        <span className=''> 1  </span>
                                    </td>
                                    <td className='w-[8%] max-w-[5rem] !font-normal text-primary-dark-b text-center rounded-r-full py-4'>
                                        <span className=' '> 12 Jun 22  </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </Card>



        </div>
    );
};

export default DashboardWidgets;