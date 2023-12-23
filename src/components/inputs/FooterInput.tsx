'use client'
import React from 'react';
import LightBtnWithBg from "@/components/Buttons/LightBtnWithBg";
import {Input} from "@material-tailwind/react";

const FooterInput = ({myTexts} : any) => {
    return (
        <div className='w-9/12 max-w-[33rem] border-[1px] border-secondary-yellow h-20  rounded-[1.7rem] flex flex-row items-center justify-between px-1 py-1'>
            <Input
                className={'grow h-full border-none outline-none text-secondary-yellow focus:shadow-none focus:outline-none'}
                placeholder={myTexts.input.placeholder}
            />
            <LightBtnWithBg otherClass={'!h-full !rounded-[1.5rem] !w-[53%]'}>
                {myTexts.input.btn}
            </LightBtnWithBg>
        </div>

    );
};

export default FooterInput;