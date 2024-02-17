'use client'
import React from 'react';
import {Input} from "@material-tailwind/react";
import LightBtnWithBg from "@/components/Buttons/LightBtnWithBg";

const SearchBox = ({texts} :  any) => {
    return (
        <div className='w-1/3 max-w-[33rem] border-[1px] border-secondary-yellow h-20  rounded-[1.7rem] flex flex-row items-center justify-between px-1 py-1 my-12'>
            <Input
                className={'grow !h-full border-none outline-none text-secondary-yellow focus:border-none'}
                placeholder={texts.searchBox.placeholder}
                />
            <LightBtnWithBg otherClass={'!h-full !rounded-[1.5rem] !w-[53%]'}>
                {texts.searchBox.btn}
            </LightBtnWithBg>
        </div>
    );
};

export default SearchBox;