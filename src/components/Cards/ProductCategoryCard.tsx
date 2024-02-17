import React from 'react';
import Image from "next/image";

const ProductCategoryCard = ({src , title ,color}:any) => {
    return (
        <div className='w-full flex flex-col items-center justify-start hover:scale-[1.1] transition duration-500 cursor-pointer'>
            <Image
                src={src}
                alt={src.toString()}
                width={100}
                height={100}
                className={'w-full aspect-square rounded-[1rem] '}
                />

            <h4 className={`text-center mt-2 ${color==='dark' ? 'text-primary-dark-b': 'text-white'} `}>
                {title}
            </h4>
        </div>
    );
};

export default ProductCategoryCard;