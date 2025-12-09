
import React from 'react';

const OurResponsiveAnalyticComponent = ({item , index} :any) => {
    return (
        <>
            <div
                className=' hidden md:flex h-[290px] overflow-visible aspect-[0.603] mt-3  flex-col items-center justify-center hover:justify-between transition-all duration-500'>
                <div
                    className='w-full aspect-[0.818] bg-gray-200 rounded-[1.5rem] hover:bg-gradient-to-b from-gray-300 to-gray-100 transition-all duration-500  hover:border-2 hover:border-gray-200 hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] flex flex-row items-center justify-center text-primary-dark-b mt-3 text-[1.6rem] font-bold'>
                    {
                        ` ${index}`
                    }
                </div>
                <h4 className='text-primary-dark-b mt-3 font-bold text-[1.1rem]'>
                    {item}
                </h4>
            </div>


            <div
                className='md:hidden w-[32%] overflow-visible aspect-[0.603] mt-3  flex-col items-center    justify-between transition-all duration-500'>
                <div
                    className='w-full aspect-[0.818] bg-gray-200 rounded-[1.5rem] bg-gradient-to-b from-gray-300 to-gray-100 transition-all duration-500   border-2  border-gray-200  shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px] flex flex-row items-center justify-center text-primary-dark-b mt-3 text-[1.2rem] font-bold'>
                    {
                        ` ${index}`
                    }
                </div>
                <h4 className='text-primary-dark-b mt-3 font-bold text-[0.8rem] text-center'>
                    {item}
                </h4>
            </div>
        </>
    );
};

export default OurResponsiveAnalyticComponent;