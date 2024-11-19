'use client'
import React from 'react';
import {Carousel, Tooltip} from "@material-tailwind/react";
import hexagon from '@/public/red-hexagon.svg'
import Image from "next/image";
const ProductCard = ({item , theme , isService} : any) => {

    const monthNamesFull = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];


    return (
        <div className={`w-full aspect-[0.7334] flex flex-col items-center justify-between rounded-[1.6rem] ${theme==='dark' ?'bg-primary-dark-b shadow-[0px_12px_20px_0px_#062940]' : 'bg-white shadow-[0px_12px_20px_0px_rgba(0,_0,_0,_0.10)]' } `}>
            <div className='w-full flex flex-col items-center justify-start'>
                <div className='relative w-full aspect-[1.4268] h-auto' >
                    {/*<Carousel*/}
                    {/*    transition={{ duration: 1 }} className="font-roboto rounded-[1.6rem] w-full h-full "*/}
                    {/*    autoplay={true}*/}
                    {/*    autoplayDelay={5000}*/}
                    {/*    loop={true}*/}
                    {/*    prevArrow={({ handlePrev }:any) => (null) }*/}
                    {/*    nextArrow={({ handleNext }) => (null)}*/}
                    {/*    navigation={({ setActiveIndex, activeIndex, length }) => (*/}
                    {/*        <div className="absolute bottom-2 left-[46%] z-1 flex -translate-x-2/4 gap-2">*/}
                    {/*            {fakeData?.map((_, i) => (*/}
                    {/*                <span*/}
                    {/*                    key={i}*/}
                    {/*                    className={`block  h-[2vw] md:h-[1vw] xl:h-2 cursor-pointer rounded-full transition-all content-[''] ${*/}
                    {/*                        activeIndex === i ? "w-[4vw] md:w-[4vw] xl:w-10 bg-[#D7D7D7]" : "w-[4vw] md:w-[1vw] xl:w-2 bg-[#D7D7D7]"*/}
                    {/*                    }`}*/}
                    {/*                    onClick={() => setActiveIndex(i)}*/}
                    {/*                />*/}
                    {/*            ))}*/}
                    {/*        </div>*/}
                    {/*    )}*/}
                    {/*>*/}
                    {/*    {*/}
                    {/*        fakeData.map((item , index)=>{*/}
                    {/*            return(*/}
                    {/*                <img src={item.img} key={index+1} className='w-full h-full object-center object-cover'/>*/}
                    {/*            )*/}
                    {/*        })*/}
                    {/*    }*/}
                    {/*</Carousel>*/}
                    {
                        item?.media_files?.[0]?.image
                            ? <Image alt={'aaa'} src={`${item?.media_files?.[0]?.image?.includes("api.azprovider.com") ? "" :  process.env.MEDIA_URL}${item?.media_files?.[0]?.image}`} width={235} height={235}  className='w-full aspect-[1.4268] rounded-[1.6rem] object-center object-cover'/>
                            :
                            <Image alt={'aaa'} src={`/no-image.svg`} width={235} height={235} className='w-full aspect-[1.4268] object-center object-cover rounded-[1.6rem]' />
                    }
                    <div className='absolute w-full h-full top-0 left-0'>
                        <div className='w-full flex flex-row items-center justify-between pt-3 px-[5%]'>
                            <div className='w-1/2 flex flex-row items-center justify-start text-[0.8rem]'>
                                <div className='bg-white px-2 text-primary-dark-b rounded-[5px]'>
                                    {`#${item?.svc_code ? item?.svc_code : item?.hs_codes}`}
                                </div>

                                {
                                    item?.size &&
                                    <div className='bg-primary-dark-b  px-2 text-white rounded-[5px] ml-[5px]'>
                                        {item?.size}
                                    </div>
                                }

                            </div>
                            <div className={'w-1/2 flex flex-row items-center justify-center text-[0.8rem]'}>
                                {
                                    item?.discount_expire_date &&
                                    <div className='bg-[#FF4A23] pl-2 pr-[16px]  translate-x-[12px] text-white rounded-[5px]'>
                                        47:24:15
                                    </div>
                                }

                                {
                                    item?.discount_percentage &&
                                    <div style={{backgroundImage:`url(${hexagon.src})`}} className='relative z-10 w-[30%] bg-center bg-cover aspect-square flex flex-row items-center justify-center text-white font-bold'>
                                        15%
                                    </div>

                                }

                            </div>

                        </div>

                    </div>
                </div>



                    <div className='w-full flex flex-row items-center justify-start mt-2 px-[5%]'>
                        <Image src={'/dark-medal.svg'} alt={'dark-medal'} width={20} height={20} />
                        <div className={`${theme === 'dark' ? 'text-white' : 'text-primary-dark-b' } text-[0.7rem] ml-1 mt-1`}>
                             { item?.granted_organization  ? item?.granted_organization  : item?.granted_organisation ?  item?.granted_organisation?.name : ' - '}
                        </div>
                    </div>


                <Tooltip content={item?.title} placement="top">
                    <h4 className={`${theme === 'dark' ? 'text-white' : 'text-primary-dark-b' } w-full text-left text-[1.2rem] font-bold px-[5%] truncate`}>
                        {item?.title}
                    </h4>
                </Tooltip>

                <div className='w-full px-[5%] flex flex-row items-center justify-start'>
                    <div className='bg-[#A1A1A1]     px-2 text-[0.7rem] text-primary-dark-b rounded-[0.3rem] flex flex-row items-center justify-start'>
                        <Image src={'/star.svg'} alt={'star'} width={11} height={11} />
                        <div className='ml-1 font-bold mt-1'>
                            { item?.rate  ? item?.rate : ' - '}

                        </div>
                    </div>
                    <div className='text-[#A1A1A1] ml-1 truncate'>
                        { item?.brand_name  ? item?.brand_name : ' - '}
                    </div>
                </div>
                <p className={`w-full mt-2 px-[5%] text-[0.8rem] text-justify ${theme === 'dark' ? 'text-white' : 'text-primary-dark-b' } line-clamp`}>
                    { item?.short_description  ? item?.short_description : item?.description ? item?.description : ' - '}
                </p>
            </div>

            <div className='w-full px-[5%] pb-3 text-[0.7rem]'>
                <div className='flex flex-row items-center justify-start'>
                    <Image src={'/union.svg'} alt={'union'} width={10} height={10} />
                    <div className='ml-1 text-[#FF4B23]  '>
                         <span className='text-[0.6rem] absolute translate-y-[-0.6rem] line-through text-[#A1A1A1]'> { item?.hot_deal_price ? item?.price  : item?.on_sale_price ?  item?.price : ''} </span>

                        <span className='font-bold'> { item?.hot_deal_price  ? item?.hot_deal_price : item?.on_sale_price ? item?.on_sale_price :  item?.price ? item?.price  : ' - '} </span> <span className='ml-1'> /Cash</span>
                    </div>
                </div>
                <div className={`flex flex-row items-center justify-start ${theme === 'dark' ? 'text-white' : 'text-primary-dark-b'} `}>
                    <Image src={'/location.svg'} alt={'location-az-provider'} width={10} height={10} />
                    <div className='ml-1'>
                        {item?.location ? item?.location : isService ?'' : ' - '}
                    </div>
                    <div className='font-thin text-[0.7rem] ml-1'>
                        {
                            item?.publish_date_from ?
                                `${new Date(item?.publish_date_from)?.getUTCDate()} ${monthNames[new Date(item?.publish_date_from)?.getUTCMonth()] } ${new Date(item?.publish_date_from)?.getUTCFullYear()} - ${new Date(item?.publish_date_to)?.getUTCDate()} ${monthNames[new Date(item?.publish_date_to)?.getUTCMonth()] } ${new Date(item?.publish_date_to)?.getUTCFullYear()}`
                                :
                                item?.published_date ?
                                    `${new Date(item?.published_date)?.getUTCDate()} ${monthNames[new Date(item?.published_date)?.getUTCMonth()]} ${new Date(item?.published_date)?.getUTCFullYear()}`

                                    :
                                ' - '
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;