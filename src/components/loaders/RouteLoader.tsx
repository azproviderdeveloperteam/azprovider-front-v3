'use client'
import React from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const RouteLoader = () => {
    return (

        <ProgressBar
            height="4px"
            color="#fff"
            options={{ showSpinner: false }}
            shallowRouting
        />
    );
};

export default RouteLoader;