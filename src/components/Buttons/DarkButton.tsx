'use client'

import React from 'react';
import { Button } from "@material-tailwind/react";

const DarkButton = ({border ,otherClass, children} : any) => {
    return (
        <Button className={`font-roboto normal-case shadow-none hover:shadow-none text-[1.1rem] bg-primary-dark-b font-bold text-white py-2 px-4 rounded-[1rem] ${otherClass ? otherClass :''} `}>
            {children}
        </Button>
    );
};

export default DarkButton;