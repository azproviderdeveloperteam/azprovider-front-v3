
// Importing part
import {ReactNode} from "react";
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


import { EffectCards } from 'swiper/modules';

// Defining type of props
interface propsType {
    title: string;
    count: number;
    children: ReactNode;
    allLink: string;
    threeSlides?: boolean;
    countMobile?: number ,
    countDesktop? : number
}

// Creating and exporting category game with titles component as default
export default function AzResponsiveSwiper( {countMobile = 1 , countDesktop = 4 , title, children, count, allLink, threeSlides = false}:propsType):ReactNode {
    // Returning JSX
    return (
        // <div>
        //     <div className={'flex items-center justify-between gap-[20px] flex-wrap mb-[20px]'}>
        //         <div className={'flex gap-[10px] items-end'}>
        //             <span className={'font-bold text-white lg:text-[30px] text-[15px] block'}>{title}</span>
        //             <span className={'text-white/50 lg:text-[15px] text-[10px] lg:block hidden'}>{count.toLocaleString()}</span>
        //         </div>
        //         <div className={'flex lg:flex-row flex-col lg:items-center items-end lg:gap-[10px]'}>
        //             <Link className={'text-[10px] text-lightBlue lg:text-start'} href={allLink}>All</Link>
        //             <span className={'text-white/50 lg:text-[15px] lg:text-start text-[10px] lg:hidden block'}>{count.toLocaleString()}</span>
        //             <button data-id={btoa(title)} className={'slider-prev-btn w-[30px] h-[30px] aspect-square lg:flex hidden justify-center items-center bg-lightTheme rounded-[5px] transition-all duration-500 hover:opacity-50'}>
        //                 <span className={'text-white -rotate-90'}><IconComponent name={'chevron'} size={12} /></span>
        //             </button>
        //             <button data-id={btoa(title)} className={'slider-next-btn w-[30px] h-[30px] aspect-square lg:flex hidden justify-center items-center bg-lightTheme rounded-[5px] transition-all duration-500 hover:opacity-50'}>
        //                 <span className={'text-white rotate-90'}><IconComponent name={'chevron'} size={12} /></span>
        //             </button>
        //         </div>
        //     </div>
        <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
        >
            {children}
        </Swiper>
        // </div>
    );
}