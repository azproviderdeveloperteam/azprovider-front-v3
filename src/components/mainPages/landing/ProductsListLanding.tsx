import React from 'react';
import {texts} from "@/utils/texts";
import Image from "next/image";
import ProductCategoryCard from "@/components/Cards/ProductCategoryCard";

const ProductsListLanding = () => {

    const text = texts.eng
    const myTexts = text.homePage.products


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
        <div className='w-full bg-primary-dark-b py-28 '>
            <div className='max-w-[71.2125rem] lg:w-[71.3125rem] m-auto w-full flex flex-col items-center justify-start text-white'>
                <div className='w-full flex flex-row items-end justify-start'>
                    <h2 className='text-left text-[4rem] font-bold leading-none'>
                        {myTexts.title}
                    </h2>
                    <div className='flex flex-row items-center justify-start ml-3 mb-[2px] hover:scale-[1.1] transition duration-500 cursor-pointer'>
                        {myTexts.more}
                        <span className='w-4 h-4 bg-white rounded-full flex flex-row items-center justify-center text-primary-dark-b ml-1'>
                              <Image src={'/carousel-arrow.svg'} alt={'sho-more-products'} width={3} height={3} />
                        </span>
                    </div>
                </div>
                <div className='w-full mt-5 flex flex-row items-start justify-start flex-wrap'>
                    {
                        fakeData.map((item:any ,index:number)=>{
                            return(
                                <div className={'w-[10.5%] min-w-[7.2rem] mr-[2%] mt-3'} key={index+1}>
                                    <ProductCategoryCard src={item.src} title={item.title} color={'light'}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


        </div>
    );
};

export default ProductsListLanding;