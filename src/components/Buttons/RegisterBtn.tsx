'use client'
import React from 'react';
import {Button} from "@material-tailwind/react";
import ThreeDotsLoader from "@/components/loaders/ThreeDotsLoader";

const RegisterBtn = ({children , disabled  ,otherClass ,type , loading , onClick} : any) => {
    return (
        <Button onClick={onClick} className={`font-roboto font-normal normal-case shadow-none hover:shadow-none text-[1.1rem] ${disabled ? 'bg-[#3F3F3F] text-[#8F8F8F]' :'bg-primary-green-tb'} min-h-[3.85rem]  text-white py-2 px-4 rounded-[1rem] ${otherClass ? otherClass :''} disable:bg-[#3F3F3F]`} disabled={disabled} type={type}>
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

export default RegisterBtn;