'use client'
import React from 'react';
import {Button} from "@material-tailwind/react";
import ThreeDotsLoader from "@/components/loaders/ThreeDotsLoader";

const WhiteBtn =  ({border ,otherClass, children , loading} : any) => {
        return (
            <Button className={`font-roboto normal-case shadow-none hover:shadow-none text-[1.1rem] bg-transparent font-bold text-white ${border ? 'border-[1px] border-secondary-yellow ':''} py-0 px-4 rounded-[1rem] ${otherClass ? otherClass :''} `}>
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



export default WhiteBtn;