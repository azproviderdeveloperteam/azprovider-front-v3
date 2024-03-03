'use client'
import React from 'react';
import Image from "next/image";
import {Button} from "@material-tailwind/react";


const AddProductCard = ({setViewForm , preInvoice}:any) => {
    return (
        <div className={`${preInvoice ? ' w-[48.5%] max-w-[42rem]  aspect-[2.69]'  :'w-[20.125rem] h-[27.4rem]'}  bg-[#F8F8F8] shadow-[0px_12px_20px_0px_rgba(0,_0,_0,_0.10)] overflow-visible rounded-[1.2rem] flex flex-col items-center justify-center text-[#A1A1A1]`}>
             <Image src={'/add-ptoduct-card.svg'} alt={'add-product-card'} width={30} height={30} />
                <div className='capitalize font-bold my-1'>
                    {`${preInvoice ? 'add pre-invoice' : 'add product'}`}
                </div>
            <div className='capitalize   my-1 px-[12%] text-center'>
                Lorem ipsum consectetur on non lorem tellus feugiat dui.
            </div>

            <Button className={'font-roboto capitalize border-none text-primary-purple-300 bg-transparent text-[1rem] normal-case font-bold'} onClick={setViewForm}>
                {`${preInvoice ? 'add pre-invoice' : 'add product'}`}
            </Button>
        </div>
    );
};

export default AddProductCard;