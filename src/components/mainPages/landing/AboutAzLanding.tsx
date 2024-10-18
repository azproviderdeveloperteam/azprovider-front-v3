import React from 'react';
import Image from "next/image";
import {texts} from "@/utils/texts";
import Link from "next/link";

const AboutAzLanding = () => {
    const text = texts.eng
    const myTexts = text.homePage.aboutUs
    return (
        <div className='w-full bg-secondary-yellow pt-[28rem] px-5 box-border overflow-x-hidden'>

            <div className='w-full max-w-[71rem]  mx-auto  flex flex-col items-center justify-start box-border mt-12'>

                <div className='w-full grid grid-cols-12 gap-4'>
                    <Link href={'https://iccima.ir/'} className='col-span-3'>
                        <Image src={'/iran-otagh-bazargani.png'} width={500} height={500} alt={'اتاق بازرگانی ایران\n'} className={'w-full max-w-[8rem] aspect-square'}/>
                    </Link>
                    <Link href={'https://iajcc.ir/'} className='col-span-3'>
                        <Image src={'/iajcc.png'} width={500} height={500} alt={'اتاق مشترک بازرگانی ایران اتریش\n'}   className={'w-full max-w-[8rem] aspect-square'}/>
                    </Link>
                    <Link href={'https://sentria.ir'} className='col-span-3'>
                        <Image src={'/sentria.png'} width={500} height={500} alt={'سنتریا'}  className={'w-full max-w-[8rem] aspect-square'}/>
                    </Link>
                    <Link href={'https://diihk.com'} className='col-span-3'>
                         <Image src={'/diihk.png'} width={500} height={500} alt={'اتاق ایران و آلمان '}   className={'w-full max-w-[8rem] aspect-square'}/>
                    </Link>

                    <Link href={'https://ir-iqcc.com/'} className='col-span-3'>
                        <Image src={'/ir-iqcc.png'} width={500} height={500} alt={'اتاق مشترک بازرگانی ایران و عراق\n '}   className={'w-full max-w-[8rem] aspect-square'}/>
                    </Link>

                    <Link href={'https://service.tccim.ir/\n'} className='col-span-3'>
                        <Image src={'/service-tehran.png'} width={500} height={500} alt={'اتاق بازرگانی تهران '}   className={'w-full max-w-[8rem] aspect-square'}/>
                    </Link>

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