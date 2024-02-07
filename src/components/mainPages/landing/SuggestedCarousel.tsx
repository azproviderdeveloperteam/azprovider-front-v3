'use client'

import React from 'react';
import {Carousel, IconButton} from "@material-tailwind/react";
import Image from "next/image";

const SuggestedCarousel = () => {

    const fakeData = [
        {
            img :"https://www.oorchinfile.com/wp-content/uploads/2023/06/red-cherries-plate_-crc0f484db6-_size17.20mb_7360x4912.jpg" ,
            title:"Cherry" ,
            author:"Esmaillian Garden",
            desc:"Dui pretium sed sed facilisis quis integer. Est ac cras urna tellus nullam. Magna mi dolor nibh elementum aliquam ullamcorper elit est feugiat. Curabitur vel malesuada vel aliquam nunc duis dolor. Ac fermentum mattis suscipit sed augue.",
        },
        {
            img :"https://www.oorchinfile.com/wp-content/uploads/2023/06/mixture-fresh-nuts-spilled-from-linen-bag-onto-gr_-crc9e130893-_size5.34mb_3775x2517.jpg" ,
            title:"Nuts" ,
            author:"Baradaran Hosseini",
            desc:"Dui pretium sed sed facilisis quis integer. Est ac cras urna tellus nullam. Magna mi dolor nibh elementum aliquam ullamcorper elit est feugiat. Curabitur vel malesuada vel aliquam nunc duis dolor. Ac fermentum mattis suscipit sed augue.",
        },
        {
            img :"https://www.oorchinfile.com/wp-content/uploads/2023/08/laptop-mockup-wooden-table_-crcfdb7d49d-_size185.27mb.jpg" ,
            title:"Apple macbook air m1" ,
            author:"Apple",
            desc:"Dui pretium sed sed facilisis quis integer. Est ac cras urna tellus nullam. Magna mi dolor nibh elementum aliquam ullamcorper elit est feugiat. Curabitur vel malesuada vel aliquam nunc duis dolor. Ac fermentum mattis suscipit sed augue.Dui pretium sed sed facilisis quis integer. Est ac cras urna tellus nullam. Magna mi dolor nibh elementum aliquam ullamcorper elit est feugiat. Curabitur vel malesuada vel aliquam nunc duis dolor. ",
        },
        {
            img :"https://www.oorchinfile.com/wp-content/uploads/2023/12/realistic-living-room-with-furniture-illustration_-crc5184a47c-_size5.75mb.jpg" ,
            title:"Sofa" ,
            author:"Novin Wood",
            desc:"Dui pretium sed sed facilisis quis integer. Est ac cras urna tellus nullam. Magna mi dolor nibh elementum aliquam ullamcorper elit est feugiat. Curabitur vel malesuada vel aliquam nunc duis dolor. Ac fermentum mattis suscipit sed augue.Dui pretium sed sed facilisis quis integer. Est ac cras urna tellus nullam. Magna mi dolor nibh elementum aliquam ullamcorper elit est feugiat. Curabitur vel malesuada vel aliquam nunc duis dolor. Ac fermentum mattis suscipit sed augue.",
        }
    ]
    return (
        <div className='w-full p-[0px]'>
            <Carousel
                transition={{ duration: 1 }} className="font-roboto"
                autoplay={true}
                autoplayDelay={5000}
                loop={true}
                prevArrow={({ handlePrev }:any) => (
                    <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handlePrev}
                        className="!absolute bottom-12 left-[calc(90%-3.5rem)] -translate-y-2/4 backdrop-blur-md rounded-full rotate-180"
                    >
                        <Image src={'/carousel-arrow.svg'} alt={'arrow-carousel-az-provider'} width={10} height={20} />

                    </IconButton>
                ) }
                nextArrow={({ handleNext }) => (
                    <IconButton
                        variant="text"
                        color="white"
                        size="lg"
                        onClick={handleNext}
                        className="!absolute bottom-12 left-[90%] -translate-y-2/4 backdrop-blur-md rounded-full"
                    >
                       <Image src={'/carousel-arrow.svg'} alt={'arrow-carousel-az-provider'} width={10} height={20} />
                    </IconButton>
                )}
                navigation={({ setActiveIndex, activeIndex, length }) => (
                    <div className="absolute bottom-10 left-[90%] z-1 flex -translate-x-2/4 gap-2">
                        {fakeData?.map((_, i) => (
                            <span
                                key={i}
                                className={`block  h-[4vw] md:h-[1vw] xl:h-3 cursor-pointer rounded-full transition-all content-[''] ${
                                    activeIndex === i ? " w-[12vw] md:w-[4vw] xl:w-10 bg-[#D7D7D7]" : "w-[4vw] md:w-[1vw] xl:w-3 bg-[#D7D7D7]"
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
                            <div className='w-full bg-cover bg-center h-[41.3rem]' style={{backgroundImage:`url(${item.img})`}} key={index+1}>
                                <div className='w-full h-full flex flex-row item-center justify-between py-10 px-[8%] text-white'>
                                    <div className='h-full aspect-[0.8] lg:aspect-[1.2] bg-[rgba(0,0,0,0.34)] rounded-[2rem] backdrop-blur-md py-[1.3%] px-[1.5%] flex flex-col items-start justify-between'>
                                        <div className='w-full flex flex-col items-start justify-start'>
                                            <div className='border-[1px] border-white rounded-[0.6rem] px-2 py-1'>
                                                {`#01${(index+1)*1243}`}
                                            </div>
                                            <div className='flex flex-row items-center justify-start mt-1 font-thin text-[0.8rem]'>
                                                <Image src={'/medal-icon.svg'} alt={'medal-az-provider'} width={20} height={20} />
                                                <div>
                                                    Normal
                                                </div>
                                            </div>
                                            <div className='mt-3 flex flex-row items-center justify-start'>
                                                <h4 className='text-[1.7rem] font-bold'>
                                                    {item.title}
                                                </h4>
                                                <div className='bg-primary-green-cb h-full px-2 ml-2 rounded-[0.7rem] flex flex-row items-center justify-center font-bold text-primary-dark-b'>
                                                    1 Ton
                                                </div>
                                            </div>

                                            <div className='mt-1 flex flex-row items-center justify-start'>
                                                <div className='bg-white     px-2 text-[0.9rem] text-primary-dark-b rounded-[0.5rem] flex flex-row items-center justify-start'>
                                                    <Image src={'/star.svg'} alt={'star'} width={17} height={17} />
                                                    <div className='ml-1 font-bold mt-1'>
                                                        4.7
                                                    </div>
                                                </div>
                                                <div className='ml-2 text-[1.4rem]'>
                                                    {item?.author}
                                                </div>
                                            </div>

                                            <p className='w-full text-justify mt-3'>
                                                {item.desc}
                                            </p>
                                        </div>

                                        <div className='w-full flex flex-col items-start justify-start'>
                                            <div className='flex flex-row items-center justify-start'>
                                                <Image src={'/union.svg'} alt={'union'} width={17} height={17} />
                                                <div className='ml-1 text-[#FF4B23] text-[1.2rem] '>
                                                    <span className='font-bold'>120,123,000 IRR </span> <span className='ml-2'> /Cash</span>
                                                </div>
                                            </div>
                                            <div className='w-full flex flex-row items-center justify-between'>
                                                <div className='flex flex-row items-center justify-start'>
                                                    <Image src={'/location.svg'} alt={'location-az-provider'} width={17} height={17} />
                                                    <div className='ml-1'>
                                                        Hamedan, Iran
                                                    </div>
                                                </div>
                                                <div>
                                                    Exp 18 Jun 2023
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    );
};

export default SuggestedCarousel;