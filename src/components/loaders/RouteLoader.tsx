'use client'
import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const RouteLoader = () => {
    return (

        <ProgressBar
            height="4px"
            color="#000000"
            options={{ showSpinner: false }}
            shallowRouting
        />
    );
};

export default RouteLoader;