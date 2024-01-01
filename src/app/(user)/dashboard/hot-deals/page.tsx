import React from 'react';
import ProductCard from "@/components/Cards/ProductCard";

const HotDealsPage = () => {
    return (
        <div className='mt-5 max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>
            {
                [...Array(12)].map((item ,index)=>{
                    return(
                        <div className={`${index===0 ? ' ' :''}  w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>
                            <ProductCard item={item} theme={'light'}/>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default HotDealsPage;