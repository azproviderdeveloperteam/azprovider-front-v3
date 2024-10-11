import React from 'react';
import Image from "next/image";
import {texts} from "@/utils/texts";

const AboutAzLanding = () => {
    const text = texts.eng
    const myTexts = text.homePage.aboutUs
    return (
        <div className='w-full bg-secondary-yellow pt-[28rem] px-5 box-border overflow-x-hidden'>

            <div className='w-full max-w-[71rem]  mx-auto  flex flex-col items-center justify-start box-border'>

                <div className='w-full grid grid-cols-12 gap-4'>
                    <span className='col-span-3'>
                        <Image src={'/aboutus1.svg'} width={42} height={42} alt={'aboutus1'} className={'!w-[6rem] aspect-square'}/>
                    </span>
                    <span className='col-span-3'>
                        <Image src={'/aboutus2.svg'} width={42} height={42} alt={'aboutus2'}  className={'!w-[6rem] aspect-square'}/>
                    </span>
                    <span className='col-span-3'>
                        <Image src={'/aboutus3.svg'} width={42} height={42} alt={'aboutus3'}  className={'!w-[6rem] aspect-square'}/>
                    </span>
                    <span className='col-span-3'>
                         <Image src={'/aboutus4.svg'} width={42} height={42} alt={'aboutus4'}  className={'!w-[6rem] aspect-square'}/>
                    </span>

                </div>

                <h2 className={'w-full font-bold text-[2rem] text-primary-dark-b text-left mt-10'}>
                    {myTexts.title}
                </h2>
                <p className={'w-full text-[1rem] text-primary-dark-b text-justify mt-3 mb-10'}>
                    {myTexts.desc}
                </p>
            </div>
        </div>
    );
};

export default AboutAzLanding;