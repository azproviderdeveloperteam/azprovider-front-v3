'use client'
import React from 'react';
import {Carousel} from "@material-tailwind/react";

const LoginTextSlider = () => {

    const fakeData = [
        {
            text:"Lorem ipsum dolor sit amet consectetur. Non non lorem tellus feugiat dui gravida feanitume facilisi feugiat."
        },
        {
            text:"Lorem ipsum dolor sit amet consectetur. Non non lorem tellus feugiat dui gravida feanitume facilisi feugiat."
        },
        {
            text:"Lorem ipsum dolor sit amet consectetur. Non non lorem tellus feugiat dui gravida feanitume facilisi feugiat."
        },
    ]
    return (
        <div className='w-full h-full'>
            <Carousel
                transition={{ duration: 1 }} className="font-roboto w-full h-full "
                autoplay={true}
                autoplayDelay={5000}
                loop={true}
                prevArrow={({ handlePrev }:any) => (null) }
                nextArrow={({ handleNext }) => (null)}
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute !z-10 bottom-[0px] left-[50px] z-1 flex -translate-x-2/4 gap-2">
                        {fakeData?.map((_, i) => (
                            <span
                                key={i}
                                className={`block  h-[2vw] md:h-[1vw] xl:h-2 cursor-pointer rounded-full transition-all content-[''] ${
                                    activeIndex === i ? "w-[4vw] md:w-[4vw] xl:w-10 bg-[#D7D7D7]" : "w-[4vw] md:w-[1vw] xl:w-2 bg-[#D7D7D7]"
                                }`}
                                onClick={() => setActiveIndex(i)}
                            />
                        ))}
                    </div>
                )}
            >
                {
                    fakeData.map((item , index)=>{
                        return(
                            <p className='text-white text-[1.4rem] py-[50px]'>
                                {item.text}
                            </p>
                        )
                    })
                }
            </Carousel>
        </div>
    );
};

export default LoginTextSlider;