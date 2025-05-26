import React from 'react';
import MainLogoImg from "@/components/Logo/MainLogoImg";
import MegaMenu from "@/components/megaMenu/MegaMenu";
import LightBtn from "@/components/Buttons/LightBtn";
import Link from "next/link";
import {texts} from "@/utils/texts";
import HeaderCheckUserLogin from "@/components/mainPages/HeaderCheckUserLogin";
import MegaMenuOpened from "@/components/megaMenu/MegaMenuOpened";
import MainSIdeDrawer from "@/components/mainPages/MainSIdeDrawer";
import ResponsiveMainDrawer from "@/components/mainPages/ResponsiveMainDrawer";


const Header = ({theme}:any) => {
    const text = texts.eng.main.header
    return (
        <>
            <header className='w-full fixed top-0 left-0 px-3 backdrop-blur-md z-50 b mix-blend-difference'>
                <div className='max-w-[98vw] m-auto w-full h-20  flex flex-row item-center justify-between  '>

                    <MainSIdeDrawer   black={theme === 'white-black' ? false :true}/>
                    <Link href={'/'} className={'flex flex-row items-center justify-center'}>
                        <MainLogoImg theme={theme} className={'w-[5rem]'} black={theme === 'white-black' ? false : true}/>
                    </Link>
                    <div className={'grow lg:flex flex-row items-center justify-end pr-12 hidden'}>

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

                        <Link href={'/pre-invoices'}>
                            <LightBtn border={false} otherClass={'mr-6'} black={ theme === 'white-black' ? false :true}>
                                {"Pre Invoices"}
                            </LightBtn>
                        </Link>

                        <Link href={'/on-sale'}>
                            <LightBtn border={false} otherClass={'mr-6'} black={ theme === 'white-black' ? false :true}>
                                {'On Sales'}
                            </LightBtn>
                        </Link>

                        <Link href={'/hot-deals'}>
                            <LightBtn border={false} otherClass={'mr-6'} black={ theme === 'white-black' ? false :true}>
                                {'Hot Deals'}
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
                        <MegaMenu className={'w-[1.6rem] cursor-pointer hidden lg:block'} black={theme === 'white-black' ? false :true}/>

                    </div>
                </div>
            </header>
            <MegaMenuOpened />
            <ResponsiveMainDrawer text={text} />
        </>

    );
};

export default Header;