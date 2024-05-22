'use client'
import React, {useEffect, useState} from 'react';
import {texts} from "@/utils/texts";
import ProductCard from "@/components/Cards/ProductCard";
import { getNewestOnSaleProducts} from "@/services/productSevices";
import Link from "next/link";
import {SwiperSlide} from "swiper/react";
import AzSwiperTitleComponent from "@/components/azSwiper/AzSwiperTitleComponent";
import AzResponsiveSwiper from "@/components/azSwiper/AzResponsiveSwiper";
import {useQuery} from "@tanstack/react-query";

// const OnSaleLandingPage = async () => {
const OnSaleLandingPage =  () => {

    const text = texts.eng
    const myTexts = text.homePage.onSale
    // const {data} = await getNewestOnSaleProducts()
    // const {data} = await getNewestHotDealProducts()
    const [data , setData ] = useState<any>([])
    const {data : d , isLoading , error} = useQuery({
        queryKey:['getNewestOnSaleProducts'],
        queryFn:getNewestOnSaleProducts,
        retry:false ,
        refetchOnWindowFocus: true
    })

    useEffect(()=>{
        setData(d?.data)
    },[d])

    return (

        <div className='w-full bg-white py-28 px-[5%] lg:px-0'>
            <div className='max-w-[71.2125rem] lg:w-[71.3125rem] m-auto w-full flex flex-col items-center justify-start text-primary-dark-b '>
                <div className='w-full flex flex-row items-end justify-start'>
                    <h2 className='text-left text-[4rem] font-bold leading-none'>
                        {myTexts.title}
                    </h2>
                    <Link href={'/on-sales'} className='flex flex-row items-center justify-start ml-8 mb-[2px] hover:scale-[1.1] transition duration-500 cursor-pointer'>
                        {myTexts.more}
                    </Link>
                </div>
            </div>

            {/*<div className='mt-5 max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>*/}
            {/*    {*/}
            {/*        data?.map((item :any ,index : number)=>{*/}
            {/*            return(*/}
            {/*                <div className={`${index===0 ? ' ' :''}  w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>*/}
            {/*                    <ProductCard item={item} theme={'light'}/>*/}
            {/*                </div>*/}
            {/*            )*/}
            {/*        })*/}
            {/*    }*/}
            {/*</div>*/}
            <div className={'md:hidden'}>
                <AzResponsiveSwiper countDesktop={4} countMobile={2} title={''} count={data?.length} allLink={'#'}>
                    {
                        data?.map((item:any ,index:number) => (
                            <SwiperSlide key={index}>
                                <div className={`${index===0 ? ' ' :''} pb-7 px-2`} key={index+1}>
                                    <ProductCard item={item}  />
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </AzResponsiveSwiper>
            </div>
            <div className={data?.length > 4 ?  'hidden md:block mt-5 max-w-[95rem] 2xl:w-[93rem] m-auto overflow-hidden' :'mt-5 max-w-[95rem] 2xl:w-[93rem] m-auto w-full hidden md:flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory ' }>
                {
                    data?.length > 4  ?
                        <AzSwiperTitleComponent countDesktop={4} countMobile={2} title={''} count={data?.length} allLink={'#'}>
                            {
                                data?.map((item:any ,index:number) => (
                                    <SwiperSlide key={index}>
                                        <div className={`${index===0 ? ' ' :''} pb-7 px-2`} key={index+1}>
                                            <ProductCard item={item}  />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </AzSwiperTitleComponent>

                        :

                        data?.map((item :any ,index : number)=>{
                            return(
                                <div className={`${index===0 ? ' ' :''}  w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>
                                    <ProductCard item={item}  />
                                </div>
                            )
                        })


                }
            </div>
        </div>
    );
};

export default OnSaleLandingPage;