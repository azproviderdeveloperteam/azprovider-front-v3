import React from 'react';
import Image from "next/image";
import noImage from "@/public/no-image.svg";

const CompanyDetailsMembership = ({data} : any) => {
    return (
        <div className={'w-full'}>
            <h3 className='mt-5 font-bold text-[1.1rem] text-primary-dark-b'>
                Membership
            </h3>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>


                <div className='flex flex-row items-center justify-start'>
                    <Image
                        src={data?.membership?.file ? `${process.env.MEDIA_URL}${data?.membership?.file}` : noImage?.src}
                        alt={data?.membership?.title} height={80} width={80}
                        className={'object-cover rounded-[0.6rem'}/>
                    <div className='flex flex-col items-start justify-start ml-2'>
                        <h4>
                            {data?.membership?.serial_number}
                        </h4>
                        <p>
                            {data?.membership?.description}
                        </p>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default CompanyDetailsMembership;