'use client'
import React from 'react';
import {IconButton} from "@material-tailwind/react";

const SsrIconBtn = ({children}) => {
    return (
        <IconButton className={'bg-transparent shadow-none focus:shadow-none'}>
            {children}
        </IconButton>
    );
};

export default SsrIconBtn;