import React from 'react';
import Image from "next/image";
import noImage from "@/public/no-image.svg";
import Link from "next/link";
import SsrIconBtn from "@/components/Buttons/SsrIconBtn";
import {GrayEditIcon} from "@/components/icons";

const CompanyDetailsCertificates = ({certificates , viewEditMode} : any) => {
    return (
        <div className='w-full'>
            <h3 className='text-[1.3rem] font-bold text-primary-dark-b text-center lg:text-left gap-2 flex flex-row'>
                Certificates
                {viewEditMode && <Link href={'/dashboard/profile'}
                                       target={"_blank"}><SsrIconBtn><GrayEditIcon/></SsrIconBtn></Link>}

            </h3>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
                {
                    certificates?.map((item: any, index: number) => {
                        const imageSrc = item?.image || item?.file
                        return (
                            <div key={index + 1} className='flex flex-row items-center justify-start'>
                                <Image src={imageSrc ? `${(imageSrc)?.startsWith("http") ? "" : process.env.MEDIA_URL}${ imageSrc }` : noImage?.src}
                                       alt={item?.title} height={80} width={80}
                                       className={'object-cover rounded-[0.6rem] aspect-square'}/>
                                <div className='flex flex-col items-start justify-start ml-2'>
                                    <h4 className='font-semibold'>
                                        {item?.title}
                                    </h4>
                                    {
                                        item?.serial_number &&
                                        <p className='text-sm text-gray-600'>
                                            {item?.serial_number}
                                        </p>
                                    }
                                    {
                                        item?.publisher_organization &&
                                        <p className='text-sm text-gray-600'>
                                            {item?.publisher_organization}
                                        </p>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default CompanyDetailsCertificates;
