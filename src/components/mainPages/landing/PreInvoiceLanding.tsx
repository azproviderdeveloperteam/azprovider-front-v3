'use client'
import React from 'react';
import ProductCategoryCard from "@/components/Cards/ProductCategoryCard";
import {texts} from "@/utils/texts";
import {useQuery} from "@tanstack/react-query";
import {getCategories} from "@/services/megaMenuServices";
import Link from "next/link";

const PreInvoiceLanding = () => {

    const text = texts.eng
    const myTexts = text.homePage.preInvoice

    const {data : categoriesData, isPending :categoriesPending, error : categoriesError} = useQuery({
        queryKey: ['get-all-categories' ],
        queryFn: getCategories,
        retry:false,
    })


    return (
        <div className='w-full bg-white py-28 px-[5%] lg:px-0'>
            <div
                className='max-w-[95rem] w-full m-auto w-full flex flex-col items-center justify-start text-primary-dark-b'>
                <div className='w-full flex flex-row items-end justify-start'>
                    <h2 className='text-left text-[4rem] font-bold leading-none'>
                        {myTexts.title}
                    </h2>
                </div>

                {/*<div*/}
                {/*    className='mt-5 w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>*/}
                {/*    {*/}
                {/*        categoriesData?.data?.map((item: any, index: number) => {*/}
                {/*            return (*/}
                {/*                <Link href={'/pre-invoices'}*/}
                {/*                      className={'w-[10.5%] min-w-[7.2rem] mr-[2%] mt-3 snap-start'} key={index + 1}>*/}
                {/*                    <ProductCategoryCard*/}
                {/*                        src={item?.media_files?.[1]?.image ? item?.media_files?.[1]?.image : item?.media_files?.[0]?.image}*/}
                {/*                        title={item.title} color={'dark'}/>*/}
                {/*                </Link>*/}
                {/*            )*/}
                {/*        })*/}
                {/*    }*/}
                {/*</div>*/}

                <div className="w-full mt-5 overflow-x-auto no-scrollbar">
                    <div className="grid grid-rows-3 grid-flow-col gap-4">
                        {categoriesData?.data?.slice(0, 45).map((item: any, index: number) => (
                            item?.title === 'Added By AZ' ? null : (
                                <Link href={'/pre-invoices'} key={index + 1} className="min-w-[7.5rem]">
                                    <ProductCategoryCard
                                        src={item?.media_files?.[1]?.image ? item?.media_files?.[1]?.image : item?.media_files?.[0]?.image}
                                        title={item.title}
                                        color="dark"
                                    />
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PreInvoiceLanding;