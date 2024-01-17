import React from 'react';
import {texts} from "@/utils/texts";
import ProductCard from "@/components/Cards/ProductCard";
import {getNewestOnSaleProducts} from "@/services/productSevices";
import Link from "next/link";

const OnSaleLandingPage = async () => {

    const text = texts.eng
    const myTexts = text.homePage.onSale
    const {data} = await getNewestOnSaleProducts()

    return (
        <div className='w-full bg-white py-28 '>
            <div className='max-w-[71.2125rem] lg:w-[71.3125rem] m-auto w-full flex flex-col items-center justify-start text-primary-dark-b'>
                <div className='w-full flex flex-row items-end justify-start'>
                    <h2 className='text-left text-[4rem] font-bold leading-none'>
                        {myTexts.title}
                    </h2>
                    <Link href={'/on-sales'} className='flex flex-row items-center justify-start ml-8 mb-[2px] hover:scale-[1.1] transition duration-500 cursor-pointer'>
                        {myTexts.more}
                    </Link>
                </div>
            </div>

            <div className='mt-5 max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>
                {
                    data?.map((item ,index)=>{
                        return(
                            <div className={`${index===0 ? ' ' :''}  w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>
                                <ProductCard item={item} theme={'light'}/>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default OnSaleLandingPage;