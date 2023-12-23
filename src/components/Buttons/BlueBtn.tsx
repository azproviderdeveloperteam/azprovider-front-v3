'use client'

import React from 'react';
import { Button } from "@material-tailwind/react";

const BlueBtn =({border ,otherClass, children ,blue} : any) => {
    return (
        <Button className={`font-roboto normal-case capitalize shadow-none hover:shadow-none text-[1rem] bg-transparent font-bold text-primary-purple-300 border-primary-dark-b  ${border ? 'border-[1px]  ':'border-none'} py-2 px-4 rounded-[1rem] ${otherClass ? otherClass :''} `}>
            {children}
        </Button>
    );
};

export default BlueBtn;