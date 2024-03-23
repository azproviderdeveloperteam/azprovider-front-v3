'use client'

import React, {useState} from 'react';
import Image from "next/image";
import {texts} from "@/utils/texts";
import LoginTextSlider from "@/components/authPages/loginAndRegister/LoginTextSlider";
import RegisterFirstStep from "@/components/authPages/loginAndRegister/RegisterFirstStep";
import RegisterSecondStep from "@/components/authPages/loginAndRegister/RegisterSecondStep";
import RegisterThirdStep from "@/components/authPages/loginAndRegister/RegisterThirdStep";
import RegisterFourthStep from "@/components/authPages/loginAndRegister/RegisterFourthStep";
import {checkAuthUser} from "@/services/authServices";
import {useQuery} from "@tanstack/react-query";
const Register = () => {

    const [step , setStep] = useState(3)
    const [email , setEmail] = useState<string>('')
    const text = texts.eng
    const myTexts = text.register

    // const {data, isPending, error} = useQuery({
    //     queryKey: 'aas',
    //     queryFn: checkAuthUser,
    //     retry:false,
    // })


    return (
        <div className='w-full min-h-[100svh] bg-primary-dark-b'>
            <div className='relative !h-full min-h-[100svh] max-w-[71.2125rem] lg:w-[71.3125rem] m-auto w-full flex flex-row items-center justify-between'>
                {
                    step === 0 ?
                        <RegisterFirstStep nextStep={(e:string)=>{
                            setStep(1)
                            if(e){
                                setEmail(e)
                            }
                        }}/>

                        :
                        step === 1 ?
                            <RegisterSecondStep nextStep={()=>setStep(2)} email={email}/>

                            :
                            step === 2 ?
                                <RegisterThirdStep nextStep={()=>setStep(3)} emai={email}/>
                                :
                                step === 3 ?
                                    <RegisterFourthStep nextStep={()=>setStep(4)} email={email}/>
                                    :
                            null
                }

            </div>
        </div>
    );
};

export default Register;