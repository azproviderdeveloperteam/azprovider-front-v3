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

const ServicesListLandingPage = () => {
    const text = texts.eng
    const myTexts = text.homePage.services


    const {data , isPending , error } = useQuery({
        queryKey: ['get-landing-services' ],
        queryFn: getLastTenService,
        retry:false,
    })

    const fakeData = [
        {
            src:"/book.svg",
            title:"Book &\n" +
                "Desk Stuf ",
        },
        {
            src:"/mobile.svg",
            title:"Phone ",
        },
        {
            src:"/milk.svg",
            title:"Milk & Animal Protein ",
        },
        {
            src:"/mobile.svg",
            title:"Digital",
        },
        {
            src:"/mobile.svg",
            title:"Bazar Industry ",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
        {
            src:"/mobile.svg",
            title:"Phone",
        },
    ]
    return (
        <div className='w-full bg-white py-28'>
            <div className='max-w-[95rem] 2xl:w-[93rem] m-auto w-full flex flex-col items-center justify-start text-primary-dark-b px-[5%] lg:px-0'>
                <div className='w-full flex flex-row items-end justify-start'>
                    <h2 className='text-left text-[4rem] font-bold leading-none'>
                        {myTexts.title}
                    </h2>
                </div>

                {/*<div className='mt-5 w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>*/}

                {/*    {*/}
                {/*        categoriesdata?.data?.results.map((item : any ,index : number)=>{*/}
                {/*            return(*/}
                {/*                <div className={'w-[10.5%] min-w-[7.2rem] mr-[2%] mt-3 snap-start'} key={index+1}>*/}
                {/*                    <ProductCategoryCard src={item?.media_files?.[1]?.image ? item?.media_files?.[1]?.image : item?.media_files?.[0]?.image} title={item.title} color={'dark'}/>*/}
                {/*                </div>*/}
                {/*            )*/}
                {/*        })*/}
                {/*    }*/}
                {/*</div>*/}

                <div className={'md:hidden'}>
                    <AzResponsiveSwiper countDesktop={4} countMobile={2} title={''} count={data?.data?.results.length} allLink={'#'}>
                        {
                            data?.data?.results.map((item:any ,index:number) => (
                                <SwiperSlide key={index}>
                                    <div className={`${index===0 ? ' ' :''} pb-7 px-2`} key={index+1}>
                                        <ProductCard item={item}  isService={true}/>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </AzResponsiveSwiper>
                </div>
                <div className={data?.data?.results.length > 4 ?  'hidden md:block mt-5 max-w-[95rem] 2xl:w-[93rem] m-auto overflow-hidden' :'mt-5 max-w-[95rem] 2xl:w-[93rem] m-auto w-full hidden md:flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory ' }>
                    {
                        data?.data?.results.length > 4  ?
                            <AzSwiperTitleComponent countDesktop={4} countMobile={2} title={''} count={data?.data?.results?.length} allLink={'#'}>
                                {
                                    data?.data?.results?.map((item:any ,index:number) => (
                                        <SwiperSlide key={index}>
                                            <div className={`${index===0 ? ' ' :''} pb-7 px-2`} key={index+1}>
                                                <ProductCard item={item}  />
                                            </div>
                                        </SwiperSlide>
                                    ))
                                }
                            </AzSwiperTitleComponent>

                            :

                            data?.data?.results?.map((item :any ,index : number)=>{
                                console.log(item)
                                return(
                                    <div className={`${index===0 ? ' ' :''}  w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>
                                        <ProductCard item={item}  />
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