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
                        return (
                            <div key={index + 1} className='flex flex-row items-center justify-start'>
                                <Image src={item?.file ? `${process.env.MEDIA_URL}${item?.file}` : noImage?.src}
                                       alt={item?.title} height={80} width={80}
                                       className={'object-cover rounded-[0.6rem'}/>
                                <div className='flex flex-col items-start justify-start ml-2'>
                                    <h4>
                                        {item?.title}
                                    </h4>
                                    <p>
                                        {item?.grade}
                                    </p>
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