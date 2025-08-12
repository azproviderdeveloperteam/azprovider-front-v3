'use client'

import React, {useEffect, useRef, useState} from 'react';
import {texts} from "@/utils/texts";
import {Carousel, IconButton} from "@material-tailwind/react";
import Image from "next/image";
import {useQuery} from "@tanstack/react-query";
import {getTestimonial} from "@/services/landingServices";

const CommentsLanding = () => {

    const text = texts.eng
    const myTexts = text.homePage.comments
    const [selectedSlider,setSelectedSlider]=useState(0)
    const {data , isPending , error } = useQuery({
        queryKey: ['get-testimonial' ],
        queryFn: getTestimonial,
        retry:false,
    })

    const fakeData = [
        {
            desc:"Velit cras ornare venenatis elementum netus amet. Volutpat nec facilisis netus lorem enim pulvinar. Imperdiet ullamcorper habitant vulputate ipsum. Elementum sed tortor diam vitae fermentum lectus tortor. Imperdiet vitae sed elementum nulla amet. ",
            user:"Mohsen Ramezani",
            job:"Founder of Az-Provider"
        },
        {
            desc:"Velit cras ornare venenatis elementum netus amet. Volutpat nec facilisis netus lorem enim pulvinar. Imperdiet ullamcorper habitant vulputate ipsum. Elementum sed tortor diam vitae fermentum lectus tortor. Imperdiet vitae sed elementum nulla amet. ",
            user:"Kourosh Soufi",
            job:"UIUX designer"
        },
        {
            desc:"Velit cras ornare venenatis elementum netus amet. Volutpat nec facilisis netus lorem enim pulvinar. Imperdiet ullamcorper habitant vulputate ipsum. Elementum sed tortor diam vitae fermentum lectus tortor. Imperdiet vitae sed elementum nulla amet. ",
            user:"Javad Rahati",
            job:"Front-end Developer"
        },
        {
            desc:"Velit cras ornare venenatis elementum netus amet. Volutpat nec facilisis netus lorem enim pulvinar. Imperdiet ullamcorper habitant vulputate ipsum. Elementum sed tortor diam vitae fermentum lectus tortor. Imperdiet vitae sed elementum nulla amet. ",
            user:"Bardia Bahadorii",
            job:"Django Developer"
        },
    ]
    const timeoutRef = useRef<any>(null);

    function resetTimeout() {
        if (timeoutRef?.current) {
            clearTimeout(timeoutRef?.current);
        }
    }

    useEffect(()=>{
        // resetTimeout();
        // timeoutRef.current = setTimeout(
        //     () =>
        //         setSelectedSlider((prevIndex) =>
        //             prevIndex === fakeData.length - 1 ? 0 : prevIndex + 1
        //         ),
        //     4000
        // );
        //  return () => {};
    },[selectedSlider])


    const rightArrow=()=>{
        setSelectedSlider((prevIndex) =>
            prevIndex === data?.data?.length - 2 ? -1 : prevIndex + 1
        )
    }
    const leftArrow=()=>{
        setSelectedSlider((prevIndex) =>
            prevIndex === -1 ? data?.data?.length - 2 : prevIndex - 1
        )
    }



    return (
        <div className='w-full bg-white py-28'>
            <div className='max-w-[95rem] 2xl:w-[93rem] m-auto w-full flex flex-col items-center justify-start text-primary-dark-b'>
                <div className='w-full'>
                    <h2 className='text-center text-[4rem] font-bold leading-none'>
                        {myTexts.title}
                    </h2>

                    <p className='text-center text-[1.1rem] mt-2'>
                        {/*{myTexts.sub}*/}
                    </p>
                </div>

                <div className='w-full flex flex-row items-center justify-between  h-[24.3rem] '>

                    <IconButton
                            variant="text"
                            color="white"
                            size="lg"
                            onClick={leftArrow}
                            className="w-[4rem] h-[4rem] bg-primary-green-cb/20 hover:bg-primary-green-cb/20 backdrop-blur-md rounded-full rotate-180"
                        >
                            <Image src={'/carousel-arrow.svg'} alt={'arrow-carousel-az-provider'} width={10} height={20} />
                    </IconButton>


                    <div
                        className='w-3/4 h-full flex    relative overflow-hidden mt-3'
                    >

                        {
                            data?.data.map((item : any,index : number)=>{
                                return(
                                    <div key={index+1}  className={`w-full lg:w-1/3  relative  h-full  transition duration-500 flex-shrink-0 ${selectedSlider === index-1 ? '!z-10' : '!z-0'}`} style={{transform:`translate3d(${-selectedSlider * 100}%, 0, 0)`}}>
                                       <div className={`w-full h-full flex flex-col items-center justify-end !relative  ` }>
                                           <div className={`${selectedSlider === index-1 ? 'lg:bg-[#EDA721]  lg:scale-[1.2] ' : 'bg-[#B1B1B1] '} w-full   h-[6.6rem] rounded-[1.1rem]  transition duration-500`}>
                                               <p className='h-full w-full p-3 text-center  text-[0.9rem] text-white'>
                                                   {item?.content}
                                               </p>
                                           </div>
                                            <div className= {`${selectedSlider === index-1 ? 'bg-[#EDA721]' : 'bg-[#B1B1B1] '} w-[40%] h-[5rem] flex flex-row items-center justify-center`}>
                                                <div className='w-1/2 rounded-tr-full bg-white h-full'/>
                                                <div className='w-1/2 rounded-tl-full bg-white h-full'/>

                                            </div>
                                           <div className={`w-full font-bold text-[1rem] text-center mt-6 ${selectedSlider === index-1 ?'' : 'opacity-40' } transition duration-500`}>
                                               {`${item?.first_name} ${item?.last_name}`}
                                           </div>
                                           <div className={`w-full text-[#6C6C6C] text-center   ${selectedSlider === index-1 ?'' : 'opacity-40' } transition duration-500`}>
                                               {item?.position}
                                           </div>
                                       </div>
                                    </div>
                                )
                            })
                        }

                    </div>


                    <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={rightArrow}
                        className="w-[4rem] h-[4rem] bg-primary-green-cb/20 hover:bg-primary-green-cb/20 backdrop-blur-md rounded-full"
                    >
                        <Image src={'/carousel-arrow.svg'} alt={'arrow-carousel-az-provider'} width={10} height={20} />
                    </IconButton>
                </div>
            </div>

        </div>
    );
};

export default CommentsLanding;