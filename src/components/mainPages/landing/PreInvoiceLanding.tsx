import React from 'react';
import ProductCategoryCard from "@/components/Cards/ProductCategoryCard";
import {texts} from "@/utils/texts";

const PreInvoiceLanding = () => {

    const text = texts.eng
    const myTexts = text.homePage.preInvoice
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
        <div className='w-full bg-white py-28 px-[5%] lg:px-0'>
            <div className='max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-col items-center justify-start text-primary-dark-b'>
                <div className='w-full flex flex-row items-end justify-start'>
                    <h2 className='text-left text-[4rem] font-bold leading-none'>
                        {myTexts.title}
                    </h2>
                </div>

                <div className='mt-5 w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>
                    {
                        fakeData.map((item ,index)=>{
                            return(
                                <div className={'w-[10.5%] min-w-[7.2rem] mr-[2%] mt-3 snap-start'} key={index+1}>
                                    <ProductCategoryCard src={item.src} title={item.title} color={'dark'}/>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

        </div>
    );
};

export default PreInvoiceLanding;