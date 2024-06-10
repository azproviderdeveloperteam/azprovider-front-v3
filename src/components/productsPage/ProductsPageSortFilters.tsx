import React from 'react';
import GreenGrayBtn from "@/components/Buttons/GreenGrayBtn";
import Link from "next/link";

type sort = {
    title :string ,
    href :string
}
const ProductsPageSortFilters = ({productsLength ,companies ,page  , sort , service } : any ) => {
    const sorts = [
        {title :"Price", href : "price"} ,
        {title :"On Sale", href : "onSale"} ,
        {title :"Hot Deal", href : "hotDeal"} ,
        {title :"Recommended", href : "recommended"} ,
        {title :"Date", href : "date"} ,
        {title :"Related", href : "related"} ,
        {title :"Popular", href : "popular"} ,
        {title :"Finished", href : "finished"} ,
    ]

    return (
        <div className='w-full flex flex-row items-center justify-between'>
            <div className={'flex flex-row items-center justify-start'}>
                <div className='text-[#A1A1A1] text-[0.8rem]'>
                    Sort by
                </div>
                {
                    sorts.map((item:sort , index:number)=>{
                        return(
                            <Link
                                key={index+1}
                                href={{
                                    pathname:companies ? '/companies' :service ? '/services' :page ? `/${page}` :  '/products',
                                    query: { sort: item.href },
                                }}
                            >
                                <GreenGrayBtn active={sort?.toLowerCase() === item?.href.toLowerCase()}>
                                    {item.title}
                                </GreenGrayBtn>
                            </Link>

                        )
                    })
                }
            </div>

            {/*<div className='text-[#A1A1A1] text-[0.8rem]'>*/}
            {/*    {`${productsLength ? productsLength : '0'} Products`}*/}
            {/*</div>*/}
        </div>
    );
};

export default ProductsPageSortFilters;