'use client'
import React from 'react';
import {Button} from "@material-tailwind/react";

const RegisterBtn = ({children , disabled  ,otherClass ,type} : any) => {
    return (
        <Button className={`font-roboto font-normal normal-case shadow-none hover:shadow-none text-[1.1rem] ${disabled ? 'bg-[#3F3F3F] text-[#8F8F8F]' :'bg-primary-green-tb'} min-h-[3.85rem]  text-white py-2 px-4 rounded-[1rem] ${otherClass ? otherClass :''} disable:bg-[#3F3F3F]`} disabled={disabled} type={type}>
            {children}
        </Button>
    );
};

export default RegisterBtn;