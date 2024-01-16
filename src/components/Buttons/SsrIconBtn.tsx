'use client'
import React from 'react';
import {IconButton} from "@material-tailwind/react";

const SsrIconBtn = ({children , className} : any) => {
    return (
        <IconButton className={'bg-transparent shadow-none focus:shadow-none'}>
            {children}
        </IconButton>
    );
};

export default SsrIconBtn;