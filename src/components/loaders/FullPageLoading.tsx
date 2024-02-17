import React from 'react';
import ThreeDotsLoaderGreen from "@/components/loaders/ThreeDotsLoaderGreen";

const FullPageLoading = () => {
    return (
        <div className='w-[100vw] h-screen flex flex-row items-center justify-center'>
            <ThreeDotsLoaderGreen />
        </div>
    );
};

export default FullPageLoading;