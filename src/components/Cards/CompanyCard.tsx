'use client'
import React from 'react';
import {Avatar} from "@material-tailwind/react";
import noImage from '../../../public/no-image.svg'
import Image from "next/image";
const CompanyCard = ({item} : any) => {

    const monthNamesFull = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];


    console.log(item)
    return (
        <div className='w-full bg-[#F8F8F8] min-h-[5.3rem] py-3 rounded-[1.2rem] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.10)] flex flex-row items-center justify-between px-4'>
            <div className='w-3/12  px-2 flex flex-row items-center justify-start'>
                <Avatar src={item?.business_information?.logo ? `${process.env.MEDIA_URL}${item?.business_information?.logo}` : noImage.src} />
                <div className={'flex flex-col items-start justify-center h-full ml-2'}>
                    <h2 className='text-[1.1rem] font-bold'>
                        {item?.business_information?.brand_name}
                    </h2>
                    <div className='flex flex-row items-center justify-start'>
                        <div className='bg-[#A1A1A1] px-1 text-[0.7rem] text-white rounded-[0.3rem] flex flex-row items-center justify-start'>
                            <Image src={'/star-light.svg'} alt={'star-light'} width={21} height={21} />
                            <div className='ml-1 text-[0.87rem] '>
                                { item?.rate  ? item?.rate : ' - '}

                            </div>
                        </div>
                        <h3 className='text-[#A1A1A1] text-[0.9rem] ml-2'>
                            {item?.business_information?.international_name}

                        </h3>
                    </div>
                </div>
            </div>
            <div className='w-3/12 px-2'>
                Electronic Product | Company Equipment
            </div>
            <div className='w-2/12  px-2 text-[0.9rem]'>
               <div> {`Profile Created ${new Date(item?.created_at)?.getUTCDate()} ${monthNames[new Date(item?.created_at)?.getUTCMonth()] } ${new Date(item?.created_at)?.getUTCFullYear()}`}</div>
                <div className='mt-1'> {`Last Update ${new Date(item?.updated_at)?.getUTCDate()} ${monthNames[new Date(item?.updated_at)?.getUTCMonth()] } ${new Date(item?.updated_at)?.getUTCFullYear()}`}</div>

            </div>
            <div className='w-2/12  px-2'>
                {`${item?.contact_information?.country ? item?.contact_information?.country : ''} , ${item?.contact_information?.city ? item?.contact_information?.city : ''}`}
            </div>
            <div className='w-2/12  px-2 flex flex-row items-center justify-end'>
                <Image src={'/call-company.svg'} alt={'call-company.svg'} width={21} height={21} />

                <Image src={'/send-message-company.svg'} alt={'send-message-company.svg'} width={21} height={21} />
                <Image src={'/bookmark-not-fill.svg'} alt={'bookmark-not-fill.svg'} width={21} height={21} />


            </div>
        </div>
    );
};

export default CompanyCard;