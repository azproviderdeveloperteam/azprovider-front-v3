import React from 'react';
import ProductsPageFilters from "@/components/productsPage/ProductsPageFilters";
import {getAllCompanies} from "@/services/companyServices";
import ProductsPageSortFilters from "@/components/productsPage/ProductsPageSortFilters";
import ProductCard from "@/components/Cards/ProductCard";
import CompanyCard from "@/components/Cards/CompanyCard";

const CompaniesPage = async ({searchParams} : any) => {
    const sort = searchParams?.sort
    const data = await getAllCompanies({})


    return (
        <div className='w-full py-28 '>
            <div className='max-w-[95rem] lg:w-[95rem] m-auto w-full '>
                <div className={`hidden md:inline-block min-w-[4.8rem] max-w-[10.8rem] min-h-max transition transition-all ease-in delay-150 duration-1500 mx-[16px] my-[16px] `}
                >
                    <div className={`fixed top-24 pt-[1rem] h-[calc(100vh-6.5rem)] rounded-[15px]    min-w-[4.8rem] max-w-[10.8rem] transition transition-all ease-in delay-150 duration-1500 `}>
                        <div className='h-[122rem]'>
                            <ProductsPageFilters  />
                        </div>
                    </div>
                </div>

                <div className={`inline-block transition transition-all w-full    lg:w-[calc(100%-11rem)] ease-in delay-150 duration-1500  min-h-[calc(100vh-0px)]`}>
                    <div className={`sticky z-[1] top-12 md:h-[112px] w-full  mx-3]`}>
                        <div className='w-full h-full md:px-0   lg:rounded-[15px]'>
                            <ProductsPageSortFilters companies={true} sort={searchParams?.sort} productsLength={data?.data?.results?.length}/>

                        </div>
                    </div>
                    <div className='lg:w-full w-[95%] m-auto md:m-0 flex flex-col items-center justify-start'>
                        {
                            data?.data?.map((item : any , index:number)=>{
                                return  (
                                    <div className={`${index===0 ? ' ' :''}  w-full overflow-visible pt-4 pb-2 px-1`} key={index+1}>
                                         <CompanyCard item={item}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompaniesPage;