'use client'

import React from 'react';
import { Button } from "@material-tailwind/react";

const LightBtn = ({border ,otherClass, children} : any) => {
    return (
        <Button className={`font-roboto text-[1.1rem] bg-transparent font-bold text-secondary-yellow ${border ? 'border-[1px] border-secondary-yellow ':''} py-2 px-4 rounded-[1rem] ${otherClass ? otherClass :''} `}>
            {children}
        </Button>
    );
};

export default LightBtn;