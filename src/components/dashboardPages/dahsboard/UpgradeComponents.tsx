'use client'
import React, {useState} from 'react';
import Image from "next/image";
import {Button, IconButton} from "@material-tailwind/react";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import AzDialog from "@/components/dialog/AzDialog";

const UpgradeComponents = ({setViewUpgradeFalse} : any) => {

    const [viewModal ,setViewModal] = useState<boolean>(false)


    const openInNewTab = () => {
        window.open('https://api.whatsapp.com/send/?phone=989121873696', '_blank')
    }

    const plans = [
        {
            title: 'Premium',
            features: [
                'Your logo is on home page',
                '50% off for the first email marketing and 20% off for the next ones',
                '300 guaranteed clicks for your products',
            ],
        },
        {
            title: 'Pro',
            features: [
                'Your logo is on home page',
                '50% off for the first email marketing and 25% off for the next ones',
                '700 guaranteed clicks for your products',
                '5 Internal links to your products in the professional articles per month',
            ],
        },
    ]
    return (
        // <div className='w-full flex flex-row cursor-pointer pr-[1%]' onClick={setViewUpgradeFalse}>
        //     <Image src={'/upgrade-dashboard.svg'} alt={'s'} width={1000} height={100} className={'w-full'}/>
        // </div>
        <div className='w-full relative overflow-visible mt-12'>
            <Image src={'/upgrade-left.png'} alt={'upgrade-az-l'} width={200} height={200} className={'absolute top-[-2rem] left-[-1%] z-[8] pointer-events-none' } />
            <Image src={'/upgrade-r.png'} alt={'upgrade-az-r'} width={200} height={200} className={'absolute top-[-3rem] right-[3%] z-[8] pointer-events-none' } />


            <div className='w-full bg-secondary-yellow flex flex-col md:flex-row items-center justify-between gap-4 rounded-3xl mb-4 p-4   '>


                <IconButton className={'bg-transparent focus:shadow-none !shadow-none'} onClick={setViewUpgradeFalse}>
                    <Image src={'/exit.svg'} alt={'exit.svg'} width={15} height={15} />
                </IconButton>
                <div className='grow relative z-[9] ml-12'>
                    <div className='font-bold text-[1.2rem] my-2'>
                        Upgrade For find more!
                    </div>
                    <div>
                        Upgrade your account to reach more clients, gain priority visibility, and access exclusive tools designed to grow your business faster.
                        Boost your profile today and stand out.
                    </div>
                </div>

                <div className='w-full md:max-w-[8rem]  relative z-[9]' onClick={()=>setViewModal(true)}>
                    <RegisterBtn disabled={false}  otherClass={'!w-full'}>
                        Upgrade
                    </RegisterBtn>
                </div>

            </div>

            <AzDialog open={viewModal} handler={() => setViewModal(false)} size={'l'}>


                <div
                    className='w-full flex flex-row items-center justify-between p-2 lg:p-3 rounded-[1rem] relative text-primary-dark-b'>
                    <div className='flex flex-row items-center justify-start'>
                        <h3 className='font-bold ml-2 text-[1.7rem]'>
                            Upgrade Plan
                        </h3>
                    </div>

                    <IconButton className={'bg-transparent focus:shadow-none'} onClick={() => setViewModal(false)}>
                        <Image src={'/exit.svg'} alt={'exit.svg'} width={15} height={15}/>
                    </IconButton>

                </div>

                <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 max-h-[90svh] overflow-y-auto">
                    {plans.map((item, idx) => (
                        <div
                            key={idx}
                            className="w-full md:w-1/2 !h-full rounded-2xl bg-[#D9D9D9] p-5 flex flex-col"
                        >
                            <Image
                                src="/benefit-icon.svg"
                                alt={`benefit-icon-${idx}`}
                                width={30}
                                height={30}
                                className="w-4"
                            />
                            <h5 className="mt-4 text-xl font-bold text-black">{item.title}</h5>
                            {item.features.map((feature, i) => (
                                <p key={i} className="mt-2 text-sm text-black">
                                    {feature}
                                </p>
                            ))}
                            <RegisterBtn
                                disabled={false}
                                otherClass="!w-full mt-6"
                                onClick={openInNewTab}
                            >
                                Call Us
                            </RegisterBtn>
                        </div>
                    ))}
                </div>
            </AzDialog>
        </div>
    );
};

export default UpgradeComponents;