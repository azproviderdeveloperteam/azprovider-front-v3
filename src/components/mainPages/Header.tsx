import React from 'react';
import MainLogoImg from "@/components/Logo/MainLogoImg";
import MegaMenu from "@/components/megaMenu/MegaMenu";
import LightBtn from "@/components/Buttons/LightBtn";
import Link from "next/link";

const Header = () => {
    return (
        <header className='w-full fixed top-0 left-0 px-3 backdrop-blur-md bg-gray-900'>
            <div className='max-w-[96.25rem] m-auto w-[full] h-20 flex flex-row item-center justify-between'>
                <Link href={'/'} className={'flex flex-row items-center justify-center'}>
                    <MainLogoImg className={'w-[10rem]'}/>
                </Link>
                <div className={'grow flex flex-row items-center justify-end pr-12'}>

                    <Link href={'/services'}>
                        <LightBtn border={false} otherClass={'mr-2'}>
                            Services
                        </LightBtn>
                    </Link>

                    <Link href={'/products'}>
                        <LightBtn border={false} otherClass={'mr-2'}>
                            Products
                        </LightBtn>
                    </Link>

                    <Link href={'/companies'}>
                        <LightBtn border={false} otherClass={'mr-6'}>
                            Companies
                        </LightBtn>
                    </Link>

                </div>

                <div className='flex flex-row items-center justify-end'>
                    <Link href={'/register'}>
                        <LightBtn border={false} otherClass={'mr-3'}>
                            Login
                        </LightBtn>
                    </Link>
                    <Link href={'/login'}>
                        <LightBtn border={true} otherClass={'mr-6'}>
                            Register
                        </LightBtn>
                    </Link>


                    <MegaMenu className={'w-[1.6rem] cursor-pointer'}/>

                </div>
            </div>
        </header>
    );
};

export default Header;