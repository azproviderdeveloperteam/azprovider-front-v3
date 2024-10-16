'use client'

import React from 'react';
import { Button } from "@material-tailwind/react";
import ThreeDotsLoader from "@/components/loaders/ThreeDotsLoader";

const BlueBtn =({border ,otherClass, children ,blue ,loading , onClick} : any) => {
    return (
        <Button onClick={onClick} className={`font-roboto normal-case capitalize shadow-none hover:shadow-none text-[1rem] bg-transparent font-bold text-primary-purple-300 border-primary-dark-b  ${border ? 'border-[1px]  ':'border-none'} py-2 px-4 rounded-[1rem] ${otherClass ? otherClass :''} `}>
            { loading ?
                <div className='w-full flex flex-row items-center justify-center'>
                    <ThreeDotsLoader />
                </div>
                :
                children
            }
        </Button>
    );
};

export default BlueBtn;