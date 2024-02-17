'use client'

import React from 'react';
import { Button } from "@material-tailwind/react";
import ThreeDotsLoader from "@/components/loaders/ThreeDotsLoader";

const LightBtn = ({border ,otherClass, children ,black , loading} : any) => {
    return (
        <Button className={`font-roboto normal-case shadow-none hover:shadow-none text-[1.1rem] bg-transparent font-bold mix-blend-difference ${black ? 'text-primary-dark-b border-primary-dark-b' : 'text-secondary-yellow border-secondary-yellow'}  ${border ? 'border-[1px]  ':''} py-2 px-4 rounded-[1rem] ${otherClass ? otherClass :''} `}>
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

export default LightBtn;