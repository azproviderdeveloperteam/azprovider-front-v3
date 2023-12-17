'use client'

import React, {useState} from 'react';
import Image from "next/image";
import {texts} from "@/utils/texts";
import LoginTextSlider from "@/components/authPages/loginAndRegister/LoginTextSlider";
import RegisterFirstStep from "@/components/authPages/loginAndRegister/RegisterFirstStep";
import RegisterSecondStep from "@/components/authPages/loginAndRegister/RegisterSecondStep";
import RegisterThirdStep from "@/components/authPages/loginAndRegister/RegisterThirdStep";
import RegisterFourthStep from "@/components/authPages/loginAndRegister/RegisterFourthStep";
const Register = () => {

    const [step , setStep] = useState(0)

    const text = texts.eng
    const myTexts = text.register


    return (
        <div className='w-full min-h-[100svh] bg-primary-dark-b'>
            <div className='relative !h-full min-h-[100svh] max-w-[71.2125rem] lg:w-[71.3125rem] m-auto w-full flex flex-row items-center justify-between'>
                {
                    step === 0 ?
                        <RegisterFirstStep nextStep={()=>setStep(1)}/>

                        :
                        step === 1 ?
                            <RegisterSecondStep nextStep={()=>setStep(2)}/>

                            :
                            step === 2 ?
                                <RegisterThirdStep nextStep={()=>setStep(3)}/>
                                :
                                step === 3 ?
                                    <RegisterFourthStep nextStep={()=>setStep(4)}/>
                                    :
                            null
                }

            </div>
        </div>
    );
};

export default Register;