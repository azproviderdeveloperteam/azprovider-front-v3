'use client'
import React from 'react';
import {Button} from "@material-tailwind/react";

const WhiteBtn =  ({border ,otherClass, children} : any) => {
        return (
            <Button className={`font-roboto normal-case shadow-none hover:shadow-none text-[1.1rem] bg-transparent font-bold text-white ${border ? 'border-[1px] border-secondary-yellow ':''} py-0 px-4 rounded-[1rem] ${otherClass ? otherClass :''} `}>
                {children}
            </Button>
        );
    };



export default WhiteBtn;