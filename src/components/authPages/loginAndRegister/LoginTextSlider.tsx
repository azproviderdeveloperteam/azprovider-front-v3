'use client'
import React from 'react';
import {Carousel} from "@material-tailwind/react";

const LoginTextSlider = ({theme}:any) => {

    const fakeData = [
        {
            text:"Looking for high-quality products and service at competitive prices"
        },
        {
            text:"You are in the wholesale Hub and we are facilitating connections between trusted buyers and suppliers"
        },
        {
            text:"Global supply chain. ” Take best price on Hot Deal & Grab the best On Sale “"
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
                                key={i+1}
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
                            <p   key={index+1} className={`${theme === 'dark' ?"text-primary-dark-b" :"text-white" }  text-[1.4rem] py-[50px]`}>
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