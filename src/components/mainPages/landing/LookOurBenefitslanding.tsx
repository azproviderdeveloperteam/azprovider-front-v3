'use client'
import React from 'react';
import {texts} from "@/utils/texts";
import Image from "next/image";
import DarkButton from "@/components/Buttons/DarkButton";
import {useQuery} from "@tanstack/react-query";
import {getBenefits} from "@/services/landingServices";

const LooksOurBenefitsLanding = () => {

    const text = texts.eng
    const myTexts = text.homePage.ourBenefits

    const {data , isPending , error } = useQuery({
        queryKey: ['get-benefits' ],
        queryFn: getBenefits,
        retry:false,
    })


    return (
        <div className='w-full bg-white pb-10'>
            <div className='w-full max-w-[71.4rem]   m-auto w-full flex flex-col items-center justify-start text-primary-dark-b bg-gradient-to-b  from-primary-green-cb to-gray-50 p-1 rounded-[1.5rem] translate-y-[-5rem] shadow-[0px_55px_55px_13px_rgba(5,_25,_38,_0.20)]'>
                <div className='w-full h-full rounded-[1.4rem] bg-white py-10'>
                    <h3 className='w-full text-center text-[3.5rem] font-bold'>
                        {myTexts.title}
                    </h3>
                    <p className='w-full text-center px-[13%] text-[1.1rem] '>
                        {myTexts.desc}
                    </p>
                    <div className='w-full flex flex-row items-start justify-start flex-wrap px-[13%] mt-10'>
                        {
                            data?.data.map((item : any ,index : number)=>{
                                return(
                                    <div className={'w-[11rem] aspect-square rounded-2xl bg-[#D9D9D9] m-2 p-[3%] flex flex-col items-start justify-start benefit-icon.svg'} key={index+1}>
                                        <Image src={'/benefit-icon.svg'} alt={`benefit-icon${index+1}`} width={30} height={30} />
                                        <h5 className='mt-2 text-[1.1rem] font-bold'>
                                            {item.title}
                                        </h5>
                                        <p className='w-full text-justify text-[0.6rem] text-[#6C6C6C] mt-2'>
                                            {item.description}
                                        </p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='w-full flex flex-row items-center justify-center my-10'>
                        {/*<DarkButton>*/}
                        {/*    {myTexts.btn}*/}
                        {/*</DarkButton>*/}
                    </div>

                </div>


            </div>
        </div>
    );
};

export default LooksOurBenefitsLanding;