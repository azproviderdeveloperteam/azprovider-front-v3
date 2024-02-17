import React from 'react';
import Image from "next/image";
import {texts} from "@/utils/texts";

const AboutAzLanding = () => {
    const text = texts.eng
    const myTexts = text.homePage.aboutUs
    return (
        <div className='w-full bg-secondary-yellow pt-[28rem] '>

            <div className='max-w-[71.2125rem] lg:w-[71.3125rem] m-auto w-full flex flex-col items-center justify-start px-[5%] lg:px-0'>

                <div className='w-full flex flex-row items-center justify-between flex-wrap'>
                    <Image src={'/aboutus1.svg'} width={42} height={42} alt={'aboutus1'} className={'!w-[6rem] aspect-square'}/>
                    <Image src={'/aboutus2.svg'} width={42} height={42} alt={'aboutus2'}  className={'!w-[6rem] aspect-square'}/>
                    <Image src={'/aboutus3.svg'} width={42} height={42} alt={'aboutus3'}  className={'!w-[6rem] aspect-square'}/>
                    <Image src={'/aboutus4.svg'} width={42} height={42} alt={'aboutus4'}  className={'!w-[6rem] aspect-square'}/>

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