import React from 'react';
import MainLogoImg from "@/components/Logo/MainLogoImg";
import MegaMenu from "@/components/megaMenu/MegaMenu";
import LightBtn from "@/components/Buttons/LightBtn";
import Link from "next/link";
import {texts} from "@/utils/texts";

const Header = () => {
    const text = texts.eng.main.header
    return (
        <header className='w-full fixed top-0 left-0 px-3 backdrop-blur-md '>
            <div className='max-w-[96.25rem] m-auto w-full h-20 flex flex-row item-center justify-between'>
                <Link href={'/'} className={'flex flex-row items-center justify-center'}>
                    <MainLogoImg className={'w-[10rem]'}/>
                </Link>
                <div className={'grow flex flex-row items-center justify-end pr-12'}>

                    <Link href={'/services'}>
                        <LightBtn border={false} otherClass={'mr-2'}>
                            {text.services}
                        </LightBtn>
                    </Link>

                    <Link href={'/products'}>
                        <LightBtn border={false} otherClass={'mr-2'}>
                            {text.products}
                        </LightBtn>
                    </Link>

                    <Link href={'/companies'}>
                        <LightBtn border={false} otherClass={'mr-6'}>
                            {text.companies}
                        </LightBtn>
                    </Link>

                </div>

                <div className='flex flex-row items-center justify-end'>
                    <Link href={'/register'}>
                        <LightBtn border={false} otherClass={'mr-3'}>
                            {text.register}
                        </LightBtn>
                    </Link>
                    <Link href={'/login'}>
                        <LightBtn border={true} otherClass={'mr-6'}>
                            {text.login}
                        </LightBtn>
                    </Link>


                    <MegaMenu className={'w-[1.6rem] cursor-pointer'}/>

                </div>
            </div>
        </header>
    );
};

export default Header;