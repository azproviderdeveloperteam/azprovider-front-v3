'use client'

import React from 'react';
import { Button } from "@material-tailwind/react";
import ThreeDotsLoader from "@/components/loaders/ThreeDotsLoader";

const DarkButton = ({border ,otherClass, children , loading} : any) => {
    return (
        <Button className={`font-roboto normal-case shadow-none hover:shadow-none text-[1.1rem] bg-primary-dark-b font-bold text-white py-2 px-4 rounded-[1rem] ${otherClass ? otherClass :''} `}>
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

export default DarkButton;