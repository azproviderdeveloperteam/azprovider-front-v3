import React from 'react';
import MainLogoImg from "@/components/Logo/MainLogoImg";
import MegaMenu from "@/components/megaMenu/MegaMenu";
import LightBtn from "@/components/Buttons/LightBtn";
import Link from "next/link";
import {texts} from "@/utils/texts";
import HeaderCheckUserLogin from "@/components/mainPages/HeaderCheckUserLogin";
import { headers } from "next/headers";


const Header = ({theme}:any) => {
    const text = texts.eng.main.header

    const headersList = headers();
    const domain = headersList.get("x-forwarded-host") || "";
    const protocol = headersList.get("x-forwarded-proto") || "";
    const pathname = headersList.get("x-invoke-path") || "";



    return (
        <header className='w-full fixed top-0 left-0 px-3 backdrop-blur-md z-50 b mix-blend-difference'>
            <div className='max-w-[96.25rem] m-auto w-full h-20 flex flex-row item-center justify-between'>
                <Link href={'/'} className={'flex flex-row items-center justify-center'}>
                    <MainLogoImg className={'w-[10rem]'} black={theme === 'white-black' ? false : true}/>
                </Link>
                <div className={'grow flex flex-row items-center justify-end pr-12'}>

                    <Link href={'/services'}>
                        <LightBtn border={false} otherClass={'mr-2'} black={theme === 'white-black' ? false :true}>
                            {text.services}
                        </LightBtn>
                    </Link>

                    <Link href={'/products?sort=date'}>
                        <LightBtn border={false} otherClass={'mr-2'} black={theme === 'white-black' ? false :true}>
                            {text.products}
                        </LightBtn>
                    </Link>

                    <Link href={'/companies'}>
                        <LightBtn border={false} otherClass={'mr-6'} black={ theme === 'white-black' ? false :true}>
                            {text.companies}
                        </LightBtn>
                    </Link>

                </div>

                <div className='flex flex-row items-center justify-end'>
                    <HeaderCheckUserLogin text={text} black={theme === 'white-black' ? false :true}/>



                    <MegaMenu className={'w-[1.6rem] cursor-pointer'} black={theme === 'white-black' ? false :true}/>

                </div>
            </div>
        </header>
    );
};

export default Header;