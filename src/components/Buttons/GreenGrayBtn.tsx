'use client'
import React from 'react';
import {Button} from "@material-tailwind/react";
import ThreeDotsLoader from "@/components/loaders/ThreeDotsLoader";

const GreenGrayBtn = ({children , onClick , active ,otherClass , loading} : any) => {
    return (
        <Button className={`px-4 py-2 rounded-full ml-2 font-normal normal-case capitalize !text-[1rem] ${active ? 'bg-primary-green-tb text-white border-[1px] border-primary-green-tb ' : 'bg-transparent text-[#A1A1A1] border-[1px] border-[#A1A1A1]'} ${otherClass ? otherClass :''} ` } onClick={onClick}>
            { loading ?
                <div className='w-full flex flex-row items-center justify-center'>
                    <ThreeDotsLoader />
                </div>
                :
                children
            }        </Button>
    );
};

export default GreenGrayBtn;