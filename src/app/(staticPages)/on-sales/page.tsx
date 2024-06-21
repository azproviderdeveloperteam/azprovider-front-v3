import React from 'react';
import {getAllHotDeals, getAllOnSales, getAllProducts} from "@/services/productSevices";
import ProductsPageFilters from "@/components/productsPage/ProductsPageFilters";
import ProductsPageSortFilters from "@/components/productsPage/ProductsPageSortFilters";
import ProductCard from "@/components/Cards/ProductCard";
import Link from "next/link";

const OnSalesPage = async ({searchParams} : any) => {
    const sort = searchParams?.sort
    const data = await getAllOnSales({sort , page_size:1000})

    return (
        <div className='w-full py-28 '>
            <div className='max-w-[95rem] lg:w-[95rem] m-auto w-full '>
                <div className={`hidden md:inline-block min-w-[4.8rem] max-w-[10.8rem] min-h-max transition transition-all ease-in delay-150 duration-1500 mx-[16px] my-[16px] `}
                >
                    <div className={`fixed top-24 pt-[1rem] h-[calc(100vh-6.5rem)] rounded-[15px]    min-w-[4.8rem] max-w-[10.8rem] transition transition-all ease-in delay-150 duration-1500 `}>
                        <div className='h-[122rem]'>
                            <ProductsPageFilters page={'on-sales'}/>
                        </div>
                    </div>
                </div>

                <div className={`inline-block transition transition-all w-full    lg:w-[calc(100%-11rem)] ease-in delay-150 duration-1500  min-h-[calc(100vh-0px)]`}>
                    <div className={`sticky z-[1] top-[5rem] md:h-[112px] w-full  mx-3]`}>
                        <div className='w-full h-full md:px-0   lg:rounded-[15px]'>
                            <ProductsPageSortFilters page={'on-sales'} sort={searchParams?.sort} productsLength={data?.data?.results?.length}/>
                        </div>
                    </div>

                    <div className='lg:w-full w-[95%] m-auto md:m-0 flex flex-row items-center justify-start flex-wrap'>
                        {
                            data?.data?.results?.map((item : any , index:number)=>{
                                return  (
                                    <Link href={`/products/${item?.id}`} className={`${index===0 ? ' ' :''}  w-[20%] min-w-[21rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>
                                        <ProductCard item={item} theme={'light'}/>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default OnSalesPage;