import React from 'react';
import Image from "next/image";
import {texts} from "@/utils/texts";
import LoginTextSlider from "@/components/authPages/loginAndRegister/LoginTextSlider";
import LoginByOTPAccordion from "@/components/authPages/loginAndRegister/LoginByOTPAccordion";
import LoginByPasswordAccordion from "@/components/authPages/loginAndRegister/LoginByPasswordAccordion";

const Login = () => {


    const text = texts.eng
    const myTexts = text.login


    return (
        <div className='w-full min-h-[100svh] bg-white text-primary-dark-b'>

            <div className='!relative !h-full min-h-[100svh] max-w-[71.2125rem] lg:w-[71.3125rem] m-auto w-full flex flex-row items-center justify-between'>
                <Image src={'/pink-vector.svg'} alt={'pink-vector'} width={350} height={350} className={'!absolute top-[60%] left-[-10%] z-[0]'}/>
                <Image src={'/gray-vector.svg'} alt={'gray-vector'} width={250} height={250} className={'!absolute top-[35%] left-[25%] z-[0]'}/>
                <Image src={'/purple-vector.svg'} alt={'purple-vector'} width={550} height={550} className={'!absolute top-[-0%] left-[0%] z-[10]'}/>

                <div className='w-1/3'>
                    <div className='w-full flex flex-col items-start justify-center'>
                        <h1 className='w-full text-left capitalize leading-none	 text-transparent bg-clip-text font-bold text-[3.5rem]' style={{backgroundImage:"linear-gradient(88deg, #AE88FF 7.72%, #FFA3F7 48.06%, #FFCB8E 91.92%)"}}>
                            {myTexts.sayWelcome}
                        </h1>
                    </div>

                    <div className='w-full '>
                        <LoginTextSlider theme={'dark'}/>
                    </div>
                </div>

                <div className='w-2/3 flex flex-col items-center justify-center px-10'>
                    <LoginByOTPAccordion />
                    <LoginByPasswordAccordion />
                </div>
            </div>
        </div>
    );
};

export default Login;