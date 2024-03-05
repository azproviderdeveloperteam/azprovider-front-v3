import React from 'react';
import hexagon from "@/public/red-hexagon.svg";
import {Tooltip} from "@material-tailwind/react";
import Image from "next/image";
import SsrIconBtn from "@/components/Buttons/SsrIconBtn";

const PreInvoiceCard = ({item , theme} : any) => {

    const fakeData = [
        {
            img :"https://www.oorchinfile.com/wp-content/uploads/2023/06/red-cherries-plate_-crc0f484db6-_size17.20mb_7360x4912.jpg" ,
        },
        {
            img :"https://www.oorchinfile.com/wp-content/uploads/2023/06/mixture-fresh-nuts-spilled-from-linen-bag-onto-gr_-crc9e130893-_size5.34mb_3775x2517.jpg" ,
        },
        {
            img :"https://www.oorchinfile.com/wp-content/uploads/2023/06/mixture-fresh-nuts-spilled-from-linen-bag-onto-gr_-crc9e130893-_size5.34mb_3775x2517.jpg" ,
        }
    ]
    const monthNamesFull = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    return (
        <div className={`w-full aspect-[2.69] flex flex-row items-center justify-between rounded-[1.6rem] ${theme==='dark' ?'bg-primary-dark-b shadow-[0px_12px_20px_0px_#062940]' : 'bg-white shadow-[0px_12px_20px_0px_rgba(0,_0,_0,_0.10)]' } `}>


            <div className='w-auto aspect-[1] h-full flex flex-row items-center justify-start  '>
                <div className='relative   aspect-[1] h-full' >
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
                        item?.media_files[0]?.image
                            ? <Image alt={'aaa'} src={`${item?.media_files[0]?.image}`} width={235} height={235}  className='w-auto h-full aspect-[1] rounded-[1.4rem] object-center object-cover'/>
                            :
                            <Image alt={'aaa'} src={`/no-image.svg`} width={235} height={235} className='w-auto h-full aspect-[1] object-center object-cover rounded-[1.4rem]' />
                    }

                </div>



            </div>

            <div className=' w-[61%] h-full flex flex-col items-start justify-between px-[1%] pb-2 text-[0.7rem]'>

                <div className='w-full flex flex-row items-center justify-between pt-3 px-[1%]'>
                    <div className='w-1/2 flex flex-row items-center justify-start text-[0.8rem]'>
                        <div className='bg-white px-2 text-primary-dark-b rounded-[5px]'>
                            #{item?.hscode_str}
                        </div>

                        {
                            item?.capacity &&
                            <Tooltip content={`${item?.capacity} ${item?.measure_unit?.name}`}>
                                <div className='bg-primary-dark-b  px-2 text-white rounded-[5px] ml-[5px]'>
                                    {`${item?.capacity} ${item?.measure_unit?.symbol}`}
                                </div>
                            </Tooltip>
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
                <div className='w-full flex flex-row items-center justify-start mt-2 px-[1%]'>
                    <Image src={'/dark-medal.svg'} alt={'dark-medal'} width={20} height={20} />
                    <div className={`${theme === 'dark' ? 'text-white' : 'text-primary-dark-b' } text-[0.7rem] ml-1 mt-1`}>
                        { item?.granted_organisation  ? item?.granted_organisation?.name : ' - '}
                    </div>
                </div>


                <Tooltip content={item?.title} placement="top">
                    <h4 className={`${theme === 'dark' ? 'text-white' : 'text-primary-dark-b' } w-full text-left text-[1.2rem] font-bold px-[1%] truncate`}>
                        {item?.title}
                    </h4>
                </Tooltip>

                <div className='w-full px-[1%] flex flex-row items-center justify-start'>
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
                <p className={`w-full mt-2 px-[1%] text-[0.8rem] text-justify ${theme === 'dark' ? 'text-white' : 'text-primary-dark-b' } line-clamp-3`}>
                    { item?.description  ? item?.description : ' - '}
                </p>
                <div className='flex flex-row items-center justify-start'>
                    <Image src={'/union.svg'} alt={'union'} width={10} height={10} />
                    <div className='ml-1 text-[#FF4B23]  '>
                        <span className='text-[0.6rem] absolute translate-y-[-0.6rem] line-through text-[#A1A1A1]'> { item?.hot_deal_price ? item?.price  : item?.on_sale_price ?  item?.price : ''} </span>

                        <span className='font-bold'> { item?.hot_deal_price  ? item?.hot_deal_price : item?.on_sale_price ? item?.on_sale_price :  item?.price ? item?.price  : ' - '} </span> <span className='ml-1'> /Cash</span>
                    </div>
                </div>

                <div className='w-full px-[1%] flex flex-row items-center justify-between'>
                    <div className={`flex flex-row items-center justify-start ${theme === 'dark' ? 'text-white' : 'text-primary-dark-b'} `}>
                        <Image src={'/location.svg'} alt={'location-az-provider'} width={10} height={10} />
                        <div className='ml-1'>
                            {item?.location ? item?.location : ' - '}
                        </div>
                        <div className='font-thin text-[0.7rem] ml-1'>
                            {
                                item?.publish_date_from ?
                                    `${new Date(item?.publish_date_from)?.getUTCDate()} ${monthNames[new Date(item?.publish_date_from)?.getUTCMonth()] } ${new Date(item?.publish_date_from)?.getUTCFullYear()} - ${new Date(item?.publish_date_to)?.getUTCDate()} ${monthNames[new Date(item?.publish_date_to)?.getUTCMonth()] } ${new Date(item?.publish_date_to)?.getUTCFullYear()}`
                                    :
                                    ' - '
                            }
                        </div>
                    </div>
                    <div className={'w-1/2 lg:w-1/2 flex flex-row items-center justify-end'}>

                        <SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'}>
                            <Image src={'/icon-for-send-email.svg'} alt={'icon-for-send-email.svg'} width={40} height={40} />
                        </SsrIconBtn>
                        <SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'}>
                            <Image src={'/call-company.svg'} alt={'call-company.svg'} width={40} height={40} />
                        </SsrIconBtn>

                        <SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'}>
                            <Image src={'/send-message-company.svg'} alt={'send-message-company.svg'} width={40} height={40} />
                        </SsrIconBtn>

                        <SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'}>
                            <Image src={'/bookmark-not-fill.svg'} alt={'bookmark-not-fill.svg'} width={40} height={40} />
                        </SsrIconBtn>


                    </div>
                </div>

            </div>
        </div>
    );
};


export default PreInvoiceCard;