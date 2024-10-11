'use client'
import React from 'react';
import {IconButton} from "@material-tailwind/react";

const SsrIconBtn = ({children , className , data , ...otherProps} : any) => {

    return (
        <IconButton {...otherProps} className={'bg-transparent shadow-none focus:shadow-none'}>
            {children}
        </IconButton>
    );
};

export default SsrIconBtn;