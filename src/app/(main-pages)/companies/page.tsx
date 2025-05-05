import React from 'react';
import ProductsPageFilters from "@/components/productsPage/ProductsPageFilters";
import {getAllCompanies} from "@/services/companyServices";
import ProductsPageSortFilters from "@/components/productsPage/ProductsPageSortFilters";
import ProductCard from "@/components/Cards/ProductCard";
import CompanyCard from "@/components/Cards/CompanyCard";
import TopCompanyCard from "@/components/TopCompanyCard";
import AzPagination from "@/components/AzPagination";

const CompaniesPage = async ({searchParams} : any) => {
    const sort = searchParams?.sort
    const offset = parseInt(searchParams?.offset || '0', 10);
    const limit = 10; // مطابق با داده‌های API
    const data = await getAllCompanies({ offset, limit });



    return (
        <div className='w-full py-28 '>
            <div className='max-w-[95rem]  m-auto w-full '>
                {/*<div className={`hidden md:inline-block min-w-[4.8rem] max-w-[10.8rem] min-h-max transition transition-all ease-in delay-150 duration-1500 mx-[16px] my-[16px] `}*/}
                {/*>*/}
                {/*    <div className={`fixed top-24 pt-[1rem] h-[calc(100vh-6.5rem)] rounded-[15px]    min-w-[4.8rem] max-w-[10.8rem] transition transition-all ease-in delay-150 duration-1500 `}>*/}
                {/*        <div className='h-[122rem]'>*/}
                {/*            <ProductsPageFilters  />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={`inline-block transition   w-full    ease-in delay-150 duration-1500  min-h-[calc(100vh-0px)] px-4`}>
                    {/*<div className={`sticky z-[1] top-12 md:h-[112px] w-full  mx-3]`}>*/}
                    {/*    <div className='w-full h-full md:px-0   lg:rounded-[15px]'>*/}
                    {/*        <ProductsPageSortFilters companies={true} sort={searchParams?.sort} productsLength={data?.data?.results?.length}/>*/}

                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className='lg:w-full w-[95%] m-auto md:m-0 flex flex-col items-center justify-start'>
                        <TopCompanyCard key={'-1'} data={data?.data?.results}/>
                        {
                            data?.data?.results?.map((item : any , index:number)=>{
                                return  (
                                    <div className={`${index===0 ? ' ' :''}  w-full overflow-visible pt-4 pb-2 px-1`} key={index+1}>
                                         <CompanyCard item={item}/>
                                    </div>
                                )
                            })
                        }
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
        </div>
    );
};

export default CompaniesPage;