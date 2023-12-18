'use client'

import React from 'react';
import { Button } from "@material-tailwind/react";

const LightBtn = ({border ,otherClass, children ,black} : any) => {
    return (
        <Button className={`font-roboto normal-case shadow-none hover:shadow-none text-[1.1rem] bg-transparent font-bold ${black ? 'text-primary-dark-b border-primary-dark-b' : 'text-secondary-yellow border-secondary-yellow'}  ${border ? 'border-[1px]  ':''} py-2 px-4 rounded-[1rem] ${otherClass ? otherClass :''} `}>
            {children}
        </Button>
    );
};

export default LightBtn;