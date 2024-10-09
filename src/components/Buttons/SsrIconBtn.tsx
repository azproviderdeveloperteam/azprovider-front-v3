'use client'
import React from 'react';
import {IconButton} from "@material-tailwind/react";

const SsrIconBtn = ({children , className , data} : any) => {
    console.log(data)
    return (
        <IconButton className={'bg-transparent shadow-none focus:shadow-none'}>
            {children}
        </IconButton>
    );
};

export default SsrIconBtn;