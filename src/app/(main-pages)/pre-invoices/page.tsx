
import React from 'react';
import {getAllPreInvoices} from "@/services/productSevices";
import ProductsPageFilters from "@/components/productsPage/ProductsPageFilters";
import ProductsPageSortFilters from "@/components/productsPage/ProductsPageSortFilters";
import Link from "next/link";
import PreInvoiceCard from "@/components/Cards/PreInvoiceCard";
import AzPagination from "@/components/AzPagination";

const PreInvoicesPage = async ({searchParams} : any) => {
    const sort = searchParams?.sort
    const offset = parseInt(searchParams?.offset || '0', 10);
    const limit = 10; // مطابق با داده‌های API
    const data = await getAllPreInvoices({sort , offset, limit})


    return (
        <div className='w-full py-28 '>
            <div className=' max-w-[95rem]  m-auto w-full '>
                <div
                    className={`hidden md:inline-block min-w-[4.8rem] max-w-[10.8rem] min-h-max transition transition-all ease-in delay-150 duration-1500 mx-[16px] my-[16px] `}
                >
                    <div
                        className={`fixed top-24 pt-[1rem] h-[calc(100vh-6.5rem)] rounded-[15px]    min-w-[4.8rem] max-w-[10.8rem] transition transition-all ease-in delay-150 duration-1500 `}>
                        <div className='h-[122rem]'>
                            <ProductsPageFilters/>
                        </div>
                    </div>
                </div>

                <div
                    className={`inline-block transition transition-all w-full    lg:w-[calc(100%-11rem)] ease-in delay-150 duration-1500  min-h-[calc(100vh-0px)]`}>
                    <div className={`sticky z-[1] top-[5rem] md:h-[112px] w-full  mx-3]`}>
                        <div className='w-full h-full md:px-0   lg:rounded-[15px]'>
                            <ProductsPageSortFilters sort={searchParams?.sort}
                                                     productsLength={data?.data?.results?.length}/>
                        </div>
                    </div>

                    <div className='lg:w-full w-[95%] m-auto md:m-0 grid grid-cols-12 gap-4'>
                        {
                            data?.data?.results?.map((item: any, index: number) => {
                                return (
                                    <Link href={`/pre-invoices/${item?.id}`}
                                          className={`${index === 0 ? ' ' : ''}  col-span-12  md:col-span-6 xl:col-span-6   overflow-visible `}
                                          key={index + 1}>
                                        {/*<div className={`${index===0 ? ' ' :''}  w-[48.5%] min-w-[42rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>*/}
                                        <PreInvoiceCard item={item} theme={'light'}/>
                                        {/*</div>*/}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='mt-5 w-full'>
                    <AzPagination
                        count={data?.data?.count || 0}
                        limit={limit}
                        offset={offset}
                    />
                </div>
            </div>
        </div>
    );
};

export default PreInvoicesPage;