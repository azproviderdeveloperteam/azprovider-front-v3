'use client'

import React from 'react';
import { Button } from "@material-tailwind/react";
const LightBtnWithBg =  ({otherClass, children} : any) => {
    return (
        <Button className={`font-roboto text-[1.1rem] normal-case shadow-none hover:shadow-none text-primary-dark-b bg-secondary-yellow font-bold   border-[1px] border-secondary-yellow  py-2 px-4 rounded-[1rem] ${otherClass ? otherClass :''} `}>
            {children}
        </Button>
    );
};

export default LightBtnWithBg;