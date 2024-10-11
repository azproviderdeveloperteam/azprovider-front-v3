'use client'
import React from 'react';
import {texts} from "@/utils/texts";
import ProductCategoryCard from "@/components/Cards/ProductCategoryCard";
import {useQuery} from "@tanstack/react-query";
import {getCategories} from "@/services/megaMenuServices";
import AzResponsiveSwiper from "@/components/azSwiper/AzResponsiveSwiper";
import {SwiperSlide} from "swiper/react";
import ProductCard from "@/components/Cards/ProductCard";
import AzSwiperTitleComponent from "@/components/azSwiper/AzSwiperTitleComponent";
import {getLastTenService} from "@/services/productSevices";
import Link from "next/link";

const ServicesListLandingPage = () => {
    const text = texts.eng
    const myTexts = text.homePage.services


    const {data , isPending , error } = useQuery({
        queryKey: ['get-landing-services' ],
        queryFn: getLastTenService,
        retry:false,
    })

    return (
        <div className='w-full bg-white py-28'>
            <div className='max-w-[95rem]   m-auto w-full flex flex-col items-center justify-start text-primary-dark-b px-[5%] lg:px-0'>
                <div className='w-full flex flex-row items-end justify-start'>
                    <h2 className='text-left text-[4rem] font-bold leading-none'>
                        {myTexts.title}
                    </h2>
                </div>


                <div className={'md:hidden w-full'}>
                    <AzResponsiveSwiper countDesktop={1} countMobile={1} title={''} count={data?.data?.results.length} allLink={'#'}>
                        {
                            data?.data?.results.map((item:any ,index:number) => (
                                <SwiperSlide key={index}>
                                    <div className={`${index===0 ? ' ' :''} pb-7 px-2 w-full`} key={index+1}>
                                        <Link href={`/services/${item?.id}`} >

                                            <ProductCard item={item}  isService={true}/>

                                        </Link>                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </AzResponsiveSwiper>
                </div>
                <div className={data?.data?.results.length > 4 ?  'hidden md:block mt-5 max-w-[95rem]  w-full  m-auto overflow-hidden' :'mt-5 max-w-[95rem]   m-auto w-full hidden md:flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory ' }>
                    {
                        data?.data?.results.length > 4  ?
                            <AzSwiperTitleComponent countDesktop={4} countMobile={2} title={''} count={data?.data?.results?.length} allLink={'#'}>
                                {
                                    data?.data?.results?.map((item:any ,index:number) => (
                                        <SwiperSlide key={index}>
                                            <div className={`${index===0 ? ' ' :''} pb-7 px-2`} key={index+1}>
                                                <Link href={`/services/${item?.id}`} >

                                                    <ProductCard item={item}  isService={true}/>

                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </AzSwiperTitleComponent>

                            :

                            data?.data?.results?.map((item :any ,index : number)=>{
                                console.log(item)
                                return(
                                    <div className={`${index===0 ? ' ' :''}  w-[22.5%] min-w-[22rem] snap-start overflow-auto pt-4 pb-7 px-4`} key={index+1}>
                                        <Link href={`/services/${item?.id}`} >

                                            <ProductCard item={item}  isService={true}/>

                                        </Link>
                                    </div>
                                )
                            })


                    }
                </div>

            </div>

        </div>
    );
};

export default ServicesListLandingPage;