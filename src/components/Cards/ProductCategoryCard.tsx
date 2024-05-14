'use client'
import React from 'react';
import Image from "next/image";
import {Tooltip} from "@material-tailwind/react";

const ProductCategoryCard = ({src , title ,color}:any) => {

    console.log(src , title , color)
    return (
        <div className='w-full flex flex-col items-center justify-start hover:scale-[1.01] transition duration-500 cursor-pointer'>
            <Image
                src={src ? src : '/no-image.svg'}
                alt={title}
                width={100}
                height={100}
                className={'w-full aspect-square rounded-full '}
                />

            <Tooltip content={title} placement="top"  className={'z-[99999]'}>

                <div className={`text-center mt-2 ${color==='dark' ? 'text-primary-dark-b': 'text-white'} w-[95%] truncate `}>
                    {title}
                </div>
            </Tooltip>
        </div>
    );
};

export default ProductCategoryCard;