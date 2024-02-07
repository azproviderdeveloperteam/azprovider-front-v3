import React from 'react';
import {texts} from "@/utils/texts";
import OurResponsiveAnalyticComponent from "@/components/mainPages/landing/OurResponsiveAnalyticComponent";
import Image from "next/image";

const OurResponsive = () => {
    const text = texts.eng
    const myTexts = text.homePage.ourResponsive
    return (
        <div className='w-full py-[7rem] bg-[#ffffff]'>
            <div className='max-w-[71.2125rem] lg:w-[71.3125rem] m-auto w-full flex flex-col  md:flex-row items-center justify-between px-[5%] lg:px-0'>
                <div className='w-full md:w-1/2'>
                    <h2 className='w-full font-bold text-[3.5rem]  text-left text-primary-dark-b'>
                        {myTexts.title}
                    </h2>
                    <div className='w-full text-[1rem] text-justify text-primary-dark-b'>
                        {myTexts.desc.map((item:string ,index:number)=>{
                            return(
                                <li key={index+1}>
                                    {item}
                                </li>
                            )
                        })}
                    </div>

                    <div className='w-full flex flex-row item-center justify-between flex-wrap'>
                        {
                            myTexts.analytics.map((item ,index)=>{
                                return(
                                    <OurResponsiveAnalyticComponent item={item} key={index+1} index={index} />
                                )
                            })
                        }
                    </div>
                </div>
                <Image src={'/our-responsive.png'} alt={'az-provider-responsive'} width={500} height={123} className={'w-[90%] md:w-[38%]'} />

            </div>


        </div>
    );
};

export default OurResponsive;