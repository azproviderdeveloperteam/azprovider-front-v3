import React from 'react';
import {texts} from "@/utils/texts";
import MainLogoImg from "@/components/Logo/MainLogoImg";
import Image from "next/image";
import Link from "next/link";
import FooterInput from "@/components/inputs/FooterInput";
import WhiteBtn from "@/components/Buttons/WhiteBtn";

const Footer = () => {

    const text = texts.eng
    const myTexts = text.main.footer

    return (
        <div className='w-full bg-primary-dark-b pt-28 text-white px-3 overflow-x-hidden'>
            <div className='max-w-[90rem] 2xl:w-[90rem] m-auto w-full flex flex-col lg:flex-row items-center justify-start text-white'>
                <div className='w-full flex flex-col lg:flex-row items-start justify-between h-auto !min-h-[28.5rem]'>
                    <div className='w-full lg:w-1/2 h-full lg:!min-h-[28.5rem] flex flex-col lg:flex-row items-end justify-between'>
                        <div  className={'w-full lg:w-10/12 h-auto'}>
                            <div className='w-full flex flex-row items-end justify-start'>
                                <MainLogoImg className={'w-[10rem]'}/>
                                <h3 className='ml-2 text-secondary-yellow'>
                                    {myTexts.afterLogo}
                                </h3>
                            </div>

                            <h4 className='text-[1.4rem] font-bold mt-12 mb-3'>
                                {myTexts.input.label}
                            </h4>
                            <FooterInput myTexts={myTexts}/>
                            <div className=' w-full hidden lg:flex flex-row items-center justify-between'>
                                 <div className='w-4/5 aspect-[1.27]'>

                                 </div>
                                <div className='w-4/5 aspect-[1.27]'>

                                </div>
                            </div>
                        </div>

                        <div className={'w-full lg:w-2/12 h-full'}>
                            <div className='w-full h-full lg:!min-h-[28.5rem] flex flex-row lg:flex-col items-center justify-center lg:justify-end'>
                                <Link href={'https://www.instagram.com/azprovider.official'} target={'_blank'} className={'ml-3 lg:ml-0 mt-3'}>
                                    <Image src={'/instagram.svg'} alt={'instagram'} width={20} height={20} />
                                </Link>

                                <Link href={'https://chat.whatsapp.com/azprovider.official'} target={'_blank'} className={'ml-3 lg:ml-0 mt-3'}>
                                    <Image src={'/whatsapp.svg'} alt={'whatsapp'} width={20} height={20} />
                                </Link>

                                <Link href={'https://t.me/azprovider.official'} target={'_blank'} className={'ml-3 lg:ml-0 mt-3'}>
                                    <Image src={'/telegram.svg'} alt={'telegram'} width={20} height={20} />
                                </Link>

                                <Link href={'https://www.linkedin.com/in/azprovider.official'} target={'_blank'} className={'ml-3 lg:ml-0 mt-3'}>
                                    <Image src={'/inkedin.svg'} alt={'facebook'} width={23} height={23} />
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className='w-full lg:w-1/2 h-full !min-h-[28.5rem] flex flex-row items-end justify-between'>
                        <div className='w-1/2  h-full  flex flex-col items-start justify-between'>
                            {
                                myTexts.links.slice(0,7).map((item , index)=>{
                                    return(
                                        <Link href={item.href} key={index+1}  className={'mt-10'}>
                                            <WhiteBtn>
                                                {item.title}
                                            </WhiteBtn>
                                        </Link>
                                    )
                                })
                            }
                        </div>

                        <div className='w-1/2  h-full  flex flex-col items-start justify-between'>
                            {
                                myTexts.links.slice(7).map((item , index)=>{
                                    return(
                                        <Link href={item.href} key={index+1}   className={'mt-10'}>
                                            <WhiteBtn>
                                                {item.title}
                                            </WhiteBtn>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={'max-w-[90rem] 2xl:w-[90rem] m-auto text-center mt-10 py-2 font-thin text-[0.7rem]'}>
                {myTexts.copyRight}
            </div>
        </div>
    );
};

export default Footer;