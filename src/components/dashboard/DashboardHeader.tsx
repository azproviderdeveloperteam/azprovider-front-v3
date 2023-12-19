import React from 'react';
import MainLogoImg from "@/components/Logo/MainLogoImg";
import MegaMenu from "@/components/megaMenu/MegaMenu";
import LightBtn from "@/components/Buttons/LightBtn";
import Link from "next/link";
import {texts} from "@/utils/texts";


const DashboardHeader = () => {
    const text = texts.eng.main.header

    return (
        <header className='w-full fixed top-0 left-0 px-3 backdrop-blur-md z-50  '>
            <div className='px-10 m-auto w-full h-20 flex flex-row item-center justify-between'>
                <Link href={'/'} className={'flex flex-row items-center justify-center'}>
                    <MainLogoImg className={'w-[10rem]'} black={true}/>
                </Link>
                <div className={'grow flex flex-row items-center justify-end pr-12'}>

                    <Link href={'/services'}>
                        <LightBtn border={false} otherClass={'mr-2'} black={true}>
                            {text.services}
                        </LightBtn>
                    </Link>

                    <Link href={'/products'}>
                        <LightBtn border={false} otherClass={'mr-2'} black={true}>
                            {text.products}
                        </LightBtn>
                    </Link>

                    <Link href={'/companies'}>
                        <LightBtn border={false} otherClass={'mr-6'} black={true}>
                            {text.companies}
                        </LightBtn>
                    </Link>

                </div>

                <div className='flex flex-row items-center justify-end'>
                    <Link href={'/register'}>
                        <LightBtn border={false} otherClass={'mr-3'} black={true}>
                            {text.register}
                        </LightBtn>
                    </Link>
                    <Link href={'/login'}>
                        <LightBtn border={true} otherClass={'mr-6'} black={true}>
                            {text.login}
                        </LightBtn>
                    </Link>


                    <MegaMenu className={'w-[1.6rem] cursor-pointer'} black={true}/>

                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;